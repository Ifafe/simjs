"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SEOPage() {
      const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [settings, setSettings] = useState({
            seo_title_suffix: " | SIMJS",
            seo_default_description: "",
            seo_keywords: "",
            seo_robots: "index, follow",
      });

      useEffect(() => {
            fetch("/api/settings")
                  .then((res) => res.json())
                  .then((data) => {
                        const newSettings = { ...settings };
                        Object.keys(settings).forEach((key) => {
                              if (data[key] !== undefined) {
                                    // @ts-ignore
                                    newSettings[key] = data[key];
                              }
                        });
                        // @ts-ignore
                        setSettings(newSettings);
                        setLoading(false);
                  })
                  .catch((err) => {
                        console.error("Failed to load SEO settings", err);
                        setLoading(false);
                  });
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setSettings((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async () => {
            setSaving(true);
            try {
                  const res = await fetch("/api/settings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(settings),
                  });

                  if (!res.ok) throw new Error("Failed to save");
                  alert("Configurações de SEO atualizadas!");
                  router.refresh();
            } catch (error) {
                  alert("Erro ao salvar. Tente novamente.");
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
                              <h1>Configurações SEO</h1>
                              <p>Otimize o seu site para motores de busca</p>
                        </div>
                        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                              <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i> {saving ? 'Guardando...' : 'Guardar SEO'}
                        </button>
                  </div>

                  <div className="form-card">
                        <h2>Meta Informações Globais</h2>
                        <div className="form-group">
                              <label>Sufixo do Título</label>
                              <input
                                    type="text"
                                    name="seo_title_suffix"
                                    value={settings.seo_title_suffix}
                                    onChange={handleChange}
                                    placeholder="| SIMJS"
                              />
                        </div>
                        <div className="form-group">
                              <label>Meta Descrição</label>
                              <textarea
                                    name="seo_default_description"
                                    value={settings.seo_default_description}
                                    onChange={handleChange}
                                    placeholder="Descrição para mecanismos de busca (max 160 caracteres)"
                                    rows={3}
                              ></textarea>
                        </div>
                        <div className="form-group">
                              <label>Palavras-chave</label>
                              <input
                                    type="text"
                                    name="seo_keywords"
                                    value={settings.seo_keywords}
                                    onChange={handleChange}
                                    placeholder="palavra1, palavra2, palavra3"
                              />
                        </div>
                        <div className="form-group">
                              <label>Robots (Indexação)</label>
                              <select
                                    name="seo_robots"
                                    value={settings.seo_robots}
                                    onChange={handleChange}
                              >
                                    <option value="index, follow">Indexar e Seguir</option>
                                    <option value="noindex, follow">Não Indexar, mas Seguir Links</option>
                                    <option value="index, nofollow">Indexar, mas Não Seguir Links</option>
                                    <option value="noindex, nofollow">Não Indexar e Não Seguir</option>
                              </select>
                        </div>
                  </div>
            </section>
      );
}
