"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactoPage() {
      const [formData, setFormData] = useState({
            name: "",
            email: "",
            subject: "",
            message: ""
      });

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            alert("Mensagem enviada com sucesso! Entraremos em contacto brevemente.");
            setFormData({ name: "", email: "", subject: "", message: "" });
      };

      return (
            <>
                  <Header />

                  <main>
                        {/* Page Hero */}
                        <section className="page-hero">
                              <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #cc0000 0%, #660000 100%)' }}></div>
                              <div className="container">
                                    <div className="page-hero-content">
                                          <span className="section-tag">Fale Connosco</span>
                                          <h1><span className="text-gradient">Contacto</span></h1>
                                          <p>Estamos aqui para ajudar. Entre em contacto connosco para saber mais sobre os nossos serviços ou parcerias.</p>
                                    </div>
                              </div>
                        </section>

                        {/* Contact Section */}
                        <section className="contact-section" style={{ padding: '80px 0' }}>
                              <div className="container">
                                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                                          {/* Contact Info */}
                                          <div className="contact-info">
                                                <h2 style={{ marginBottom: '30px' }}>Informações de <span className="text-gradient">Contacto</span></h2>
                                                <div style={{ display: 'grid', gap: '25px' }}>
                                                      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                            <div style={{ color: '#cc0000', fontSize: '24px' }}><i className="fas fa-map-marker-alt"></i></div>
                                                            <div>
                                                                  <h4 style={{ margin: '0 0 5px' }}>Endereço</h4>
                                                                  <p style={{ color: '#666', margin: 0 }}>Rua Marechal Brós Tito, Edifício Kiluanje, Luanda, Angola</p>
                                                            </div>
                                                      </div>
                                                      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                            <div style={{ color: '#cc0000', fontSize: '24px' }}><i className="fas fa-envelope"></i></div>
                                                            <div>
                                                                  <h4 style={{ margin: '0 0 5px' }}>E-mail</h4>
                                                                  <p style={{ color: '#666', margin: 0 }}>info@gruposimjs.com</p>
                                                                  <p style={{ color: '#666', margin: 0 }}>comercial@gruposimjs.com</p>
                                                            </div>
                                                      </div>
                                                      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                            <div style={{ color: '#cc0000', fontSize: '24px' }}><i className="fas fa-phone"></i></div>
                                                            <div>
                                                                  <h4 style={{ margin: '0 0 5px' }}>Telefone</h4>
                                                                  <p style={{ color: '#666', margin: 0 }}>+244 923 000 000</p>
                                                                  <p style={{ color: '#666', margin: 0 }}>+244 912 000 000</p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div style={{ marginTop: '50px' }}>
                                                      <h4 style={{ marginBottom: '20px' }}>Siga-nos</h4>
                                                      <div className="social-links" style={{ display: 'flex', gap: '15px' }}>
                                                            <a href="#" style={{ width: '40px', height: '40px', background: '#333', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fab fa-facebook-f"></i></a>
                                                            <a href="#" style={{ width: '40px', height: '40px', background: '#333', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fab fa-instagram"></i></a>
                                                            <a href="#" style={{ width: '40px', height: '40px', background: '#333', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fab fa-linkedin-in"></i></a>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Contact Form */}
                                          <div className="contact-form-container" style={{ background: '#fff', padding: '40px', borderRadius: '15px', border: '1px solid #eee' }}>
                                                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                                                      <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Nome Completo</label>
                                                            <input
                                                                  type="text"
                                                                  required
                                                                  value={formData.name}
                                                                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                                  placeholder="Seu nome"
                                                                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                                            />
                                                      </div>
                                                      <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>E-mail</label>
                                                            <input
                                                                  type="email"
                                                                  required
                                                                  value={formData.email}
                                                                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                                  placeholder="seu@email.com"
                                                                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                                            />
                                                      </div>
                                                      <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Assunto</label>
                                                            <input
                                                                  type="text"
                                                                  required
                                                                  value={formData.subject}
                                                                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                                                  placeholder="Como podemos ajudar?"
                                                                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                                            />
                                                      </div>
                                                      <div>
                                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Mensagem</label>
                                                            <textarea
                                                                  required
                                                                  value={formData.message}
                                                                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                                  placeholder="Sua mensagem..."
                                                                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '150px' }}
                                                            />
                                                      </div>
                                                      <button type="submit" style={{ background: '#cc0000', color: '#fff', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s' }}>
                                                            Enviar Mensagem
                                                      </button>
                                                </form>
                                          </div>
                                    </div>
                              </div>
                        </section>

                        {/* Map Section */}
                        <section className="map-section">
                              <div className="map-container" style={{ height: '450px', width: '100%', background: '#eee' }}>
                                    {/* Placeholder for map */}
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                          <div style={{ textAlign: 'center' }}>
                                                <i className="fas fa-map-marked-alt" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
                                                <p>Mapa de Luanda, Angola</p>
                                                <p style={{ fontSize: '12px' }}>(Integração de Google Maps aqui)</p>
                                          </div>
                                    </div>
                              </div>
                        </section>
                  </main>

                  <Footer />
            </>
      );
}
