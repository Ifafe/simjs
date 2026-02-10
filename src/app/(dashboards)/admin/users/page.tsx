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
      const { data: session } = useSession();
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
            } catch (error) {
                  alert("Erro de conexão.");
            }
      };

      const filteredUsers = selectedRole === "ALL"
            ? users
            : users.filter(u => u.role === selectedRole);

      const getRoleBadgeColor = (role: string) => {
            switch (role) {
                  case 'ADMIN': return '#ef4444';
                  case 'PARTNER': return '#3b82f6';
                  case 'JOB_SEEKER': return '#10b981';
                  default: return '#6b7280';
            }
      };

      if (loading) return <div style={{ color: 'white' }}>Carregando utilizadores...</div>;

      return (
            <div>
                  <h1 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Gestão de Utilizadores</h1>

                  <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                        {['ALL', 'VISITOR', 'JOB_SEEKER', 'PARTNER', 'ADMIN'].map(role => (
                              <button
                                    key={role}
                                    onClick={() => setSelectedRole(role)}
                                    style={{
                                          padding: '8px 16px',
                                          borderRadius: '8px',
                                          border: 'none',
                                          background: selectedRole === role ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                          color: 'white',
                                          cursor: 'pointer'
                                    }}
                              >
                                    {role === 'ALL' ? 'Todos' : role}
                              </button>
                        ))}
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
                              <thead>
                                    <tr style={{ background: 'rgba(0,0,0,0.2)', textAlign: 'left' }}>
                                          <th style={{ padding: '16px' }}>Nome</th>
                                          <th style={{ padding: '16px' }}>Email</th>
                                          <th style={{ padding: '16px' }}>Role Atual</th>
                                          <th style={{ padding: '16px' }}>Status Parceiro</th>
                                          <th style={{ padding: '16px' }}>Ações</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {filteredUsers.map((user) => (
                                          <tr key={user.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '16px' }}>{user.name}</td>
                                                <td style={{ padding: '16px' }}>{user.email}</td>
                                                <td style={{ padding: '16px' }}>
                                                      <span style={{
                                                            background: getRoleBadgeColor(user.role),
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 'bold'
                                                      }}>
                                                            {user.role}
                                                      </span>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                      {user.partnerProfile ? (
                                                            <span style={{
                                                                  color: user.partnerProfile.status === 'PENDING' ? '#f59e0b' : '#10b981'
                                                            }}>
                                                                  {user.partnerProfile.status} ({user.partnerProfile.companyName})
                                                            </span>
                                                      ) : '-'}
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                      <select
                                                            value=""
                                                            onChange={(e) => updateUserRole(user.id, e.target.value)}
                                                            style={{
                                                                  background: 'rgba(0,0,0,0.3)',
                                                                  border: '1px solid rgba(255,255,255,0.1)',
                                                                  color: 'white',
                                                                  padding: '6px',
                                                                  borderRadius: '6px'
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
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default AdminUsersPage;
