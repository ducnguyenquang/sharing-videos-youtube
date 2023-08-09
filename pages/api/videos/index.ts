import { NextApiResponse, NextApiRequest } from "next";
import { Video } from "@/interfaces/video";
import { dynamoDbClient } from "@/utils/dynamoDb";
import { TableName } from "@/constants/tables";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Video[]>
) {
  const tableName = TableName.VIDEOS;
  const params = {
    TableName: TableName.VIDEOS,
    ExclusiveStartKey: undefined,
  };
  const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

  const getAllItems = async (tableName) => {
    params.TableName = tableName;
    params.ExclusiveStartKey = undefined;

    const { Items: videos } = await dynamoDbDocClient.send(
      new ScanCommand(params)
    );
    return videos;
  };

  const videos = await getAllItems(tableName).then((data) => data);

  return res.status(200).json(videos);
}
