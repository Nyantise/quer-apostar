# Build
FROM node:alpine as build

WORKDIR /back

COPY . .

RUN npm install

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]