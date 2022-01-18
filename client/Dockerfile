FROM node:16-buster

WORKDIR /cultree-client

COPY package.json /cultree-client/package.json

RUN npm install

COPY . /cultree-client

EXPOSE 80

CMD ["npm", "start"]
