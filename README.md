# My Express App

This is a simple Express application that imports data from an XML file into a PostgreSQL database and exports data from the database. It uses Docker to run the application and the database in separate containers.

## Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

## Setup

1. Clone the repository to your local machine.

2. Navigate to the project directory.

3. Install the Node.js dependencies:

```bash
npm install
```

4. Build the Docker images:

```bash
docker-compose build
```

5. Start the Docker containers:

```bash
docker-compose up
```

The application is now running at `http://localhost:3001`.

## Usage

- To import data from an XML file into the database, send a POST request to `http://localhost:3001/import` with the XML file attached.

- To export data from the database, send a GET request to `http://localhost:3001/export`. The data will be returned in the response.

## Stopping the Application

To stop the application and the database, press `Ctrl+C` in the terminal where `docker-compose up` is running. To remove the Docker containers, use the following command:

```bash
docker-compose down
```