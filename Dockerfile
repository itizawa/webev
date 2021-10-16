FROM node:16.11.1

RUN mkdir /webev-front

WORKDIR /webev-front
COPY . /webev-front

RUN yarn install

EXPOSE 3000
CMD sh -c "yarn build && yarn start"
