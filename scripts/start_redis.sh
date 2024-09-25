#!/bin/bash
docker run -d --name redis-server -p 6379:6379 redis
docker logs -f redis-server