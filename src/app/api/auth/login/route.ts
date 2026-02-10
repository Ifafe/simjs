import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
      try {
            const { email, password } = await request.json();

            const user = await prisma.user.findUnique({
                  where: { email },
            });

            if (!user || user.password !== password) {
                  return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
            }

            // Return mock token and user data
            return NextResponse.json({
                  token: "mock-jwt-token-" + user.id,
                  user: { id: user.id, name: user.name, email: user.email, role: user.role },
            });
      } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
      }
}
