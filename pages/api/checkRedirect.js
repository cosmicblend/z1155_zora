import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { urls } = req.query;
  const urlArray = urls.split(',');
  try {
    const checks = urlArray.map(async (url) => {
      const response = await fetch(url, { redirect: 'manual' });
      return response.status >= 300 && response.status < 400;
    });
    const results = await Promise.all(checks);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

