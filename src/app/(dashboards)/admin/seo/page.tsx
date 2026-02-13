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
                        // Filter or just pick the keys we care about, merging with defaults
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
            return <div className="p-8 text-center text-gray-400">Carregando...</div>;
      }

      return (
            <div className="p-8 max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                        <div>
                              <h1 className="text-3xl font-bold text-white mb-2">Otimização (SEO)</h1>
                              <p className="text-gray-400">Gerencie como o site aparece nos motores de busca.</p>
                        </div>
                  </div>

                  <div className="bg-card-bg border border-border rounded-xl p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Sufixo do Título</label>
                                    <input
                                          type="text"
                                          name="seo_title_suffix"
                                          value={settings.seo_title_suffix}
                                          onChange={handleChange}
                                          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                          placeholder="Ex: | Minha Empresa"
                                    />
                                    <p className="text-xs text-gray-500">Aparecerá após o título de cada página. Ex: "Início | SIMJS"</p>
                              </div>

                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Descrição Padrão</label>
                                    <textarea
                                          name="seo_default_description"
                                          value={settings.seo_default_description}
                                          onChange={handleChange}
                                          rows={3}
                                          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                          placeholder="Descrição curta do site para resultados de busca..."
                                    />
                              </div>

                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Palavras-chave (Keywords)</label>
                                    <input
                                          type="text"
                                          name="seo_keywords"
                                          value={settings.seo_keywords}
                                          onChange={handleChange}
                                          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                          placeholder="tecnologia, inovação, angola, software"
                                    />
                                    <p className="text-xs text-gray-500">Separe as palavras por vírgula.</p>
                              </div>

                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Robots</label>
                                    <select
                                          name="seo_robots"
                                          value={settings.seo_robots}
                                          onChange={handleChange}
                                          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                          <option value="index, follow">Indexar e Seguir (Padrão)</option>
                                          <option value="noindex, follow">Não Indexar, mas Seguir</option>
                                          <option value="index, nofollow">Indexar, mas Não Seguir</option>
                                          <option value="noindex, nofollow">Não Indexar e Não Seguir</option>
                                    </select>
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
                                                      <i className="fas fa-save"></i> Salvar SEO
                                                </>
                                          )}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
