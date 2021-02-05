#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npm run typeorm migration:run
npm run console fixtures
npm run start:dev