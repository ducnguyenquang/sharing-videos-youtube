import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/interfaces/user";
import type { ResponseError } from "@/interfaces/error";
import { dynamoDbClient, execute } from "@/utils/dynamoDb";
import { TableName } from "@/constants/tables";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { generateHashPassword } from "@/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  const {
    body: { email, password },
  } = req;
  const hashPassword = await generateHashPassword(password);

  await dynamoDbClient.send(
    new PutItemCommand({
      TableName: TableName.USERS,
      Item: {
        email: { S: email },
        password: { S: hashPassword },
      },
    })
  );

  return res.status(200).json({ email });
}
