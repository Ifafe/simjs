
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const partners = await prisma.partnerProfile.findMany({
                  include: {
                        user: {
                              select: {
                                    name: true,
                                    email: true,
                                    image: true,
                                    role: true
                              }
                        }
                  },
                  orderBy: {
                        updatedAt: 'desc'
                  }
            });

            return NextResponse.json(partners);
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
      }
}

export async function POST(req: Request) {
      // Optional: Admin manual creation of partner
      // For now, let's just stick to GET
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
