#  Dockerfile for Node Express Backend

FROM node:15.14.0-alpine3.10

# install curl
RUN npm install -g npm
RUN apk --no-cache add curl
RUN apk --no-cache add vim
# RUN apk add --update \
#     libc6-compat
# RUN apk --no-cache add --virtual native-deps \
#     g++ gcc libgcc libstdc++ linux-headers make python && \
#     npm install --quiet node-gyp -g &&\
#     npm install --quiet && \
#     apk del native-deps


# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]