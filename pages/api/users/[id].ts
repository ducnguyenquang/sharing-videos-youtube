import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/interfaces/user";
import type { ResponseError } from "@/interfaces/error";
import { dynamoDbClient } from "@/utils/dynamoDb";
import { TableName } from "@/constants/tables";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const {Item: user} = await dynamoDbClient.send(
    new GetItemCommand({
      TableName: TableName.USERS,
      Key: {
        id: { S: req.query.id as string },
      },
    })
  );

  return user
    ? res.status(200).json({ email: user?.email})
    : res.status(404).json({ message: `User with id: ${id} not found.` });
}
