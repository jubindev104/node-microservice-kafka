# Node.js Kafka Microservices

This repository demonstrates a **microservices architecture** using **Node.js**, **Kafka**, **MongoDB**, and **PostgreSQL**.  
It includes two services:  

- **App1** – Kafka producer (sends data to Kafka topics)  
- **App2** – Kafka consumer (reads data from Kafka topics and stores it in MongoDB)  

---

## Technologies Used

- **Node.js** – Backend runtime  
- **Express.js** – REST API framework  
- **Kafka** – Messaging and streaming  
- **PostgreSQL** – Relational database  
- **MongoDB** – NoSQL database  

---

## Prerequisites

- Docker & Docker Compose installed  
- Node.js & NPM installed (for local development if not using Docker)  

---

## Installation

### 1. Install NPM dependencies

#### App1
```bash
cd app1
npm install
