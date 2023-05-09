import { NextApiRequest, NextApiResponse } from "next";

interface Note {
  characterId: number;
  noteId: number;
  linkItemType: null;
  linkKey: string;
  toCharacterId: null;
  toAddress: null;
  toNoteId: null;
  toHeadCharacterId: null;
  toHeadNoteId: null;
  toContractAddress: null;
  toTokenId: null;
  toLinklistId: null;
  toUri: null;
  deleted: boolean;
  locked: boolean;
  contractAddress: string;
  uri: string;
  operator: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  publishedAt: string;
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
      type: string;
      authors: string[];
      content: string;
      sources: string[];
      external_urls: string[];
      date_published: string;
    };
  };
}

export interface NotesLink {
  linklistId: number;
  linkType: string;
  linkItemType: string;
  linkValue: string;
  fromCharacterId: number;
  toCharacterId: number;
  toNoteId: number;
  operator: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  transactionHash: string;
  blockNumber: number;
  logIndex: number;
  updatedTransactionHash: string;
  updatedBlockNumber: number;
  updatedLogIndex: number;
  toNote: Note;
}

export interface NotesResponseData {
  list: NotesLink[];
  count: number;
  cursor: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotesResponseData | { error: string }>
) {
  const { characterId } = req.query;

  const response = await fetch(
    `https://indexer.crossbell.io/v1/characters/${characterId}/links?limit=20`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  try {
    const data = (await response.json()) as NotesResponseData;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

