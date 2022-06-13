#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
sudo PM2_HOME=$HOME/.pm2 pm2 list

# navigate to app folder
cp -r /home/ubuntu/deployment/latest/fe/* /var/www/Narrotionbot-frontend/
cd /var/www/Narrotionbot-frontend
rm -rf ./node_modules ./build
npm install
npm run build
