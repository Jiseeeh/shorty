import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function resetPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { oldUsername, newPassword, domainName } = req.body;

  // check user if exists
  const user = await prisma.user.findFirst({
    where: {
      name: oldUsername,
    },
  });

  if (user === null) res.json({ message: "No user found!", success: false });

  // check user's shorty
  const userShorties = await prisma.shorty.findMany({
    where: {
      ownerName: oldUsername,
    },
  });

  if (userShorties === null)
    res.json({ message: "You do not have any shorties!", success: false });

  if (userShorties.some((shorty) => shorty.key.includes(domainName))) {
    await prisma.user.update({
      where: {
        name: oldUsername,
      },
      data: {
        password: newPassword,
      },
    });

    res.json({ message: "Reset success!", success: true });
  } else
    res.json({
      message: "Domain not found among your shorties.",
      success: false,
    });
}
