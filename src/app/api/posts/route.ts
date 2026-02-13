import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET: List posts
export async function GET(request: Request) {
      try {
            const { searchParams } = new URL(request.url);
            const limit = searchParams.get("limit");
            const status = searchParams.get("status");

            const where = status ? { status } : {};

            const posts = await prisma.post.findMany({
                  where,
                  orderBy: { createdAt: "desc" },
                  take: limit ? parseInt(limit) : undefined,
                  include: {
                        author: {
                              select: { name: true, image: true },
                        },
                  },
            });

            return NextResponse.json(posts);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch posts" },
                  { status: 500 }
            );
      }
}

// POST: Create a new post
export async function POST(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const body = await request.json();
            const { title, content, slug, excerpt, image, status } = body;

            const post = await prisma.post.create({
                  data: {
                        title,
                        content,
                        slug,
                        excerpt,
                        image,
                        status: status || "DRAFT",
                        authorId: session.user.id,
                  },
            });

            return NextResponse.json(post, { status: 201 });
      } catch (error) {
            console.error(error);
            return NextResponse.json(
                  { error: "Failed to create post" },
                  { status: 500 }
            );
      }
}
