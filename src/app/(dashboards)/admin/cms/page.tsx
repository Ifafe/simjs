
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
                  console.error("Error fetching hero");
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
            }
      };

      if (loading) return <div style={{ padding: "30px", color: "white" }}>Carregando CMS...</div>;

      return (
            <div style={{ padding: "30px", color: "white" }}>
                  <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>Gestão de Conteúdo (CMS)</h1>

                  {/* Tabs */}
                  <div style={{ display: "flex", gap: "20px", marginBottom: "30px", borderBottom: "1px solid #333", paddingBottom: "10px" }}>
                        <button
                              onClick={() => setActiveTab("HERO")}
                              style={{
                                    background: "none",
                                    border: "none",
                                    color: activeTab === "HERO" ? "var(--primary)" : "#aaa",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    paddingBottom: "10px",
                                    borderBottom: activeTab === "HERO" ? "2px solid var(--primary)" : "none"
                              }}
                        >
                              Hero Section
                        </button>
                        <button
                              disabled
                              style={{
                                    background: "none",
                                    border: "none",
                                    color: "#555",
                                    cursor: "not-allowed"
                              }}
                        >
                              Sobre (Em breve)
                        </button>
                        <button
                              disabled
                              style={{
                                    background: "none",
                                    border: "none",
                                    color: "#555",
                                    cursor: "not-allowed"
                              }}
                        >
                              Contactos (Em breve)
                        </button>
                  </div>

                  {/* Content Area */}
                  <div style={{ background: "var(--bg-card)", padding: "30px", borderRadius: "12px", border: "1px solid var(--border)" }}>

                        {activeTab === "HERO" && (
                              <form onSubmit={handleSaveHero} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px" }}>
                                    <h3 style={{ marginTop: 0 }}>Editar Hero (Página Inicial)</h3>

                                    <div>
                                          <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Destaque (Texto Colorido)</label>
                                          <input
                                                type="text"
                                                value={hero.highlight}
                                                onChange={e => setHero({ ...hero, highlight: e.target.value })}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                                          />
                                    </div>

                                    <div>
                                          <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Título Principal</label>
                                          <input
                                                type="text"
                                                value={hero.title}
                                                onChange={e => setHero({ ...hero, title: e.target.value })}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                                          />
                                    </div>

                                    <div>
                                          <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Subtítulo</label>
                                          <textarea
                                                rows={3}
                                                value={hero.subtitle}
                                                onChange={e => setHero({ ...hero, subtitle: e.target.value })}
                                                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white", resize: "vertical" }}
                                          />
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                          <div>
                                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Texto Botão</label>
                                                <input
                                                      type="text"
                                                      value={hero.ctaText}
                                                      onChange={e => setHero({ ...hero, ctaText: e.target.value })}
                                                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                                                />
                                          </div>
                                          <div>
                                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Link Botão</label>
                                                <input
                                                      type="text"
                                                      value={hero.ctaLink}
                                                      onChange={e => setHero({ ...hero, ctaLink: e.target.value })}
                                                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                                                />
                                          </div>
                                    </div>

                                    {message && (
                                          <div style={{
                                                padding: "10px",
                                                borderRadius: "8px",
                                                background: message.includes("sucesso") ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                                                color: message.includes("sucesso") ? "#10b981" : "#ef4444",
                                                textAlign: "center"
                                          }}>
                                                {message}
                                          </div>
                                    )}

                                    <button
                                          type="submit"
                                          className="btn-primary"
                                          style={{ padding: "12px", borderRadius: "8px", border: "none", background: "var(--primary)", color: "white", fontWeight: "bold", cursor: "pointer" }}
                                    >
                                          Salvar Alterações
                                    </button>
                              </form>
                        )}

                  </div>
            </div>
      );
}
