FROM node:14.15.0

RUN mkdir /webev-front

WORKDIR /webev-front
COPY . /webev-front

RUN yarn install

EXPOSE 3000
CMD sh -c "yarn build && yarn start"
