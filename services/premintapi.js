const limit = 50;

//export const premintBaseUrl = `https://api.zora.co/discover/premints/ZORA-MAINNET?limit=${limit}`;
export const premintBaseUrl = `https://your-vercel-project-url.vercel.app/api/zora?limit=${limit}`;

export const premintFetcher = url => fetch(url).then(res => res.json());
