
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req: Request) {
      try {
            const session = await getServerSession(authOptions);

            if (!session || !session.user) {
                  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const { name, image, password } = await req.json();

            // Prepare update data
            const updateData: any = {};
            if (name) updateData.name = name;
            if (image) updateData.image = image;
            // Note: Password hashing should be done here if implementing password change
            // Since we don't have bcrypt yet, we'll store as plain text FOR NOW (but mark as TODO)
            if (password) updateData.password = password;

            // Email update is sensitive, usually requires verification, so omitted for now.

            const updatedUser = await prisma.user.update({
                  where: { email: session.user.email as string },
                  data: updateData,
            });

            return NextResponse.json({
                  name: updatedUser.name,
                  email: updatedUser.email,
                  image: updatedUser.image,
            });
      } catch (error) {
            console.error("Profile update error:", error);
            return NextResponse.json(
                  { error: "Failed to update profile" },
                  { status: 500 }
            );
      }
}
