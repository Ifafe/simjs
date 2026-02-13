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

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
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
                              <h1 className="text-2xl font-bold text-white mb-2">Banner Principal (Hero)</h1>
                              <p className="text-gray-400">Gerencie o conteúdo de destaque da página inicial.</p>
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
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                              <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                          <i className="fas fa-pen text-primary"></i> Conteúdo Textual
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Título Principal</label>
                                                <input
                                                      type="text"
                                                      name="title"
                                                      value={formData.title}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="Ex: O futuro da inovação"
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Destaque (Cor)</label>
                                                <input
                                                      type="text"
                                                      name="highlight"
                                                      value={formData.highlight}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-primary/30 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="Ex: Angola"
                                                />
                                          </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subtítulo</label>
                                          <textarea
                                                name="subtitle"
                                                value={formData.subtitle}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                                placeholder="Uma breve descrição que aparece abaixo do título..."
                                          />
                                    </div>

                                    <div className="pt-5 border-t border-white/5">
                                          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Botão de Ação</h3>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Texto do Botão</label>
                                                      <input
                                                            type="text"
                                                            name="ctaText"
                                                            value={formData.ctaText}
                                                            onChange={handleChange}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                            placeholder="Ex: Saiba Mais"
                                                      />
                                                </div>
                                                <div className="space-y-2">
                                                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Link</label>
                                                      <input
                                                            type="text"
                                                            name="ctaLink"
                                                            value={formData.ctaLink}
                                                            onChange={handleChange}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                            placeholder="Ex: /sobre"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </section>
                        </div>

                        {/* Sidebar Preview */}
                        <div className="space-y-6">
                              <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="text-white font-semibold mb-4 text-sm">Preview</h3>
                                    <div className="bg-black/50 rounded-lg p-6 border border-white/5 text-center relative overflow-hidden aspect-video flex flex-col items-center justify-center">
                                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                                          <h4 className="text-xl font-bold text-white relative z-10">
                                                {formData.title || "Título"} <span className="text-primary">{formData.highlight || "Destaque"}</span>
                                          </h4>
                                          <p className="text-xs text-gray-400 mt-2 max-w-[200px] relative z-10">{formData.subtitle || "Subtítulo do banner..."}</p>
                                          <div className="mt-4 px-4 py-2 bg-primary text-white text-xs rounded-lg shadow-lg relative z-10">
                                                {formData.ctaText || "Botão"}
                                          </div>
                                    </div>
                              </div>
                        </div>

                  </div>
            </div>
      );
}
