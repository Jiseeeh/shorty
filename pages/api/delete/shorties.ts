import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

/**
 * Deletes all shorties that have the ownerName that was passed in the query.
 */
export default async function deleteShorties(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ownerName } = req.query;

  const deleted = await prisma.shorty.deleteMany({
    where: {
      ownerName: String(ownerName),
    },
  });

  res.json(deleted);
}
