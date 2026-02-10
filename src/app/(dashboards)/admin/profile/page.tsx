
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
      const { data: session, update } = useSession();
      const router = useRouter();

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [image, setImage] = useState("");
      const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");
      const [loading, setLoading] = useState(false);

      useEffect(() => {
            if (session?.user) {
                  setName(session.user.name || "");
                  setEmail(session.user.email || "");
                  setImage(session.user.image || "");
            }
      }, [session]);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setMessage("");

            try {
                  const response = await fetch("/api/admin/profile", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, image, password: password || undefined }),
                  });

                  if (response.ok) {
                        const data = await response.json();
                        await update(data); // Update NextAuth session
                        setMessage("Perfil atualizado com sucesso!");
                        setPassword(""); // Clear password field
                  } else {
                        setMessage("Erro ao atualizar perfil.");
                  }
            } catch (error) {
                  setMessage("Erro de conexão.");
            } finally {
                  setLoading(false);
            }
      };

      if (!session) return <p style={{ color: "white" }}>Carregando...</p>;

      return (
            <div className="admin-profile-container" style={{ padding: "20px", color: "white" }}>
                  <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Meu Perfil</h1>

                  <div className="profile-card" style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "30px",
                        borderRadius: "12px",
                        maxWidth: "600px",
                        border: "1px solid var(--border)"
                  }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
                              <div style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    border: "2px solid var(--primary, #cc0000)"
                              }}>
                                    {image ? (
                                          <img src={image} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                          <div style={{ width: "100%", height: "100%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                                                {name.charAt(0)}
                                          </div>
                                    )}
                              </div>
                              <div>
                                    <h2 style={{ fontSize: "1.5rem", margin: 0 }}>{name}</h2>
                                    <p style={{ color: "#aaa", margin: "5px 0" }}>Administrador</p>
                              </div>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                              <div>
                                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Nome</label>
                                    <input
                                          type="text"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", background: "#222", color: "white" }}
                                    />
                              </div>

                              <div>
                                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Email</label>
                                    <input
                                          type="email"
                                          value={email}
                                          disabled
                                          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", background: "#333", color: "#888", cursor: "not-allowed" }}
                                    />
                                    <small style={{ color: "#666" }}>O email não pode ser alterado.</small>
                              </div>

                              <div>
                                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Foto de Perfil (URL)</label>
                                    <input
                                          type="text"
                                          value={image}
                                          onChange={(e) => setImage(e.target.value)}
                                          placeholder="https://exemplo.com/foto.jpg"
                                          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", background: "#222", color: "white" }}
                                    />
                              </div>

                              <div>
                                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Nova Senha (Opcional)</label>
                                    <input
                                          type="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          placeholder="Deixe em branco para manter a atual"
                                          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", background: "#222", color: "white" }}
                                    />
                              </div>

                              {message && (
                                    <div style={{
                                          padding: "10px",
                                          borderRadius: "8px",
                                          background: message.includes("sucesso") ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 0, 0, 0.1)",
                                          color: message.includes("sucesso") ? "#4ade80" : "#f87171",
                                          textAlign: "center"
                                    }}>
                                          {message}
                                    </div>
                              )}

                              <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                          padding: "12px",
                                          background: "var(--gradient-red, linear-gradient(135deg, #cc0000 0%, #ff5c7c 100%))",
                                          color: "white",
                                          border: "none",
                                          borderRadius: "8px",
                                          fontWeight: "bold",
                                          cursor: loading ? "wait" : "pointer",
                                          opacity: loading ? 0.7 : 1
                                    }}
                              >
                                    {loading ? "Salvando..." : "Salvar Alterações"}
                              </button>
                        </form>
                  </div>
            </div>
      );
}
