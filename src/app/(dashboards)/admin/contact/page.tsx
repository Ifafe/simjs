"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
      const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [formData, setFormData] = useState({
            email: "",
            phone: "",
            address: "",
            hours: "",
      });

      useEffect(() => {
            fetch("/api/contact")
                  .then((res) => res.json())
                  .then((data) => {
                        setFormData(data);
                        setLoading(false);
                  })
                  .catch((err) => {
                        console.error("Failed to load contact data", err);
                        setLoading(false);
                  });
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async () => {
            setSaving(true);
            try {
                  const res = await fetch("/api/contact", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                  });

                  if (!res.ok) throw new Error("Failed to save");
                  alert("Informações de contato atualizadas!");
                  router.refresh();
            } catch (error) {
                  alert("Erro ao salvar. Tente novamente.");
                  console.error(error);
            } finally {
                  setSaving(false);
            }
      };

      if (loading) {
            return <div className="p-8 text-center text-white">Carregando...</div>;
      }

      return (
            <section className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Configurações de Contato</h1>
                              <p>Gerencie os dados de contato visíveis no site</p>
                        </div>
                        <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                              <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i> {saving ? 'Guardando...' : 'Guardar Configurações'}
                        </button>
                  </div>

                  <div className="form-card">
                        <h2>Informações de Contato</h2>
                        <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                              <div className="form-group" style={{ flex: 1 }}>
                                    <label>Email</label>
                                    <input
                                          type="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          placeholder="contato@simjs.com"
                                          style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                    />
                              </div>
                              <div className="form-group" style={{ flex: 1 }}>
                                    <label>Telefone</label>
                                    <input
                                          type="tel"
                                          name="phone"
                                          value={formData.phone}
                                          onChange={handleChange}
                                          placeholder="+244 9XX XXX XXX"
                                          style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                    />
                              </div>
                        </div>
                        <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                              <div className="form-group" style={{ flex: 1 }}>
                                    <label>Endereço</label>
                                    <textarea
                                          name="address"
                                          value={formData.address}
                                          onChange={handleChange}
                                          placeholder="Rua, nº, Cidade"
                                          rows={2}
                                          style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                    ></textarea>
                              </div>
                              <div className="form-group" style={{ flex: 1 }}>
                                    <label>Horário de Funcionamento</label>
                                    <textarea
                                          name="hours"
                                          value={formData.hours}
                                          onChange={handleChange}
                                          placeholder="Seg-Sex: 8h-17h"
                                          rows={2}
                                          style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                    ></textarea>
                              </div>
                        </div>
                  </div>
            </section>
      );
}
