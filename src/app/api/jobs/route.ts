import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET: List active jobs
export async function GET(request: Request) {
      try {
            const { searchParams } = new URL(request.url);
            const limit = searchParams.get("limit");

            const jobs = await prisma.jobOpening.findMany({
                  where: { active: true },
                  orderBy: { createdAt: "desc" },
                  take: limit ? parseInt(limit) : undefined,
                  include: {
                        partner: {
                              select: { companyName: true, sector: true },
                        },
                  },
            });

            return NextResponse.json(jobs);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch jobs" },
                  { status: 500 }
            );
      }
}

// POST: Create a new job (Admin or Partner)
export async function POST(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || !["ADMIN", "PARTNER"].includes(session.user?.role as string)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const body = await request.json();
            const { title, location, type, description, salary } = body;

            // If partner, link to their profile
            let partnerId = null;
            if (session.user.role === "PARTNER") {
                  const partnerProfile = await prisma.partnerProfile.findUnique({
                        where: { userId: session.user.id },
                  });
                  if (!partnerProfile) {
                        return NextResponse.json(
                              { error: "Partner profile not found" },
                              { status: 404 }
                        );
                  }
                  partnerId = partnerProfile.id;
            }

            const job = await prisma.jobOpening.create({
                  data: {
                        title,
                        location,
                        type,
                        description,
                        salary,
                        partnerId,
                  },
            });

            return NextResponse.json(job, { status: 201 });
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to create job" },
                  { status: 500 }
            );
      }
}
