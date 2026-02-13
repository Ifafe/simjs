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
                  router.refresh(); // Refresh to show updates if displayed elsewhere
            } catch (error) {
                  alert("Erro ao salvar banner. Tente novamente.");
                  console.error(error);
            } finally {
                  setSaving(false);
            }
      };

      if (loading) {
            return <div className="p-8 text-center text-gray-400">Carregando...</div>;
      }

      return (
            <div className="p-8 max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                        <div>
                              <h1 className="text-3xl font-bold text-white mb-2">Banners & Hero</h1>
                              <p className="text-gray-400">Gerencie a seção principal da página inicial.</p>
                        </div>
                  </div>

                  <div className="bg-card-bg border border-border rounded-xl p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-300">Título Principal</label>
                                          <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Ex: O futuro da inovação"
                                          />
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-primary">Destaque (Cor diferente)</label>
                                          <input
                                                type="text"
                                                name="highlight"
                                                value={formData.highlight}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Ex: Angola"
                                          />
                                    </div>
                              </div>

                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Subtítulo</label>
                                    <textarea
                                          name="subtitle"
                                          value={formData.subtitle}
                                          onChange={handleChange}
                                          rows={3}
                                          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                          placeholder="Uma breve descrição que aparece abaixo do título..."
                                    />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-300">Texto do Botão (CTA)</label>
                                          <input
                                                type="text"
                                                name="ctaText"
                                                value={formData.ctaText}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Ex: Saiba Mais"
                                          />
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-300">Link do Botão</label>
                                          <input
                                                type="text"
                                                name="ctaLink"
                                                value={formData.ctaLink}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Ex: /sobre"
                                          />
                                    </div>
                              </div>

                              <div className="pt-6 flex justify-end">
                                    <button
                                          type="submit"
                                          disabled={saving}
                                          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                          {saving ? (
                                                <>
                                                      <i className="fas fa-spinner fa-spin"></i> Salvando...
                                                </>
                                          ) : (
                                                <>
                                                      <i className="fas fa-save"></i> Salvar Alterações
                                                </>
                                          )}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
