FROM node:18.18-buster

WORKDIR /app

COPY . . 

EXPOSE 3000

RUN npm install

CMD [ "npm", "start" ]