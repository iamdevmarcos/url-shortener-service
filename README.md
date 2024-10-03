# URL Shortener Service

## Description

This is a scalable URL shortener service built using **NestJS**, **MongoDB**, and **Redis**. The application allows users to shorten long URLs and provides redirection to the original URLs while tracking the number of times each shortened URL is accessed.

## Features

- Shorten long URLs to custom short URLs.
- Redirection from short URLs to the original URLs.
- Count the number of times each short URL is accessed.
- Caching frequently accessed URLs using Redis for better performance.
- Optional URL expiration feature.
- Modular and scalable architecture using NestJS principles and SOLID design patterns.

## Technologies Used

- **NestJS**: Framework for building efficient, reliable, and scalable server-side applications.
- **MongoDB**: NoSQL database for storing URLs and associated metadata.
- **Redis**: In-memory database used for caching frequently accessed URLs.
- **TypeScript**: Static typing to improve code quality and maintainability.
- **Docker**: Containerization for development and deployment.
- **Jest**: Unit and integration tests to ensure code quality.
- **Swagger**: API documentation for easy testing and visualization.

## Requirements

- **Docker**: Installed on your system

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iamdevmarcos/url-shortener-service
   ```

2. **Create the `.env` file:**

   Create a `.env` file in the root directory with the following content:

   ```bash
   # Application Port
   PORT=8080

   # MongoDB Configuration
   MONGO_URI=mongodb://mongo:27017/url-shortener

   # Redis Configuration
   REDIS_HOST=redis
   REDIS_PORT=6379
   REDIS_PASSWORD=
   ```

## Running the Application with Docker

With Docker and Docker Compose installed, running the entire stack (NestJS, MongoDB, and Redis) is as simple as running a single command.

1. **Run the application:**

   The following command will build the necessary Docker containers and start the application along with its dependencies (MongoDB and Redis):

   ```bash
   docker-compose up
   ```

   This command will:

   - Build the NestJS application.
   - Start **MongoDB** and **Redis** services.
   - Expose the application on `http://localhost:8080`.

2. **Access the API:**

   - API root: `http://localhost:8080`
   - Swagger documentation: `http://localhost:8080/api`

3. **Stopping the application:**

   To stop the application and remove the containers, run:

   ```bash
   docker-compose down
   ```

## Testing

You can run the test suite using Docker as well:

1. **Run tests inside the Docker container:**

   ```bash
   docker-compose exec app npm run test
   ```

2. **End-to-end tests:**

   ```bash
   docker-compose exec app npm run test:e2e
   ```

.