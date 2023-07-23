FROM node:lts-bullseye-slim AS build
WORKDIR /app
COPY package.json ./
COPY . .
RUN yarn install
RUN yarn global add @angular/cli
RUN yarn run dev

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/mototrainer.ttm.web /usr/share/nginx/html
