import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const userId = (await cookies()).get("user_id")?.value;
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function setUserSession(userId: string) {
  try {
    (await cookies()).set("user_id", userId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  } catch (err) {
    console.error("Error in setUserSession: ", err);
  }
}

export async function clearUserSession() {
  (await cookies()).delete("user_id");
}
