FROM node:21-slim

RUN apt update && apt install -y openssl procps

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

EXPOSE 3333

ENV HOST=0.0.0.0
ENV PORT=3333

CMD ["sh", "-c", "./wait-for-it.sh mysql:3306 -- node ace migration:run && npm run build && npm start"]