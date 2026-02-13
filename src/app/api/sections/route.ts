import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
      try {
            const settings = await prisma.setting.findMany({
                  where: { group: "SECTIONS" },
            });

            const formattedSettings: any = {};
            settings.forEach((s) => {
                  formattedSettings[s.key] = s.value === "true";
            });

            return NextResponse.json(formattedSettings);
      } catch (error) {
            console.error("Error fetching section settings:", error);
            return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
      }
}

export async function POST(req: Request) {
      try {
            const session = await getServerSession(authOptions);
            if (!session || session.user.role !== "ADMIN") {
                  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const body = await req.json();

            // Upsert each setting
            const updates = Object.keys(body).map((key) => {
                  const val = String(body[key]);
                  return prisma.setting.upsert({
                        where: { key },
                        update: { value: val, group: "SECTIONS" },
                        create: { key, value: val, group: "SECTIONS" },
                  });
            });

            await Promise.all(updates);

            return NextResponse.json({ success: true });
      } catch (error) {
            console.error("Error saving section settings:", error);
            return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
      }
}
