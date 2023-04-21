#!/bin/bash

npm install
yarn typeorm migration:run -d ./build/shared/infra/db/index.js    
npm run dev
