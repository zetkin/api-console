FROM ubuntu:15.04

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y nodejs npm

RUN ln -sf /usr/bin/nodejs /usr/bin/node

ADD . /app
RUN cd app && npm update
RUN cd app && ./gulp.sh
WORKDIR /app/static
EXPOSE 3080
CMD python -m SimpleHTTPServer 3080
