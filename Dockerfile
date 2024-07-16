FROM node:18.17 AS builder
RUN mkdir /usr/routes-api
WORKDIR /usr/routes-api
COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN npm install
RUN npm run build

FROM node:18.17
WORKDIR /usr/routes-api
COPY package.json .
COPY --from=builder /usr/routes-api/dist ./dist
RUN npm install --only=production
EXPOSE 8080
CMD ["npm", "run", "start"]