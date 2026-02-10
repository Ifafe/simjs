
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
            const [usersCount, partnersCount, applicationsCount] = await Promise.all([
                  prisma.user.count(),
                  prisma.partnerProfile.count({ where: { status: "ACTIVE" } }),
                  // Assuming applications are connected to JobOpening, counting total applications
                  // If Application model exists, count it. Otherwise, count jobs or something else.
                  // Checking schema previously: Yes, Application model exists.
                  prisma.application.count()
            ]);

            return NextResponse.json({
                  users: usersCount,
                  partners: partnersCount,
                  applications: applicationsCount,
                  serverStatus: "Online" // This could be dynamic based on health check, but "Online" is fine for now
            });
      } catch (error) {
            console.error("Stats fetch error:", error);
            return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
      }
}
