"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
      const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [settings, setSettings] = useState({
            site_name: "",
            site_description: "",
            site_domain: "",
            social_facebook: "",
            social_instagram: "",
            social_linkedin: "",
            social_twitter: "",
      });

      useEffect(() => {
            fetch("/api/settings")
                  .then((res) => res.json())
                  .then((data) => {
                        // Merge with defaults to ensure controlled inputs
                        setSettings((prev) => ({ ...prev, ...data }));
                        setLoading(false);
                  })
                  .catch((err) => {
                        console.error("Failed to load settings", err);
                        setLoading(false);
                  });
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

                  alert("Configurações atualizadas com sucesso!");
                  router.refresh();
            } catch (error) {
                  alert("Erro ao salvar configurações. Tente novamente.");
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
                              <h1 className="text-3xl font-bold text-white mb-2">Configurações Gerais</h1>
                              <p className="text-gray-400">Gerencie as informações principais do site.</p>
                        </div>
                  </div>

                  <div className="bg-card-bg border border-border rounded-xl p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                              {/* Identidade */}
                              <section className="space-y-6">
                                    <h2 className="text-xl font-semibold text-white border-b border-border pb-2">Identidade do Site</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Nome do Site</label>
                                                <input
                                                      type="text"
                                                      name="site_name"
                                                      value={settings.site_name}
                                                      onChange={handleChange}
                                                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                      placeholder="Ex: Grupo SIMJS"
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Domínio</label>
                                                <input
                                                      type="text"
                                                      name="site_domain"
                                                      value={settings.site_domain}
                                                      onChange={handleChange}
                                                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                      placeholder="Ex: simjs.com"
                                                />
                                          </div>
                                    </div>
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-300">Descrição</label>
                                          <textarea
                                                name="site_description"
                                                value={settings.site_description}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Descrição curta para o rodapé e SEO..."
                                          />
                                    </div>
                              </section>

                              {/* Redes Sociais */}
                              <section className="space-y-6">
                                    <h2 className="text-xl font-semibold text-white border-b border-border pb-2">Redes Sociais</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Facebook</label>
                                                <div className="relative">
                                                      <span className="absolute left-3 top-2.5 text-gray-400"><i className="fab fa-facebook-f"></i></span>
                                                      <input
                                                            type="text"
                                                            name="social_facebook"
                                                            value={settings.social_facebook}
                                                            onChange={handleChange}
                                                            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                            placeholder="URL completa"
                                                      />
                                                </div>
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Instagram</label>
                                                <div className="relative">
                                                      <span className="absolute left-3 top-2.5 text-gray-400"><i className="fab fa-instagram"></i></span>
                                                      <input
                                                            type="text"
                                                            name="social_instagram"
                                                            value={settings.social_instagram}
                                                            onChange={handleChange}
                                                            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                            placeholder="URL completa"
                                                      />
                                                </div>
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">LinkedIn</label>
                                                <div className="relative">
                                                      <span className="absolute left-3 top-2.5 text-gray-400"><i className="fab fa-linkedin-in"></i></span>
                                                      <input
                                                            type="text"
                                                            name="social_linkedin"
                                                            value={settings.social_linkedin}
                                                            onChange={handleChange}
                                                            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                            placeholder="URL completa"
                                                      />
                                                </div>
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Twitter / X</label>
                                                <div className="relative">
                                                      <span className="absolute left-3 top-2.5 text-gray-400"><i className="fab fa-twitter"></i></span>
                                                      <input
                                                            type="text"
                                                            name="social_twitter"
                                                            value={settings.social_twitter}
                                                            onChange={handleChange}
                                                            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                            placeholder="URL completa"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </section>

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
                                                      <i className="fas fa-save"></i> Salvar Configurações
                                                </>
                                          )}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
