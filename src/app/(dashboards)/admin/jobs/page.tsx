
"use client";

import { useEffect, useState } from "react";

interface Job {
      id: number;
      title: string;
      location: string;
      type: string;
      description: string;
      salary: string;
      active: boolean;
      _count: {
            applications: number;
      };
}

export default function AdminJobsPage() {
      const [jobs, setJobs] = useState<Job[]>([]);
      const [loading, setLoading] = useState(true);
      const [showModal, setShowModal] = useState(false);
      const [formData, setFormData] = useState({
            title: "",
            location: "Luanda",
            type: "Full-time",
            description: "",
            salary: "",
      });
      const [editingId, setEditingId] = useState<number | null>(null);

      const fetchJobs = async () => {
            try {
                  const res = await fetch("/api/admin/jobs");
                  if (res.ok) {
                        const data = await res.json();
                        setJobs(data);
                  }
            } catch (error) {
                  console.error("Failed to fetch jobs");
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchJobs();
      }, []);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const url = editingId ? `/api/admin/jobs/${editingId}` : "/api/admin/jobs";
            const method = editingId ? "PATCH" : "POST";

            try {
                  const res = await fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                  });

                  if (res.ok) {
                        setShowModal(false);
                        setEditingId(null);
                        setFormData({ title: "", location: "Luanda", type: "Full-time", description: "", salary: "" });
                        fetchJobs();
                  }
            } catch (error) {
                  alert("Erro ao salvar vaga");
            }
      };

      const handleEdit = (job: Job) => {
            setEditingId(job.id);
            setFormData({
                  title: job.title,
                  location: job.location,
                  type: job.type,
                  description: job.description,
                  salary: job.salary || "",
            });
            setShowModal(true);
      };

      const handleDelete = async (id: number) => {
            if (!confirm("Tem a certeza que deseja eliminar esta vaga?")) return;
            try {
                  const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
                  if (res.ok) fetchJobs();
            } catch (error) {
                  alert("Erro ao eliminar");
            }
      };

      const toggleActive = async (id: number, currentStatus: boolean) => {
            try {
                  const res = await fetch(`/api/admin/jobs/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ active: !currentStatus }),
                  });
                  if (res.ok) fetchJobs();
            } catch (error) {
                  alert("Erro ao alterar status");
            }
      };

      if (loading) return <div style={{ color: "white", padding: "20px" }}>Carregando vagas...</div>;

      return (
            <div style={{ padding: "30px", color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                        <h1 style={{ fontSize: "2rem", margin: 0 }}>Gestão de Vagas</h1>
                        <button
                              onClick={() => {
                                    setEditingId(null);
                                    setFormData({ title: "", location: "Luanda", type: "Full-time", description: "", salary: "" });
                                    setShowModal(true);
                              }}
                              className="btn-primary"
                              style={{ background: "var(--primary)", padding: "10px 20px", borderRadius: "8px", border: "none", color: "white", cursor: "pointer" }}
                        >
                              <i className="fas fa-plus" style={{ marginRight: "8px" }}></i> Nova Vaga
                        </button>
                  </div>

                  <div style={{ background: "var(--bg-card, #1a1a1a)", borderRadius: "12px", border: "1px solid var(--border, #333)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                              <thead>
                                    <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left" }}>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Título</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Local</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Tipo</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Candidaturas</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Status</th>
                                          <th style={{ padding: "15px", fontWeight: "600", color: "#aaa" }}>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {jobs.length === 0 ? (
                                          <tr>
                                                <td colSpan={6} style={{ padding: "30px", textAlign: "center", color: "#666" }}>
                                                      Nenhuma vaga publicada.
                                                </td>
                                          </tr>
                                    ) : (
                                          jobs.map(job => (
                                                <tr key={job.id} style={{ borderBottom: "1px solid #333" }}>
                                                      <td style={{ padding: "15px", fontWeight: "bold" }}>{job.title}</td>
                                                      <td style={{ padding: "15px" }}>{job.location}</td>
                                                      <td style={{ padding: "15px" }}>
                                                            <span style={{ background: "rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem" }}>
                                                                  {job.type}
                                                            </span>
                                                      </td>
                                                      <td style={{ padding: "15px", textAlign: "center" }}>
                                                            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{job._count?.applications || 0}</span>
                                                      </td>
                                                      <td style={{ padding: "15px" }}>
                                                            <button
                                                                  onClick={() => toggleActive(job.id, job.active)}
                                                                  style={{
                                                                        padding: "4px 10px",
                                                                        borderRadius: "20px",
                                                                        fontSize: "0.75rem",
                                                                        fontWeight: "bold",
                                                                        background: job.active ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                                                                        color: job.active ? "#10b981" : "#ef4444",
                                                                        border: "none",
                                                                        cursor: "pointer"
                                                                  }}
                                                            >
                                                                  {job.active ? 'ATIVA' : 'INATIVA'}
                                                            </button>
                                                      </td>
                                                      <td style={{ padding: "15px" }}>
                                                            <div style={{ display: "flex", gap: "10px" }}>
                                                                  <button onClick={() => handleEdit(job)} style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }} title="Editar">
                                                                        <i className="fas fa-edit"></i>
                                                                  </button>
                                                                  <button onClick={() => handleDelete(job.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }} title="Eliminar">
                                                                        <i className="fas fa-trash"></i>
                                                                  </button>
                                                            </div>
                                                      </td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </div>

                  {showModal && (
                        <div style={{
                              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                              background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
                        }}>
                              <div style={{
                                    background: "#1e1e1e", padding: "30px", borderRadius: "12px", width: "500px", maxWidth: "90%",
                                    border: "1px solid #333", position: "relative"
                              }}>
                                    <h2 style={{ marginTop: 0, marginBottom: "20px" }}>{editingId ? "Editar Vaga" : "Nova Vaga"}</h2>
                                    <button
                                          onClick={() => setShowModal(false)}
                                          style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "#aaa", fontSize: "1.2rem", cursor: "pointer" }}
                                    >
                                          <i className="fas fa-times"></i>
                                    </button>

                                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                          <div>
                                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Título do Cargo</label>
                                                <input
                                                      required
                                                      type="text"
                                                      value={formData.title}
                                                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "white" }}
                                                />
                                          </div>

                                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                                <div>
                                                      <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Localização</label>
                                                      <input
                                                            required
                                                            type="text"
                                                            value={formData.location}
                                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "white" }}
                                                      />
                                                </div>
                                                <div>
                                                      <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Tipo</label>
                                                      <select
                                                            value={formData.type}
                                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "white" }}
                                                      >
                                                            <option>Full-time</option>
                                                            <option>Part-time</option>
                                                            <option>Remote</option>
                                                            <option>Híbrido</option>
                                                            <option>Freelance</option>
                                                            <option>Estágio</option>
                                                      </select>
                                                </div>
                                          </div>

                                          <div>
                                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Salário (Opcional)</label>
                                                <input
                                                      type="text"
                                                      value={formData.salary}
                                                      onChange={e => setFormData({ ...formData, salary: e.target.value })}
                                                      placeholder="Ex: 500.000 Kz - 800.000 Kz"
                                                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "white" }}
                                                />
                                          </div>

                                          <div>
                                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Descrição</label>
                                                <textarea
                                                      required
                                                      rows={5}
                                                      value={formData.description}
                                                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", background: "#2a2a2a", color: "white", resize: "vertical" }}
                                                ></textarea>
                                          </div>

                                          <button
                                                type="submit"
                                                className="btn-primary"
                                                style={{ marginTop: "10px", padding: "12px", borderRadius: "8px", border: "none", background: "var(--primary)", color: "white", fontWeight: "bold", cursor: "pointer" }}
                                          >
                                                {editingId ? "Atualizar Vaga" : "Publicar Vaga"}
                                          </button>
                                    </form>
                              </div>
                        </div>
                  )}
            </div>
      );
}
