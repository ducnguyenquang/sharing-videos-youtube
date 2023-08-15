import { NextApiRequest, NextApiResponse } from "next";
import type { ResponseError } from "@/interfaces/error";
import { dynamoDbClient, execute } from "@/utils/dynamoDb";
import { TableName } from "@/constants/tables";
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import {
  generateToken,
  comparePassword,
  generateHashPassword,
} from "@/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string } | ResponseError>
) {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const { Item: user } = await dynamoDbClient.send(
    new GetItemCommand({
      TableName: TableName.USERS,
      Key: {
        email: { S: email },
      },
    })
  );

  if (!user || email !== user.email.S) {
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
  } else {
    if (!(await comparePassword(password, user.password.S))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }

  const token = generateToken({ email });

  return res.status(200).json({ token });
}
