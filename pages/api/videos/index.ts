import { NextApiResponse, NextApiRequest } from "next";
import { Video } from "@/interfaces/video";
import { 
  // getAllItems, 
  dynamoDbClient } from "@/utils/dynamoDb";
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
  const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

  const getAllItems = async (tableName) => {
    params.TableName = tableName;
    params.ExclusiveStartKey = undefined;
    

    const result = await dynamoDbDocClient.send(new ScanCommand(params), onScan);
    console.log("result", result);
    console.log("allItems", allItems);
    console.log("result", result);
  
    return allItems;
  };
  
  const onScan = async (err, data) => {
    if (err) {
      console.error(
        "Unable to scan the table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Scan succeeded.");
      // callBack(data.Items);
      allItems.push(...data.Items)
      // continue scanning if we have more items
      if (typeof data.LastEvaluatedKey != "undefined") {
        console.log("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        await dynamoDbDocClient.send(new ScanCommand(params), onScan);
      }
      return data.Items;
    }
  };

  const videos = getAllItems(tableName);
  console.log('allItems 11', allItems);
   
  return res.status(200).json(allItems);

  // return res.status(200).json(videos);
}
