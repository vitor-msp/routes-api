#!/bin/bash

openssl rand -base64 756 > ./mongo/rs_keyfile
sudo chmod 400 mongo/rs_keyfile
sudo chown 999:999 mongo/rs_keyfile

exit 0