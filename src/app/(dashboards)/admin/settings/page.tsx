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
                              <h1 className="text-2xl font-bold text-white mb-2">Configurações Gerais</h1>
                              <p className="text-gray-400">Gerencie a identidade e conexões sociais da sua plataforma.</p>
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

                        {/* Identidade do Site */}
                        <div className="lg:col-span-2 space-y-6">
                              <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                          <i className="fas fa-globe text-primary"></i> Identidade
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nome do Site</label>
                                                <input
                                                      type="text"
                                                      name="site_name"
                                                      value={settings.site_name}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="Ex: Grupo SIMJS"
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Domínio Oficial</label>
                                                <input
                                                      type="text"
                                                      name="site_domain"
                                                      value={settings.site_domain}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="Ex: simjs.com"
                                                />
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Descrição do Site</label>
                                          <textarea
                                                name="site_description"
                                                value={settings.site_description}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                                placeholder="Uma breve descrição que resume o propósito da sua plataforma..."
                                          />
                                          <p className="text-xs text-gray-500 text-right">{settings.site_description.length}/160</p>
                                    </div>
                              </section>

                              {/* Social Media */}
                              <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                          <i className="fas fa-share-alt text-primary"></i> Conexões Sociais
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                          {[
                                                { name: "social_facebook", icon: "facebook-f", label: "Facebook" },
                                                { name: "social_instagram", icon: "instagram", label: "Instagram" },
                                                { name: "social_linkedin", icon: "linkedin-in", label: "LinkedIn" },
                                                { name: "social_twitter", icon: "twitter", label: "X / Twitter" },
                                          ].map((social) => (
                                                <div key={social.name} className="space-y-2">
                                                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                                            <i className={`fab fa-${social.icon}`}></i> {social.label}
                                                      </label>
                                                      <input
                                                            type="text"
                                                            name={social.name}
                                                            // @ts-ignore
                                                            value={settings[social.name]}
                                                            onChange={handleChange}
                                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                                            placeholder={`URL do ${social.label}`}
                                                      />
                                                </div>
                                          ))}
                                    </div>
                              </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                              <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
                                    <h3 className="text-white font-semibold mb-2 text-sm">Dica Importante</h3>
                                    <p className="text-xs text-gray-300 leading-relaxed">
                                          Mantenha a descrição do site entre 150 e 160 caracteres para otimizar sua aparência nos resultados de busca do Google.
                                    </p>
                              </div>
                        </div>

                  </div>
            </div>
      );
}
