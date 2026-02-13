import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getPage(slug: string) {
      try {
            const page = await prisma.page.findUnique({
                  where: { slug },
            });
            return page;
      } catch (error) {
            console.error("Failed to fetch page:", error);
            return null;
      }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
      const params = await props.params;
      const page = await getPage(params.slug);
      if (!page) return { title: "Página não encontrada" };

      return {
            title: `${page.title} | SimJS`,
            description: page.content.substring(0, 160).replace(/<[^>]*>?/gm, ""),
      };
}

export default async function DynamicPage(props: { params: Promise<{ slug: string }> }) {
      const params = await props.params;
      // Ignorar rotas reservadas que já existem
      const reservedRoutes = ["admin", "login", "register", "blog", "auth", "api"];
      if (reservedRoutes.includes(params.slug)) {
            notFound();
      }

      const page = await getPage(params.slug);

      if (!page || page.status !== "PUBLISHED") {
            notFound();
      }

      return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                  <header className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                              {page.title}
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                  </header>

                  <div className="prose prose-lg prose-invert mx-auto max-w-none bg-card-bg p-8 rounded-3xl border border-white/5 shadow-xl">
                        <div dangerouslySetInnerHTML={{ __html: page.content }} />
                  </div>

                  <div className="mt-12 text-center text-sm text-gray-500">
                        Atualizado em {new Date(page.updatedAt).toLocaleDateString()}
                  </div>
            </div>
      );
}
