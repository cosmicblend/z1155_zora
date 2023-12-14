module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const response = await fetch('https://api.zora.co/discover/premints/ZORA-MAINNET?limit=50');
    const data = await response.json();
    res.json(data);
};

