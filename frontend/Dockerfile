FROM node:20.18.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

ENV NODE_ENV=production

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
