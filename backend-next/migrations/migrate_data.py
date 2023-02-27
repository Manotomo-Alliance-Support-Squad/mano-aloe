import requests
import psycopg2
import json
from typing import List, Dict
from os import getenv

"""
A quick and dirty script to import data from our old api into our new db
"""

class Message:
    messageID: str
    orig_msg: str
    tl_msg: str
    country: str
    username: str

class Game:
    gameID: str
    gameLink: str
    gitLink: str
    title: str
    description: str
    thumbnail: str

class Gallery:
    artworkID: str
    artworkLink: str
    blurhash: str
    artistLink: str
    username: str
    title: str


def get_messages() -> List[Message]:
    res = requests.get("https://manoaloe.manotomo.com/api/messages")
    messages = json.loads(res.text)
    return messages.get("messages")


def get_gallery() -> List[Gallery]:
    res = requests.get("https://manoaloe.manotomo.com/api/gallery")
    gallery = json.loads(res.text)
    return gallery.get("gallery")


def get_games() -> List[Game]:
    res = requests.get("https://manoaloe.manotomo.com/api/games")
    games = json.loads(res.text)
    return games.get("games")


dbname = getenv("DB_NAME", "manoaloe")
user = getenv("DB_USER", "manotomodev")
password = getenv("DB_PASS", "")
host = getenv("DB_HOST", "localhost")
port = getenv("DB_PORT", "5432")

conn = psycopg2.connect(f"host={host} port={port} dbname={dbname} user={user} password={password}")
cur = conn.cursor()

messages = get_messages()
unnest_messages: Dict[str, List[str]] = dict()
for message in messages:
    for key, value in message.items():
        # really gross way of getting bulk inserts to work using unnest, blank values will still have a key
        if unnest_messages.get(key) is None:
            unnest_messages[key] = list()
        unnest_messages[key].append(value)

cur.execute(
    """
    INSERT INTO messages (username, orig_msg, tl_msg, country)
    SELECT * FROM UNNEST(%s::varchar[], %s::text[], %s::text[], %s::varchar[]);
    """,  (
          unnest_messages.get("username", []),
          unnest_messages.get("orig_msg", []),
          unnest_messages.get("tl_msg", []),
          unnest_messages.get("country", [])
          )
    )

gallery = get_gallery()
unnest_gallery: Dict[str, List[str]] = dict()
for art in gallery:
    for key, value in art.items():
        if unnest_gallery.get(key) is None:
            unnest_gallery[key] = list()
        unnest_gallery[key].append(value)

cur.execute(
    """
    INSERT INTO gallery (username, title, art_link, artist_link)
    SELECT * FROM UNNEST(%s::varchar[], %s::varchar[], %s::text[], %s::text[]);
    """,  (
          unnest_gallery.get("username", []),
          unnest_gallery.get("title", []),
          unnest_gallery.get("artworkLink", []),
          unnest_gallery.get("artistLink", [])
          )
    )

games = get_games()
unnest_games: Dict[str, List[str]] = dict()
for game in games:
    for key, value in game.items():
        if unnest_games.get(key) is None:
            unnest_games[key] = list()
        unnest_games[key].append(value)

cur.execute(
    """
    INSERT INTO games (title, game_description, git_link, game_link, thumbnail)
    SELECT * FROM UNNEST(%s::varchar[], %s::text[], %s::text[], %s::text[], %s::text[]);
    """,  (
          unnest_games.get("title", []),
          unnest_games.get("description", []),
          unnest_games.get("gitLink", []),
          unnest_games.get("gameLink", []),
          unnest_games.get("thumbnail", [])
          )
    )

conn.commit()
cur.close()
conn.close()
