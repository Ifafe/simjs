import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
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
      const { role } = await request.json();

      try {
            // If promoting to PARTNER, also activate PartnerProfile if it exists
            const updateData: any = { role };

            if (role === "PARTNER") {
                  // Check if partner profile exists, if so update status
                  const partnerProfile = await prisma.partnerProfile.findUnique({
                        where: { userId: id }
                  });

                  if (partnerProfile) {
                        await prisma.partnerProfile.update({
                              where: { userId: id },
                              data: { status: "ACTIVE" }
                        });
                  }
            }

            const updatedUser = await prisma.user.update({
                  where: { id },
                  data: updateData,
            });

            return NextResponse.json(updatedUser);
      } catch (error) {
            return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
      }
}
