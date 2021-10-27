FROM debian:latest

COPY . /mnt
RUN mkdir /data

RUN chmod +x /mnt/entrypoint.sh

RUN apt update && apt upgrade -y
RUN apt install python3-pip virtualenv python3-venv libffi-dev python3-dev -y
RUN useradd -ms /bin/nologin aloe

RUN chown -R aloe:aloe /mnt
RUN chown -R aloe:aloe /data
RUN chmod +rx /data
USER aloe
WORKDIR /mnt
RUN python3 -m venv venv
RUN venv/bin/pip3 install -r requirements.txt
RUN venv/bin/python3 manage.py db init
RUN venv/bin/python3 manage.py db migrate
RUN venv/bin/python3 manage.py create_db

ENTRYPOINT ["/bin/bash", "/mnt/entrypoint.sh"]
