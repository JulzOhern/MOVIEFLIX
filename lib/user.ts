import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const getUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: userId as string,
    },
  });

  return user;
};
