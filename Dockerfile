FROM node:alpine

WORKDIR /usr/back

ARG DATABASE_URL=$DATABASE_URL

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]