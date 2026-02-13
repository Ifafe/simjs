import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET: List pages
export async function GET() {
      try {
            const pages = await prisma.page.findMany({
                  orderBy: { updatedAt: "desc" },
            });

            return NextResponse.json(pages);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch pages" },
                  { status: 500 }
            );
      }
}

// POST: Create a new page
export async function POST(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const body = await request.json();
            const { title, content, slug, status } = body;

            const page = await prisma.page.create({
                  data: {
                        title,
                        content,
                        slug,
                        status: status || "DRAFT",
                  },
            });

            return NextResponse.json(page, { status: 201 });
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to create page" },
                  { status: 500 }
            );
      }
}
