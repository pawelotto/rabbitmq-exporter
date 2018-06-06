# rabbitmq-exporter
Export RabbitMQ queue into JSON files using NodeJS

## Description ##
rabbitmq-exporter connects to a RabbitMQ instance and exports all queue elements into separate JSON files. 

This software is created using TypeScript. Please run __npm build__ before running __npm start__.

## Configuration ##
All configuration is done in the __./config/default.json__ file. Please setup your RabbitMQ server details as well as target directory to export queue into.

