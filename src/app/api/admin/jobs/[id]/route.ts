
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
      request: Request,
      { params }: { params: Promise<{ id: string }> }
) {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { id } = await params;
      const { title, location, type, description, salary, active } = await request.json();

      try {
            const updatedJob = await prisma.jobOpening.update({
                  where: { id: parseInt(id) },
                  data: {
                        title: title || undefined,
                        location: location || undefined,
                        type: type || undefined,
                        description: description || undefined,
                        salary: salary || undefined,
                        active: active !== undefined ? active : undefined,
                  },
            });

            return NextResponse.json(updatedJob);
      } catch (error) {
            return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
      }
}

export async function DELETE(
      request: Request,
      { params }: { params: Promise<{ id: string }> }
) {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { id } = await params;

      try {
            await prisma.jobOpening.delete({
                  where: { id: parseInt(id) },
            });

            return NextResponse.json({ message: "Job deleted" });
      } catch (error) {
            return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
      }
}
