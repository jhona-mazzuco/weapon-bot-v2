#!/bin/bash

discordToken=$@

echo DISCORD_TOKEN=$discordToken >> .env

/usr/local/bin/npm run build

/usr/local/bin/node /home/container/dist/main.js