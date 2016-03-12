#!/bin/sh

godep go build -o blog
docker stop blog && docker rm blog
docker rmi ubuntu-blog && docker build -t ubuntu-blog .
docker run -t --name blog -p 8080:8080 -d ubuntu-blog