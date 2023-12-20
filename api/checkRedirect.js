import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;
  try {
    const response = await fetch(url, { redirect: 'manual' });
    const isRedirect = response.status >= 300 && response.status < 400;
    res.json({ isRedirect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
