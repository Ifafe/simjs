
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
            // @ts-ignore
            const user = await prisma.user.findUnique({
                  where: { id: session.user.id },
                  include: {
                        partnerProfile: true
                  }
            });

            if (!user || !user.partnerProfile) {
                  return NextResponse.json({ error: "Partner profile not found" }, { status: 404 });
            }

            return NextResponse.json({
                  name: user.name,
                  email: user.email,
                  image: user.image,
                  companyName: user.partnerProfile.companyName,
                  sector: user.partnerProfile.sector,
                  bio: user.partnerProfile.bio,
                  status: user.partnerProfile.status
            });

      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
      }
}

export async function PATCH(req: Request) {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "PARTNER") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { name, image, companyName, sector, bio } = await req.json();

      try {
            // Update User
            // @ts-ignore
            await prisma.user.update({
                  where: { id: session.user.id },
                  data: {
                        name: name || undefined,
                        image: image || undefined,
                  }
            });

            // Update Partner Profile
            // @ts-ignore
            await prisma.partnerProfile.update({
                  where: { userId: session.user.id },
                  data: {
                        companyName: companyName || undefined,
                        sector: sector || undefined,
                        bio: bio || undefined
                  }
            });

            return NextResponse.json({ message: "Profile updated successfully" });

      } catch (error) {
            console.error("Partner update error:", error);
            return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
      }
}
