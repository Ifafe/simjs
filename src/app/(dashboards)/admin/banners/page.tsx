"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BannersPage() {
      const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [formData, setFormData] = useState({
            title: "",
            highlight: "",
            subtitle: "",
            ctaText: "",
            ctaLink: "",
      });

      useEffect(() => {
            fetch("/api/hero")
                  .then((res) => res.json())
                  .then((data) => {
                        setFormData(data);
                        setLoading(false);
                  })
                  .catch((err) => {
                        console.error("Failed to load hero data", err);
                        setLoading(false);
                  });
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async () => {
            setSaving(true);
            try {
                  const res = await fetch("/api/hero", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                  });

                  if (!res.ok) throw new Error("Failed to save");
                  alert("Banner atualizado com sucesso!");
                  router.refresh();
            } catch (error) {
                  alert("Erro ao salvar banner. Tente novamente.");
                  console.error(error);
            } finally {
                  setSaving(false);
            }
      };

      if (loading) {
            return <div className="p-8 text-center text-white">Carregando...</div>;
      }

      return (
            <section className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Gerenciar Banners</h1>
                              <p>Edite o conteúdo da Hero Section (Destaque Principal)</p>
                        </div>
                        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                              <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i> {saving ? 'Guardando...' : 'Guardar Alterações'}
                        </button>
                  </div>

                  <div className="form-card">
                        <h2>Banner Principal</h2>
                        <div className="form-group">
                              <label>Título</label>
                              <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Título do banner"
                                    style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                              />
                        </div>
                        <div className="form-group">
                              <label>Destaque (Cor)</label>
                              <input
                                    type="text"
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
                                    placeholder="Texto em destaque"
                                    style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                              />
                        </div>
                        <div className="form-group">
                              <label>Subtítulo / Descrição</label>
                              <textarea
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    placeholder="Descrição"
                                    rows={3}
                                    style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                              ></textarea>
                        </div>
                        <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                              <div className="form-group" style={{ flex: 1 }}>
                                    <label>Texto do Botão</label>
                                    <input
                                          type="text"
                                          name="ctaText"
                                          value={formData.ctaText}
                                          onChange={handleChange}
                                          placeholder="Ex: Saiba Mais"
                                          style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                    />
                              </div>
                              <div className="form-group" style={{ flex: 1 }}>
                                    <label>Link do Botão</label>
                                    <input
                                          type="text"
                                          name="ctaLink"
                                          value={formData.ctaLink}
                                          onChange={handleChange}
                                          placeholder="https://exemplo.com"
                                          style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                    />
                              </div>
                        </div>
                  </div>
            </section>
      );
}
