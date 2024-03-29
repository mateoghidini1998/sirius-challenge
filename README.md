# WordCloud - Sirius Challenge

This project consists on a backend web scrapping API, that crawls an amazon product url and its product description to generate a wordcloud.

### PACKAGES

  -  "axios": "^1.6.7",
  -  "cheerio": "^1.0.0-rc.12",
  -  "cors": "^2.8.5",
  -  "dotenv": "^16.4.5",
  -  "express": "^4.18.3",
  -  "express-rate-limit": "^7.2.0",
  -  "express-xss-sanitizer": "^1.1.9",
  -  "helmet": "^7.1.0",
  -  "hpp": "^0.2.3",
  -  "ioredis": "^5.3.2"

### DEV DEPENDENCIES

  - nodemon
  - jest

### SETUP

1 - After cloning the repository, change your directory to the correct path of the project in your terminal

```
cd <your_path>/sirius_challenge
``` 

2 - Install dependencies and packages by running:

```
npm install
```

or

```
yarn add
```

### STARTING THE SERVER:

For redis cache to work you should install the redis cli by following the docs at https://redis.io/docs/get-started/

You can add a config folder in the root of the project with a config.env file that contains a PORT=   
If not the api will run by default at port 5000.

For production mode:

```
npm start
```

For dev mode:

```
npm run dev
```

For unit testing:

```
npm test
```

NOTE: For either dev or production you´ll need to start a redis server.

```
redis-server
```

For running the script simulateRequests.sh from git bash:

```
 ./simulateRequests.sh localhost port param 1
```