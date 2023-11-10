FROM node:latest as node
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
EXPOSE 3660
CMD [ "npm", "start" ]