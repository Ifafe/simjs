"use client";

import { useState } from "react";

export default function MediaPage() {
      // Mock data for now since we don't have a full media library backend yet
      const [files] = useState([
            { id: 1, name: "hero-bg.jpg", url: "/assets/hero-bg.jpg", type: "image/jpeg", size: "1.2 MB" },
            { id: 2, name: "logo-simjs.png", url: "/assets/logo-simjs.png", type: "image/png", size: "45 KB" },
            { id: 3, name: "team-1.jpg", url: "/assets/team/member-1.jpg", type: "image/jpeg", size: "350 KB" },
            { id: 4, name: "project-alpha.png", url: "/assets/projects/alpha.png", type: "image/png", size: "2.1 MB" },
      ]);

      return (
            <div className="p-8 max-w-6xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                        <div>
                              <h1 className="text-3xl font-bold text-white mb-2">Biblioteca de Mídia</h1>
                              <p className="text-gray-400">Gerencie imagens e documentos do site.</p>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
                              <i className="fas fa-upload"></i> Upload
                        </button>
                  </div>

                  {/* Grid de Arquivos */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {files.map((file) => (
                              <div key={file.id} className="group relative bg-card-bg border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
                                    <div className="aspect-square bg-gray-800 relative">
                                          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button className="w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                                      <i className="fas fa-eye"></i>
                                                </button>
                                                <button className="w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                                                      <i className="fas fa-trash"></i>
                                                </button>
                                          </div>
                                    </div>
                                    <div className="p-3">
                                          <p className="text-sm text-white font-medium truncate" title={file.name}>{file.name}</p>
                                          <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-500 uppercase">{file.type.split('/')[1]}</span>
                                                <span className="text-xs text-gray-500">{file.size}</span>
                                          </div>
                                    </div>
                              </div>
                        ))}

                        {/* Placeholder upload area */}
                        <div className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center aspect-square hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer text-gray-400 hover:text-primary">
                              <i className="fas fa-plus text-2xl mb-2"></i>
                              <span className="text-sm font-medium">Adicionar</span>
                        </div>
                  </div>

                  <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm flex items-center gap-3">
                        <i className="fas fa-info-circle text-xl"></i>
                        <div>
                              <strong>Nota do Desenvolvedor:</strong> Esta é uma versão demonstrativa. A funcionalidade completa de upload e gestão de arquivos será implementada na próxima fase.
                        </div>
                  </div>
            </div>
      );
}
