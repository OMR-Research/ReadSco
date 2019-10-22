FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install typescript -g
RUN npm install nodemon -g

COPY . .

RUN ls

EXPOSE 3000

CMD ["npm", "run", "deploy"]

