import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key, value } = req.body;

  const createdShorty = await prisma.shorty.create({
    data: {
      key,
      value,
    },
  });

  const shorty = `${process.env.FRONTEND_URL}/${value}`;

  res.json({ id: createdShorty.id, value, shorty });
}
