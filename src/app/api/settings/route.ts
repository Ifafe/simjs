import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET: List all settings
export async function GET() {
      try {
            const settings = await prisma.setting.findMany();
            // Convert array to object for easier frontend consumption
            const settingsMap = settings.reduce((acc, curr) => {
                  acc[curr.key] = curr.value;
                  return acc;
            }, {} as Record<string, string>);

            return NextResponse.json(settingsMap);
      } catch (error) {
            return NextResponse.json(
                  { error: "Failed to fetch settings" },
                  { status: 500 }
            );
      }
}

// POST: Update settings (Bulk update)
export async function POST(request: Request) {
      const session = await getServerSession(authOptions);

      if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
            const body = await request.json();
            // Body should be an object like { "site_name": "My Site", "contact_email": "..." }

            const updates = Object.entries(body).map(([key, value]) => {
                  return prisma.setting.upsert({
                        where: { key },
                        update: { value: String(value) },
                        create: { key, value: String(value), group: "GENERAL" },
                  });
            });

            await prisma.$transaction(updates);

            return NextResponse.json({ message: "Settings updated" });
      } catch (error) {
            console.error(error);
            return NextResponse.json(
                  { error: "Failed to update settings" },
                  { status: 500 }
            );
      }
}
