FROM ubuntu:14.04

ADD . /blog
WORKDIR /blog
CMD ["./blog"]
EXPOSE 8080