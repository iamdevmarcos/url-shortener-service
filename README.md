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

- **Node.js**: v18.x or higher
- **npm**: v8.x or higher
- **MongoDB**: Local or cloud instance
- **Redis**: Local instance or Redis Cloud/Upstash (free tiers available)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and configure the following variables:

   ```bash
   # Application Port
   PORT=3000

   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/url-shortener

   # Redis Configuration (Localhost or Redis Cloud)
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   ```

4. **Running MongoDB and Redis Locally (optional):**

   If you don’t have MongoDB or Redis running locally, you can use Docker:

   ```bash
   # Run MongoDB
   docker run --name mongo -p 27017:27017 -d mongo

   # Run Redis
   docker run --name redis -p 6379:6379 -d redis
   ```

## Running the Application

1. **Development Mode:**

   ```bash
   npm run start:dev
   ```

2. **Production Mode:**

   ```bash
   npm run build
   npm run start:prod
   ```

3. **Access the API:**
   - The server will be running at `http://localhost:3000`.
   - Swagger API documentation will be available at `http://localhost:3000/api`.

## Testing

You can run the test suite using the following command:

```bash
npm run test
```

For end-to-end testing:

```bash
npm run test:e2e
```

## API Endpoints

- **POST /url**: Shorten a long URL.
- **GET /:shortUrl**: Redirects to the original URL using the shortened URL.
- **GET /url/stats/:shortUrl**: Get statistics about a shortened URL (clicks, creation date, etc.).

## Docker

To run the entire application with **Docker Compose**, use the following command:

```bash
docker-compose up
```

This will spin up MongoDB, Redis, and the NestJS service together.

## Future Enhancements

- User authentication and authorization for managing URLs.
- Custom short URLs.
- Analytics dashboard for URL statistics.
- Expiration dates for short URLs.
