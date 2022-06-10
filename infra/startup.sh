#!/bin/sh

envsubst < /app/infra/template.json > /app/config/default.json

npm start