
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
                  console.error("Failed to fetch jobs", error);
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
                  console.error(error);
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
                  console.error(error);
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
                  console.error(error);
            }
      };

      if (loading) return <div style={{ padding: "30px", color: "var(--text-primary)" }}>Carregando vagas...</div>;

      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Gestão de Vagas</h1>
                              <p>Gerenciar oportunidades de emprego</p>
                        </div>
                        <button
                              onClick={() => {
                                    setEditingId(null);
                                    setFormData({ title: "", location: "Luanda", type: "Full-time", description: "", salary: "" });
                                    setShowModal(true);
                              }}
                              className="btn-primary"
                        >
                              <i className="fas fa-plus"></i> Nova Vaga
                        </button>
                  </div>

                  <div className="content-table-wrapper">
                        <table className="content-table">
                              <thead>
                                    <tr>
                                          <th>Título</th>
                                          <th>Local</th>
                                          <th>Tipo</th>
                                          <th>Candidaturas</th>
                                          <th>Status</th>
                                          <th>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {jobs.length === 0 ? (
                                          <tr className="empty-row">
                                                <td colSpan={6}>Nenhuma vaga publicada.</td>
                                          </tr>
                                    ) : (
                                          jobs.map(job => (
                                                <tr key={job.id}>
                                                      <td style={{ fontWeight: 600 }}>{job.title}</td>
                                                      <td>{job.location}</td>
                                                      <td>
                                                            <span style={{ background: "var(--bg-hover)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem" }}>
                                                                  {job.type}
                                                            </span>
                                                      </td>
                                                      <td style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                            {job._count?.applications || 0}
                                                      </td>
                                                      <td>
                                                            <button
                                                                  onClick={() => toggleActive(job.id, job.active)}
                                                                  className={`status-badge ${job.active ? 'status-published' : 'status-archived'}`}
                                                                  style={{ border: 'none', cursor: 'pointer' }}
                                                            >
                                                                  {job.active ? 'ATIVA' : 'INATIVA'}
                                                            </button>
                                                      </td>
                                                      <td>
                                                            <div className="action-buttons">
                                                                  <button onClick={() => handleEdit(job)} className="btn-icon" title="Editar">
                                                                        <i className="fas fa-edit"></i>
                                                                  </button>
                                                                  <button onClick={() => handleDelete(job.id)} className="btn-icon delete" title="Eliminar">
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

                  {/* Modal */}
                  {showModal && (
                        <div className="modal show" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div className="modal-content" style={{ margin: 'auto', maxWidth: '600px', width: '90%' }}>
                                    <div className="modal-header">
                                          <h2>{editingId ? "Editar Vaga" : "Nova Vaga"}</h2>
                                          <button className="modal-close" onClick={() => setShowModal(false)}>
                                                <i className="fas fa-times"></i>
                                          </button>
                                    </div>
                                    <div className="modal-body">
                                          <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                      <label>Título do Cargo</label>
                                                      <input
                                                            required
                                                            type="text"
                                                            value={formData.title}
                                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                            placeholder="Ex: Desenvolvedor Senior"
                                                      />
                                                </div>

                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                                      <div className="form-group">
                                                            <label>Localização</label>
                                                            <input
                                                                  required
                                                                  type="text"
                                                                  value={formData.location}
                                                                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                            />
                                                      </div>
                                                      <div className="form-group">
                                                            <label>Tipo</label>
                                                            <select
                                                                  value={formData.type}
                                                                  onChange={e => setFormData({ ...formData, type: e.target.value })}
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

                                                <div className="form-group">
                                                      <label>Salário (Opcional)</label>
                                                      <input
                                                            type="text"
                                                            value={formData.salary}
                                                            onChange={e => setFormData({ ...formData, salary: e.target.value })}
                                                            placeholder="Ex: 500.000 Kz - 800.000 Kz"
                                                      />
                                                </div>

                                                <div className="form-group">
                                                      <label>Descrição</label>
                                                      <textarea
                                                            required
                                                            rows={5}
                                                            value={formData.description}
                                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                            style={{ resize: "vertical" }}
                                                      ></textarea>
                                                </div>

                                                <div className="modal-footer" style={{ padding: 0, marginTop: '20px', border: 'none' }}>
                                                      <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                                                            Cancelar
                                                      </button>
                                                      <button type="submit" className="btn-primary">
                                                            {editingId ? "Atualizar" : "Publicar"}
                                                      </button>
                                                </div>
                                          </form>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}
