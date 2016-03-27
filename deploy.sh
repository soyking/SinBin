#!/bin/sh

godep go build -o blog

cd static 
npm install
npm run publish 
rm -rf node_modules
cd ../

docker stop blog && docker rm blog
docker rmi ubuntu-blog && docker build -t ubuntu-blog .
docker run -t --name blog -p 8080:8080 -d ubuntu-blog