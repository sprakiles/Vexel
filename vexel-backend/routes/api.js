const router = require('express').Router();
const apiController = require('../controllers/apiController');
const isLoggedIn = require('../middleware/isLoggedIn');

module.exports = function(db) {
  router.use(isLoggedIn);

  router.post('/send', (req, res) => apiController.handleSendWebhook(req, res, db));
  router.get('/stats', (req, res) => apiController.fetchUserStats(req, res, db));
  
  return router;
};