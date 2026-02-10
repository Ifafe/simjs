"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const galleryItems = [
      { title: "Evento de Tecnologia 2025", type: "Vídeo", image: "/assets/pexels-august-de-richelieu-4427627.jpg" },
      { title: "Inauguração Nova Sede", type: "Vídeo", image: "/assets/pexels-pixabay-50987.jpg" },
      { title: "Workshop Inovação", type: "Vídeo", image: "/assets/pexels-kindelmedia-6868618.jpg" },
      { title: "Conferência Anual", type: "Vídeo", image: "/assets/pexels-lucaspezeta-5242049.jpg" },
      { title: "Parceria Estratégica", type: "Vídeo", image: "/assets/pexels-michelangelo-buonarroti-8728556.jpg" },
      { title: "Sustentabilidade no Grupo", type: "Vídeo", image: "/assets/pexels-a-darmel-7641839.jpg" },
      { title: "Equipa SIMJS em Ação", type: "Vídeo", image: "/assets/office.jpg" },
      { title: "Visão 2030", type: "Vídeo", image: "/assets/Novo1.jpg" }
];

export default function ComunidadePage() {
      return (
            <>
                  <Header />

                  <main>
                        {/* Page Hero */}
                        <section className="page-hero">
                              <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)' }}></div>
                              <div className="container">
                                    <div className="page-hero-content">
                                          <span className="section-tag">Nossa</span>
                                          <h1><span className="text-gradient">Comunidade</span></h1>
                                          <p>Conectando pessoas, ideias e projetos. Veja como o Grupo SIMJS está a impactar positivamente a sociedade através de diversas iniciativas.</p>
                                    </div>
                              </div>
                        </section>

                        {/* Media Gallery Section */}
                        <section className="media-gallery-section">
                              <div className="container">
                                    <div className="section-header">
                                          <span className="section-tag">Galeria</span>
                                          <h2>Nossa <span className="text-gradient"> Presença</span> Digital</h2>
                                          <p>Acompanhe os momentos mais marcantes do grupo, eventos e conquistas da nossa comunidade.</p>
                                    </div>

                                    <div className="media-grid">
                                          {galleryItems.map((item, idx) => (
                                                <div key={idx} className="media-item">
                                                      <div className="media-placeholder">
                                                            <img src={item.image} alt={item.title} className="media-content" />
                                                            <div className="play-icon">
                                                                  <i className="fas fa-play"></i>
                                                            </div>
                                                      </div>
                                                      <div className="media-overlay">
                                                            <h4 className="media-title">{item.title}</h4>
                                                            <span className="media-type">{item.type}</span>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </section>

                        {/* Partner Section */}
                        <section className="partner-section">
                              <div className="container">
                                    <div className="section-header">
                                          <span className="section-tag">Parceiros</span>
                                          <h2>Ecossistema de <span className="text-gradient">Valor</span></h2>
                                    </div>

                                    <div className="partner-grid">
                                          <div className="partner-card">
                                                <div className="partner-icon"><i className="fas fa-handshake"></i></div>
                                                <h3>Seja um Parceiro</h3>
                                                <p>Junte-se à nossa rede de parceiros estratégicos e colabore em projetos inovadores.</p>
                                                <a href="/contacto" className="btn-login" style={{ display: 'inline-block', marginTop: '15px' }}>Saber Mais</a>
                                          </div>

                                          <div className="partner-card featured">
                                                <div className="partner-badge">Destaque</div>
                                                <div className="partner-icon"><i className="fas fa-star"></i></div>
                                                <h3>Programa de Mentoria</h3>
                                                <p>Apoiamos jovens talentos e empreendedores com mentorias exclusivas de líderes do setor.</p>
                                                <a href="/contacto" className="btn-login" style={{ display: 'inline-block', marginTop: '15px' }}>Candidatar-se</a>
                                          </div>

                                          <div className="partner-card">
                                                <div className="partner-icon"><i className="fas fa-users-cog"></i></div>
                                                <h3>Soluções Corporativas</h3>
                                                <p>Oferecemos serviços personalizados para ajudar a sua empresa a atingir novos patamares.</p>
                                                <a href="/contacto" className="btn-login" style={{ display: 'inline-block', marginTop: '15px' }}>Ver Serviços</a>
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </main>

                  <Footer />
            </>
      );
}
