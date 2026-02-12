
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
                  console.error("Failed to fetch partners", error);
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
                  console.error(error);
            }
      };

      if (loading) return <div style={{ padding: '30px', color: 'var(--text-primary)' }}>Carregando parceiros...</div>;

      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Gestão de Parceiros</h1>
                              <p>Gerenciar empresas parceiras e aprovações</p>
                        </div>
                        <button className="btn-primary">
                              <i className="fas fa-plus"></i> Novo Parceiro
                        </button>
                  </div>

                  <div className="content-table-wrapper">
                        <table className="content-table">
                              <thead>
                                    <tr>
                                          <th>Empresa</th>
                                          <th>Representante</th>
                                          <th>Setor</th>
                                          <th>Status</th>
                                          <th>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {partners.length === 0 ? (
                                          <tr className="empty-row">
                                                <td colSpan={5}>Nenhum parceiro registado.</td>
                                          </tr>
                                    ) : (
                                          partners.map(p => (
                                                <tr key={p.id}>
                                                      {/* Company Name */}
                                                      <td>
                                                            {editingId === p.id ? (
                                                                  <input
                                                                        type="text"
                                                                        value={editCompany}
                                                                        onChange={e => setEditCompany(e.target.value)}
                                                                        className="form-control"
                                                                        style={{ maxWidth: '150px' }}
                                                                  />
                                                            ) : (
                                                                  <span style={{ fontWeight: 600 }}>{p.companyName}</span>
                                                            )}
                                                      </td>

                                                      {/* User Info */}
                                                      <td>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                  {p.user.image ? (
                                                                        <Image
                                                                              src={p.user.image}
                                                                              alt={p.user.name}
                                                                              width={32}
                                                                              height={32}
                                                                              style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                                        />
                                                                  ) : (
                                                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                                              {p.user.name?.charAt(0)}
                                                                        </div>
                                                                  )}
                                                                  <div>
                                                                        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{p.user.name}</div>
                                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.user.email}</div>
                                                                  </div>
                                                            </div>
                                                      </td>

                                                      {/* Sector */}
                                                      <td>
                                                            {editingId === p.id ? (
                                                                  <input
                                                                        type="text"
                                                                        value={editSector}
                                                                        onChange={e => setEditSector(e.target.value)}
                                                                        className="form-control"
                                                                        style={{ maxWidth: '120px' }}
                                                                  />
                                                            ) : (
                                                                  <span style={{ fontSize: '0.9rem' }}>{p.sector}</span>
                                                            )}
                                                      </td>

                                                      {/* Status */}
                                                      <td>
                                                            {editingId === p.id ? (
                                                                  <select
                                                                        value={editStatus}
                                                                        onChange={e => setEditStatus(e.target.value)}
                                                                        className="form-control"
                                                                        style={{ maxWidth: '130px' }}
                                                                  >
                                                                        <option value="PENDING">Pendente</option>
                                                                        <option value="ACTIVE">Ativo</option>
                                                                        <option value="INACTIVE">Inativo</option>
                                                                  </select>
                                                            ) : (
                                                                  <span className={`status-badge ${p.status === 'ACTIVE' ? 'status-published' : p.status === 'PENDING' ? 'status-draft' : 'status-archived'}`}>
                                                                        {p.status === 'ACTIVE' ? 'Ativo' :
                                                                              p.status === 'PENDING' ? 'Pendente' : 'Inativo'}
                                                                  </span>
                                                            )}
                                                      </td>

                                                      {/* Actions */}
                                                      <td>
                                                            {editingId === p.id ? (
                                                                  <div className="action-buttons">
                                                                        <button onClick={() => handleSave(p.id)} className="btn-icon" title="Salvar" style={{ color: '#10b981' }}>
                                                                              <i className="fas fa-check"></i>
                                                                        </button>
                                                                        <button onClick={() => setEditingId(null)} className="btn-icon" title="Cancelar" style={{ color: '#ef4444' }}>
                                                                              <i className="fas fa-times"></i>
                                                                        </button>
                                                                  </div>
                                                            ) : (
                                                                  <div className="action-buttons">
                                                                        <button onClick={() => handleEditClick(p)} className="btn-icon" title="Editar">
                                                                              <i className="fas fa-edit"></i>
                                                                        </button>
                                                                        <button className="btn-icon delete" title="Remover">
                                                                              <i className="fas fa-trash"></i>
                                                                        </button>
                                                                  </div>
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
