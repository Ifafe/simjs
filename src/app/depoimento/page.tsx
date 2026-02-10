"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const testimonials = [
      {
            name: "António Manuel",
            role: "CEO, Tech Solutions",
            content: "O Grupo SIMJS transformou a nossa infraestrutura tecnológica. A competência e dedicação da equipa são inigualáveis.",
            image: "/assets/DSC_8396.jpg"
      },
      {
            name: "Maria José",
            role: "Directora Financeira",
            content: "Os serviços de auditoria foram essenciais para a nossa reorganização fiscal. Profissionalismo acima de tudo.",
            image: "/assets/DSC_8422.jpg"
      },
      {
            name: "Carlos Alberto",
            role: "Investidor Imobiliário",
            content: "A transparência e o conhecimento de mercado da SIMJS Imobiliária deram-me a confiança necessária para investir em Luanda.",
            image: "/assets/DSC_8471.jpg"
      }
];

export default function DepoimentoPage() {
      return (
            <>
                  <Header />

                  <main>
                        {/* Page Hero */}
                        <section className="page-hero">
                              <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #000 0%, #444 100%)' }}></div>
                              <div className="container">
                                    <div className="page-hero-content">
                                          <span className="section-tag">Testemunhos</span>
                                          <h1>O que dizem de <span className="text-gradient">Nós</span></h1>
                                          <p>A satisfação dos nossos clientes e parceiros é o nosso maior orgulho. Conheça as experiências de quem trabalha connosco.</p>
                                    </div>
                              </div>
                        </section>

                        {/* Testimonials Grid */}
                        <section style={{ padding: '80px 0' }}>
                              <div className="container">
                                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                                          {testimonials.map((t, idx) => (
                                                <div key={idx} style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                                                      <div style={{ color: '#cc0000', fontSize: '30px', marginBottom: '20px' }}><i className="fas fa-quote-left"></i></div>
                                                      <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '30px', lineHeight: '1.7' }}>"{t.content}"</p>
                                                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                            <img src={t.image} alt={t.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                                            <div>
                                                                  <h4 style={{ margin: 0 }}>{t.name}</h4>
                                                                  <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>{t.role}</p>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </section>

                        {/* Call to Action */}
                        <section style={{ padding: '80px 0', background: '#cc0000', color: '#fff', textAlign: 'center' }}>
                              <div className="container">
                                    <h2 style={{ marginBottom: '20px' }}>Quer partilhar a sua experiência?</h2>
                                    <p style={{ marginBottom: '30px', opacity: 0.9 }}>Valorizamos muito o feedback dos nossos parceiros.</p>
                                    <a href="/contacto" style={{ background: '#fff', color: '#cc0000', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>Deixar Testemunho</a>
                              </div>
                        </section>
                  </main>

                  <Footer />
            </>
      );
}
