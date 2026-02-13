import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
      try {
            const contact = await prisma.contactInfo.findFirst();
            return NextResponse.json(contact || { email: "", phone: "", address: "", hours: "" });
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch contact info" }, { status: 500 });
      }
}

export async function PUT(req: Request) {
      try {
            const session = await getServerSession(authOptions);
            if (!session || session.user.role !== "ADMIN") {
                  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const data = await req.json();

            // Upsert to ensure we always have one record (id: 1)
            const contact = await prisma.contactInfo.upsert({
                  where: { id: 1 },
                  update: {
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        hours: data.hours,
                  },
                  create: {
                        id: 1,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        hours: data.hours,
                  },
            });

            return NextResponse.json(contact);
      } catch (error) {
            return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 });
      }
}
