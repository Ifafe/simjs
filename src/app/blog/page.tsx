import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate every minute

async function getPosts() {
      try {
            const posts = await prisma.post.findMany({
                  where: { status: "PUBLISHED" },
                  orderBy: { createdAt: "desc" },
                  include: { author: { select: { name: true, image: true } } },
            });
            return posts;
      } catch (error) {
            console.error("Failed to fetch posts:", error);
            return [];
      }
}

export default async function BlogPage() {
      const posts = await getPosts();

      return (
            <div className="container mx-auto px-4 py-12">
                  <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                              Blog & Notícias
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                              Acompanhe as últimas novidades, artigos e atualizações do Grupo SIMJS e do ecossistema tecnológico.
                        </p>
                  </div>

                  {posts.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                              <i className="fas fa-newspaper text-6xl text-gray-600 mb-6"></i>
                              <h2 className="text-2xl font-bold text-gray-300">Nenhum post encontrado</h2>
                              <p className="text-gray-500 mt-2">Em breve teremos novidades por aqui.</p>
                        </div>
                  ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {posts.map((post) => (
                                    <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                                          <article className="h-full bg-card-bg border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
                                                <div className="aspect-video w-full bg-gray-800 relative overflow-hidden">
                                                      {post.image ? (
                                                            <img
                                                                  src={post.image ?? undefined}
                                                                  alt={post.title}
                                                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            />
                                                      ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                                                  <i className="fas fa-image text-4xl text-gray-700"></i>
                                                            </div>
                                                      )}
                                                      <div className="absolute top-4 left-4">
                                                            <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                                                                  NOVIDADE
                                                            </span>
                                                      </div>
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col">
                                                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                                            <span><i className="far fa-calendar mr-1"></i> {new Date(post.createdAt).toLocaleDateString()}</span>
                                                            <span>•</span>
                                                            <span>{post.author?.name || "Equipe SIMJS"}</span>
                                                      </div>

                                                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                            {post.title}
                                                      </h2>

                                                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                                                            {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>?/gm, "") + "..."}
                                                      </p>

                                                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm">
                                                            <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                                                                  Ler mais <i className="fas fa-arrow-right ml-2 text-xs"></i>
                                                            </span>
                                                      </div>
                                                </div>
                                          </article>
                                    </Link>
                              ))}
                        </div>
                  )}
            </div>
      );
}
