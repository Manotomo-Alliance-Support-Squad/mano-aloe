use rspc::{Error, ErrorCode, Router, RouterBuilder, Type};
use serde::Serialize;
use sqlx::{query_as, FromRow};
use uuid::Uuid;

use super::context::RouterContext;

pub fn games_router() -> RouterBuilder<RouterContext> {
    Router::<RouterContext>::new().query("games", |t| {
        #[derive(Serialize, FromRow, Type)]
        struct Game {
            id: Uuid,
            title: String,
            game_description: String,
            game_link: String,
            git_link: Option<String>,
            thumbnail: Option<String>,
        }

        #[derive(Serialize, Type)]
        struct GameResponse {
            count: usize,
            games: Vec<Game>,
        }

        t(|ctx, _input: ()| async move {
            let RouterContext { db } = ctx;
            let games = query_as!(
                Game,
                r#"
                SELECT
                    id,
                    title,
                    game_description,
                    game_link,
                    git_link,
                    thumbnail
                FROM games;
                "#
            )
            .fetch_all(&db)
            .await
            .map_err(|_| Error::new(ErrorCode::BadRequest, "Something went wrong".into()))?;

            Ok(GameResponse {
                count: games.len(),
                games,
            })
        })
    })
}
