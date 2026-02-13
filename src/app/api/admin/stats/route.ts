
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
            const [usersCount, partnersCount, applicationsCount, pagesCount, postsCount, mediaCount] = await Promise.all([
                  prisma.user.count(),
                  prisma.partnerProfile.count({ where: { status: "ACTIVE" } }),
                  prisma.application.count(),
                  prisma.page.count(),
                  prisma.post.count(),
                  // If Media model exists, count it. Otherwise 0 for now until model added.
                  // @ts-ignore
                  prisma.media ? prisma.media.count() : Promise.resolve(0)
            ]);

            return NextResponse.json({
                  users: usersCount,
                  partners: partnersCount,
                  applications: applicationsCount,
                  pages: pagesCount,
                  posts: postsCount,
                  media: mediaCount,
                  serverStatus: "Online"
            });
      } catch (error) {
            console.error("Stats fetch error:", error);
            return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
      }
}
