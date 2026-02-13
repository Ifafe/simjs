"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PostFormProps {
      initialData?: any;
      isEditing?: boolean;
}

export default function PostForm({ initialData, isEditing = false }: PostFormProps) {
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const [formData, setFormData] = useState({
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            image: "",
            status: "DRAFT",
      });

      useEffect(() => {
            if (initialData) {
                  setFormData({
                        title: initialData.title || "",
                        slug: initialData.slug || "",
                        content: initialData.content || "",
                        excerpt: initialData.excerpt || "",
                        image: initialData.image || "",
                        status: initialData.status || "DRAFT",
                  });
            }
      }, [initialData]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);

            try {
                  const url = isEditing ? `/api/posts/${initialData.id}` : "/api/posts";
                  const method = isEditing ? "PUT" : "POST";

                  const res = await fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                  });

                  if (res.ok) {
                        router.push("/admin/posts");
                        router.refresh();
                  } else {
                        alert("Erro ao salvar post");
                  }
            } catch (error) {
                  console.error(error);
                  alert("Erro ao salvar post");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <form onSubmit={handleSubmit} className="admin-card" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="form-group">
                        <label>Título</label>
                        <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              className="form-control"
                              required
                        />
                  </div>

                  <div className="form-group">
                        <label>Slug (URL Amigável)</label>
                        <input
                              type="text"
                              name="slug"
                              value={formData.slug}
                              onChange={handleChange}
                              className="form-control"
                              required
                        />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="form-group">
                              <label>Status</label>
                              <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="form-control"
                              >
                                    <option value="DRAFT">Rascunho</option>
                                    <option value="PUBLISHED">Publicado</option>
                                    <option value="ARCHIVED">Arquivado</option>
                              </select>
                        </div>

                        <div className="form-group">
                              <label>Imagem de Capa (URL)</label>
                              <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="https://..."
                              />
                        </div>
                  </div>

                  <div className="form-group">
                        <label>Resumo</label>
                        <textarea
                              name="excerpt"
                              value={formData.excerpt}
                              onChange={handleChange}
                              className="form-control"
                              rows={3}
                        />
                  </div>

                  <div className="form-group">
                        <label>Conteúdo</label>
                        <textarea
                              name="content"
                              value={formData.content}
                              onChange={handleChange}
                              className="form-control"
                              rows={15}
                              required
                        />
                  </div>

                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button
                              type="button"
                              onClick={() => router.back()}
                              className="btn-secondary"
                              disabled={loading}
                        >
                              Cancelar
                        </button>
                        <button
                              type="submit"
                              className="btn-primary"
                              disabled={loading}
                        >
                              {loading ? "Salvando..." : isEditing ? "Atualizar Post" : "Criar Post"}
                        </button>
                  </div>
            </form>
      );
}
