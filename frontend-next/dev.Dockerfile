FROM node:16
EXPOSE 5173
EXPOSE 3010
WORKDIR /build
COPY package.json package-lock.json .
RUN npm ci
ENTRYPOINT ["npm", "run", "dev-docker"]
