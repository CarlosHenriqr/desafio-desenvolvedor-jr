FROM node:24-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . ./

EXPOSE 3000

CMD ["sh", "-c", "test -f tasks.json || printf '[]' > tasks.json; npm start"]
