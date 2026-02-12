"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminManagerDashboard = () => {
      const router = useRouter();
      const { data: session, status } = useSession();
      // @ts-ignore
      const isAuthorized = session?.user?.role === "ADMIN";

      const [stats, setStats] = useState({
            pages: 0,
            posts: 0,
            media: 0,
            users: 0
      });

      useEffect(() => {
            if (status === "loading") return;

            if (!isAuthorized) {
                  router.push("/login");
            } else {
                  fetch("/api/admin/stats")
                        .then(res => res.json())
                        .then(data => {
                              if (data && !data.error) {
                                    setStats({
                                          pages: data.pages || 0,
                                          posts: data.posts || 0,
                                          media: data.media || 0,
                                          users: data.users || 0
                                    });
                              }
                        })
                        .catch(err => console.error("Error loading stats:", err));
            }
      }, [session, status, router, isAuthorized]);

      if (status === "loading" || !isAuthorized) {
            return null;
      }

      return (
            <div className="content-section active" id="dashboard-section">
                  <div className="section-header">
                        <div>
                              <h1>Dashboard</h1>
                              <p>Bem-vindo ao painel administrativo SIMJS</p>
                        </div>
                  </div>

                  <div className="stats-grid">
                        <div className="stat-card">
                              <div className="stat-icon" style={{ background: 'rgba(255, 23, 68, 0.1)', color: '#ff1744' }}>
                                    <i className="fas fa-file-alt"></i>
                              </div>
                              <div className="stat-content">
                                    <p className="stat-label">Páginas</p>
                                    <p className="stat-number" id="pagesCount">{stats.pages}</p>
                              </div>
                        </div>

                        <div className="stat-card">
                              <div className="stat-icon" style={{ background: 'rgba(255, 145, 0, 0.1)', color: '#ff9100' }}>
                                    <i className="fas fa-newspaper"></i>
                              </div>
                              <div className="stat-content">
                                    <p className="stat-label">Posts</p>
                                    <p className="stat-number" id="postsCount">{stats.posts}</p>
                              </div>
                        </div>

                        <div className="stat-card">
                              <div className="stat-icon" style={{ background: 'rgba(255, 92, 124, 0.1)', color: '#ff5c7c' }}>
                                    <i className="fas fa-images"></i>
                              </div>
                              <div className="stat-content">
                                    <p className="stat-label">Mídia</p>
                                    <p className="stat-number" id="mediaCount">{stats.media}</p>
                              </div>
                        </div>

                        <div className="stat-card">
                              <div className="stat-icon" style={{ background: 'rgba(204, 0, 0, 0.1)', color: '#cc0000' }}>
                                    <i className="fas fa-users"></i>
                              </div>
                              <div className="stat-content">
                                    <p className="stat-label">Utilizadores</p>
                                    <p className="stat-number" id="usersCount">{stats.users}</p>
                              </div>
                        </div>
                  </div>

                  <div className="quick-actions">
                        <h2>Ações Rápidas</h2>
                        <div className="actions-grid">
                              <button className="action-btn" onClick={() => router.push('/admin/pages/new')}>
                                    <i className="fas fa-plus"></i> Nova Página
                              </button>
                              <button className="action-btn" onClick={() => router.push('/admin/posts/new')}>
                                    <i className="fas fa-plus"></i> Novo Post
                              </button>
                              <button className="action-btn" onClick={() => router.push('/admin/media')}>
                                    <i className="fas fa-upload"></i> Upload
                              </button>
                              <button className="action-btn" onClick={() => router.push('/admin/settings')}>
                                    <i className="fas fa-cog"></i> Configurações
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default AdminManagerDashboard;
