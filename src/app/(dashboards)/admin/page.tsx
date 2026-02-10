"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminManagerDashboard = () => {
      const router = useRouter(); // Use useRouter for navigation
      const { data: session, status } = useSession();
      const [isAuthorized, setIsAuthorized] = useState(false);
      const [stats, setStats] = useState({
            users: 450,
            partners: 32,
            applications: 128,
            serverStatus: "Online"
      });

      useEffect(() => {
            if (status === "loading") return;

            // @ts-ignore
            if (!session || session?.user?.role !== "ADMIN") {
                  router.push("/login"); // Redirect if not admin
            } else {
                  setIsAuthorized(true);
                  // Fetch Stats
                  fetch("/api/admin/stats")
                        .then(res => res.json())
                        .then(data => {
                              if (data && !data.error) {
                                    setStats(data);
                              }
                        })
                        .catch(err => console.error("Error loading stats:", err));
            }
      }, [session, status, router]);

      if (!isAuthorized) {
            return null; // Or a loading spinner
      }

      return (
            <div className="admin-manager-dashboard">
                  <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                              <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Gestão Global</h1>
                              <p style={{ color: 'var(--text-muted)' }}>Controle total sobre o ecossistema SIMJS.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                              <button style={{ padding: '12px 24px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'white', borderRadius: '12px', cursor: 'pointer' }}>
                                    <i className="fas fa-download"></i> Relatórios
                              </button>
                              <button className="btn-cta">
                                    <i className="fas fa-plus"></i> Novo Item
                              </button>
                        </div>
                  </header>

                  {/* Global Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                        {[
                              { label: "Total Utilizadores", value: stats.users, icon: "fa-users", color: "#3b82f6" },
                              { label: "Parceiros Ativos", value: stats.partners, icon: "fa-handshake", color: "#10b981" },
                              { label: "Candidaturas", value: stats.applications, icon: "fa-briefcase", color: "#f59e0b" },
                              { label: "Status Sistema", value: stats.serverStatus, icon: "fa-server", color: "#6366f1" }
                        ].map((s, i) => (
                              <div key={i} style={{
                                    background: 'var(--bg-card)',
                                    padding: '25px',
                                    borderRadius: '24px',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px'
                              }}>
                                    <div style={{
                                          width: '50px',
                                          height: '50px',
                                          borderRadius: '16px',
                                          background: `rgba(${i === 0 ? '59, 130, 246' : i === 1 ? '16, 185, 129' : i === 2 ? '245, 158, 11' : '99, 102, 241'}, 0.1)`,
                                          color: s.color,
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '1.2rem'
                                    }}>
                                          <i className={`fas ${s.icon}`}></i>
                                    </div>
                                    <div>
                                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
                                          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
                                    </div>
                              </div>
                        ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        {/* System Logs / Recent Actions */}
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', padding: '30px', border: '1px solid var(--border)' }}>
                              <h3 style={{ marginBottom: '25px' }}><i className="fas fa-list-ul"></i> Atividades do Sistema</h3>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {[
                                          { user: "Admin", action: "Atualizou a Hero Section", time: "Há 5 min", type: "UPDATE" },
                                          { user: "Sistema", action: "Novo backup gerado", time: "Há 1 hora", type: "INFO" },
                                          { user: "Joana", action: "Nova candidatura: Eng. Software", time: "Há 2 horas", type: "ADD" }
                                    ].map((log, i) => (
                                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                                <div style={{ display: 'flex', gap: '15px' }}>
                                                      <span style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            borderRadius: '50%',
                                                            background: log.type === 'UPDATE' ? '#3b82f6' : log.type === 'ADD' ? '#10b981' : '#6b7280',
                                                            marginTop: '6px'
                                                      }}></span>
                                                      <div>
                                                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{log.user}</span>
                                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{log.action}</p>
                                                      </div>
                                                </div>
                                                <small style={{ color: 'var(--text-muted)' }}>{log.time}</small>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Quick Management */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                              <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '30px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ marginBottom: '20px' }}>Atalhos de Gestão</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                          {[
                                                { name: "Editar CMS", icon: "fa-edit" },
                                                { name: "Ver Parceiros", icon: "fa-certificate" },
                                                { name: "Gestão HR", icon: "fa-user-tie" },
                                                { name: "Segurança", icon: "fa-lock" },
                                                { name: "Base de Dados", icon: "fa-database" },
                                                { name: "Métricas", icon: "fa-chart-pie" }
                                          ].map((btn, i) => (
                                                <button key={i} style={{
                                                      background: 'rgba(255,255,255,0.03)',
                                                      border: '1px solid var(--border)',
                                                      borderRadius: '16px',
                                                      padding: '1.5rem 1rem',
                                                      color: 'white',
                                                      cursor: 'pointer',
                                                      display: 'flex',
                                                      flexDirection: 'column',
                                                      alignItems: 'center',
                                                      gap: '10px',
                                                      transition: 'background 0.3s'
                                                }}>
                                                      <i className={`fas ${btn.icon}`} style={{ fontSize: '1.2rem', color: 'var(--primary)' }}></i>
                                                      <span style={{ fontSize: '0.85rem' }}>{btn.name}</span>
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default AdminManagerDashboard;
