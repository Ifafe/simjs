import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const users = await prisma.user.findMany({
                  orderBy: { createdAt: "desc" },
                  include: {
                        partnerProfile: {
                              select: {
                                    status: true,
                                    companyName: true
                              }
                        }
                  }
            });

            return NextResponse.json(users);
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
      }
}
