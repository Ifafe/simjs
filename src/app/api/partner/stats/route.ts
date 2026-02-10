
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "PARTNER") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            // Get Partner Profile
            // @ts-ignore
            const partner = await prisma.partnerProfile.findUnique({
                  where: { userId: session.user.id },
                  include: {
                        user: true
                  }
            });

            if (!partner) {
                  return NextResponse.json({ error: "Partner profile not found" }, { status: 404 });
            }

            // Mock stats for now as JobOpening is not yet linked to Partner in schema
            // In a real app, we would count prisma.jobOpening.count({ where: { partnerId: partner.id } })

            // For now, let's return the status and mock numbers
            return NextResponse.json({
                  status: partner.status,
                  companyName: partner.companyName || session.user.name,
                  jobsDefault: 0,
                  applicationsDefault: 0
            });

      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch partner stats" }, { status: 500 });
      }
}
