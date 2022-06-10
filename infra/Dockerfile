FROM node:lts-alpine as npm-builder
MAINTAINER New Way Soluções Digitais <comunicacao@gruponewway.com.br>
RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN apk update \
  && apk add python make g++ git
RUN npm i --production

FROM node:lts-alpine
MAINTAINER New Way Soluções Digitais <comunicacao@gruponewway.com.br>
WORKDIR /app
COPY --from=npm-builder /app .
RUN apk update \
  && apk add curl bash binutils gettext
VOLUME /app/config

EXPOSE 80
CMD ["bash", "infra/startup.sh"]
