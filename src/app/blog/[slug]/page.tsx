import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getPost(slug: string) {
      try {
            const post = await prisma.post.findUnique({
                  where: { slug },
                  include: { author: { select: { name: true, image: true, bio: true } } },
            });
            return post;
      } catch (error) {
            console.error("Failed to fetch post:", error);
            return null;
      }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
      const params = await props.params;
      const post = await getPost(params.slug);
      if (!post) return { title: "Post não encontrado" };

      return {
            title: `${post.title} | SimJS Blog`,
            description: post.excerpt || post.content.substring(0, 160),
            openGraph: {
                  images: post.image ? [post.image] : [],
            },
      };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
      const params = await props.params;
      const post = await getPost(params.slug);

      if (!post || post.status !== "PUBLISHED") {
            notFound();
      }

      return (
            <article className="container mx-auto px-4 py-12 max-w-4xl">
                  <Link href="/blog" className="inline-flex items-center text-primary mb-8 hover:underline">
                        <i className="fas fa-arrow-left mr-2"></i> Voltar para o Blog
                  </Link>

                  <header className="mb-10 text-center">
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-4">
                              <span className="bg-white/10 px-3 py-1 rounded-full">News</span>
                              <span>•</span>
                              <span>{new Date(post.createdAt).toLocaleDateString("pt-BR", { dateStyle: "long" })}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                              {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-3">
                              {post.author?.image ? (
                                    <img src={post.author.image ?? undefined} alt={post.author.name || "Autor"} className="w-12 h-12 rounded-full border-2 border-primary" />
                              ) : (
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/50">
                                          <i className="fas fa-user"></i>
                                    </div>
                              )}
                              <div className="text-left">
                                    <p className="text-white font-medium">{post.author?.name || "Redação SimJS"}</p>
                                    <p className="text-xs text-gray-400">Autor</p>
                              </div>
                        </div>
                  </header>

                  {post.image && (
                        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video relative">
                              <img src={post.image ?? undefined} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                  )}

                  <div className="prose prose-lg prose-invert mx-auto max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  <div className="mt-16 pt-8 border-t border-white/10">
                        <h3 className="text-2xl font-bold mb-6 text-white">Compartilhe este artigo</h3>
                        <div className="flex gap-4">
                              <button className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                                    <i className="fab fa-facebook-f"></i>
                              </button>
                              <button className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                                    <i className="fab fa-twitter"></i>
                              </button>
                              <button className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                                    <i className="fab fa-linkedin-in"></i>
                              </button>
                              <button className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform">
                                    <i className="fab fa-whatsapp"></i>
                              </button>
                        </div>
                  </div>
            </article>
      );
}
