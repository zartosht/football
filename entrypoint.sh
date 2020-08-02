#!/bin/bash
./wait-for-it.sh 127.0.0.1:5432 -- echo "Database is up"

sleep 5

adonis migration:run

sleep 5

adonis seed

sleep 5

adonis serve --dev