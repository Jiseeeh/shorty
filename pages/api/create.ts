import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key, value, userId } = req.body;
  const shorty = `${process.env.FRONTEND_URL}/${value}`;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  const createdShorty = await prisma.shorty.create({
    data: {
      ownerName: user?.name,
      key,
      value: shorty,
    },
  });

  res.json({ id: createdShorty.id, key, value: shorty });
}
