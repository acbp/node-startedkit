FROM node:lts-alpine3.15 as npm-builder
LABEL New Way Soluções Digitais <comunicacao@gruponewway.com.br>
RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN apk add make g++ git
RUN npm ci --production --no-audit 

EXPOSE 80
CMD ["sh", "infra/startup.sh"]
