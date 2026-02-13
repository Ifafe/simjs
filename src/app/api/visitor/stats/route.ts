import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
      try {
            const membersCount = await prisma.user.count({
                  where: { role: { not: "ADMIN" } }, // Count all non-admin users as community members
            });

            const eventsCount = 3; // Placeholder for now as Event model is not fully integrated/populated

            const partnershipsCount = await prisma.partnerProfile.count({
                  where: { status: "ACTIVE" },
            });

            return NextResponse.json({
                  members: membersCount,
                  events: eventsCount,
                  partnerships: partnershipsCount,
            });
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch visitor stats" },
                  { status: 500 }
            );
      }
}
