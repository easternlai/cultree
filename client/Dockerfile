FROM amd64/node:16-buster as build

WORKDIR /cultree-client

COPY package.json /cultree-client/package.json

RUN npm install

RUN npm install react-scripts -g

COPY . /cultree-client

RUN npm run build

FROM nginx:latest

COPY --from=build /cultree-client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]