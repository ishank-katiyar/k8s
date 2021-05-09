FROM mongo:latest

# init.js will be executed when the mongo container runs

RUN apt update && apt install curl

COPY ./init.js ./docker-entrypoint-initdb.d
# COPY . .

EXPOSE 27017

# RUN mongod

# RUN mongo init.js

# CMD ["mongo", "init.js &"]
# CMD ["mongod"]
# RUN chmod +x mongo-init.sh
# CMD ["mongod && mongo", "init.js"]
# CMD ["./mongo-init.sh"]