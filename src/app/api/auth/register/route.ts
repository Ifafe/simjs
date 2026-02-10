import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
      try {
            const { name, email, password, role } = await request.json();

            if (!email || !password) {
                  return NextResponse.json({ error: "Email e senha obrigatórios." }, { status: 400 });
            }

            const existingUser = await prisma.user.findUnique({
                  where: { email },
            });

            if (existingUser) {
                  return NextResponse.json({ error: "Email já existe." }, { status: 400 });
            }

            let userRole = role || "VISITOR";
            let partnerData = undefined;

            // Security: Partners start as VISITOR until approved
            if (userRole === "PARTNER") {
                  userRole = "VISITOR";
                  partnerData = {
                        create: {
                              companyName: name || "Nova Parceria",
                              sector: "Geral",
                              status: "PENDING"
                        }
                  };
            }

            const user = await prisma.user.create({
                  data: {
                        name: name || "Utilizador",
                        email,
                        password, // TODO: Hash this password in production!
                        role: userRole,
                        partnerProfile: partnerData
                  },
            });

            return NextResponse.json({
                  message: "Conta criada!",
                  user: { id: user.id, email: user.email, role: user.role },
            });
      } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
      }
}
