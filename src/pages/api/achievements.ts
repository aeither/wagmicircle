import { NextApiRequest, NextApiResponse } from "next";

interface AchievementInfo {
  name: string;
  title: string;
}

interface AchievementItemInfo {
  tokenId: number;
  name: string;
  uri: string;
  description: string;
  media: string;
  attributes: { value: string; trait_type: string }[];
  targetValue: number;
  unit: string;
}

interface AchievementItemStat {
  mintedCount: number;
}

interface AchievementItem {
  tokenId: number;
  characterId: number;
  name: string;
  status: string;
  tokenNumber: number | null;
  currentValue: number;
  createdAt: string;
  updatedAt: string;
  mintedAt: string | null;
  transactionHash: string | null;
  info: AchievementItemInfo;
  stat: AchievementItemStat;
}

interface AchievementGroupInfo {
  name: string;
  title: string;
}

interface AchievementGroup {
  info: AchievementGroupInfo;
  items: AchievementItem[];
}

interface Achievement {
  info: AchievementInfo;
  groups: AchievementGroup[];
}

interface ResponseData {
  list: Achievement[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { error: string }>
) {
  const { characterId } = req.query;

  const response = await fetch(
    `https://indexer.crossbell.io/v1/characters/${characterId}/achievements`,
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
