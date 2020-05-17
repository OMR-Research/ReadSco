FROM node:12.13.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install typescript@3.7.2 -g
RUN npm install nodemon -g

COPY . .

RUN ls

EXPOSE 3000

CMD ["npm", "run", "deploy"]

