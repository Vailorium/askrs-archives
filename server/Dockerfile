FROM node:14.18.3-alpine3.15

ARG NODE_ENV=development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm","start"]