import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

/**
 * It checks if the username is taken, if it is, it returns a message saying so. If it isn't, it
 * creates a new user.
 * @returns The user object is being returned.
 */
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
