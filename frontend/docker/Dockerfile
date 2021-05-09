# Dockerfile for React client

# Build react client
FROM node:10.16-alpine as build

# curl install
RUN apk update && apk --no-cache add curl vim bash

# Working directory be app
WORKDIR /app

# COPY package*.json ./
COPY . .

###  Installing dependencies
# RUN npm install --silent && npm install react-scripts && npm run build --silent
RUN npm install && npm install react-scripts && npm run build
# COPY . .
# RUN npm run build --silent
# RUN pwd && ls -la

# copy local files to app folder
# COPY . /usr/scr/app

# build

# prepare nginx
FROM nginx:1.19.9-alpine

RUN apk --no-cache add gettext
# RUN --from=build pwd && ls -la
# COPY --from=build /app .
# RUN ls -la
# RUN ls -la ./src
COPY --from=build /app/build /usr/share/nginx/html/build

# RUN ls -la /usr/share/nginx/html/

RUN rm /etc/nginx/nginx.conf && rm -rf /etc/nginx/conf.d
# RUN rm -rf /etc/nginx/conf.d


COPY nginx/* /etc/nginx/

# RUN envsubst < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf

EXPOSE 80
# EXPOSE 3000

# CMD ["npm","start"]
# CMD ["envsubst < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off';"]
# COPY ./nginx/nginx/run-nginx.sh .
RUN chmod +x /etc/nginx/run-nginx.sh
CMD ["/etc/nginx/run-nginx.sh"]
