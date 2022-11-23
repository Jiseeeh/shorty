import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

/**
 * It takes in a user id, finds the user in the database, and returns the user's shorties
 */
export default async function shorties(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const userShorties = await prisma.user.findFirst({
    where: { id: String(id) },
    select: { shorties: true },
  });

  res.json(userShorties);
}
