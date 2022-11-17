import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      name,
      password,
    },
    select: {
      id: true,
      name: true,
      shorties: true,
    },
  });

  if (user) {
    res.json({ user, success: true });
    return;
  }
  res.json({ success: false });
}
