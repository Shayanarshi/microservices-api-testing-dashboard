# MicroTest – Microservices Test Dashboard

MicroTest is a web-based dashboard built with React that helps developers interact with and test REST APIs in a Spring Boot microservices application through a centralized API Gateway.

It provides a simple interface for sending requests, entering parameters, viewing JSON responses, and checking HTTP status codes without manually preparing every request in a separate API client.

## Features

- **API Testing Dashboard:** Test configured microservice endpoints from one interface.
- **Multiple HTTP Operations:** Supports GET and POST requests.
- **Input Forms:** Enter request parameters and customer details through forms.
- **Response Viewer:** View formatted JSON responses and response headers.
- **HTTP Status and Timing:** Inspect status codes and request duration.
- **Test Statistics:** Track passed, failed, and executed requests during the current session.
- **Service Monitoring:** Check configured service endpoints through the Gateway.
- **Responsive UI:** Dashboard layout adapts to different screen sizes.

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend Integration | REST APIs |
| API Routing | Spring Cloud Gateway |
| Backend Services | Spring Boot |
| Development Tools | npm, Git, GitHub |

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
        +----------+----------+
        |          |          |
        v          v          v
     PlanApp    FriendApp  CustomerApp
        |          |          |
        +----------+----------+
                   |
          JSON API Responses
                   |
                   v
        MicroTest Response Viewer
```

The frontend sends requests to the Gateway using configured API paths. The Gateway routes requests to the appropriate Spring Boot service, which returns a response for the dashboard to display.

## API Operations

The dashboard currently includes these configured operations:

| Service | Operation | Method |
|---|---|---|
| Plan Service | View all plans | GET |
| Plan Service | Find a plan | GET |
| Friend Service | Add a friend | POST |
| Friend Service | Find friends by phone number | GET |
| Customer Service | Register customer | POST |
| Customer Service | Customer login | POST |
| Customer Service | View customer profile | GET |

The endpoints depend on the corresponding backend controllers and Gateway routes being available.

## Prerequisites

Install the following before running the project:

- Node.js and npm
- Java and Maven for the backend services
- The Spring Boot microservices and Spring Cloud Gateway configured and running

## Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd microservices-ui
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend

Start the required Spring Boot services and the API Gateway. The Vite development proxy is configured to forward `/api` requests to:

```text
http://localhost:8080
```

Make sure the Gateway is running on port `8080`, or update `vite.config.js` to match your configuration.

### 4. Start the frontend

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal, usually:

```text
http://localhost:5173
```

### 5. Build for production

```bash
npm run build
```

To check the production build locally:

```bash
npm run preview
```

## Configuration

The development proxy is defined in `vite.config.js`.

```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
    },
  },
}
```

This proxy is for local development. A deployed frontend needs a reachable backend URL and appropriate production configuration. Do not expose sensitive credentials in frontend code.

## Important Notes

- The backend services and Gateway must be running for API requests to work.
- Dashboard test statistics are maintained in the current frontend session and are not a persistent test history.
- A successful frontend build does not confirm that the backend APIs are reachable.
- Only configure and document endpoints that actually exist in your backend services.

## Future Improvements

- Automated API test suites
- Persistent test history and reports
- Authentication and authorization support
- More detailed service health checks
- Environment-based API configuration
- CI/CD integration

## Author

**Shayan Arshi**

Java Full Stack Developer | React | Java | Spring Boot | REST APIs

---

This project was developed to practice frontend integration with Spring Boot microservices and API Gateway-based routing.
