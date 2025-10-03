const axios = require('axios');

exports.processDiscordCallback = async (req, res, db) => {
  const { code } = req.query;
  const PORT = process.env.PORT || 3000;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}?error=missing_code`);
  }

  try {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `http://localhost:${PORT}/api/auth/callback`,
    });

    const tokenRes = await axios.post('https://discord.com/api/oauth2/token', params);
    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenRes.data.access_token}` },
    });

    const profile = userRes.data;

    let user = await db.get('SELECT * FROM users WHERE discord_id = ?', profile.id);
    if (!user) {
      await db.run('INSERT INTO users (discord_id, username) VALUES (?, ?)', profile.id, profile.username);
    }

    req.session.user = {
      id: profile.id,
      username: profile.username,
      discriminator: profile.discriminator,
      avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
    };

    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    console.error('[AUTH_ERROR]', error.response?.data || error.message);
    res.redirect(`${process.env.FRONTEND_URL}?error=auth_failed`);
  }
};

exports.getCurrentUser = (req, res) => {
  res.status(200).json(req.session.user);
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('[LOGOUT_ERROR]', err);
      return res.status(500).json({ message: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Successfully logged out.' });
  });
};