#!/bin/bash

docker compose down

docker compose up --build -d

cd frontend

npm run build

cd ..
