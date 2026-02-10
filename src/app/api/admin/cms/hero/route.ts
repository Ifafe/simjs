
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
      try {
            let hero = await prisma.heroSection.findUnique({
                  where: { id: 1 }
            });

            if (!hero) {
                  // Create default if not exists
                  hero = await prisma.heroSection.create({
                        data: {
                              title: "Inovação e Tecnologia",
                              highlight: "Simjs Global",
                              subtitle: "Transformamos ideias em realidade digital.",
                              ctaText: "Saiba Mais",
                              ctaLink: "/about"
                        }
                  });
            }

            return NextResponse.json(hero);
      } catch (error) {
            return NextResponse.json({ error: "Failed to fetch hero section" }, { status: 500 });
      }
}

export async function PATCH(req: Request) {
      const session = await getServerSession(authOptions);

      // @ts-ignore
      if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const data = await req.json();

      try {
            const updatedHero = await prisma.heroSection.upsert({
                  where: { id: 1 },
                  update: {
                        title: data.title,
                        highlight: data.highlight,
                        subtitle: data.subtitle,
                        ctaText: data.ctaText,
                        ctaLink: data.ctaLink
                  },
                  create: {
                        title: data.title || "Título",
                        highlight: data.highlight || "Destaque",
                        subtitle: data.subtitle || "Subtítulo",
                        ctaText: data.ctaText || "Botão",
                        ctaLink: data.ctaLink || "#"
                  }
            });

            // Log activity
            // @ts-ignore
            await prisma.activity.create({
                  data: {
                        userId: session.user.id,
                        type: "UPDATE_CMS",
                        content: "Atualizou a Hero Section"
                  }
            });

            return NextResponse.json(updatedHero);
      } catch (error) {
            return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
      }
}
