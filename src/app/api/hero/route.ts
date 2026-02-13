import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
      try {
            const hero = await prisma.heroSection.findFirst();
            return NextResponse.json(hero || { title: "", subtitle: "", highlight: "", ctaText: "", ctaLink: "" });
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch hero section" }, { status: 500 });
      }
}

export async function PUT(req: Request) {
      try {
            const session = await getServerSession(authOptions);
            if (!session || session.user.role !== "ADMIN") {
                  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const data = await req.json();

            // Upsert to ensure we always have one record (id: 1)
            const hero = await prisma.heroSection.upsert({
                  where: { id: 1 },
                  update: {
                        title: data.title,
                        subtitle: data.subtitle,
                        highlight: data.highlight,
                        ctaText: data.ctaText,
                        ctaLink: data.ctaLink,
                  },
                  create: {
                        id: 1,
                        title: data.title,
                        subtitle: data.subtitle,
                        highlight: data.highlight,
                        ctaText: data.ctaText,
                        ctaLink: data.ctaLink,
                  },
            });

            return NextResponse.json(hero);
      } catch (error) {
            return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
      }
}
