"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
      id: string;
      name: string;
      email: string;
      role: string;
      partnerProfile?: {
            status: string;
            companyName: string;
      };
      createdAt: string;
}

const AdminUsersPage = () => {
      // session is unused, removing destructuring but keeping hook if needed for auth check implicitly, or remove if middleware handles it. 
      // strictly speaking, we can remove it if not used.
      useSession();
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [selectedRole, setSelectedRole] = useState<string>("ALL");

      useEffect(() => {
            fetchUsers();
      }, []);

      const fetchUsers = async () => {
            try {
                  const res = await fetch("/api/admin/users");
                  if (res.ok) {
                        const data = await res.json();
                        setUsers(data);
                  }
            } catch (error) {
                  console.error("Failed to fetch users", error);
            } finally {
                  setLoading(false);
            }
      };

      const updateUserRole = async (userId: string, newRole: string) => {
            if (!confirm(`Tem certeza que deseja mudar este utilizador para ${newRole}?`)) return;

            try {
                  const res = await fetch(`/api/admin/users/${userId}/role`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ role: newRole }),
                  });

                  if (res.ok) {
                        alert("Role atualizada com sucesso!");
                        fetchUsers();
                  } else {
                        alert("Erro ao atualizar role.");
                  }
            } catch {
                  alert("Erro de conexão.");
            }
      };

      const filteredUsers = selectedRole === "ALL"
            ? users
            : users.filter(u => u.role === selectedRole);

      // Inline styles for badges if classes are missing in template css or we want to be safe
      const getRoleStyle = (role: string) => {
            switch (role) {
                  case 'ADMIN': return { background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
                  case 'PARTNER': return { background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' };
                  case 'JOB_SEEKER': return { background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' };
                  default: return { background: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af' };
            }
      };

      if (loading) return <div style={{ padding: '30px', color: 'var(--text-primary)' }}>Carregando utilizadores...</div>;

      return (
            <div className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Utilizadores</h1>
                              <p>Gerenciar utilizadores do painel</p>
                        </div>
                        {/* Filter Buttons converted to a simple button group or kept as is but styled */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                              {['ALL', 'VISITOR', 'JOB_SEEKER', 'PARTNER', 'ADMIN'].map(role => (
                                    <button
                                          key={role}
                                          onClick={() => setSelectedRole(role)}
                                          className={`btn-secondary ${selectedRole === role ? 'active' : ''}`}
                                          style={{
                                                opacity: selectedRole === role ? 1 : 0.7,
                                                border: selectedRole === role ? '1px solid var(--primary)' : '1px solid transparent'
                                          }}
                                    >
                                          {role === 'ALL' ? 'Todos' : role}
                                    </button>
                              ))}
                        </div>
                  </div>

                  <div className="content-table-wrapper">
                        <table className="content-table">
                              <thead>
                                    <tr>
                                          <th>Nome</th>
                                          <th>Email</th>
                                          <th>Role Atual</th>
                                          <th>Status Parceiro</th>
                                          <th>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {filteredUsers.length === 0 ? (
                                          <tr className="empty-row">
                                                <td colSpan={5}>Nenhum utilizador encontrado</td>
                                          </tr>
                                    ) : (
                                          filteredUsers.map((user) => (
                                                <tr key={user.id}>
                                                      <td>
                                                            <div style={{ fontWeight: 600 }}>{user.name}</div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {user.id.substring(0, 8)}...</div>
                                                      </td>
                                                      <td>{user.email}</td>
                                                      <td>
                                                            <span style={{
                                                                  padding: '4px 8px',
                                                                  borderRadius: '4px',
                                                                  fontSize: '0.75rem',
                                                                  fontWeight: 700,
                                                                  ...getRoleStyle(user.role)
                                                            }}>
                                                                  {user.role}
                                                            </span>
                                                      </td>
                                                      <td>
                                                            {user.partnerProfile ? (
                                                                  <span style={{
                                                                        color: user.partnerProfile.status === 'PENDING' ? '#f59e0b' : '#10b981',
                                                                        fontWeight: 500
                                                                  }}>
                                                                        {user.partnerProfile.status}
                                                                        <br />
                                                                        <small style={{ color: 'var(--text-muted)' }}>{user.partnerProfile.companyName}</small>
                                                                  </span>
                                                            ) : '-'}
                                                      </td>
                                                      <td>
                                                            <select
                                                                  value=""
                                                                  onChange={(e) => updateUserRole(user.id, e.target.value)}
                                                                  style={{
                                                                        background: 'var(--bg-card)',
                                                                        border: '1px solid var(--border)',
                                                                        color: 'var(--text-primary)',
                                                                        padding: '6px 12px',
                                                                        borderRadius: '6px',
                                                                        cursor: 'pointer',
                                                                        outline: 'none'
                                                                  }}
                                                            >
                                                                  <option value="" disabled>Mudar Role...</option>
                                                                  <option value="VISITOR">Visitor</option>
                                                                  <option value="JOB_SEEKER">Job Seeker</option>
                                                                  <option value="PARTNER">Partner (Aprovar)</option>
                                                                  <option value="ADMIN">Admin</option>
                                                            </select>
                                                      </td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default AdminUsersPage;
