const limit = 100;
const chain = 'zora';
const includeNftDetails = '1';
const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'cosmicblend_sk_59b44b79-caf9-43d9-bbeb-8028eeceb989_6lado4e0omk1j10w' }
};

export const baseUrl = `https://api.simplehash.com/api/v0/nfts/transfers/${chain}?include_nft_details=${includeNftDetails}&order_by=timestamp_desc&limit=${limit}`;

export const fetcher = url => fetch(url, options).then(res => res.json());
