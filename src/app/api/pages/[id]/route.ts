import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request, { params }: { params: { id: string } }) {
      try {
            const page = await prisma.page.findUnique({
                  where: { id: parseInt(params.id) },
            });

            if (!page) {
                  return NextResponse.json({ error: "Page not found" }, { status: 404 });
            }

            return NextResponse.json(page);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch page" },
                  { status: 500 }
            );
      }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const body = await request.json();
            const { title, content, slug, status } = body;

            const page = await prisma.page.update({
                  where: { id: parseInt(params.id) },
                  data: {
                        title,
                        content,
                        slug,
                        status,
                  },
            });

            return NextResponse.json(page);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to update page" },
                  { status: 500 }
            );
      }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            await prisma.page.delete({
                  where: { id: parseInt(params.id) },
            });

            return NextResponse.json({ message: "Page deleted" });
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to delete page" },
                  { status: 500 }
            );
      }
}
