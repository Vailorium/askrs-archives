# Askr's Archives

## Description

Askr's Archives is an assistant tool for the popular "Fire Emblem Heroes" game, designed to help you create and share custom heroes, aether raids defenses, and more for the ever-growing community of players. This application provides a platform to showcase hero builds for various gamemodes as well as showcases for aether raids defense and offense teams. There are also other planned features to be developed in the future.

The tool can also be used on the other end of the spectrum to allow users to look up builds for their favorite characters and create meta team compositions for competitive modes built around them.

## Deployment

[Staging build](https://askrs-archives-staging-5gtti.ondigitalocean.app/) (might not be up to date with main)
 
## Setup

### Requirements

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)
- [Mongo.DB Community](https://www.mongodb.com/try/download/community) (or any MongoDB)
- [Firebase](https://firebase.google.com/)

#### Optional:
- [Python 3+](https://www.python.org/)

### Steps

1. Download MongoDB Community and set up a database on your local device - create a database (can be titled anything)
2. Set up a Firebase project with an app that has Authentication, take a note of the connection details required for the project (you may have to generate a new service account/private key under manage users and secrets)
3. Take an asset dump of Fire Emblem Heroes and add it to the /client/public folder under /assets (a few other items may need to be added, send me a DM if you need the resources)
4. Using the scripts in /scripts, get the data from the game (follow the README under there) and put it under /data in the /client/public folder
5. Add a file named ".env" to /client, in it add the following environment secrets:
    - REACT_APP_API_URL (default should be http://localhost:8080)
    - REACT_APP_CDN_URL (default should be /)
    - REACT_APP_FIREBASE_APIKEY
    - REACT_APP_FIREBASE_AUTHDOMAIN
    - REACT_APP_FIREBASE_PROJECTID
    - REACT_APP_FIREBASE_STORAGEBUCKET
    - REACT_APP_FIREBASE_MESSAGINGSENDERID
    - REACT_APP_FIREBASE_APPID
6. Add a file named ".env" to /server, in it add the following environment secrets (firebase should be the service account credentials):
    - DB_HOST (default should be host.docker.internal)
    - DB_PORT (default should be 27017)
    - DB_NAME (can be any name)
    - FIREBASE_ADMIN_TYPE
    - FIREBASE_ADMIN_PROJECT_ID
    - FIREBASE_ADMIN_PRIVATE_KEY_ID
    - FIREBASE_ADMIN_PRIVATE_KEY (copy and paste the whole thing in)
    - FIREBASE_ADMIN_CLIENT_EMAIL
    - FIREBASE_ADMIN_CLIENT_ID
    - FIREBASE_ADMIN_AUTH_URI
    - FIREBASE_ADMIN_TOKEN_URI
    - FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL
    - FIREBASE_ADMIN_CLIENT_X509_CERT_URL
7. Everything should be ready to run now. In the base folder use the npm command `npm run up` to start the client and server.
8. If things aren't working, there are a few likely issues/solutions
    - Eslint may need to be installed locally, if this is an issue simply run `npm i -g eslint`
    - Other packages may need to be installed locally, if this is an issue run `npm run install-packages` which will install all packages from the client and server
    - If none of these are the issue, make sure that your setup for assets/database/auth is correct
    - You can check the client/server logs to check for errors too

## Run

Simply run `npm run up` to build and start the containers and `npm run down` to take them down.

`npm run lint` and `npm run test` can be used to lint and test both the client and server respectively.