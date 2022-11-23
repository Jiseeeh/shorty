import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

/**
 * Deletes a shorty from the database
 */
export default async function deleteShorty(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortyId } = req.query;

  await prisma.shorty.delete({
    where: {
      id: String(shortyId),
    },
  });

  res.json({ success: true });
}
