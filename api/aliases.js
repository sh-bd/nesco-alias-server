const axios = require('axios');

module.exports = async (req, res) => {
  // --- 1) CORS headers ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- 2) GitHub fetch logic ---
  const token = process.env.GITHUB_TOKEN;
  const owner = 'sh-bd';
  const repo = 'nesco-portal';
  const filePath = 'nesco-consumer-aliases.json';

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    // Decode the Base64 content
    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(content);
  } catch (err) {
    console.error('GitHub API error:', err);
    return res.status(500).json({ error: 'GitHub API error', details: err.message });
  }
};
