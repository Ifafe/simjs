"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";

const companies = [
      {
            logo: "/assets/anappa.jpeg",
            image: "/assets/pexels-august-de-richelieu-4427627.jpg",
            sector: "Auditoria e Consultoria",
            title: "SIMJS Auditoria",
            description: "Serviços de auditoria, consultoria financeira e fiscal para empresas de todos os portes."
      },
      {
            logo: "/assets/cgde.jpeg",
            image: "/assets/pexels-pixabay-50987.jpg",
            sector: "Construção Civil",
            title: "SIMJS Construção",
            description: "Construção de edifícios residenciais, comerciais e obras de infraestrutura."
      },
      {
            logo: "/assets/curioso.jpeg",
            image: "/assets/pexels-kindelmedia-6868618.jpg",
            sector: "Tecnologia e Inovação",
            title: "SIMJS Tecnologia",
            description: "Desenvolvimento de software, soluções digitais e transformação tecnológica."
      },
      {
            logo: "/assets/academia.jpeg",
            image: "/assets/pexels-lucaspezeta-5242049.jpg",
            sector: "Imobiliário",
            title: "SIMJS Imobiliária",
            description: "Compra, venda e arrendamento de imóveis em toda Angola."
      },
      {
            logo: "/assets/carinho.jpeg",
            image: "/assets/pexels-michelangelo-buonarroti-8728556.jpg",
            sector: "Comércio Geral",
            title: "SIMJS Comércio",
            description: "Importação e comercialização de produtos diversos."
      },
      {
            logo: "/assets/xima.jpeg",
            image: "/assets/pexels-a-darmel-7641839.jpg",
            sector: "Serviços",
            title: "SIMJS Serviços",
            description: "Prestação de serviços especializados para empresas e particulares."
      },
      {
            logo: "/assets/zerrin.jpeg",
            image: "/assets/office.jpg",
            sector: "Investimentos",
            title: "SIMJS Investimentos",
            description: "Gestão de investimentos e participações em diversos sectores."
      }
];

export default function GrupoPage() {
      return (
            <>
                  <Header />

                  <main>
                        {/* Page Hero */}
                        <section className="page-hero">
                              <div className="hero-bg"></div>
                              <div className="hero-glow glow-1"></div>

                              <div className="hero-carousel">
                                    <div className="carousel-track">
                                          <div className="carousel-slide active">
                                                <video autoPlay muted loop playsInline className="carousel-video">
                                                      <source src="/assets/bg-office.mp4" type="video/mp4" />
                                                </video>
                                          </div>
                                    </div>
                                    <div className="carousel-info">
                                          <h3>Descubra Nossa Estrutura Organizacional</h3>
                                          <p>7 Empresas | Múltiplos Sectores | Uma Visão Compartilhada</p>
                                    </div>
                              </div>

                              <div className="container">
                                    <div className="page-hero-content">
                                          <span className="section-tag">Conheça</span>
                                          <h1>O <span className="text-gradient">Grupo</span> SIMJS</h1>
                                          <p>Uma estrutura empresarial sólida com 7 empresas que atuam em diferentes sectores, unidas pelo compromisso com a excelência e inovação.</p>
                                    </div>
                              </div>
                        </section>

                        {/* Organogram Section */}
                        <section className="organogram-section">
                              <div className="container">
                                    <div className="section-header">
                                          <h2>Nosso <span className="text-gradient">Organograma</span></h2>
                                    </div>

                                    <div className="organogram">
                                          <div className="org-level org-level-1">
                                                <div className="org-node org-main">
                                                      <img src="/assets/logo-simjs.png" alt="SIMJS" className="org-main-logo" />
                                                </div>
                                          </div>
                                          <div className="org-connector vertical"></div>
                                          <div className="org-connector horizontal"></div>

                                          <div className="org-level org-level-2">
                                                <div className="org-node"><img src="/assets/anappa.jpeg" alt="Auditoria" className="org-logo-image" /></div>
                                                <div className="org-node"><img src="/assets/cgde.jpeg" alt="Construção" className="org-logo-image" /></div>
                                                <div className="org-node"><img src="/assets/curioso.jpeg" alt="Tecnologia" className="org-logo-image" /></div>
                                          </div>

                                          <div className="org-level org-level-3">
                                                <div className="org-node"><img src="/assets/academia.jpeg" alt="Imobiliária" className="org-logo-image" /></div>
                                                <div className="org-node"><img src="/assets/carinho.jpeg" alt="Comércio" className="org-logo-image" /></div>
                                                <div className="org-node"><img src="/assets/xima.jpeg" alt="Serviços" className="org-logo-image" /></div>
                                                <div className="org-node"><img src="/assets/zerrin.jpeg" alt="Investimentos" className="org-logo-image" /></div>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* Companies Grid */}
                        <section className="companies-section" id="empresas">
                              <div className="container">
                                    <div className="section-header">
                                          <h2><span className="text-gradient">7 Empresas</span>, Múltiplas Soluções</h2>
                                    </div>

                                    <div className="companies-grid">
                                          {companies.map((company, idx) => (
                                                <CompanyCard key={idx} {...company} />
                                          ))}
                                    </div>
                              </div>
                        </section>
                  </main>

                  <Footer />
            </>
      );
}
