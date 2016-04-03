FROM ubuntu:14.04

ENV MONGO_RS_PORT_27017_TCP_ADDR "172.17.0.0:27017"
ADD . /blog
WORKDIR /blog
CMD ["./blog", ">", "log.txt"]
EXPOSE 8080