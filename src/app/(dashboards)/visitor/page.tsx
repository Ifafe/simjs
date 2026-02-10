"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";

const VisitorDashboard = () => {
      const [activities, setActivities] = useState<any[]>([]);
      const [stats, setStats] = useState({ members: 1247, events: 23, partnerships: 89 });

      useEffect(() => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (user.id) {
                  // Fetch stats and activities (mock or real)
                  setActivities([
                        { id: 1, type: "LOGIN", content: "Bem-vindo de volta!", createdAt: new Date().toISOString() },
                        { id: 2, type: "EVENT", content: "Novo evento: Workshop de Inovação", createdAt: new Date(Date.now() - 86400000).toISOString() },
                  ]);
            }
      }, []);

      return (
            <div className="visitor-dashboard">
                  <header style={{ marginBottom: '40px' }}>
                        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Comunidade SIMJS</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Explore oportunidades, conecte-se e cresça com o nosso ecossistema.</p>
                  </header>

                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        {[
                              { label: "Membros", value: stats.members, icon: "fa-users" },
                              { label: "Eventos", value: stats.events, icon: "fa-calendar-alt" },
                              { label: "Parcerias", value: stats.partnerships, icon: "fa-handshake" }
                        ].map((stat, i) => (
                              <div key={i} className="stat-card" style={{
                                    background: 'var(--bg-card)',
                                    padding: '30px',
                                    borderRadius: '20px',
                                    border: '1px solid var(--border)',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s ease',
                                    boxShadow: 'var(--shadow-card)'
                              }}>
                                    <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '15px' }}>
                                          <i className={`fas ${stat.icon}`}></i>
                                    </div>
                                    <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</div>
                              </div>
                        ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                        {/* Main Feed */}
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', padding: '30px', border: '1px solid var(--border)' }}>
                              <h3 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i className="fas fa-bolt" style={{ color: 'var(--accent)' }}></i> Atividade Recente
                              </h3>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {activities.map(act => (
                                          <div key={act.id} style={{
                                                display: 'flex',
                                                gap: '15px',
                                                padding: '20px',
                                                background: 'rgba(255,255,255,0.02)',
                                                borderRadius: '15px',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                          }}>
                                                <div style={{
                                                      width: '45px',
                                                      height: '45px',
                                                      borderRadius: '12px',
                                                      background: 'var(--primary)',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      flexShrink: 0
                                                }}>
                                                      <i className={`fas ${act.type === 'LOGIN' ? 'fa-sign-in-alt' : 'fa-bell'}`}></i>
                                                </div>
                                                <div>
                                                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{act.content}</h4>
                                                      <small style={{ color: 'var(--text-muted)' }}>{new Date(act.createdAt).toLocaleString()}</small>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Quick Links / Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                              <div style={{
                                    background: 'var(--gradient-card)',
                                    borderRadius: '24px',
                                    padding: '30px',
                                    border: '1px solid var(--border)',
                                    textAlign: 'center'
                              }}>
                                    <div style={{
                                          width: '80px',
                                          height: '80px',
                                          borderRadius: '50%',
                                          margin: '0 auto 20px',
                                          background: 'linear-gradient(135deg, #cc0000, #440000)',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '2rem'
                                    }}>
                                          <i className="fas fa-user-astronaut"></i>
                                    </div>
                                    <h4 style={{ marginBottom: '5px' }}>Completar Perfil</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Aumente suas chances de conexão em 40%.</p>
                                    <button className="btn-cta" style={{ width: '100%', padding: '12px' }}>Começar</button>
                              </div>

                              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', padding: '30px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ marginBottom: '20px' }}>Acesso Rápido</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                          {[
                                                { name: "Vagas", icon: "fa-briefcase", color: "#3b82f6" },
                                                { name: "Eventos", icon: "fa-calendar", color: "#ec4899" },
                                                { name: "Grupo", icon: "fa-building", color: "#10b981" },
                                                { name: "Fórum", icon: "fa-comments", color: "#f59e0b" }
                                          ].map((item, i) => (
                                                <button key={i} style={{
                                                      background: 'rgba(255,255,255,0.05)',
                                                      border: '1px solid rgba(255,255,255,0.1)',
                                                      borderRadius: '12px',
                                                      padding: '15px 10px',
                                                      color: 'white',
                                                      cursor: 'pointer',
                                                      display: 'flex',
                                                      flexDirection: 'column',
                                                      alignItems: 'center',
                                                      gap: '8px',
                                                      transition: 'background 0.2s'
                                                }}>
                                                      <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                                                      <span style={{ fontSize: '0.75rem' }}>{item.name}</span>
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default VisitorDashboard;
