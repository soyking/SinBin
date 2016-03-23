FROM ubuntu:14.04

ADD . /blog
WORKDIR /blog
CMD ["./blog", ">", "log.txt"]
EXPOSE 8080