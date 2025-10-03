const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const setupDatabase = require('./database');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const db = await setupDatabase();

  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));
  app.use(express.json());
  
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }));

  app.use('/api/auth', authRoutes(db));
  app.use('/api', apiRoutes(db));

  app.listen(PORT, () => {
    console.log(`🚀 Vexel backend is live on http://localhost:${PORT}`);
  });
}

startServer();