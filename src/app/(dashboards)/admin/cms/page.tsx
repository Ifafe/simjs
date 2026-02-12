
"use client";

import { useEffect, useState } from "react";

export default function AdminCMSPage() {
      const [loading, setLoading] = useState(true);
      const [activeTab, setActiveTab] = useState("HERO");
      const [message, setMessage] = useState("");

      // Hero State
      const [hero, setHero] = useState({
            title: "",
            highlight: "",
            subtitle: "",
            ctaText: "",
            ctaLink: ""
      });

      useEffect(() => {
            fetchHero();
      }, []);

      const fetchHero = async () => {
            try {
                  const res = await fetch("/api/admin/cms/hero");
                  if (res.ok) {
                        const data = await res.json();
                        setHero(data);
                  }
            } catch (error) {
                  console.error("Error fetching hero", error);
            } finally {
                  setLoading(false);
            }
      };

      const handleSaveHero = async (e: React.FormEvent) => {
            e.preventDefault();
            setMessage("");
            try {
                  const res = await fetch("/api/admin/cms/hero", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(hero)
                  });

                  if (res.ok) {
                        setMessage("Hero Section atualizada com sucesso!");
                        setTimeout(() => setMessage(""), 3000);
                  } else {
                        setMessage("Erro ao atualizar.");
                  }
            } catch (error) {
                  setMessage("Erro de conexão.");
                  console.error(error);
            }
      };

      if (loading) return <div style={{ padding: "30px", color: "var(--text-primary)" }}>Carregando CMS...</div>;

      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Gestão de Conteúdo (CMS)</h1>
                              <p>Gerenciar conteúdo do site público</p>
                        </div>
                  </div>

                  {/* Tabs */}
                  <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
                        <button
                              onClick={() => setActiveTab("HERO")}
                              className={`btn-secondary ${activeTab === "HERO" ? "active" : ""}`}
                              style={{
                                    background: activeTab === "HERO" ? 'var(--primary)' : 'transparent',
                                    color: activeTab === "HERO" ? 'white' : 'var(--text-muted)',
                                    borderColor: activeTab === "HERO" ? 'var(--primary)' : 'transparent'
                              }}
                        >
                              Hero Section
                        </button>
                        <button
                              disabled
                              className="btn-secondary"
                              style={{ opacity: 0.5, cursor: "not-allowed" }}
                        >
                              Sobre (Em breve)
                        </button>
                        <button
                              disabled
                              className="btn-secondary"
                              style={{ opacity: 0.5, cursor: "not-allowed" }}
                        >
                              Contactos (Em breve)
                        </button>
                  </div>

                  {/* Content Area */}
                  <div className="admin-card" style={{ padding: "30px" }}>

                        {activeTab === "HERO" && (
                              <form onSubmit={handleSaveHero} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
                                    <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Editar Hero (Página Inicial)</h3>

                                    <div className="form-group">
                                          <label>Destaque (Texto Colorido)</label>
                                          <input
                                                type="text"
                                                value={hero.highlight}
                                                onChange={e => setHero({ ...hero, highlight: e.target.value })}
                                                className="form-control"
                                          />
                                    </div>

                                    <div className="form-group">
                                          <label>Título Principal</label>
                                          <input
                                                type="text"
                                                value={hero.title}
                                                onChange={e => setHero({ ...hero, title: e.target.value })}
                                                className="form-control"
                                          />
                                    </div>

                                    <div className="form-group">
                                          <label>Subtítulo</label>
                                          <textarea
                                                rows={3}
                                                value={hero.subtitle}
                                                onChange={e => setHero({ ...hero, subtitle: e.target.value })}
                                                className="form-control"
                                                style={{ resize: "vertical" }}
                                          />
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                          <div className="form-group">
                                                <label>Texto Botão</label>
                                                <input
                                                      type="text"
                                                      value={hero.ctaText}
                                                      onChange={e => setHero({ ...hero, ctaText: e.target.value })}
                                                      className="form-control"
                                                />
                                          </div>
                                          <div className="form-group">
                                                <label>Link Botão</label>
                                                <input
                                                      type="text"
                                                      value={hero.ctaLink}
                                                      onChange={e => setHero({ ...hero, ctaLink: e.target.value })}
                                                      className="form-control"
                                                />
                                          </div>
                                    </div>

                                    {message && (
                                          <div className={`status-badge ${message.includes("sucesso") ? "status-published" : "status-archived"}`} style={{ display: 'block', textAlign: 'center', padding: '10px' }}>
                                                {message}
                                          </div>
                                    )}

                                    <button
                                          type="submit"
                                          className="btn-primary"
                                          style={{ alignSelf: 'flex-start' }}
                                    >
                                          Salvar Alterações
                                    </button>
                              </form>
                        )}
                  </div>
            </div>
      );
}
