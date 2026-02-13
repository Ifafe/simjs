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
            <div className="p-6 md:p-10 max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                              <h1 className="text-3xl font-bold text-white tracking-tight">Otimização (SEO)</h1>
                              <p className="text-gray-400 mt-1">Melhore a visibilidade do seu site nos motores de busca.</p>
                        </div>
                        <button
                              onClick={handleSubmit}
                              disabled={saving}
                              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                              <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                          <i className="fas fa-search text-8xl text-white"></i>
                                    </div>
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                          <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm">
                                                <i className="fas fa-tags"></i>
                                          </span>
                                          Metadados Globais
                                    </h2>

                                    <div className="space-y-6">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Sufixo do Título</label>
                                                <div className="relative group/input">
                                                      <input
                                                            type="text"
                                                            name="seo_title_suffix"
                                                            value={settings.seo_title_suffix}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                            placeholder="Ex: | Minha Empresa"
                                                      />
                                                </div>
                                                <p className="text-xs text-gray-500 ml-1">Aparecerá após o título de cada página (ex: "Home | SIMJS").</p>
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Descrição Padrão</label>
                                                <textarea
                                                      name="seo_default_description"
                                                      value={settings.seo_default_description}
                                                      onChange={handleChange}
                                                      rows={3}
                                                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner resize-none"
                                                      placeholder="Descrição curta do site para resultados de busca..."
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Palavras-chave (Keywords)</label>
                                                <input
                                                      type="text"
                                                      name="seo_keywords"
                                                      value={settings.seo_keywords}
                                                      onChange={handleChange}
                                                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                      placeholder="tecnologia, inovação, angola, software"
                                                />
                                                <p className="text-xs text-gray-500 ml-1">Separe as palavras por vírgula.</p>
                                          </div>
                                    </div>
                              </section>

                              <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                          <span className="w-8 h-8 rounded-lg bg-gray-500/20 text-gray-400 flex items-center justify-center text-sm">
                                                <i className="fas fa-robot"></i>
                                          </span>
                                          Rastreamento (Robots)
                                    </h2>

                                    <div className="space-y-2">
                                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Regra de Indexação</label>
                                          <div className="relative">
                                                <select
                                                      name="seo_robots"
                                                      value={settings.seo_robots}
                                                      onChange={handleChange}
                                                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner appearance-none cursor-pointer"
                                                >
                                                      <option value="index, follow">Indexar e Seguir (Padrão)</option>
                                                      <option value="noindex, follow">Não Indexar, mas Seguir Links</option>
                                                      <option value="index, nofollow">Indexar, mas Não Seguir Links</option>
                                                      <option value="noindex, nofollow">Não Indexar e Não Seguir</option>
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
                              <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-white font-semibold mb-4">Preview Google</h3>
                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                          <div className="text-xs text-gray-600 mb-1">www.simjs.com</div>
                                          <div className="text-blue-800 text-lg font-medium hover:underline cursor-pointer truncate">
                                                Título da Página {settings.seo_title_suffix}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {settings.seo_default_description || "Descrição do site aparecerá aqui nos resultados de busca..."}
                                          </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3">
                                          Simulação de como sua página principal pode aparecer nos resultados.
                                    </p>
                              </div>
                        </div>
                  </div>

            </div>
      );
}
