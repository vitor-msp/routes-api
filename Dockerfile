FROM node:18.17 AS builder
RUN mkdir /usr/desafio-dev-jr-pl
WORKDIR /usr/desafio-dev-jr-pl
COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN npm install
RUN npm run build

FROM node:18.17
WORKDIR /usr/desafio-dev-jr-pl
COPY .env .
COPY package.json .
COPY --from=builder /usr/desafio-dev-jr-pl/dist ./dist
RUN npm install --only=production
EXPOSE 8080
CMD ["npm", "run", "start"]