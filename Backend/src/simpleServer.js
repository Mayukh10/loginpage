// A simple Express server for testing
// Run with: node src/simpleServer.js

const express = require('express');
const cors = require('cors');

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    time: new Date().toISOString()
  });
});

// Mock user data
const users = [];

// Auth routes
app.post('/api/users/register', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      status: 'fail', 
      message: 'Please provide email and password' 
    });
  }

  // Check if user already exists
  const userExists = users.some(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ 
      status: 'fail', 
      message: 'User already exists' 
    });
  }

  // Create user (in memory only for this simple test)
  const newUser = {
    id: users.length + 1,
    email,
    password: `hashed_${password}`, // Not actually hashed
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    status: 'success',
    token: 'mock_token_' + newUser.id,
    data: {
      user: {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    }
  });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      status: 'fail', 
      message: 'Please provide email and password' 
    });
  }

  // Find user
  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== `hashed_${password}`) {
    return res.status(401).json({ 
      status: 'fail', 
      message: 'Invalid email or password' 
    });
  }
  
  res.status(200).json({
    status: 'success',
    token: 'mock_token_' + user.id,
    data: {
      user: {
        id: user.id,
        email: user.email
      }
    }
  });
});

// Protected route example
app.get('/api/users/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      status: 'fail', 
      message: 'Not authenticated' 
    });
  }
  
  const token = authHeader.split(' ')[1];
  const userId = token.replace('mock_token_', '');
  
  const user = users.find(u => u.id === parseInt(userId));
  
  if (!user) {
    return res.status(401).json({ 
      status: 'fail', 
      message: 'User not found' 
    });
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email
      }
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️ Simple server is running on port ${port}`);
  console.log(`🔗 Try accessing http://localhost:${port}/health in your browser`);
}); 