![logo]()

### [Homepage](https://www.kafkafix.com)
### [Repository](https://github.com/oslabs-beta/kafkafix)

## Table of Content

- [ Motivation ](#-motivation)
- [ Features ](#-features)
- [ Install ](#-install)
- [ How to Use ](#-how-to-use)
- [ Contribute ](#-contribute)
- [ Contributors ](#-contributors)

## Motivation

KafkaFix is designed to simple and lightweight local Kafka development tool with support for graphical UI for monitoring JMX attributes with Prometheus.

Kafkafix aims to get rid of all configurations on the user's end to simplify the process and offer better user experience. Users whom use Kafkafix simply has to fire up the applicaiton with their docker compose file. Then, everything is good to go.

## Features

Users are able to fully manage their local Kafka instance and perform any operations, such as , create images, start consumers and producers, visualize streams of data, manage errors.

## Install

Just visit https://wwww.kafkafix.com and download and install.

## How to Use

### Starting Containers and Kafka

> 1. Start all containers by selecting your docker-compose.yml file.
> 2. Provide a local port number and click Connect

### Stopping Containers

> 1. Click Disconnect button and all containers will be stopped.

### Metrics

> 1. To visualize metrics, click the side panel and then click Metrics
> 2. Here you will have an options to see all possible JMX metrics
> 3. Click on any of the metrics and you will be able to see visual representation of data for that metric.

### Failure Reports

> 1. All failures incurred by Kafka will be saved locally.
> 2. Click on the side panel for full history or error logs or click on top right notification panel for most recent error logs.

### Visualize Streams of Data

> 1. To visualize all streams of data consumed by the conusmer go to right panel and click on the Visualize Streams button.
> 2. All data will be update in real time.

### Creating a Topic

> 1. To create a topic, click on the Create Topic button
> 2. Pass in the topic name and the Number of Partitions you like for the topic to have.

### Starting a Producer

> 1. To start a producer, click on the Start Producer button
> 2. Provide name of the topic you would like producer to
> 3. Kafkafix will start producing to that topic

### Starting a Consumer

> 1. To start a consumer, click on the Start Consumer button
> 2. Provide a topic name and a group id.
> 3. Once it's created, consumer will start consuming messages for the specified topic.

### Deleting a Topic

> 1. Simply click on the Delete button next to the topic name.

### Creating a Partition

> 1. Click on Create a Paritition button.
> 2. Then pass in a number of partitions to be added for the topic.

## Contribute
New contritbutions to the library are welcome, but we ask that you please follow these guidelines.

> 1. Before opening a PR for major additions or changes, please test on your local development. This way, it will save overall time spent and allow for faster implementation by maintainers.
> 2. Conside whether your changes are useful for all users.
> 3. Avoid breaking changes unless there is an upcoming major release, which are infrequent. We encourage people to care a lot about backwards compatibility.

## Contributors

Andy Wang
Kyu Sung Park
Ranisha Rafeeque
Yom Woldemichael
