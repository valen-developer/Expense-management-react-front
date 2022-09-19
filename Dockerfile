FROM node:16-alpine



RUN mkdir app
WORKDIR /app

COPY . . 

RUN npm install
RUN npm run build

FROM nginx:1.21.1-alpine

COPY --from=0 /app/dist /usr/share/nginx/html