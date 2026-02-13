import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const activities = await prisma.activity.findMany({
                  where: { userId: session.user.id },
                  orderBy: { createdAt: "desc" },
                  take: 5,
            });

            return NextResponse.json(activities);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch activities" },
                  { status: 500 }
            );
      }
}
