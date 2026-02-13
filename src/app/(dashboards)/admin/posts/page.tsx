"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
      id: number;
      title: string;
      status: string;
      author: { name: string };
      createdAt: string;
}

export default function AdminPostsPage() {
      const [posts, setPosts] = useState<Post[]>([]);
      const [loading, setLoading] = useState(true);
      const router = useRouter();

      useEffect(() => {
            fetchPosts();
      }, []);

      const fetchPosts = async () => {
            try {
                  const res = await fetch("/api/posts");
                  if (res.ok) {
                        const data = await res.json();
                        setPosts(data);
                  }
            } catch (error) {
                  console.error("Failed to fetch posts", error);
            } finally {
                  setLoading(false);
            }
      };

      const handleDelete = async (id: number) => {
            if (!confirm("Tem certeza que deseja excluir este post?")) return;

            try {
                  const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
                  if (res.ok) {
                        setPosts(posts.filter((post) => post.id !== id));
                  } else {
                        alert("Erro ao excluir post");
                  }
            } catch (error) {
                  console.error(error);
                  alert("Erro ao excluir post");
            }
      };

      if (loading) return <div className="p-8 text-white">Carregando posts...</div>;

      return (
            <div className="content-section active">
                  <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                              <h1>Gerenciar Posts</h1>
                              <p>Blog e Notícias</p>
                        </div>
                        <Link href="/admin/posts/new" className="btn-primary">
                              <i className="fas fa-plus"></i> Novo Post
                        </Link>
                  </div>

                  <div className="admin-card">
                        <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                              <thead>
                                    <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                                          <th style={{ padding: "15px" }}>Título</th>
                                          <th style={{ padding: "15px" }}>Autor</th>
                                          <th style={{ padding: "15px" }}>Status</th>
                                          <th style={{ padding: "15px" }}>Data</th>
                                          <th style={{ padding: "15px", textAlign: "right" }}>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {posts.length === 0 ? (
                                          <tr>
                                                <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>
                                                      Nenhum post encontrado.
                                                </td>
                                          </tr>
                                    ) : (
                                          posts.map((post) => (
                                                <tr key={post.id} style={{ borderBottom: "1px solid var(--border)" }}>
                                                      <td style={{ padding: "15px", fontWeight: 500 }}>{post.title}</td>
                                                      <td style={{ padding: "15px", color: "var(--text-muted)" }}>{post.author?.name || "Admin"}</td>
                                                      <td style={{ padding: "15px" }}>
                                                            <span
                                                                  style={{
                                                                        padding: "4px 10px",
                                                                        borderRadius: "12px",
                                                                        fontSize: "0.8rem",
                                                                        background: post.status === "PUBLISHED" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                                                                        color: post.status === "PUBLISHED" ? "#10b981" : "#f59e0b",
                                                                  }}
                                                            >
                                                                  {post.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                                                            </span>
                                                      </td>
                                                      <td style={{ padding: "15px", color: "var(--text-muted)" }}>
                                                            {new Date(post.createdAt).toLocaleDateString()}
                                                      </td>
                                                      <td style={{ padding: "15px", textAlign: "right" }}>
                                                            <button
                                                                  onClick={() => router.push(`/admin/posts/${post.id}`)}
                                                                  style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", marginRight: "10px" }}
                                                                  title="Editar"
                                                            >
                                                                  <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button
                                                                  onClick={() => handleDelete(post.id)}
                                                                  style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                                                                  title="Excluir"
                                                            >
                                                                  <i className="fas fa-trash"></i>
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}
