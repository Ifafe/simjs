"use client";

export default function LanguagePage() {
      return (
            <section className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Idioma</h1>
                              <p>Gerencie os idiomas e traduções do site</p>
                        </div>
                  </div>

                  <div className="form-card">
                        <div style={{ textAlign: "center", padding: "40px 20px" }}>
                              <i className="fas fa-tools" style={{ fontSize: "40px", marginBottom: "20px", color: "var(--primary)" }}></i>
                              <h2 style={{ marginBottom: "10px" }}>Funcionalidade em Breve</h2>
                              <p style={{ color: "var(--text-muted)" }}>
                                    A gestão de idiomas estará disponível em uma próxima atualização.
                              </p>
                        </div>
                  </div>
            </section>
      );
}
