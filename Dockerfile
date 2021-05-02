FROM node:12-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libtool \
    tiff \
    jpeg \
    zlib \
    zlib-dev \
    file \
    pkgconf \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm \
    && yarn install
#Who the actual fuck thought that ascii only support as default in a docker container was a good idea?
RUN node -v
RUN npm -v
#State what to copy
COPY package.json .
COPY webpack.config.js .
COPY server server
COPY src src

#Install everything and boot
RUN npm install
RUN npm run build
RUN mkdir saves
RUN mkdir uploaded

EXPOSE 3000

CMD npm run server
