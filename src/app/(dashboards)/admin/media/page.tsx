"use client";

import { useState, useEffect } from "react";

export default function MediaPage() {
      const [files, setFiles] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            fetch("/api/media")
                  .then(res => res.json())
                  .then(data => {
                        if (Array.isArray(data)) setFiles(data);
                        setLoading(false);
                  })
                  .catch(err => {
                        console.error("Load media error", err);
                        setLoading(false);
                  });
      }, []);

      const [filterType, setFilterType] = useState("");
      const [searchTerm, setSearchTerm] = useState("");

      const filteredFiles = files.filter(file => {
            const matchesType = filterType ? file.type === filterType : true;
            const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
      });

      return (
            <section className="content-section active" id="midia-section">
                  <div className="section-header">
                        <div>
                              <h1>Mídia</h1>
                              <p>Gerenciar imagens, vídeos e arquivos</p>
                        </div>
                        <button className="btn-primary" onClick={() => alert("Upload functionality to be implemented")}>
                              <i className="fas fa-upload"></i> Novo Upload
                        </button>
                  </div>

                  <div className="filters-bar">
                        <input
                              type="search"
                              placeholder="Procurar arquivo..."
                              id="mediaSearch"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                              id="mediaTypeFilter"
                              value={filterType}
                              onChange={(e) => setFilterType(e.target.value)}
                        >
                              <option value="">Todos os tipos</option>
                              <option value="image">Imagens</option>
                              <option value="video">Vídeos</option>
                              <option value="document">Documentos</option>
                        </select>
                  </div>

                  <div className="media-grid" id="mediaGrid">
                        {loading ? (
                              <p className="col-span-full text-center py-10 text-gray-400">Carregando ficheiros...</p>
                        ) : filteredFiles.length > 0 ? (
                              filteredFiles.map((file) => (
                                    <div key={file.id} className="media-item" style={{ position: 'relative' }}>
                                          {file.type === "image" ? (
                                                <img
                                                      src={file.url}
                                                      alt={file.name}
                                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150?text=No+Image'; }}
                                                />
                                          ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#333', color: '#fff', flexDirection: 'column' }}>
                                                      <i className="fas fa-file-alt" style={{ fontSize: '30px', marginBottom: '10px' }}></i>
                                                      <span style={{ fontSize: '10px', padding: '0 5px', textAlign: 'center' }}>{file.name}</span>
                                                </div>
                                          )}

                                          {/* Optional overlay for actions */}
                                          <div
                                                style={{
                                                      position: 'absolute',
                                                      inset: 0,
                                                      background: 'rgba(0,0,0,0.5)',
                                                      opacity: 0,
                                                      transition: 'opacity 0.3s',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      gap: '10px'
                                                }}
                                                className="hover:opacity-100"
                                          >
                                                <button className="btn-sm-danger" onClick={() => alert(`Delete ${file.name}`)} title="Excluir">
                                                      <i className="fas fa-trash"></i>
                                                </button>
                                          </div>
                                    </div>
                              ))
                        ) : (
                              <p className="empty-message col-span-full">Nenhuma mídia encontrada</p>
                        )}
                  </div>
            </section>
      );
}
