# Lab3

Lab3 contains the implementation of laboratory workі on the discipline Deployment and development of information systems

## Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

## Setup

1. Clone the repository to your local machine.

2. Navigate to the project directory.

3. Install the Node.js dependencies of the frontend and the backend:

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

The backend is now running at `http://localhost:3001`.
The frontend is now running at `http://localhost:5173`.
The database is now running at `http://localhost:7432`.

## Usage

TBD

## Stopping the Application

To stop the application and the database, press `Ctrl+C` in the terminal where `docker-compose up` is running. To remove the Docker containers, use the following command:

```bash
docker-compose down
```