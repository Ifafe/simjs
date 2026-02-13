"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Page {
      id: number;
      title: string;
      slug: string;
      status: string;
      updatedAt: string;
}

export default function AdminPagesPage() {
      const [pages, setPages] = useState<Page[]>([]);
      const [loading, setLoading] = useState(true);
      const router = useRouter();

      useEffect(() => {
            fetchPages();
      }, []);

      const fetchPages = async () => {
            try {
                  const res = await fetch("/api/pages");
                  if (res.ok) {
                        const data = await res.json();
                        setPages(data);
                  }
            } catch (error) {
                  console.error("Failed to fetch pages", error);
            } finally {
                  setLoading(false);
            }
      };

      const handleDelete = async (id: number) => {
            if (!confirm("Tem certeza que deseja excluir esta página?")) return;

            try {
                  const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
                  if (res.ok) {
                        setPages(pages.filter((page) => page.id !== id));
                  } else {
                        alert("Erro ao excluir página");
                  }
            } catch (error) {
                  console.error(error);
                  alert("Erro ao excluir página");
            }
      };

      if (loading) return <div className="p-8 text-white">Carregando páginas...</div>;

      return (
            <div className="content-section active">
                  <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                              <h1>Gerenciar Páginas</h1>
                              <p>Conteúdo Estático</p>
                        </div>
                        <Link href="/admin/pages/new" className="btn-primary">
                              <i className="fas fa-plus"></i> Nova Página
                        </Link>
                  </div>

                  <div className="admin-card">
                        <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                              <thead>
                                    <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                                          <th style={{ padding: "15px" }}>Título</th>
                                          <th style={{ padding: "15px" }}>Slug</th>
                                          <th style={{ padding: "15px" }}>Status</th>
                                          <th style={{ padding: "15px" }}>Última Atualização</th>
                                          <th style={{ padding: "15px", textAlign: "right" }}>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {pages.length === 0 ? (
                                          <tr>
                                                <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>
                                                      Nenhuma página encontrada.
                                                </td>
                                          </tr>
                                    ) : (
                                          pages.map((page) => (
                                                <tr key={page.id} style={{ borderBottom: "1px solid var(--border)" }}>
                                                      <td style={{ padding: "15px", fontWeight: 500 }}>{page.title}</td>
                                                      <td style={{ padding: "15px", color: "var(--text-muted)" }}>/{page.slug}</td>
                                                      <td style={{ padding: "15px" }}>
                                                            <span
                                                                  style={{
                                                                        padding: "4px 10px",
                                                                        borderRadius: "12px",
                                                                        fontSize: "0.8rem",
                                                                        background: page.status === "PUBLISHED" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                                                                        color: page.status === "PUBLISHED" ? "#10b981" : "#f59e0b",
                                                                  }}
                                                            >
                                                                  {page.status === "PUBLISHED" ? "Publicada" : "Rascunho"}
                                                            </span>
                                                      </td>
                                                      <td style={{ padding: "15px", color: "var(--text-muted)" }}>
                                                            {new Date(page.updatedAt).toLocaleDateString()}
                                                      </td>
                                                      <td style={{ padding: "15px", textAlign: "right" }}>
                                                            <button
                                                                  onClick={() => router.push(`/admin/pages/${page.id}`)}
                                                                  style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", marginRight: "10px" }}
                                                                  title="Editar"
                                                            >
                                                                  <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button
                                                                  onClick={() => handleDelete(page.id)}
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
