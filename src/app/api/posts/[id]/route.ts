import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
      const params = await props.params;
      try {
            const post = await prisma.post.findUnique({
                  where: { id: parseInt(params.id) },
                  include: { author: { select: { name: true } } },
            });

            if (!post) {
                  return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }

            return NextResponse.json(post);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch post" },
                  { status: 500 }
            );
      }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
      const params = await props.params;
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const body = await request.json();
            const { title, content, slug, excerpt, image, status } = body;

            const post = await prisma.post.update({
                  where: { id: parseInt(params.id) },
                  data: {
                        title,
                        content,
                        slug,
                        excerpt,
                        image,
                        status,
                  },
            });

            return NextResponse.json(post);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to update post" },
                  { status: 500 }
            );
      }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
      const params = await props.params;
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            await prisma.post.delete({
                  where: { id: parseInt(params.id) },
            });

            return NextResponse.json({ message: "Post deleted" });
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to delete post" },
                  { status: 500 }
            );
      }
}
