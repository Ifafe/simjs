"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";

const JobSeekerDashboard = () => {
      const [jobs, setJobs] = useState<any[]>([]);
      const [applications, setApplications] = useState<any[]>([]);

      useEffect(() => {
            // Mock data for demo
            setJobs([
                  { id: 1, title: "Engenheiro de Software", location: "Luanda (Remoto)", type: "Full-time", salary: "Negociável" },
                  { id: 2, title: "Gestor de Projetos", location: "Benguela", type: "Presencial", salary: "Confidencial" },
            ]);
            setApplications([
                  { id: 1, jobTitle: "Analista de Dados", status: "Em Revisão", date: "2026-02-01" }
            ]);
      }, []);

      return (
            <div className="jobs-dashboard">
                  <header style={{ marginBottom: '40px' }}>
                        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Oportunidades de Carreira</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Encontre o seu próximo desafio profissional no Grupo SIMJS.</p>
                  </header>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                        {/* Job Listings */}
                        <div>
                              <h3 style={{ marginBottom: '20px' }}><i className="fas fa-search"></i> Vagas Disponíveis</h3>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {jobs.map(job => (
                                          <div key={job.id} style={{
                                                background: 'var(--bg-card)',
                                                padding: '25px',
                                                borderRadius: '20px',
                                                border: '1px solid var(--border)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                boxShadow: 'var(--shadow-card)',
                                                transition: 'transform 0.2s'
                                          }}>
                                                <div>
                                                      <h4 style={{ color: 'var(--primary-light)', marginBottom: '5px' }}>{job.title}</h4>
                                                      <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                            <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                                                            <span><i className="fas fa-clock"></i> {job.type}</span>
                                                            <span><i className="fas fa-money-bill-wave"></i> {job.salary}</span>
                                                      </div>
                                                </div>
                                                <button className="btn-cta" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>Candidatar-se</button>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Sidebar: Applications & Profile */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', padding: '25px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ marginBottom: '20px' }}><i className="fas fa-paper-plane" style={{ color: 'var(--primary)' }}></i> Minhas Candidaturas</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                          {applications.map(app => (
                                                <div key={app.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                      <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{app.jobTitle}</div>
                                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                                            <span style={{
                                                                  fontSize: '0.75rem',
                                                                  background: 'rgba(59, 130, 246, 0.2)',
                                                                  color: '#60a5fa',
                                                                  padding: '2px 8px',
                                                                  borderRadius: '10px'
                                                            }}>{app.status}</span>
                                                            <small style={{ color: 'var(--text-muted)' }}>{app.date}</small>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              <div style={{ background: 'var(--gradient-card)', borderRadius: '24px', padding: '25px', border: '1px solid var(--border)', textAlign: 'center' }}>
                                    <i className="fas fa-file-pdf" style={{ fontSize: '2.5rem', marginBottom: '15px' }}></i>
                                    <h4>Currículo Digital</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '15px' }}>Seu currículo está 80% completo. Adicione certificações.</p>
                                    <button style={{
                                          background: 'white',
                                          color: 'var(--primary)',
                                          border: 'none',
                                          padding: '10px 20px',
                                          borderRadius: '10px',
                                          fontWeight: 700,
                                          cursor: 'pointer'
                                    }}>Atualizar CV</button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default JobSeekerDashboard;
