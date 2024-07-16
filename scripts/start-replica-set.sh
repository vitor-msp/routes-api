#!/bin/bash

read_env_var() {
    grep -E "^$1=" .env | cut -d '=' -f2-
}

MONGO_INITDB_ROOT_USERNAME=`read_env_var MONGO_INITDB_ROOT_USERNAME`
MONGO_INITDB_ROOT_PASSWORD=`read_env_var MONGO_INITDB_ROOT_PASSWORD`
MONGO_HOST1_PRIO=`read_env_var MONGO_HOST1_PRIO`
MONGO_HOST2_PRIO=`read_env_var MONGO_HOST2_PRIO`

docker exec mongo1 mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval '
    rs.initiate({
        _id: "rs0",
        members: [
            { _id: 0, host: "mongo1:27017", priority: '$MONGO_HOST1_PRIO' },
            { _id: 1, host: "mongo2:27017", priority: '$MONGO_HOST2_PRIO' }
        ]
    })
'

exit 0