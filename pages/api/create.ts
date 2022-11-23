import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

/**
 * Creates a new shorty of the currently logged in user in the database and returns the id, key,
 * and value of the newly created shorty.
 */
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
