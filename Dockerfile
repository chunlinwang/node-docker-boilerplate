ARG NODE_VERSION
ARG ALPINE_VERSION

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as dev
 
WORKDIR /app
    
FROM dev as production

RUN npm i -g pm2