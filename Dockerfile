FROM node:8-alpine

ENV PORT 3000
# Reduce excessive npm logs
ENV NPM_CONFIG_LOGLEVEL error
# https://gist.github.com/ralphtheninja/f7c45bdee00784b41fed
ENV JOBS max

RUN mkdir -p /app
WORKDIR /app
COPY . /app

ARG GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA ${GIT_COMMIT_SHA}

RUN \
  apk add --no-cache make gcc g++ python && \
  apk add vips-dev fftw-dev --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

RUN \
   && \
  npm install && \
  npm run build && \
  npm run build-storybook && \
  rm -rf node_modules && \
  npm install --production

EXPOSE 3000

CMD [ "node", "server" ]
