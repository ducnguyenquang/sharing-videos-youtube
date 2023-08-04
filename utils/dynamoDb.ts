import { RequestMethod } from "@/constants/api";
import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const dynamoDbClient = new DynamoDBClient({});
const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

const params = {
  TableName: "users",
  ExclusiveStartKey: undefined,
  // FilterExpression: "#user_status = :user_status_val",
  // ExpressionAttributeNames: {
  //     "#user_status": "user_status",
  // },
  // ExpressionAttributeValues: { ":user_status_val": 'somestatus' }
};

export let allItems = [];

export const execute = async (tableName, method, data) => {
  let result = undefined
  switch (method) {
    case RequestMethod.GET:
      result = await dynamoDbClient.send(
        new GetItemCommand({
          TableName: tableName,
          Key: data,
          // Key: {
          //   id: { S: request.query.id },
          // },
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
  console.log("setItems ", items);

  allItems.push(...items)
  console.log("allItems ", allItems);

}

export const getAllItems = async (tableName) => {
  params.TableName = tableName;
  params.ExclusiveStartKey = undefined;
  allItems = [];
  const result = await dynamoDbDocClient.send(new ScanCommand(params), async (err, data) => {

    // onScan(err, data, setItems);
    const debug = await onScan(err, data, (items) => {
      console.log("items", items);
      // allItems.push(...items)
      setItems(items)
    });
    console.log("debug", debug);

    return debug;
    // allItems.push(...debug)
  });
  console.log("result", result);
  console.log("allItems", allItems);
  console.log("result", result);

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
