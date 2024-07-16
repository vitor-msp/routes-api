#!/bin/bash

openssl rand -base64 756 > rs_keyfile
chmod 0400 rs_keyfile
sudo chown 999:999 rs_keyfile

exit 0