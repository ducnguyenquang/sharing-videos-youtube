import { NextApiRequest, NextApiResponse } from "next";
import type { Video } from "@/interfaces/video";
import type { ResponseError } from "@/interfaces/error";
import { execute } from "@/utils/dynamoDb";
import { TableName } from "@/constants/tables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Video | ResponseError>
) {
  const {
    query: { id },
  } = req;
  const video = await execute(TableName.VIDEOS, req.method, {
    id: { S: req.query.id },
  });

  return video
    ? res.status(200).json(video)
    : res.status(404).json({ message: `Video with id: ${id} not found.` });
}
