"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PartnerStats {
      companyName: string;
      status: string;
      jobsDefault: number;
      applicationsDefault: number;
}

export default function PartnerDashboard() {
      const { data: session, status } = useSession();
      const router = useRouter();
      const [partnerData, setPartnerData] = useState<PartnerStats | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            if (status === "loading") return;

            // @ts-ignore
            if (!session || session?.user?.role !== "PARTNER") {
                  router.push("/login");
                  return;
            }

            const fetchStats = async () => {
                  try {
                        const res = await fetch("/api/partner/stats");
                        if (res.ok) {
                              const data = await res.json();
                              setPartnerData(data);
                        } else {
                              console.error("Failed to fetch partner stats");
                        }
                  } catch (error) {
                        console.error("Error fetching partner stats:", error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchStats();
      }, [session, status, router]);

      if (loading) return <div style={{ color: "white", padding: "30px", textAlign: "center" }}>Carregando dados do parceiro...</div>;

      if (!partnerData) return <div style={{ color: "white", padding: "30px", textAlign: "center" }}>Erro ao carregar dados.</div>;

      return (
            <div className="partner-dashboard">
                  <header style={{ marginBottom: "40px" }}>
                        <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
                              Olá, {partnerData.companyName}
                        </h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <p style={{ color: "var(--text-muted)", margin: 0 }}>Bem-vindo ao seu painel de parceiro.</p>
                              <span style={{
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    background: partnerData.status === 'ACTIVE' ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                                    color: partnerData.status === 'ACTIVE' ? "#10b981" : "#f59e0b"
                              }}>
                                    {partnerData.status === 'ACTIVE' ? 'CONTA ATIVA' : 'AGUARDANDO APROVAÇÃO'}
                              </span>
                        </div>
                  </header>

                  {partnerData.status === 'PENDING' && (
                        <div style={{ padding: "20px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid #f59e0b", borderRadius: "12px", color: "#f59e0b", marginBottom: "30px" }}>
                              <h3 style={{ marginTop: 0 }}><i className="fas fa-info-circle"></i> Perfil em Análise</h3>
                              <p>O seu perfil de parceiro está a ser analisado pela nossa equipa. Em breve terá acesso completo para publicar vagas e gerir candidaturas.</p>
                        </div>
                  )}

                  {/* Stats Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
                        <div style={{ background: "var(--bg-card)", padding: "25px", borderRadius: "24px", border: "1px solid var(--border)", display: "flex", gap: "20px", alignItems: "center" }}>
                              <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                                    <i className="fas fa-briefcase"></i>
                              </div>
                              <div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Vagas Ativas</div>
                                    <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{partnerData.jobsDefault}</div>
                              </div>
                        </div>

                        <div style={{ background: "var(--bg-card)", padding: "25px", borderRadius: "24px", border: "1px solid var(--border)", display: "flex", gap: "20px", alignItems: "center" }}>
                              <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                                    <i className="fas fa-file-alt"></i>
                              </div>
                              <div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Candidatos</div>
                                    <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{partnerData.applicationsDefault}</div>
                              </div>
                        </div>

                        <div style={{ background: "var(--bg-card)", padding: "25px", borderRadius: "24px", border: "1px solid var(--border)", display: "flex", gap: "20px", alignItems: "center" }}>
                              <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
                                    <i className="fas fa-eye"></i>
                              </div>
                              <div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Visualizações</div>
                                    <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>0</div>
                              </div>
                        </div>
                  </div>

                  <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '30px', border: '1px solid var(--border)' }}>
                        <h3 style={{ marginBottom: '20px' }}>Início Rápido</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                              <button disabled={partnerData.status !== 'ACTIVE'} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', cursor: partnerData.status === 'ACTIVE' ? 'pointer' : 'not-allowed', opacity: partnerData.status === 'ACTIVE' ? 1 : 0.5, textAlign: 'left' }}>
                                    <i className="fas fa-plus-circle" style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1.5rem', display: 'block' }}></i>
                                    <span style={{ fontWeight: 'bold' }}>Publicar Vaga</span>
                                    <p style={{ fontSize: '0.8rem', color: '#888', margin: '5px 0 0' }}>Crie uma nova oportunidade.</p>
                              </button>
                              <button style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', cursor: 'pointer', textAlign: 'left' }} onClick={() => router.push('/partner/profile')}>
                                    <i className="fas fa-building" style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1.5rem', display: 'block' }}></i>
                                    <span style={{ fontWeight: 'bold' }}>Editar Perfil</span>
                                    <p style={{ fontSize: '0.8rem', color: '#888', margin: '5px 0 0' }}>Atualize os dados da empresa.</p>
                              </button>
                              <button disabled style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', color: 'white', cursor: 'not-allowed', opacity: 0.5, textAlign: 'left' }}>
                                    <i className="fas fa-file-contract" style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1.5rem', display: 'block' }}></i>
                                    <span style={{ fontWeight: 'bold' }}>Documentos</span>
                                    <p style={{ fontSize: '0.8rem', color: '#888', margin: '5px 0 0' }}>Gerir contratos e faturas.</p>
                              </button>
                        </div>
                  </div>
            </div>
      );
}
