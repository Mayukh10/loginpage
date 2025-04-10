# Login Page Application

A full-stack application with a React TypeScript frontend and Node.js TypeScript backend.

## Project Structure

The project is organized into two main directories:

```
/loginpage
  ├── frontend/        # React frontend application
  └── server/          # Node.js backend application
```

### Frontend Structure

```
/frontend
  ├── public/          # Static files
  ├── src/             # Source code
  │   ├── components/  # Reusable components
  │   │   └── auth/    # Authentication components (LoginPage)
  │   ├── contexts/    # React context providers (AuthContext)
  │   ├── hooks/       # Custom React hooks
  │   ├── pages/       # Page components
  │   ├── services/    # API service functions
  │   ├── utils/       # Utility functions
  │   ├── App.tsx      # Main App component
  │   └── index.tsx    # Entry point
  ├── package.json     # Dependencies
  └── tsconfig.json    # TypeScript configuration
```

### Backend Structure

```
/server
  ├── prisma/          # Database schema and migrations
  ├── src/             # Source code
  │   ├── controllers/ # Business logic
  │   ├── middleware/  # Custom middleware
  │   ├── routes/      # API routes
  │   ├── utils/       # Utility functions
  │   └── index.ts     # Entry point
  ├── .env             # Environment variables
  └── package.json     # Dependencies
```

## Features

- User authentication (login/register)
- Form validation
- Error handling
- Protected routes
- JWT authentication

## Running the Application

### Backend

```bash
cd server
npm install
npm run dev
```

The server will run on http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000

## Error Handling

The application implements robust error handling:

1. **Frontend Form Validation**:
   - Input validation for required fields
   - Email format validation
   - Password strength requirements

2. **API Error Handling**:
   - Network errors detection
   - HTTP status code-based error messages
   - User-friendly error messages

3. **Authentication Errors**:
   - Invalid credentials handling
   - Expired tokens handling
   - Authorization errors
