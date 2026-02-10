
"use client";

import { useEffect, useState } from "react";

interface Partner {
      id: number;
      companyName: string;
      sector: string;
      status: string;
      bio?: string;
      user: {
            name: string;
            email: string;
            image?: string;
            role: string;
      };
}

export default function AdminPartnersPage() {
      const [partners, setPartners] = useState<Partner[]>([]);
      const [loading, setLoading] = useState(true);
      const [editingId, setEditingId] = useState<number | null>(null);

      // Edit Form State
      const [editStatus, setEditStatus] = useState("");
      const [editCompany, setEditCompany] = useState("");
      const [editSector, setEditSector] = useState("");

      const fetchPartners = async () => {
            try {
                  const res = await fetch("/api/admin/partners");
                  if (res.ok) {
                        const data = await res.json();
                        setPartners(data);
                  }
            } catch (error) {
                  console.error("Failed to fetch partners");
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchPartners();
      }, []);

      const handleEditClick = (partner: Partner) => {
            setEditingId(partner.id);
            setEditStatus(partner.status);
            setEditCompany(partner.companyName);
            setEditSector(partner.sector);
      };

      const handleSave = async (id: number) => {
            try {
                  const res = await fetch(`/api/admin/partners/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                              status: editStatus,
                              companyName: editCompany,
                              sector: editSector
                        })
                  });

                  if (res.ok) {
                        setEditingId(null);
                        fetchPartners(); // Refresh links/roles
                  }
            } catch (error) {
                  alert("Erro ao salvar");
            }
      };

      if (loading) return <div style={{ color: "white", padding: "20px" }}>Carregando parceiros...</div>;

      return (
            <div style={{ padding: "30px", color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                        <h1 style={{ fontSize: "2rem", margin: 0 }}>Gestão de Parceiros</h1>
                        <button className="btn-primary" style={{ background: "var(--primary)", padding: "10px 20px", borderRadius: "8px", border: "none", color: "white", cursor: "pointer" }}>
                              <i className="fas fa-plus" style={{ marginRight: "8px" }}></i> Novo Parceiro
                        </button>
                  </div>

                  <div style={{ background: "var(--bg-card, #1a1a1a)", borderRadius: "12px", border: "1px solid var(--border, #333)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                              <thead>
                                    <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left" }}>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Empresa</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Representante</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Setor</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Status</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {partners.length === 0 ? (
                                          <tr>
                                                <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "#666" }}>
                                                      Nenhum parceiro registado.
                                                </td>
                                          </tr>
                                    ) : (
                                          partners.map(p => (
                                                <tr key={p.id} style={{ borderBottom: "1px solid #333" }}>
                                                      {/* Company Name */}
                                                      <td style={{ padding: "15px" }}>
                                                            {editingId === p.id ? (
                                                                  <input
                                                                        type="text"
                                                                        value={editCompany}
                                                                        onChange={e => setEditCompany(e.target.value)}
                                                                        style={{ background: "#222", border: "1px solid #444", color: "white", padding: "5px", borderRadius: "4px" }}
                                                                  />
                                                            ) : (
                                                                  <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{p.companyName}</span>
                                                            )}
                                                      </td>

                                                      {/* User Info */}
                                                      <td style={{ padding: "15px" }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                                                                  {p.user.image ? (
                                                                        <img src={p.user.image} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                                                                  ) : (
                                                                        <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                              {p.user.name?.charAt(0)}
                                                                        </div>
                                                                  )}
                                                                  <div style={{ display: "flex", flexDirection: "column" }}>
                                                                        <div style={{ fontSize: "0.9rem" }}>{p.user.name}</div>
                                                                        <div style={{ fontSize: "0.8rem", color: "#888" }}>{p.user.email}</div>
                                                                  </div>
                                                            </div>
                                                      </td>

                                                      {/* Sector */}
                                                      <td style={{ padding: "15px" }}>
                                                            {editingId === p.id ? (
                                                                  <input
                                                                        type="text"
                                                                        value={editSector}
                                                                        onChange={e => setEditSector(e.target.value)}
                                                                        style={{ background: "#222", border: "1px solid #444", color: "white", padding: "5px", borderRadius: "4px" }}
                                                                  />
                                                            ) : (
                                                                  <span style={{ background: "rgba(255,255,255,0.05)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem" }}>
                                                                        {p.sector}
                                                                  </span>
                                                            )}
                                                      </td>

                                                      {/* Status */}
                                                      <td style={{ padding: "15px" }}>
                                                            {editingId === p.id ? (
                                                                  <select
                                                                        value={editStatus}
                                                                        onChange={e => setEditStatus(e.target.value)}
                                                                        style={{ background: "#222", border: "1px solid #444", color: "white", padding: "5px", borderRadius: "4px" }}
                                                                  >
                                                                        <option value="PENDING">Pendente</option>
                                                                        <option value="ACTIVE">Ativo</option>
                                                                        <option value="INACTIVE">Inativo</option>
                                                                  </select>
                                                            ) : (
                                                                  <span style={{
                                                                        padding: "4px 10px",
                                                                        borderRadius: "20px",
                                                                        fontSize: "0.75rem",
                                                                        fontWeight: "bold",
                                                                        background: p.status === 'ACTIVE' ? "rgba(16, 185, 129, 0.2)" :
                                                                              p.status === 'PENDING' ? "rgba(245, 158, 11, 0.2)" : "rgba(239, 68, 68, 0.2)",
                                                                        color: p.status === 'ACTIVE' ? "#10b981" :
                                                                              p.status === 'PENDING' ? "#f59e0b" : "#ef4444"
                                                                  }}>
                                                                        {p.status === 'ACTIVE' ? 'ATIVO' :
                                                                              p.status === 'PENDING' ? 'PENDENTE' : 'INATIVO'}
                                                                  </span>
                                                            )}
                                                      </td>

                                                      {/* Actions */}
                                                      <td style={{ padding: "15px" }}>
                                                            {editingId === p.id ? (
                                                                  <div style={{ display: "flex", gap: "10px" }}>
                                                                        <button onClick={() => handleSave(p.id)} style={{ color: "#10b981", background: "none", border: "none", cursor: "pointer" }}><i className="fas fa-check"></i></button>
                                                                        <button onClick={() => setEditingId(null)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}><i className="fas fa-times"></i></button>
                                                                  </div>
                                                            ) : (
                                                                  <button onClick={() => handleEditClick(p)} style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}>
                                                                        <i className="fas fa-edit"></i>
                                                                  </button>
                                                            )}
                                                      </td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}
