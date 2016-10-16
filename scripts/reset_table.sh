#!/bin/bash
tableName=$1
ruby create_${tableName}_table.rb down
ruby create_${tableName}_table.rb up
