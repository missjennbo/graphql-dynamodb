#!/bin/bash
cp /home/ubuntu/graphql-mongodb/graphql-mongodb.service /etc/systemd/system
##add exceutable permissions to express app
sudo chmod +x /home/ubuntu/graphql-mongodb/src/server/server.js
##Allows any users to write the app folder. Useful if using fs within the app
sudo chmod go+w /home/ubuntu/graphql-mongodb
##Launches the express app
sudo systemctl daemon-reload
sudo systemctl start graphql-mongodb
sudo systemctl enable graphql-mongodb