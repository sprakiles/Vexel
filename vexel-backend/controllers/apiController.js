const axios = require('axios');

exports.handleSendWebhook = async (req, res, db) => {
  const { webhookUrl, payload } = req.body;

  if (!webhookUrl || !payload) {
    return res.status(400).send({ message: 'Missing webhookUrl or payload.' });
  }

  try {
    await axios.post(webhookUrl, payload);

    const isTest = payload.username === "Vexel Test";
    const column = isTest ? 'tests_sent' : 'embeds_sent';
    db.run(`UPDATE users SET ${column} = ${column} + 1 WHERE discord_id = ?`, req.session.user.id);

    res.status(200).json({ message: 'Webhook sent!' });
  } catch (err) {
    console.error("[WEBHOOK_ERROR]", err.response?.data);
    res.status(500).json({ message: 'Discord API rejected the request.', details: err.response?.data });
  }
};

exports.fetchUserStats = async (req, res, db) => {
  try {
    const stats = await db.get('SELECT embeds_sent, tests_sent FROM users WHERE discord_id = ?', req.session.user.id);
    if (!stats) {
      return res.status(404).json({ message: 'Stats not found for user.' });
    }
    res.json(stats);
  } catch (err) {
    console.error("[STATS_ERROR]", err);
    res.status(500).json({ message: 'Failed to fetch stats.' });
  }
};