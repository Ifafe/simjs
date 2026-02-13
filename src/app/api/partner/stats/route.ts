import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "PARTNER") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const partnerProfile = await prisma.partnerProfile.findFirst({
                  where: { userId: session.user.id }
            });

            if (!partnerProfile) {
                  return NextResponse.json(
                        { error: "Partner profile not found" },
                        { status: 404 }
                  );
            }

            const jobsCount = await prisma.jobOpening.count({
                  where: { partnerId: partnerProfile.id }
            });

            const applicationsCount = await prisma.application.count({
                  where: {
                        job: {
                              partnerId: partnerProfile.id,
                        },
                  },
            });

            return NextResponse.json({
                  companyName: partnerProfile.companyName,
                  status: partnerProfile.status,
                  jobsDefault: jobsCount,
                  applicationsDefault: applicationsCount,
            });
      } catch (error) {
            console.error("Partner Stats Error:", error);
            return NextResponse.json(
                  { error: "Failed to fetch partner stats" },
                  { status: 500 }
            );
      }
}
