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

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
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
            return (
                  <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
            );
      }

      return (
            <div className="p-6 max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                              <h1 className="text-2xl font-bold text-white mb-2">Otimização (SEO)</h1>
                              <p className="text-gray-400">Melhore a visibilidade do seu site nos motores de busca.</p>
                        </div>
                        <button
                              onClick={handleSubmit}
                              disabled={saving}
                              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                              {saving ? (
                                    <>
                                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                          <span>Salvando...</span>
                                    </>
                              ) : (
                                    <>
                                          <i className="fas fa-check"></i>
                                          <span>Salvar Alterações</span>
                                    </>
                              )}
                        </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                              <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                          <i className="fas fa-search text-primary"></i> Metadados Globais
                                    </h2>

                                    <div className="space-y-6">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sufixo do Título</label>
                                                <input
                                                      type="text"
                                                      name="seo_title_suffix"
                                                      value={settings.seo_title_suffix}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="Ex: | Minha Empresa"
                                                />
                                                <p className="text-xs text-gray-500">Aparecerá após o título de cada página.</p>
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Descrição Padrão</label>
                                                <textarea
                                                      name="seo_default_description"
                                                      value={settings.seo_default_description}
                                                      onChange={handleChange}
                                                      rows={3}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                                      placeholder="Descrição curta do site para resultados de busca..."
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Palavras-chave</label>
                                                <input
                                                      type="text"
                                                      name="seo_keywords"
                                                      value={settings.seo_keywords}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="tecnologia, inovação, angola, software"
                                                />
                                          </div>
                                    </div>
                              </section>

                              <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                          <i className="fas fa-robot text-primary"></i> Robots (Indexação)
                                    </h2>

                                    <div className="space-y-2">
                                          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Regra de Indexação</label>
                                          <div className="relative">
                                                <select
                                                      name="seo_robots"
                                                      value={settings.seo_robots}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
                                                >
                                                      <option value="index, follow" className="bg-card">Indexar e Seguir (Padrão)</option>
                                                      <option value="noindex, follow" className="bg-card">Não Indexar, mas Seguir Links</option>
                                                      <option value="index, nofollow" className="bg-card">Indexar, mas Não Seguir Links</option>
                                                      <option value="noindex, nofollow" className="bg-card">Não Indexar e Não Seguir</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                      <i className="fas fa-chevron-down text-xs"></i>
                                                </div>
                                          </div>
                                    </div>
                              </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                              <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="text-white font-semibold mb-4 text-sm">Preview do Google</h3>
                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                          <div className="text-xs text-gray-600 mb-1">www.simjs.com</div>
                                          <div className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer truncate">
                                                Título da Página {settings.seo_title_suffix}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {settings.seo_default_description || "Descrição do site aparecerá aqui nos resultados de busca..."}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

            </div>
      );
}
