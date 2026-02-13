"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
      const [settings, setSettings] = useState({
            site_name: "",
            site_description: "",
            contact_email: "",
            contact_phone: "",
            address: "",
      });
      const [loading, setLoading] = useState(true);
      const [message, setMessage] = useState("");

      useEffect(() => {
            fetchSettings();
      }, []);

      const fetchSettings = async () => {
            try {
                  const res = await fetch("/api/settings");
                  if (res.ok) {
                        const data = await res.json();
                        setSettings((prev) => ({ ...prev, ...data }));
                  }
            } catch (error) {
                  console.error("Failed to fetch settings", error);
            } finally {
                  setLoading(false);
            }
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setSettings((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setMessage("");

            try {
                  const res = await fetch("/api/settings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(settings),
                  });

                  if (res.ok) {
                        setMessage("Configurações atualizadas com sucesso!");
                        setTimeout(() => setMessage(""), 3000);
                  } else {
                        setMessage("Erro ao atualizar configurações.");
                  }
            } catch (error) {
                  console.error(error);
                  setMessage("Erro de conexão.");
            }
      };

      if (loading) return <div className="p-8 text-white">Carregando configurações...</div>;

      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Configurações Gerais</h1>
                              <p>Informações básicas do site</p>
                        </div>
                  </div>

                  <div className="admin-card" style={{ padding: "30px", maxWidth: "800px" }}>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                              <div className="form-group">
                                    <label>Nome do Site</label>
                                    <input
                                          type="text"
                                          name="site_name"
                                          value={settings.site_name}
                                          onChange={handleChange}
                                          className="form-control"
                                    />
                              </div>

                              <div className="form-group">
                                    <label>Descrição do Site (SEO)</label>
                                    <textarea
                                          name="site_description"
                                          value={settings.site_description}
                                          onChange={handleChange}
                                          className="form-control"
                                          rows={3}
                                    />
                              </div>

                              <h3 style={{ marginTop: "20px", marginBottom: "10px", color: "var(--text-primary)" }}>Contato</h3>

                              <div className="form-group">
                                    <label>E-mail de Contato</label>
                                    <input
                                          type="email"
                                          name="contact_email"
                                          value={settings.contact_email}
                                          onChange={handleChange}
                                          className="form-control"
                                    />
                              </div>

                              <div className="form-group">
                                    <label>Telefone</label>
                                    <input
                                          type="text"
                                          name="contact_phone"
                                          value={settings.contact_phone}
                                          onChange={handleChange}
                                          className="form-control"
                                    />
                              </div>

                              <div className="form-group">
                                    <label>Endereço</label>
                                    <input
                                          type="text"
                                          name="address"
                                          value={settings.address}
                                          onChange={handleChange}
                                          className="form-control"
                                    />
                              </div>

                              {message && (
                                    <div className={`status-badge ${message.includes("sucesso") ? "status-published" : "status-archived"}`} style={{ display: 'block', textAlign: 'center', padding: '10px' }}>
                                          {message}
                                    </div>
                              )}

                              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "10px" }}>
                                    Salvar Configurações
                              </button>
                        </form>
                  </div>
            </div>
      );
}
