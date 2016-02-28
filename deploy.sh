#!/bin/sh
# GOOS=linux GOARCH=amd64 go build -o blog
# scp -r ./blog conf static views root@soy-ali:~/blog
ssh root@soy-ali 'cd blog && ./run.sh >/dev/null 2>&1'
