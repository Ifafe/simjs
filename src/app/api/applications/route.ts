import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET: List user's applications
export async function GET(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const applications = await prisma.application.findMany({
                  where: { userId: session.user.id },
                  include: {
                        job: {
                              select: { title: true, location: true },
                        },
                  },
                  orderBy: { createdAt: "desc" },
            });

            return NextResponse.json(applications);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch applications" },
                  { status: 500 }
            );
      }
}

// POST: Apply for a job (Job Seeker)
export async function POST(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const body = await request.json();
            const { jobId } = body;

            // Check if already applied
            const existingApplication = await prisma.application.findFirst({
                  where: {
                        userId: session.user.id,
                        jobId: parseInt(jobId),
                  },
            });

            if (existingApplication) {
                  return NextResponse.json(
                        { error: "Already applied to this job" },
                        { status: 400 }
                  );
            }

            const application = await prisma.application.create({
                  data: {
                        userId: session.user.id,
                        jobId: parseInt(jobId),
                        status: "SUBMITTED",
                  },
            });

            return NextResponse.json(application, { status: 201 });
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to apply for job" },
                  { status: 500 }
            );
      }
}
