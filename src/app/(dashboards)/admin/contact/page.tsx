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
            return <div className="p-8 text-center text-gray-400">Carregando...</div>;
      }

      return (
            <div className="p-8 max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                        <div>
                              <h1 className="text-3xl font-bold text-white mb-2">Contato</h1>
                              <p className="text-gray-400">Gerencie as informações de contato exibidas no site.</p>
                        </div>
                  </div>

                  <div className="bg-card-bg border border-border rounded-xl p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-300">E-mail Principal</label>
                                          <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-400"><i className="fas fa-envelope"></i></span>
                                                <input
                                                      type="email"
                                                      name="email"
                                                      value={formData.email}
                                                      onChange={handleChange}
                                                      className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                      placeholder="contato@simjs.com"
                                                />
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-300">Telefone</label>
                                          <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-400"><i className="fas fa-phone"></i></span>
                                                <input
                                                      type="text"
                                                      name="phone"
                                                      value={formData.phone}
                                                      onChange={handleChange}
                                                      className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                      placeholder="+244 9XX XXX XXX"
                                                />
                                          </div>
                                    </div>
                              </div>

                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Endereço Físico</label>
                                    <div className="relative">
                                          <span className="absolute left-3 top-2.5 text-gray-400 mt-1"><i className="fas fa-map-marker-alt"></i></span>
                                          <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows={2}
                                                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Rua Exemplo, 123, Luanda, Angola"
                                          />
                                    </div>
                              </div>

                              <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Horário de Atendimento</label>
                                    <div className="relative">
                                          <span className="absolute left-3 top-2.5 text-gray-400"><i className="fas fa-clock"></i></span>
                                          <input
                                                type="text"
                                                name="hours"
                                                value={formData.hours}
                                                onChange={handleChange}
                                                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Seg - Sex: 8h às 17h"
                                          />
                                    </div>
                              </div>

                              <div className="pt-6 flex justify-end">
                                    <button
                                          type="submit"
                                          disabled={saving}
                                          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                          {saving ? (
                                                <>
                                                      <i className="fas fa-spinner fa-spin"></i> Salvando...
                                                </>
                                          ) : (
                                                <>
                                                      <i className="fas fa-save"></i> Salvar Informações
                                                </>
                                          )}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
