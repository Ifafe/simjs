import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getRecentPosts() {
      try {
            const posts = await prisma.post.findMany({
                  where: { status: "PUBLISHED" },
                  orderBy: { createdAt: "desc" },
                  take: 3,
                  include: { author: { select: { name: true } } },
            });
            return posts;
      } catch (error) {
            console.error("Failed to fetch recent posts:", error);
            return [];
      }
}

export default async function NewsPortal() {
      const posts = await getRecentPosts();

      if (posts.length === 0) return null;

      return (
            <section className="news-portal" style={{ padding: "80px 0", background: "var(--bg-secondary)" }}>
                  <div className="container">
                        <div className="section-header" style={{ marginBottom: "50px", textAlign: "center" }}>
                              <span className="section-tag" style={{ color: "var(--primary)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>
                                    Blog & Novidades
                              </span>
                              <h2 style={{ fontSize: "2.5rem", marginTop: "10px" }}>
                                    <span>Últimas do</span> <span className="text-gradient">SimJS</span>
                              </h2>
                        </div>

                        <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                              {posts.map((post) => (
                                    <article key={post.id} className="news-card" style={{ background: "var(--bg-card)", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", transition: "transform 0.3s ease" }}>
                                          <div className="news-image" style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                                                {post.image ? (
                                                      <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                      />
                                                ) : (
                                                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg, #1f2937, #111827)" }}>
                                                            <i className="fas fa-newspaper" style={{ fontSize: "3rem", color: "#374151" }}></i>
                                                      </div>
                                                )}
                                                <div className="news-date" style={{ position: "absolute", top: "15px", left: "15px", background: "rgba(0,0,0,0.7)", color: "white", padding: "5px 10px", borderRadius: "8px", fontSize: "0.8rem", backdropFilter: "blur(4px)" }}>
                                                      {new Date(post.createdAt).toLocaleDateString()}
                                                </div>
                                          </div>
                                          <div className="news-content" style={{ padding: "25px" }}>
                                                <h3 style={{ fontSize: "1.25rem", marginBottom: "10px", lineHeight: "1.4" }}>
                                                      <Link href={`/blog/${post.slug}`} style={{ color: "white", textDecoration: "none" }} className="hover:text-primary transition-colors">
                                                            {post.title}
                                                      </Link>
                                                </h3>
                                                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                      {post.excerpt || post.content.substring(0, 100).replace(/<[^>]*>?/gm, "") + "..."}
                                                </p>
                                                <Link href={`/blog/${post.slug}`} style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                                      Ler mais <i className="fas fa-arrow-right" style={{ fontSize: "0.8rem" }}></i>
                                                </Link>
                                          </div>
                                    </article>
                              ))}
                        </div>

                        <div style={{ textAlign: "center", marginTop: "50px" }}>
                              <Link href="/blog" className="btn-secondary" style={{ padding: "12px 30px", borderRadius: "30px", border: "1px solid var(--border)", color: "white", textDecoration: "none", transition: "all 0.3s ease" }}>
                                    Ver todas as publicações
                              </Link>
                        </div>
                  </div>
            </section>
      );
}
