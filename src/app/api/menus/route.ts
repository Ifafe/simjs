import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
      try {
            const menuItems = await prisma.menuItem.findMany({
                  orderBy: { order: "asc" },
            });
            return NextResponse.json(menuItems);
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
      }
}

export async function POST(req: Request) {
      try {
            const body = await req.json();
            const { label, url, order } = body;

            if (!label || !url) {
                  return NextResponse.json({ error: "Label and URL are required" }, { status: 400 });
            }

            const menuItem = await prisma.menuItem.create({
                  data: {
                        label,
                        url,
                        order: parseInt(order) || 0,
                  },
            });

            return NextResponse.json(menuItem);
      } catch (error) {
            return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
      }
}

export async function DELETE(req: Request) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }

      try {
            await prisma.menuItem.delete({
                  where: { id: parseInt(id) },
            });
            return NextResponse.json({ success: true });
      } catch (error) {
            return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
      }
}
