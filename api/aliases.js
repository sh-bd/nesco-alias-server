const axios = require('axios');

module.exports = async (req, res) => {
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

    const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(content);
  } catch (err) {
    res.status(500).json({ error: 'GitHub API error', details: err.message });
  }
};
