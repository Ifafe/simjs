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
            <div className="p-6 md:p-10 max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                              <h1 className="text-3xl font-bold text-white tracking-tight">Banner Principal</h1>
                              <p className="text-gray-400 mt-1">Gerencie o conteúdo de destaque (Hero Section) da página inicial.</p>
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
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-8">
                              <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                          <i className="fas fa-image text-8xl text-white"></i>
                                    </div>

                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                          <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">
                                                <i className="fas fa-pen"></i>
                                          </span>
                                          Conteúdo Textual
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Título Principal</label>
                                                <div className="relative group/input">
                                                      <input
                                                            type="text"
                                                            name="title"
                                                            value={formData.title}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                            placeholder="Ex: O futuro da inovação"
                                                      />
                                                </div>
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 text-primary">Destaque (Cor)</label>
                                                <div className="relative group/input">
                                                      <input
                                                            type="text"
                                                            name="highlight"
                                                            value={formData.highlight}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-primary/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                                                            placeholder="Ex: Angola"
                                                      />
                                                </div>
                                          </div>
                                    </div>

                                    <div className="space-y-2 mb-8">
                                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Subtítulo</label>
                                          <textarea
                                                name="subtitle"
                                                value={formData.subtitle}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner resize-none"
                                                placeholder="Uma breve descrição que aparece abaixo do título..."
                                          />
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Botão de Ação (CTA)</h3>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Texto do Botão</label>
                                                      <input
                                                            type="text"
                                                            name="ctaText"
                                                            value={formData.ctaText}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                            placeholder="Ex: Saiba Mais"
                                                      />
                                                </div>
                                                <div className="space-y-2">
                                                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Link de Destino</label>
                                                      <div className="relative">
                                                            <div className="absolute left-4 top-3.5 text-gray-600">
                                                                  <i className="fas fa-link text-xs"></i>
                                                            </div>
                                                            <input
                                                                  type="text"
                                                                  name="ctaLink"
                                                                  value={formData.ctaLink}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner font-mono text-sm"
                                                                  placeholder="Ex: /sobre"
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                              </section>
                        </div>

                        {/* Sidebar Preview */}
                        <div className="space-y-6">
                              <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-white font-semibold mb-4">Pré-visualização (Aproximada)</h3>
                                    <div className="bg-black/50 rounded-xl p-6 border border-white/5 text-center relative overflow-hidden aspect-video flex flex-col items-center justify-center">
                                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                                          <h4 className="text-xl font-bold text-white relative z-10">
                                                {formData.title || "Título"} <span className="text-primary">{formData.highlight || "Destaque"}</span>
                                          </h4>
                                          <p className="text-xs text-gray-400 mt-2 max-w-[200px] relative z-10">{formData.subtitle || "Subtítulo do banner..."}</p>
                                          <div className="mt-4 px-4 py-2 bg-primary text-white text-xs rounded-lg shadow-lg relative z-10">
                                                {formData.ctaText || "Botão"}
                                          </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 text-center">
                                          A visualização real pode variar dependendo do tamanho da tela.
                                    </p>
                              </div>
                        </div>

                  </div>
            </div>
      );
}
