# Inventory System API

The Inventory System API is a robust backend service designed for managing products in an inventory. It provides endpoints to perform CRUD operations and integrates Google OAuth for authentication. The API documentation is available via Swagger.

## Features

- **Authentication:** Secure authentication using Google OAuth 2.0.
- **Product Management:** Create, read, update, and delete products.
- **Validation:** Input validation for request data.
- **Error Handling:** Detailed error responses for all endpoints.
- **CORS:** Configured for cross-origin requests.
- **Swagger Documentation:** Comprehensive API documentation.

## Getting Started

### Prerequisites

- Node.js >= 14.x
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/inventory-system-api.git
   cd inventory-system-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000 
   DB_HOST=your-host-database 
   DB_USER=your-user-database 
   DB_PASSWORD=your-password-database 
   DB_DATABASE=your-name-database 
   DB_PORT=your-port-database
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   JWT_SECRET=your-jwt-secret
   DATABASE_URL=your-database-url
   ```

4. Set up the PostgreSQL database:
   ```sql
   CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10, 2) NOT NULL,
     quantity INT NOT NULL
   );
   ```

### Running the Application

- Start the server:
  ```bash
  npm start
  ```
- Access the API documentation at [http://localhost:3000/documentation](http://localhost:3000/documentation).

### Testing

- Run tests:
  ```bash
  npm test
  ```

- Run tests in watch mode:
  ```bash
  npm run test:watch
  ```

- Generate test coverage:
  ```bash
  npm run test:coverage
  ```

## Dependencies

### Runtime

- **cors:** ^2.8.5
- **dotenv:** ^16.4.7
- **express:** ^4.21.2
- **jsonwebtoken:** ^9.0.2
- **passport:** ^0.7.0
- **passport-google-oauth20:** ^2.0.0
- **pg:** ^8.13.1
- **swagger-jsdoc:** ^6.2.8
- **swagger-ui-express:** ^5.0.1

### Development

- **jest:** ^29.7.0

## API Endpoints

### Authentication

- **GET /auth/google**
  Initiates Google OAuth login.

- **GET /auth/google/callback**
  Callback URL for Google OAuth. Returns a JWT token on successful authentication.

### Products

- **GET /products**
  Retrieves a list of all products.

- **POST /products**
  Creates a new product.

- **PUT /products/:id**
  Updates a product by ID.

- **DELETE /products/:id**
  Deletes a product by ID.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or suggestions.

## License

This project is licensed under the ISC License.

