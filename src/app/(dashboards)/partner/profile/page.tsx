
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PartnerProfilePage() {
      const { data: session, status } = useSession();
      const router = useRouter();

      const [loading, setLoading] = useState(true);
      const [message, setMessage] = useState("");

      // Form State
      const [formData, setFormData] = useState({
            name: "",
            email: "", // R/O
            image: "",
            companyName: "",
            sector: "",
            bio: "",
            status: "" // R/O
      });

      useEffect(() => {
            if (status === "loading") return;

            // @ts-ignore
            if (!session || session?.user?.role !== "PARTNER") {
                  router.push("/login"); // Redirect
            } else {
                  fetch("/api/partner/profile")
                        .then(res => res.json())
                        .then(data => {
                              if (!data.error) {
                                    setFormData({
                                          name: data.name || "",
                                          email: data.email || "",
                                          image: data.image || "",
                                          companyName: data.companyName || "",
                                          sector: data.sector || "",
                                          bio: data.bio || "",
                                          status: data.status || ""
                                    });
                              }
                              setLoading(false);
                        })
                        .catch(err => setLoading(false));
            }
      }, [session, status, router]);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setMessage("");

            try {
                  const res = await fetch("/api/partner/profile", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                  });

                  if (res.ok) {
                        setMessage("Perfil atualizado com sucesso!");
                        setTimeout(() => setMessage(""), 3000);
                  } else {
                        setMessage("Erro ao atualizar perfil.");
                  }
            } catch (error) {
                  setMessage("Erro de conexão.");
            }
      };

      if (loading) return <div style={{ padding: "30px", color: "white" }}>Carregando perfil...</div>;

      return (
            <div style={{ padding: "30px", color: "white", maxWidth: "800px" }}>
                  <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>Meu Perfil de Parceiro</h1>

                  <form onSubmit={handleSubmit} style={{ background: "var(--bg-card)", padding: "30px", borderRadius: "12px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "25px" }}>

                        {/* Status Check */}
                        <div style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#888" }}>Status da Conta</span>
                              <span style={{
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    background: formData.status === 'ACTIVE' ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                                    color: formData.status === 'ACTIVE' ? "#10b981" : "#f59e0b"
                              }}>
                                    {formData.status === 'ACTIVE' ? 'ATIVA' : 'EM ANÁLISE'}
                              </span>
                        </div>

                        <h3 style={{ borderBottom: "1px solid #333", paddingBottom: "10px", margin: 0 }}>Dados da Empresa</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                              <div>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Nome da Empresa</label>
                                    <input
                                          required
                                          type="text"
                                          value={formData.companyName}
                                          onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                                    />
                              </div>
                              <div>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Setor de Atuação</label>
                                    <input
                                          required
                                          type="text"
                                          value={formData.sector}
                                          onChange={e => setFormData({ ...formData, sector: e.target.value })}
                                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                                    />
                              </div>
                        </div>

                        <div>
                              <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Sobre a Empresa (Bio)</label>
                              <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Descreva brevemente a sua empresa..."
                                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white", resize: "vertical" }}
                              />
                        </div>

                        <h3 style={{ borderBottom: "1px solid #333", paddingBottom: "10px", margin: "10px 0 0" }}>Representante</h3>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                              <div>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Nome Completo</label>
                                    <input
                                          required
                                          type="text"
                                          value={formData.name}
                                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                                    />
                              </div>
                              <div>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Email (Não editável)</label>
                                    <input
                                          disabled
                                          type="email"
                                          value={formData.email}
                                          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", background: "#1a1a1a", color: "#888", cursor: "not-allowed" }}
                                    />
                              </div>
                        </div>

                        <div>
                              <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>URL da Foto / Logo</label>
                              <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://exemplo.com/logo.png"
                                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#222", color: "white" }}
                              />
                              {formData.image && (
                                    <div style={{ marginTop: "10px" }}>
                                          <img src={formData.image} alt="Preview" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", border: "2px solid #555" }} />
                                    </div>
                              )}
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

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                              <button
                                    type="button"
                                    onClick={() => router.push("/partner")}
                                    style={{ padding: "12px 20px", borderRadius: "8px", border: "1px solid #555", background: "transparent", color: "#aaa", cursor: "pointer" }}
                              >
                                    Cancelar
                              </button>
                              <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ padding: "12px 24px", borderRadius: "8px", border: "none", background: "var(--primary)", color: "white", fontWeight: "bold", cursor: "pointer" }}
                              >
                                    Salvar Alterações
                              </button>
                        </div>
                  </form>
            </div>
      );
}
