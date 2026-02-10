"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function QuemSomosPage() {
      return (
            <>
                  <Header />

                  <main>
                        {/* Page Hero */}
                        <section className="page-hero">
                              <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #333 0%, #000 100%)' }}></div>
                              <div className="container">
                                    <div className="page-hero-content">
                                          <span className="section-tag">SIMJS</span>
                                          <h1>Quem <span className="text-gradient">Somos</span></h1>
                                          <p>Mais do que um grupo empresarial, somos um motor de desenvolvimento para Angola, focados na inovação e excelência multissetorial.</p>
                                    </div>
                              </div>
                        </section>

                        {/* About Section */}
                        <section style={{ padding: '80px 0' }}>
                              <div className="container">
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
                                          <div>
                                                <h2 style={{ marginBottom: '20px' }}>Nossa <span className="text-gradient">História</span></h2>
                                                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
                                                      O Grupo SIMJS nasceu de uma visão empreendedora voltada para suprir as necessidades do mercado angolano com soluções de alta qualidade. Ao longo dos anos, expandimos a nossa atuação para 7 sectores estratégicos.
                                                </p>
                                                <p style={{ color: '#666', lineHeight: '1.8' }}>
                                                      Hoje, somos referência em auditoria, construção, tecnologia e muito mais, sempre guiados pelos nossos valores fundamentais.
                                                </p>
                                          </div>
                                          <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                                                <img src="/assets/office.jpg" alt="Interior do Escritório" style={{ width: '100%', display: 'block' }} />
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* Mission Vision Values */}
                        <section style={{ padding: '80px 0', background: '#f9f9f9' }}>
                              <div className="container">
                                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                                          <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', textAlign: 'center' }}>
                                                <div style={{ color: '#cc0000', fontSize: '40px', marginBottom: '20px' }}><i className="fas fa-bullseye"></i></div>
                                                <h3>Missão</h3>
                                                <p style={{ color: '#666' }}>Prover soluções inovadoras e sustentáveis que impulsionem o crescimento dos nossos parceiros e da sociedade angolana.</p>
                                          </div>
                                          <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', textAlign: 'center' }}>
                                                <div style={{ color: '#cc0000', fontSize: '40px', marginBottom: '20px' }}><i className="fas fa-eye"></i></div>
                                                <h3>Visão</h3>
                                                <p style={{ color: '#666' }}>Ser o grupo empresarial mais confiável e diversificado de Angola, reconhecido pela excelência em todos os sectores de atuação.</p>
                                          </div>
                                          <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', textAlign: 'center' }}>
                                                <div style={{ color: '#cc0000', fontSize: '40px', marginBottom: '20px' }}><i className="fas fa-heart"></i></div>
                                                <h3>Valores</h3>
                                                <p style={{ color: '#666' }}>Integridade, Inovação, Responsabilidade Social, Excelência no Serviço e Valorização das Pessoas.</p>
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </main>

                  <Footer />
            </>
      );
}
