import { NextApiRequest, NextApiResponse } from "next";

interface Character {
  characterId: number;
  handle: string;
  primary: boolean;
  uri: string;
  socialToken: string;
  operator: string;
  owner: string;
  fromAddress: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  transactionHash: string;
  blockNumber: number;
  logIndex: number;
  updatedTransactionHash: string;
  updatedBlockNumber: number;
  updatedLogIndex: number;
  metadata: {
    uri: string;
    type: string;
    content: {
      bio: string;
      name: string;
      type: string;
      avatars: string[];
    };
  };
}

interface ResponseData {
  list: Character[];
  count: number;
  cursor: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { error: string }>
) {
  const { address } = req.query;

  const response = await fetch(
    `https://indexer.crossbell.io/v1/addresses/${address}/characters?primary=true`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  try {
    const data = (await response.json()) as ResponseData;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
