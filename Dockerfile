FROM node

MAINTAINER toonverwerft@gmail.com

ADD ./app /app
WORKDIR /app

RUN npm install

CMD ["node", "/app/tail.js"]