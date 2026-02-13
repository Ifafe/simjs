"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThemePage() {
      const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [theme, setTheme] = useState({
            theme_primary: "#ff1744",
            theme_primary_dark: "#cc0000",
            theme_header_bg: "#000000",
            theme_body_bg: "#0a0202",
      });

      useEffect(() => {
            fetch("/api/theme")
                  .then((res) => res.json())
                  .then((data) => {
                        if (Object.keys(data).length > 0) {
                              setTheme((prev) => ({ ...prev, ...data }));
                        }
                        setLoading(false);
                  })
                  .catch((err) => {
                        console.error("Failed to load theme");
                        setLoading(false);
                  });
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setTheme((prev) => ({ ...prev, [name]: value }));

            // Live preview (optional, strictly for admin feeling)
            document.documentElement.style.setProperty(`--admin-${name.replace("theme_", "")}`, value);
      };

      const handleSubmit = async () => {
            setSaving(true);
            try {
                  const res = await fetch("/api/theme", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(theme),
                  });

                  if (!res.ok) throw new Error("Failed to save");
                  alert("Tema atualizado com sucesso!");
                  router.refresh();
            } catch (error) {
                  alert("Erro ao salvar tema.");
            } finally {
                  setSaving(false);
            }
      };

      if (loading) return <div className="p-8">Carregando...</div>;

      return (
            <section className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Personalização de Tema</h1>
                              <p>Altere as cores principais do site</p>
                        </div>
                        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                              <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i> {saving ? 'Guardando...' : 'Guardar Alterações'}
                        </button>
                  </div>

                  <div className="form-card">
                        <h2>Cores do Brand</h2>
                        <div className="form-row">
                              <div className="form-group">
                                    <label>Cor Primária (Destaque)</label>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                          <input
                                                type="color"
                                                name="theme_primary"
                                                value={theme.theme_primary}
                                                onChange={handleChange}
                                                style={{ width: "50px", height: "50px", padding: 0, border: "none", cursor: "pointer" }}
                                          />
                                          <input
                                                type="text"
                                                name="theme_primary"
                                                value={theme.theme_primary}
                                                onChange={handleChange}
                                          />
                                    </div>
                              </div>
                              <div className="form-group">
                                    <label>Cor Primária (Escura/Hover)</label>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                          <input
                                                type="color"
                                                name="theme_primary_dark"
                                                value={theme.theme_primary_dark}
                                                onChange={handleChange}
                                                style={{ width: "50px", height: "50px", padding: 0, border: "none", cursor: "pointer" }}
                                          />
                                          <input
                                                type="text"
                                                name="theme_primary_dark"
                                                value={theme.theme_primary_dark}
                                                onChange={handleChange}
                                          />
                                    </div>
                              </div>
                        </div>

                        <h2>Estrutura</h2>
                        <div className="form-row">
                              <div className="form-group">
                                    <label>Diferente do Fundo (Body)</label>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                          <input
                                                type="color"
                                                name="theme_body_bg"
                                                value={theme.theme_body_bg}
                                                onChange={handleChange}
                                                style={{ width: "50px", height: "50px", padding: 0, border: "none", cursor: "pointer" }}
                                          />
                                          <input
                                                type="text"
                                                name="theme_body_bg"
                                                value={theme.theme_body_bg}
                                                onChange={handleChange}
                                          />
                                    </div>
                              </div>
                              <div className="form-group">
                                    <label>Cabeçalho (Header)</label>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                          <input
                                                type="color"
                                                name="theme_header_bg"
                                                value={theme.theme_header_bg}
                                                onChange={handleChange}
                                                style={{ width: "50px", height: "50px", padding: 0, border: "none", cursor: "pointer" }}
                                          />
                                          <input
                                                type="text"
                                                name="theme_header_bg"
                                                value={theme.theme_header_bg}
                                                onChange={handleChange}
                                          />
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
}
