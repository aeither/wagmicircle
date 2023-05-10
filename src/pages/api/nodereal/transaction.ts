import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

export interface Transaction {
  chain: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
}

interface GetTransactionByHashResponse {
  jsonrpc: string;
  id: number;
  result: Transaction | null;
}

const BSC_TESTNET_URL = `https://bsc-testnet.nodereal.io/v1/${env.NODEREAL_API_KEY}`;
const ETH_GOERLI_URL = `https://eth-goerli.nodereal.io/v1/${env.NODEREAL_API_KEY}`;
const ETH_MAINNET_URL = `https://eth-mainnet.nodereal.io/v1/${env.NODEREAL_API_KEY}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[] | { error: string }>
) {
  const { hash } = req.query;

  const bscData = {
    id: 1,
    jsonrpc: "2.0",
    method: "eth_getTransactionByHash",
    params: [hash],
  };

  const ethData = {
    id: 1,
    jsonrpc: "2.0",
    method: "eth_getTransactionByHash",
    params: [hash],
  };

  const bscOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bscData),
  };

  const ethOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(ethData),
  };

  try {
    const [bscResponse, goerliResponse, ethResponse] = await Promise.all([
      fetch(BSC_TESTNET_URL, bscOptions),
      fetch(ETH_GOERLI_URL, ethOptions),
      fetch(ETH_MAINNET_URL, ethOptions),
    ]);

    const bscResult =
      (await bscResponse.json()) as GetTransactionByHashResponse;
    const goerliResult =
      (await goerliResponse.json()) as GetTransactionByHashResponse;
    const ethResult =
      (await ethResponse.json()) as GetTransactionByHashResponse;

    const transactions: Transaction[] = [];

    if (bscResult.result !== null) {
      transactions.push({
        ...bscResult.result,
        chain: "bsc",
      });
    }

    if (goerliResult.result !== null) {
      transactions.push({
        ...goerliResult.result,
        chain: "goerli",
      });
    }

    if (ethResult.result !== null) {
      transactions.push({
        ...ethResult.result,
        chain: "eth",
      });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
