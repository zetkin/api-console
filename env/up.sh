#!/bin/sh
IMAGE_NAME=zetkin-api-console
cd ..

if [ $(docker ps -a | grep $IMAGE_NAME | wc -l) -eq 0 ] ; then
  docker build -t $IMAGE_NAME .
fi


if [ $(docker ps -a | grep $IMAGE_NAME | wc -l) -eq 0 ] ; then
  docker run -ti \
          --name $IMAGE_NAME \
          -e ZETKIN_API_SERVER=api \
          --link api:api \
          -p 3080:3080 \
          $IMAGE_NAME
else
  docker start $IMAGE_NAME
fi
