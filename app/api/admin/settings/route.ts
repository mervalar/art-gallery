export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const session = await getAdminUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, email, currentPassword, newPassword } = await req.json();

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (email && email !== user.email) {
    const taken = await prisma.user.findUnique({ where: { email } });
    if (taken) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  let passwordHash = user.password;
  if (newPassword) {
    if (!currentPassword) return NextResponse.json({ error: "Current password is required" }, { status: 400 });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    passwordHash = await bcrypt.hash(newPassword, 12);
  }

  const updated = await prisma.user.update({
    where: { id: session.userId },
    data: { name: name || user.name, email: email || user.email, password: passwordHash },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json(updated);
}
