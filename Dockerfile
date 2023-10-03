FROM node:alpine

WORKDIR /usr/back

COPY . .

RUN npm install

RUN npx prisma generate
RUN mpx prisma migrate deploy
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]