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

      const handleSubmit = async () => {
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
                  alert("Erro ao salvar opções.");
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
                              <h1>Configurações Gerais</h1>
                              <p>Gerencie as informações principais do site</p>
                        </div>
                        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                              <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i> {saving ? 'Guardando...' : 'Guardar Configurações'}
                        </button>
                  </div>

                  <div className="form-card">
                        <h2>Informações do Site</h2>
                        <div className="form-row">
                              <div className="form-group">
                                    <label>Nome do Site</label>
                                    <input
                                          type="text"
                                          name="site_name"
                                          value={settings.site_name}
                                          onChange={handleChange}
                                          placeholder="SIMJS"
                                    />
                              </div>
                              <div className="form-group">
                                    <label>Domínio</label>
                                    <input
                                          type="text"
                                          name="site_domain"
                                          value={settings.site_domain}
                                          onChange={handleChange}
                                          placeholder="simjs.com"
                                    />
                              </div>
                        </div>
                        <div className="form-group">
                              <label>Descrição</label>
                              <textarea
                                    name="site_description"
                                    value={settings.site_description}
                                    onChange={handleChange}
                                    placeholder="Descrição completa do site"
                                    rows={4}
                              ></textarea>
                        </div>
                  </div>

                  <div className="form-card">
                        <h2>Redes Sociais</h2>
                        <div className="form-row">
                              <div className="form-group">
                                    <label><i className="fab fa-facebook"></i> Facebook</label>
                                    <input
                                          type="url"
                                          name="social_facebook"
                                          value={settings.social_facebook}
                                          onChange={handleChange}
                                          placeholder="https://facebook.com/..."
                                    />
                              </div>
                              <div className="form-group">
                                    <label><i className="fab fa-instagram"></i> Instagram</label>
                                    <input
                                          type="url"
                                          name="social_instagram"
                                          value={settings.social_instagram}
                                          onChange={handleChange}
                                          placeholder="https://instagram.com/..."
                                    />
                              </div>
                        </div>
                        <div className="form-row">
                              <div className="form-group">
                                    <label><i className="fab fa-twitter"></i> X / Twitter</label>
                                    <input
                                          type="url"
                                          name="social_twitter"
                                          value={settings.social_twitter}
                                          onChange={handleChange}
                                          placeholder="https://twitter.com/..."
                                    />
                              </div>
                              <div className="form-group">
                                    <label><i className="fab fa-linkedin"></i> LinkedIn</label>
                                    <input
                                          type="url"
                                          name="social_linkedin"
                                          value={settings.social_linkedin}
                                          onChange={handleChange}
                                          placeholder="https://linkedin.com/..."
                                    />
                              </div>
                        </div>
                  </div>
            </section>
      );
}

