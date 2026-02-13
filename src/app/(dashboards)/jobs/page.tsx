"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Job {
      id: number;
      title: string;
      location: string;
      type: string;
      salary: string;
      partner?: {
            companyName: string;
            sector: string;
      }
}

interface Application {
      id: number;
      status: string;
      createdAt: string;
      job: {
            title: string;
            location: string;
      }
}

const JobSeekerDashboard = () => {
      const { data: session, status } = useSession();
      const router = useRouter();
      const [jobs, setJobs] = useState<Job[]>([]);
      const [applications, setApplications] = useState<Application[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            if (status === "loading") return;

            if (!session) {
                  router.push("/login");
                  return;
            }

            const fetchData = async () => {
                  try {
                        const [jobsRes, appsRes] = await Promise.all([
                              fetch("/api/jobs?limit=5"),
                              fetch("/api/applications")
                        ]);

                        if (jobsRes.ok) {
                              const jobsData = await jobsRes.json();
                              setJobs(jobsData);
                        }

                        if (appsRes.ok) {
                              const appsData = await appsRes.json();
                              setApplications(appsData);
                        }
                  } catch (error) {
                        console.error("Failed to fetch dashboard data", error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchData();
      }, [session, status, router]);

      if (loading) {
            return <div className="p-10 text-center text-white">Carregando oportunidades...</div>;
      }

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
                                    {jobs.length === 0 ? (
                                          <p className="text-gray-500">Nenhuma vaga disponível no momento.</p>
                                    ) : (
                                          jobs.map(job => (
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
                                                                  <span><i className="fas fa-building"></i> {job.partner?.companyName || "SIMJS"}</span>
                                                                  <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                                                                  <span><i className="fas fa-clock"></i> {job.type}</span>
                                                            </div>
                                                      </div>
                                                      <button className="btn-cta" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>Candidatar-se</button>
                                                </div>
                                          ))
                                    )}
                              </div>
                        </div>

                        {/* Sidebar: Applications & Profile */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                              <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', padding: '25px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ marginBottom: '20px' }}><i className="fas fa-paper-plane" style={{ color: 'var(--primary)' }}></i> Minhas Candidaturas</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                          {applications.length === 0 ? (
                                                <p className="text-gray-500 text-sm">Você ainda não se candidatou a nenhuma vaga.</p>
                                          ) : (
                                                applications.map(app => (
                                                      <div key={app.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{app.job.title}</div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                                                  <span style={{
                                                                        fontSize: '0.75rem',
                                                                        background: 'rgba(59, 130, 246, 0.2)',
                                                                        color: '#60a5fa',
                                                                        padding: '2px 8px',
                                                                        borderRadius: '10px'
                                                                  }}>{app.status}</span>
                                                                  <small style={{ color: 'var(--text-muted)' }}>{new Date(app.createdAt).toLocaleDateString()}</small>
                                                            </div>
                                                      </div>
                                                ))
                                          )}
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
