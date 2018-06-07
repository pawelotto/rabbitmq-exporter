# rabbitmq-exporter
Export RabbitMQ queue into anoter RabbitMQ instance using NodeJS

## Description ##
rabbitmq-exporter connects to two RabbitMQ instances (target and source) and copies all messages over acking them. 

This software is created using TypeScript. Please run __npm build__ before running __npm start__.

## Configuration ##
All configuration is done in the __./config/default.json__ file. Please setup your RabbitMQ source and target server details.