const router = require('express').Router();
const authController = require('../controllers/authController');
const isLoggedIn = require('../middleware/isLoggedIn');

module.exports = function(db) {
  router.get('/discord', (req, res) => {
    const PORT = process.env.PORT || 3000;
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      redirect_uri: `http://localhost:${PORT}/api/auth/callback`,
      response_type: 'code',
      scope: 'identify',
    }).toString();
    res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
  });
  
  router.get('/callback', (req, res) => authController.processDiscordCallback(req, res, db));
  router.get('/me', isLoggedIn, authController.getCurrentUser);
  router.get('/logout', isLoggedIn, authController.logout);

  return router;
};