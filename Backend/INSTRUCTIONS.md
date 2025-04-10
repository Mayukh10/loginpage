# Running the Backend Server

Due to environment constraints, you'll need to run the server manually with the following steps:

## Prerequisites
- Node.js installed (v16 or later)
- npm or yarn package manager

## Installation Steps

1. Open a new terminal window or command prompt
2. Navigate to the server directory:
   ```
   cd /path/to/loginpage/server
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Generate Prisma client:
   ```
   npx prisma generate
   ```

5. Run Prisma migrations:
   ```
   npx prisma migrate dev --name init
   ```

6. Start the server:
   ```
   npm run dev
   ```
   
   Alternatively, you can use the ts-node directly:
   ```
   npx ts-node src/index.ts
   ```

## Verifying the Server

Once the server is running, you can verify it with:

```
curl http://localhost:5000/health
```

Or access the following URL in your browser:
```
http://localhost:5000/health
```

You should see a response like:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Available API Endpoints

- `POST /api/users/register` - Create a new user
- `POST /api/users/login` - Log in an existing user
- `GET /api/users/me` - Get current user (requires auth) 