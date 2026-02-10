
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
      request: Request,
      { params }: { params: Promise<{ id: string }> } // Updated for Next.js 15+
) {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { id } = await params;
      const { status, companyName, sector, bio } = await request.json();

      try {
            // Update Partner Profile
            const updatedProfile = await prisma.partnerProfile.update({
                  where: { id: parseInt(id) },
                  data: {
                        status: status || undefined,
                        companyName: companyName || undefined,
                        sector: sector || undefined,
                        bio: bio || undefined
                  },
            });

            // If status changes to ACTIVE, update User role to PARTNER
            if (status === "ACTIVE") {
                  await prisma.user.update({
                        where: { id: updatedProfile.userId },
                        data: { role: "PARTNER" }
                  });
            }
            // If status changes to INACTIVE/PENDING, maybe revert role to VISITOR?
            // Let's decide: If INACTIVE, role becomes VISITOR
            if (status === "INACTIVE" || status === "PENDING") {
                  await prisma.user.update({
                        where: { id: updatedProfile.userId },
                        data: { role: "VISITOR" }
                  });
            }

            return NextResponse.json(updatedProfile);
      } catch (error) {
            console.error("Partner update error:", error);
            return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
      }
}
