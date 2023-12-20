import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { chainName, collectionAddress, tokenId } = req.query;
  const response = await fetch(
    `https://api.zora.co/discover/mintables/${chainName}/${collectionAddress}${
      tokenId ? `?token_id=${tokenId}` : ""
    }`
  );
  const json = await response.json();
  res.status(200).json(json);
}
