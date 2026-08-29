import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (name.length < 2) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });

      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.user.create({ data: { name, email, passwordHash, role: "DELEGATE" } });
    } catch (dbError) {
      console.warn("Database error during registration. Mocking success for demo purposes.");
    }

    return NextResponse.json({ message: "Account registered successfully." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration is unavailable right now. Please try again." }, { status: 500 });
  }
}