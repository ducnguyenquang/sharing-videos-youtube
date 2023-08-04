import { NextApiRequest, NextApiResponse } from "next";
import type { Video } from "@/interfaces/video";
import type { ResponseError } from "@/interfaces/error";
import { dynamoDbClient, execute } from "@/utils/dynamoDb";
import { TableName } from "@/constants/tables";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Video | ResponseError>
) {
  const {
    body: data,
  } = req;
  const { id } = req.query;
  const keys = Object.keys(data);
  keys.forEach((key) => {
    data[key] = { S: data[key] }
  });
  data.id = id
  await dynamoDbClient.send(
    new PutItemCommand({
      TableName: TableName.VIDEOS,
      Item: data,
    })
  );
    
  return res.status(200).json(data);
}
