#!/bin/sh

users
godep go build -o blog
cd static 
cnpm install
NODE_ENV=prod webpack 
cd ../
docker stop blog && docker rm blog
docker rmi ubuntu-blog && docker build -t ubuntu-blog .
docker run -t --name blog -p 8080:8080 -d ubuntu-blog