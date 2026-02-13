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

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
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
            return (
                  <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
            );
      }

      return (
            <div className="p-6 md:p-10 max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                              <h1 className="text-3xl font-bold text-white tracking-tight">Contato</h1>
                              <p className="text-gray-400 mt-1">Gerencie os canais de comunicação exibidos no rodapé e página de contato.</p>
                        </div>
                        <button
                              onClick={handleSubmit}
                              disabled={saving}
                              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                              {saving ? (
                                    <>
                                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                          <span>Salvando...</span>
                                    </>
                              ) : (
                                    <>
                                          <i className="fas fa-check"></i>
                                          <span>Salvar Alterações</span>
                                    </>
                              )}
                        </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                              <section className="bg-[#121212] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                          <i className="fas fa-address-book text-8xl text-white"></i>
                                    </div>
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                          <span className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center text-sm">
                                                <i className="fas fa-phone-alt"></i>
                                          </span>
                                          Canais de Atendimento
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">E-mail Principal</label>
                                                <div className="relative">
                                                      <span className="absolute left-4 top-3.5 text-gray-500"><i className="fas fa-envelope"></i></span>
                                                      <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                            placeholder="contato@simjs.com"
                                                      />
                                                </div>
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Telefone / WhatsApp</label>
                                                <div className="relative">
                                                      <span className="absolute left-4 top-3.5 text-gray-500"><i className="fas fa-phone"></i></span>
                                                      <input
                                                            type="text"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                            placeholder="+244 9XX XXX XXX"
                                                      />
                                                </div>
                                          </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Endereço Físico</label>
                                          <div className="relative">
                                                <span className="absolute left-4 top-3.5 text-gray-500"><i className="fas fa-map-marker-alt"></i></span>
                                                <textarea
                                                      name="address"
                                                      value={formData.address}
                                                      onChange={handleChange}
                                                      rows={3}
                                                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner resize-none"
                                                      placeholder="Rua Exemplo, 123, Luanda, Angola"
                                                />
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Horário de Funcionamento</label>
                                          <div className="relative">
                                                <span className="absolute left-4 top-3.5 text-gray-500"><i className="fas fa-clock"></i></span>
                                                <input
                                                      type="text"
                                                      name="hours"
                                                      value={formData.hours}
                                                      onChange={handleChange}
                                                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                                                      placeholder="Seg - Sex: 8h às 17h"
                                                />
                                          </div>
                                    </div>

                              </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                              <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-white font-semibold mb-4">Pré-visualização do Rodapé</h3>
                                    <div className="space-y-4 text-sm text-gray-400">
                                          <div className="flex items-start gap-3">
                                                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                                                <span>{formData.address || "Endereço não informado"}</span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                                <i className="fas fa-envelope text-primary"></i>
                                                <span>{formData.email || "email@exemplo.com"}</span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                                <i className="fas fa-phone text-primary"></i>
                                                <span>{formData.phone || "+244 ..."}</span>
                                          </div>
                                    </div>
                              </div>
                        </div>

                  </div>
            </div>
      );
}
