# MicroTest – Microservices API Testing Dashboard

MicroTest is a React-based dashboard for testing REST APIs in a Spring Boot microservices application through Spring Cloud Gateway. It provides a centralized interface to execute API requests, inspect JSON responses, view HTTP status codes, and measure response times.

## Features

- **API Testing:** Test configured microservice endpoints from one dashboard.
- **HTTP Methods:** Supports GET and POST requests.
- **Request Forms:** Enter parameters and customer details.
- **Response Viewer:** Inspect formatted JSON responses and response headers.
- **Status and Timing:** View HTTP status codes and request duration.
- **Test Statistics:** Track executed, passed, and failed requests during the current session.
- **Service Monitoring:** Check configured service endpoints through the Gateway.
- **Responsive UI:** Works across different screen sizes.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, JavaScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | Spring Boot, REST APIs |
| API Gateway | Spring Cloud Gateway |
| Tools | npm, Git, GitHub, Postman |

## Architecture

```text
              User
                |
                v
       React MicroTest Dashboard
                |
                v
       Spring Cloud Gateway
          localhost:8080
                |
        +-------+-------+
        |       |       |
        v       v       v
     PlanApp FriendApp CustomerApp
        |       |       |
        +-------+-------+
                |
                v
          JSON Responses
                |
                v
       Dashboard Response Viewer
```

The dashboard sends requests through Spring Cloud Gateway. The Gateway routes each request to the appropriate Spring Boot microservice, and the response is displayed in the dashboard.

## Configured API Operations

| Service | Operation | Method |
|---|---|---|
| Plan Service | View all plans | GET |
| Plan Service | Find a plan | GET |
| Friend Service | Add a friend | POST |
| Friend Service | Find friends by phone number | GET |
| Customer Service | Register customer | POST |
| Customer Service | Customer login | POST |
| Customer Service | View customer profile | GET |

These operations require the corresponding backend endpoints and Gateway routes to be configured correctly.

## Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- Java and Maven for the backend services
- The required Spring Boot microservices and Spring Cloud Gateway

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Shayanarshi/microservices-api-testing-dashboard.git
cd microservices-api-testing-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend

Start the required Spring Boot microservices and Spring Cloud Gateway.

By default, the Vite development proxy forwards `/api` requests to:

```text
http://localhost:8080
```

Ensure the Gateway is running on port `8080`, or update the target in `vite.config.js` to match your configuration.

### 4. Start the frontend

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

### 5. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Configuration

The development proxy is configured in `vite.config.js`.

Example:

```javascript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
    },
  },
}
```

This proxy is intended for local development. For production deployment, configure a reachable backend URL and appropriate CORS settings. Do not expose sensitive credentials in frontend code.

## Important Notes

- The backend services and Gateway must be running for API requests to succeed.
- API paths and request payloads must match the actual backend controllers.
- Test statistics are maintained in the current frontend session and are not persistent test history.
- A successful frontend build does not guarantee that the backend APIs are reachable.
- GitHub Pages can host the frontend, but it cannot make a local Gateway accessible to public users.

## Future Improvements

- Automated API test suites
- Persistent test history and downloadable reports
- Authentication and authorization support
- Detailed service health checks
- Environment-based API configuration
- CI/CD integration

## Author

**Shayan Arshi**

Java Full Stack Developer | React | Java | Spring Boot | REST APIs

This project was developed to practice frontend integration with Spring Boot microservices and API Gateway-based routing.
