import { NextApiRequest, NextApiResponse } from "next";
import type { Video } from "@/interfaces/video";
import type { ResponseError } from "@/interfaces/error";
import { dynamoDbClient } from "@/utils/dynamoDb";
import { TableName } from "@/constants/tables";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Video | ResponseError>
) {
  const data = req.body;
  
  const keys = Object.keys(data);
  keys.forEach((key) => {
    data[key] = { S: data[key] }
  });

  await dynamoDbClient.send(
    new PutItemCommand({
      TableName: TableName.VIDEOS,
      Item: data,
    })
  );
    
  return res.status(200).json({ ...req.body });
}
