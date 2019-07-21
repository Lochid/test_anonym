FROM ubuntu:18.04

RUN apt-get -y update
RUN apt-get -y upgrade 

RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get -y install git-core  nginx nodejs

ENV SOURCE=/src
WORKDIR $SOURCE
COPY . .

RUN npm i
RUN npm run build
CMD ["npm", "run", "migrate_start"]