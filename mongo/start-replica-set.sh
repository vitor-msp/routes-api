#!/bin/bash

docker exec mongo1 mongosh -u $1 -p $2 --eval '
    rs.initiate({
        _id: "rs0",
        members: [
            { _id: 0, host: "mongo1:27017", priority: 1 },
            { _id: 1, host: "mongo2:27017", priority: 0.5 }
        ]
    })
'

exit 0