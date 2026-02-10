
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
            const jobs = await prisma.jobOpening.findMany({
                  orderBy: {
                        createdAt: 'desc'
                  },
                  include: {
                        _count: {
                              select: { applications: true }
                        }
                  }
            });

            return NextResponse.json(jobs);
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
      }
}

export async function POST(req: Request) {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { title, location, type, description, salary } = await req.json();

      try {
            const job = await prisma.jobOpening.create({
                  data: {
                        title,
                        location,
                        type,
                        description,
                        salary,
                        active: true,
                  },
            });

            return NextResponse.json(job);
      } catch (error) {
            console.error("Failed to create job:", error);
            return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
      }
}
