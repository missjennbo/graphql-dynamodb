#!/bin/bash
sudo cp /home/ubuntu/tictactoe/tictactoe.service /etc/systemd/system
##add exceutable permissions to express app
sudo chmod +x /home/ubuntu/tictactoe/build/server/server.js
##Allows any users to write the app folder. Useful if using fs within the app
sudo chmod go+w /home/ubuntu/tictactoe
##Launches the express app
sudo systemctl daemon-reload
sudo systemctl start tictactoe
sudo systemctl enable tictactoe