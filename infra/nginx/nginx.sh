#!/bin/bash

IMAGE_NAME="nginx"
CONTAINER_NAME="nginx"

echo "Building Docker image..."
docker build -t $IMAGE_NAME .

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Removing existing container..."
    docker rm -f $CONTAINER_NAME
fi

echo "Starting new container..."
docker run -d --name $CONTAINER_NAME --network universe -p 18080:80 $IMAGE_NAME

echo "Nginx deployed"
