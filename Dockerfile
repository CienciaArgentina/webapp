#TODO: ASPNETCORE_URLS and Test
FROM node:10.15.0
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","dev"]