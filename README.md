# Nodejs Electerm sync server

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fatrox%2Fsync-dotenv%2Fbadge)](https://github.com/electerm/electerm-sync-server-node/actions)

A simple electerm data sync server.

## Use

Requires git/nodejs 16+/npm, recommend install nodejs/npm with [nvm](https://github.com/nvm-sh/nvm)

```bash
git clone git@github.com:electerm/electerm-sync-server-node.git
cd electerm-sync-server-node
npm i

# create env file, then edit .env
cp sample.env .env

node src/server.js

# would show something like
# server running at http://127.0.0.1:7837

# in electerm sync settings, set custom sync server with:
# server url: http://127.0.0.1:7837
# JWT_SECRET: your JWT_SECRET in .env
# JWT_USER_NAME: one JWT_USER in .env
```

## Test

```bash
# create env file, then edit .env
cp sample.env .env

npm run test
```

## Write your own data store

Just take [src/file-store.js](src/file-store.js) as an example, write your own read/write method

## License

MIT
