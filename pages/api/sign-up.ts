import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";
export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, password } = req.body;

  // check if username is taken.

  const checkUser = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  // if prisma returned a user, it means username is already taken.
  if (checkUser) {
    res.json({ message: "username is taken", success: false });
    return;
  }

  // else , just continue the sign up process.
  const user = await prisma.user.create({
    data: {
      name,
      password,
    },
    select: {
      id: true,
      name: true,
    },
  });

  res.json({ user, success: true });
}
