FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080

RUN rm -rf node_modules

RUN npm install --production

CMD ["npm", "run", "start"]