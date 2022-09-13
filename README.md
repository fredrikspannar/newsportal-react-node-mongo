# react-node-auth-demo

Frontend - React with Material UI

Backend - Node/Express

Persistent storage - MongoDB

## Documentation (Backend API)

When the NODE_ENV is set to development, documentation is available in OpenAPI/Swagger
by visiting the /docs route from the backend-server.

## Installation

Backend dependencies:

```
npm install
```

Frontend dependencies:

```
cd client
npm install
```

## Configuration

Create an .env-file in the root-directory ( for the backend ) with for example:

```
NODE_ENV=development
PORT=8000
SECRET=myBestAPI
NODE_MONGODB=mongodb://localhost:27017/DATABASE
NEWSAPI_URL=https://newsapi.org/v2/top-headlines?pageSize=30&category=CATEGORY&sortBy=publishedAt&language=en&apiKey=APIKEY
SWAGGER_API_NAME="Newsportal API"
SWAGGER_API_VERSION=1.0
```

Replace the placeholder "DATABASE" in NODE_MONGODB with the name of the database, also you need a free api-key from https://newsapi.org
for the variable NEWSAPI_URL and the placeholder "APIKEY"

## Development

Start backend with:

```
npm run server-dev
```

Start frontend with:

```
npm run client-dev
```

## Production

First you will need to build the production build of the frontend with:

```
cd client
npm run build
```

Then you should set the .env-file for the correct enviroment:

```
NODE_ENV=production
...
```

Depending on the production enviroment you might want to set the enviroment-variable PORT.
Everything is setup to start the Node/Express server with a "npm start"-command and the frontend + backend
will be served from the same URI.

## Deployment

The application can be served with Node/Express directly ( React frontend and API backend ), but you
can also serve with a Nginx frontend to levereage Nginx caching features ( and also load balance if you're
running multiple Node instances. Nginx can direct the load better to workers then Node master/nodes )

Nginx configuration for serving react and proxy to node:

```
  # set root to match the directory where the react frontend is
  root /var/www/.../client/build;

  location / {
    try_files $uri $uri/ /index.html =404;
  }

  location /api {
    proxy_pass http://localhost:3010;          # whatever port node runs on
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
```

## Final thoughts and improvements

* Caching of the news from newsapi.org should be checked and new data fetched if the cached data is old, perhaps
check and update once every three hours.

* Fix the bug when you're saving the profile you might need to save twice for the new settings to be set.

* Add CSRF-protection since httpony-cookies is vulnerable to Cross site request forgery.

* More explicit validation in backend and not the simple validation with only does not exit (..then fail).