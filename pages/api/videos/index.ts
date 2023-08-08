import { NextApiResponse, NextApiRequest } from "next";
import { Video } from "@/interfaces/video";
import {
  dynamoDbClient,
} from "@/utils/dynamoDb";
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
  const allItems = [];

  const setAllItems = (data) => {
    allItems.push(...data);
  };
  const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

  const getAllItems = async (tableName) => {
    params.TableName = tableName;
    params.ExclusiveStartKey = undefined;
    const allItems = [];

    await dynamoDbDocClient.send(
      new ScanCommand(params),
      async (err, data) => await onScan(err, data, allItems)
    );
    console.log("allItems", allItems);
    return allItems;
  };

  const onScan = (err, data, allItems) => {
    if (err) {
      console.error(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      return;
    }

    console.log("Scan succeeded.");
    allItems.push(...data.Items);
    console.log("allItems 2", allItems);

    // continue scanning if we have more items
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      dynamoDbDocClient.send(
        new ScanCommand(params),
        async (err, data) => await onScan(err, data, allItems)
      );
    }

    return allItems;
  };

  const videos = await getAllItems(tableName).then(data => data);

  return res.status(200).json(videos);
}
