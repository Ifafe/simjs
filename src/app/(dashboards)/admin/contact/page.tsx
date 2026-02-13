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
            <div className="p-6 max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                              <h1 className="text-2xl font-bold text-white mb-2">Contato</h1>
                              <p className="text-gray-400">Gerencie os canais de comunicação exibidos no site.</p>
                        </div>
                        <button
                              onClick={handleSubmit}
                              disabled={saving}
                              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                              <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                          <i className="fas fa-address-book text-primary"></i> Canais de Atendimento
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">E-mail Principal</label>
                                                <input
                                                      type="email"
                                                      name="email"
                                                      value={formData.email}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="contato@simjs.com"
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Telefone</label>
                                                <input
                                                      type="text"
                                                      name="phone"
                                                      value={formData.phone}
                                                      onChange={handleChange}
                                                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                      placeholder="+244 9XX XXX XXX"
                                                />
                                          </div>
                                    </div>

                                    <div className="space-y-2 mb-5">
                                          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Endereço Físico</label>
                                          <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                                placeholder="Rua Exemplo, 123, Luanda, Angola"
                                          />
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Horário de Funcionamento</label>
                                          <input
                                                type="text"
                                                name="hours"
                                                value={formData.hours}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                                placeholder="Seg - Sex: 8h às 17h"
                                          />
                                    </div>

                              </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                              <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="text-white font-semibold mb-4 text-sm">Resumo</h3>
                                    <div className="space-y-4 text-sm text-gray-400">
                                          <div className="flex items-start gap-3">
                                                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                                                <span>{formData.address || "Endereço não informado"}</span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                                <i className="fas fa-envelope text-primary"></i>
                                                <span>{formData.email || "email@exemplo.com"}</span>
                                          </div>
                                    </div>
                              </div>
                        </div>

                  </div>
            </div>
      );
}
