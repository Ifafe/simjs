import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
      try {
            const settings = await prisma.setting.findMany({
                  where: { group: "THEME" },
            });

            const formatted: any = {};
            settings.forEach((s) => {
                  formatted[s.key] = s.value;
            });

            return NextResponse.json(formatted);
      } catch {
            return NextResponse.json({ error: "Failed to fetch theme settings" }, { status: 500 });
      }
}

export async function POST(req: Request) {
      try {
            const body = await req.json();

            // Upsert each theme setting
            const updates = Object.keys(body).map((key) => {
                  return prisma.setting.upsert({
                        where: { key },
                        update: { value: body[key], group: "THEME" },
                        create: { key, value: body[key], group: "THEME" },
                  });
            });

            await Promise.all(updates);

            return NextResponse.json({ success: true });
      } catch {
            return NextResponse.json({ error: "Failed to save theme settings" }, { status: 500 });
      }
}
