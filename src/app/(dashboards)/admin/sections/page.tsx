"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SectionsPage() {
      const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [sections, setSections] = useState({
            section_hero_enabled: true,
            section_about_enabled: true,
            section_services_enabled: true,
            section_stats_enabled: true,
            section_projects_enabled: true,
            section_team_enabled: true,
            section_testimonials_enabled: true,
            section_contact_enabled: true,
      });

      useEffect(() => {
            fetch("/api/sections")
                  .then((res) => res.json())
                  .then((data) => {
                        // Merge with defaults
                        setSections((prev) => ({ ...prev, ...data }));
                        setLoading(false);
                  })
                  .catch((err) => {
                        console.error("Failed to load sections", err);
                        setLoading(false);
                  });
      }, []);

      const handleToggle = (key: string) => {
            setSections((prev) => ({
                  ...prev,
                  // @ts-ignore
                  [key]: !prev[key]
            }));
      };

      const handleSubmit = async () => {
            setSaving(true);
            try {
                  const res = await fetch("/api/sections", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(sections),
                  });

                  if (!res.ok) throw new Error("Failed to save");
                  alert("Visibilidade das seções atualizada!");
                  router.refresh();
            } catch (error) {
                  alert("Erro ao salvar. Tente novamente.");
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
                              <h1>Gerenciar Seções</h1>
                              <p>Ative ou desative seções da Página Inicial</p>
                        </div>
                        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                              <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i> {saving ? 'Guardando...' : 'Guardar Alterações'}
                        </button>
                  </div>

                  <div className="form-card">
                        <h2>Visibilidade da Home</h2>

                        {Object.keys(sections).map((key) => {
                              // @ts-ignore
                              const isEnabled = sections[key];
                              let label = key.replace("section_", "").replace("_enabled", "");
                              // Translate labels
                              const labels: any = {
                                    hero: "Banner Principal (Hero)",
                                    about: "Sobre Nós",
                                    services: "Nossos Serviços",
                                    stats: "Estatísticas (Contadores)",
                                    projects: "Projetos Recentes",
                                    team: "Nossa Equipa",
                                    testimonials: "Depoimentos",
                                    contact: "Formulário de Contato",
                              };
                              label = labels[label] || label;

                              return (
                                    <div className="form-group" key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid var(--border)" }}>
                                          <label style={{ margin: 0 }}>{label}</label>
                                          <div
                                                onClick={() => handleToggle(key)}
                                                style={{
                                                      width: "50px",
                                                      height: "26px",
                                                      background: isEnabled ? "var(--primary)" : "#333",
                                                      borderRadius: "13px",
                                                      position: "relative",
                                                      cursor: "pointer",
                                                      transition: "background 0.3s"
                                                }}
                                          >
                                                <div style={{
                                                      width: "20px",
                                                      height: "20px",
                                                      background: "#fff",
                                                      borderRadius: "50%",
                                                      position: "absolute",
                                                      top: "3px",
                                                      left: isEnabled ? "27px" : "3px",
                                                      transition: "left 0.3s"
                                                }}></div>
                                          </div>
                                    </div>
                              )
                        })}
                  </div>
            </section>
      );
}
