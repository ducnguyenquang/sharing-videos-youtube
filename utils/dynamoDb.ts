import { RequestMethod } from "@/constants/api";
import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const dynamoDbClient = new DynamoDBClient({});
const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

const params = {
  TableName: "users",
  ExclusiveStartKey: undefined,
};

export let allItems = [];

export const execute = async (tableName, method, data) => {
  let result = undefined;
  switch (method) {
    case RequestMethod.GET:
      result = await dynamoDbClient.send(
        new GetItemCommand({
          TableName: tableName,
          Key: data,
        })
      );
      break;
    case RequestMethod.PUT:
      result = await dynamoDbClient.send(
        new PutItemCommand({
          TableName: tableName,
          Item: data,
        })
      );
    default:
      break;
  }

  return result.Item;
};

const setItems = (items) => {
  allItems.push(...items);
};

export const getAllItems = async (tableName) => {
  params.TableName = tableName;
  params.ExclusiveStartKey = undefined;
  allItems = [];
  const result = await dynamoDbDocClient.send(
    new ScanCommand(params),
    async (err, data) => {
      const debug = await onScan(err, data, (items) => {
        setItems(items);
      });
      return debug;
    }
  );

  return allItems;
};

const onScan = async (err, data, callBack) => {
  if (err) {
    console.error(
      "Unable to scan the table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Scan succeeded.");
    callBack(data.Items);
    // continue scanning if we have more items
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      await dynamoDbDocClient.send(new ScanCommand(params), callBack);
    }
    return data.Items;
  }
};
