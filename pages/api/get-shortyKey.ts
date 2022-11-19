import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function getShortyKey(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortyValue } = req.query;

  try {
    const shorty = await prisma.shorty.findFirstOrThrow({
      where: {
        value: {
          contains: String(shortyValue),
        },
      },
    });

    res.json({ shorty, success: true });
  } catch (error) {
    res.json({ error, success: false });
  }
}
