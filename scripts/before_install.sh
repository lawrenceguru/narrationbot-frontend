#!/bin/bash

rm -rf /home/ubuntu/deployment/latest/fe
mkdir /home/ubuntu/deployment/latest/fe
cd /var/www/Narrotionbot-frontend/
tar cf - --exclude=node_modules --exclude=build --exclude=.git . | (cd /home/ubuntu/deployment/backup/fe && tar xvf -)
