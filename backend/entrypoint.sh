#!/bin/bash
if test -f /data/app.db; then cp /data/app.db /mnt/main/server/app.db; fi
if test -f /data/messages.csv; then /mnt/venv/bin/python3 /mnt/update_db.py -t MESSAGES -c /data/messages.csv; fi
if test -f /data/gallery.csv; then /mnt/venv/bin/python3 /mnt/update_db.py -t GALLERY -c /data/gallery.csv; fi
if test -f /data/multigallery.csv; then /mnt/venv/bin/python3 /mnt/update_db.py -t MULTIGALLERY -c /data/multigallery.csv; fi
if test -f /data/games.csv; then /mnt/venv/bin/python3 /mnt/update_db.py -t GAMES -c /data/games.csv; fi
if test -f /data/video.csv; then /mnt/venv/bin/python3 /mnt/update_db.py -t VIDEO -c /data/video.csv; fi
if test -f /data/announcements.csv; then /mnt/venv/bin/python3 /mnt/update_db.py -t ANNOUNCEMENTS -c /data/announcements.csv; fi
/mnt/venv/bin/waitress-serve --listen=0.0.0.0:3000 main.server:app
