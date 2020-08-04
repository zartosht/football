FROM node:12

WORKDIR /app

COPY . /app/
COPY ./.env.example /app/.env

RUN npm ci --production -qq && \
    npm i -g @adonisjs/cli --quiet && \
    chmod a+x /app/entrypoint.sh && \
    chmod a+x /app/wait-for-it.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
