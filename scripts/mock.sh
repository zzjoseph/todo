#!/bin/bash
direction=$1
if [ $direction = "up" ]; then
  (psql -f ./mock.sql todo)
elif [ $direction = "down" ]; then
  (psql -f ./undo_mock.sql todo)
else
  echo "Invalid option "$1
fi
