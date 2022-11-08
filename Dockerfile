FROM node:latest

WORKDIR /express-mysql
COPY package.json .
RUN npm install
COPY . .
CMD npm start