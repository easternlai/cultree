FROM amd64/node:16-alpine3.14

WORKDIR /cultree-server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE  8000

CMD ["npm", "start"]