FROM node:20 AS build

WORKDIR /usr/app

COPY package.json ./
RUN npm i

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/app

COPY --from=build /usr/app ./

CMD ["npm","run","start"]