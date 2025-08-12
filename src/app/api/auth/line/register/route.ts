import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  lineId: z.string(),
  name: z.string(),
  // avatarUrl: z.string().optional(),
  phone: z.string(),
  address: z.string(),
});

export async function POST(req: NextRequest) {
  console.log("あいうえお");

  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { lineId, name, phone, address } = parsed.data;

  const user = await prisma.user.create({
    data: { lineId, name, phone, address },
  });

  const response = NextResponse.json({ ok: true });

  response.cookies.set("user_id", user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
