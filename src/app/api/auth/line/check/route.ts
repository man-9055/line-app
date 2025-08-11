import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bodySchema = z.object({
  idToken: z.string(),
  profile: z.object({
    userId: z.string(),
    displayName: z.string(),
    pictureUrl: z.string().optional(),
  }),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { profile } = parsed.data;

  // 本来はここで LINE Verify API で idToken 検証
  const exists = !!(await prisma.user.findUnique({
    where: { lineId: profile.userId },
  }));

  return NextResponse.json({ exists });
}
