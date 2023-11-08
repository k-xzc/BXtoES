FROM node:18
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD [ "node", "app/index.js" ]
