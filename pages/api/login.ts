import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

/**
 * It takes a name and password from the request body, checks if the user exists in the database, and
 * if so, returns the user object.
 * @returns The user object with the id, name, and shorties.
 */
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
