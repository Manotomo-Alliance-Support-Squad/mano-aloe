FROM nginx:latest

RUN apt update && apt upgrade -y
RUN rm /etc/nginx/conf.d/default.conf

COPY mano-aloe.conf.template /etc/nginx/templates/mano-aloe.conf.template
COPY build /mnt
