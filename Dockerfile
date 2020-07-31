FROM node:12

WORKDIR /app

RUN npm i -g pm2 && \
  npm i -g @adonisjs/cli && \
  chown node:node /app

USER node

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci --production && \
    adonis migration:run && \
    adonis seed

COPY --chown=node:node . .

CMD ["adonis", "serve", "--dev"]
