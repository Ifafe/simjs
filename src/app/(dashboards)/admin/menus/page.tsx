"use client";

import { useState, useEffect } from "react";

interface MenuItem {
      id: number;
      label: string;
      url: string;
      order: number;
}

export default function MenusPage() {
      const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
      const [loading, setLoading] = useState(true);
      const [newItem, setNewItem] = useState({ label: "", url: "", order: 0 });
      const [saving, setSaving] = useState(false);

      useEffect(() => {
            fetchMenus();
      }, []);

      const fetchMenus = async () => {
            try {
                  const res = await fetch("/api/menus");
                  const data = await res.json();
                  if (Array.isArray(data)) {
                        setMenuItems(data);
                  }
            } catch {
                  console.error("Failed to load menus");
            } finally {
                  setLoading(false);
            }
      };

      const handleAdd = async () => {
            if (!newItem.label || !newItem.url) return alert("Preencha o nome e o link");
            setSaving(true);
            try {
                  const res = await fetch("/api/menus", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newItem),
                  });
                  if (res.ok) {
                        setNewItem({ label: "", url: "", order: 0 });
                        fetchMenus();
                  }
            } catch {
                  alert("Erro ao adicionar");
            } finally {
                  setSaving(false);
            }
      };

      const handleDelete = async (id: number) => {
            if (!confirm("Tem certeza que deseja apagar este menu?")) return;
            try {
                  await fetch(`/api/menus?id=${id}`, { method: "DELETE" });
                  fetchMenus();
            } catch {
                  alert("Erro ao apagar");
            }
      };

      return (
            <section className="content-section active">
                  <div className="section-header">
                        <div>
                              <h1>Gerenciar Menus</h1>
                              <p>Adicione e organize os links do topo do site</p>
                        </div>
                  </div>

                  <div className="form-card mb-6">
                        <h2>Adicionar Novo Link</h2>
                        <div className="form-row">
                              <div className="form-group" style={{ flex: 2 }}>
                                    <label>Nome do Link</label>
                                    <input
                                          type="text"
                                          placeholder="Ex: Sobre Nós"
                                          value={newItem.label}
                                          onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                                    />
                              </div>
                              <div className="form-group" style={{ flex: 2 }}>
                                    <label>URL (Link)</label>
                                    <input
                                          type="text"
                                          placeholder="Ex: /sobre"
                                          value={newItem.url}
                                          onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                                    />
                              </div>
                              <div className="form-group" style={{ flex: 1 }}>
                                    <label>Ordem</label>
                                    <input
                                          type="number"
                                          value={newItem.order}
                                          onChange={(e) => setNewItem({ ...newItem, order: parseInt(e.target.value) })}
                                    />
                              </div>
                              <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
                                    <button className="btn-primary" onClick={handleAdd} disabled={saving} style={{ height: "42px" }}>
                                          {saving ? "..." : <i className="fas fa-plus"></i>}
                                    </button>
                              </div>
                        </div>
                  </div>

                  <div className="form-card">
                        <h2>Links Ativos</h2>
                        {loading ? (
                              <p>Carregando...</p>
                        ) : menuItems.length === 0 ? (
                              <p className="text-muted">Nenhum menu cadastrado.</p>
                        ) : (
                              <div className="table-responsive">
                                    <table className="data-table">
                                          <thead>
                                                <tr>
                                                      <th>Ordem</th>
                                                      <th>Nome</th>
                                                      <th>Link</th>
                                                      <th>Ações</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {menuItems.map((item) => (
                                                      <tr key={item.id}>
                                                            <td>{item.order}</td>
                                                            <td><strong>{item.label}</strong></td>
                                                            <td className="text-muted">{item.url}</td>
                                                            <td>
                                                                  <button
                                                                        onClick={() => handleDelete(item.id)}
                                                                        className="btn-icon danger"
                                                                        title="Remover"
                                                                  >
                                                                        <i className="fas fa-trash"></i>
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        )}
                  </div>
            </section>
      );
}
