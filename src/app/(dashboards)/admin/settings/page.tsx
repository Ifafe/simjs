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

                  // Optional: Add a toast notification here instead of alert
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
            <div className="p-6 md:p-10 max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                              <h1 className="text-3xl font-bold text-white tracking-tight">Configurações Gerais</h1>
                              <p className="text-gray-400 mt-1">Gerencie a identidade e conexões sociais da sua plataforma.</p>
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

                        {/* Identidade do Site */}
                        <div className="lg:col-span-2 space-y-8">
                              <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                          <i className="fas fa-globe text-8xl text-white"></i>
                                    </div>

                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                          <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">
                                                <i className="fas fa-fingerprint"></i>
                                          </span>
                                          Identidade
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Nome do Site</label>
                                                <div className="relative group/input">
                                                      <input
                                                            type="text"
                                                            name="site_name"
                                                            value={settings.site_name}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                            placeholder="Ex: Grupo SIMJS"
                                                      />
                                                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover/input:opacity-100 pointer-events-none transition-opacity mix-blend-overlay"></div>
                                                </div>
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Domínio Oficial</label>
                                                <div className="relative group/input">
                                                      <input
                                                            type="text"
                                                            name="site_domain"
                                                            value={settings.site_domain}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                            placeholder="Ex: simjs.com"
                                                      />
                                                </div>
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Descrição do Site</label>
                                          <textarea
                                                name="site_description"
                                                value={settings.site_description}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner resize-none"
                                                placeholder="Uma breve descrição que resume o propósito da sua plataforma..."
                                          />
                                          <p className="text-xs text-gray-500 text-right">{settings.site_description.length}/160 caracteres recomendados</p>
                                    </div>
                              </section>

                              {/* Social Media */}
                              <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                          <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm">
                                                <i className="fas fa-share-alt"></i>
                                          </span>
                                          Conexões Sociais
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                          {[
                                                { name: "social_facebook", icon: "facebook-f", label: "Facebook", color: "text-blue-500" },
                                                { name: "social_instagram", icon: "instagram", label: "Instagram", color: "text-pink-500" },
                                                { name: "social_linkedin", icon: "linkedin-in", label: "LinkedIn", color: "text-blue-400" },
                                                { name: "social_twitter", icon: "twitter", label: "X / Twitter", color: "text-white" },
                                          ].map((social) => (
                                                <div key={social.name} className="space-y-2 group/social">
                                                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                                                            <i className={`fab fa-${social.icon} ${social.color}`}></i> {social.label}
                                                      </label>
                                                      <div className="relative">
                                                            <div className="absolute left-4 top-3.5 text-gray-500 group-focus-within/social:text-white transition-colors">
                                                                  <i className="fas fa-link text-xs"></i>
                                                            </div>
                                                            <input
                                                                  type="text"
                                                                  name={social.name}
                                                                  // @ts-ignore
                                                                  value={settings[social.name]}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all shadow-inner font-mono text-sm"
                                                                  placeholder={`https://${social.label.toLowerCase()}.com/...`}
                                                            />
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </section>
                        </div>

                        {/* Sidebar / Info */}
                        <div className="space-y-6">
                              <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-6">
                                    <h3 className="text-white font-semibold mb-2">Dica Pro</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                          Mantenha a descrição do site entre 150 e 160 caracteres para otimizar sua aparência nos resultados de busca do Google.
                                    </p>
                              </div>

                              <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-white font-semibold mb-4">Status do Sistema</h3>
                                    <div className="space-y-4">
                                          <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Versão</span>
                                                <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">v1.2.0</span>
                                          </div>
                                          <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Ambiente</span>
                                                <span className="text-emerald-400 font-medium flex items-center gap-2">
                                                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                      Produção
                                                </span>
                                          </div>
                                          <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Último Deploy</span>
                                                <span className="text-gray-300">Há 5 min</span>
                                          </div>
                                    </div>
                              </div>
                        </div>

                  </div>
            </div>
      );
}
