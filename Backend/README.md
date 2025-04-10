# Node.js TypeScript Server with Prisma

A Node.js server built with TypeScript and Prisma for user authentication.

## Technology Stack

- Node.js with TypeScript
- Express.js for API routes
- Prisma ORM for database operations
- JWT for authentication
- bcrypt for password hashing
- SQLite as the database (for simplicity)

## Project Structure

```
/server
  /prisma
    schema.prisma    # Database schema definition
  /src
    /controllers     # Business logic
    /middleware      # Auth middleware and error handling
    /routes          # API routes
    index.ts         # Main entry point
  .env               # Environment variables
  tsconfig.json      # TypeScript configuration
  package.json       # Project dependencies
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Copy the contents from `.env.example` to `.env` and adjust as needed.

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Create and apply database migrations:
```bash
npm run prisma:migrate
```

5. Run the development server:
```bash
npm run dev
```

## API Endpoints

### Public Routes

- `POST /api/users/register` - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- `POST /api/users/login` - Login a user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

### Protected Routes (requires authentication)

- `GET /api/users/me` - Get current user profile
  - Header: `Authorization: Bearer YOUR_JWT_TOKEN`

## Error Handling

The application includes a robust error handling system that:

- Handles operational vs programming errors
- Provides detailed error information in development
- Sanitizes error details in production
- Manages Prisma-specific errors

## Database

The project uses SQLite by default for simplicity. To use another database:

1. Update the provider in `prisma/schema.prisma`
2. Update the DATABASE_URL in `.env`
3. Run migrations again

## Authentication

JWT (JSON Web Tokens) are used for authentication. 
Tokens expire as specified in the JWT_EXPIRES_IN environment variable. 