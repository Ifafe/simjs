"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface DashboardSidebarProps {
      mobileOpen?: boolean;
}

const DashboardSidebar = ({ mobileOpen = false }: DashboardSidebarProps) => {
      const { data: session } = useSession();
      const pathname = usePathname();
      // @ts-ignore
      const role = session?.user?.role || "VISITOR";

      // Helper to check if link is active
      const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

      // Render Admin Sidebar (Template Style)
      if (role === "ADMIN") {
            return (
                  <aside className={`admin-sidebar ${mobileOpen ? 'active' : ''}`} id="adminSidebar">
                        <div className="sidebar-header">
                              <div className="logo">
                                    <i className="fas fa-cubes"></i>
                                    <span>SIMJS</span>
                              </div>
                        </div>

                        <nav className="sidebar-nav">
                              <ul className="nav-menu">
                                    <li className="nav-item">
                                          <Link href="/admin" className={`nav-link ${pathname === "/admin" ? "active" : ""}`}>
                                                <i className="fas fa-th-large"></i>
                                                <span>Dashboard</span>
                                          </Link>
                                    </li>

                                    {/* CONTEÚDO */}
                                    <li className="nav-section-title">CONTEÚDO</li>
                                    <li className="nav-item">
                                          <Link href="/admin/pages" className={`nav-link ${isActive("/admin/pages") ? "active" : ""}`}>
                                                <i className="fas fa-file-alt"></i>
                                                <span>Páginas</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/posts" className={`nav-link ${isActive("/admin/posts") ? "active" : ""}`}>
                                                <i className="fas fa-newspaper"></i>
                                                <span>Posts</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/sections" className={`nav-link ${isActive("/admin/sections") ? "active" : ""}`}>
                                                <i className="fas fa-th"></i>
                                                <span>Seções</span>
                                          </Link>
                                    </li>

                                    {/* MÍDIA */}
                                    <li className="nav-section-title">MÍDIA</li>
                                    <li className="nav-item">
                                          <Link href="/admin/media" className={`nav-link ${isActive("/admin/media") ? "active" : ""}`}>
                                                <i className="fas fa-images"></i>
                                                <span>Arquivos</span>
                                          </Link>
                                    </li>

                                    {/* PERSONALIZAÇÃO */}
                                    <li className="nav-section-title">PERSONALIZAÇÃO</li>
                                    <li className="nav-item">
                                          <Link href="/admin/menus" className={`nav-link ${isActive("/admin/menus") ? "active" : ""}`}>
                                                <i className="fas fa-bars"></i>
                                                <span>Menus</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/theme" className={`nav-link ${isActive("/admin/theme") ? "active" : ""}`}>
                                                <i className="fas fa-paint-brush"></i>
                                                <span>Tema & Cores</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/banners" className={`nav-link ${isActive("/admin/banners") ? "active" : ""}`}>
                                                <i className="fas fa-image"></i>
                                                <span>Banners</span>
                                          </Link>
                                    </li>

                                    {/* CONFIGURAÇÕES */}
                                    <li className="nav-section-title">CONFIGURAÇÕES</li>
                                    <li className="nav-item">
                                          <Link href="/admin/settings" className={`nav-link ${isActive("/admin/settings") ? "active" : ""}`}>
                                                <i className="fas fa-cog"></i>
                                                <span>Gerais</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/seo" className={`nav-link ${isActive("/admin/seo") ? "active" : ""}`}>
                                                <i className="fas fa-search"></i>
                                                <span>SEO</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/contact" className={`nav-link ${isActive("/admin/contact") ? "active" : ""}`}>
                                                <i className="fas fa-envelope"></i>
                                                <span>Contato</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/language" className={`nav-link ${isActive("/admin/language") ? "active" : ""}`}>
                                                <i className="fas fa-globe"></i>
                                                <span>Idioma</span>
                                          </Link>
                                    </li>

                                    {/* SISTEMA */}
                                    <li className="nav-section-title">SISTEMA</li>
                                    <li className="nav-item">
                                          <Link href="/admin/users" className={`nav-link ${isActive("/admin/users") ? "active" : ""}`}>
                                                <i className="fas fa-users"></i>
                                                <span>Utilizadores</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/partners" className={`nav-link ${isActive("/admin/partners") ? "active" : ""}`}>
                                                <i className="fas fa-handshake"></i>
                                                <span>Parceiros</span>
                                          </Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link href="/admin/jobs" className={`nav-link ${isActive("/admin/jobs") ? "active" : ""}`}>
                                                <i className="fas fa-briefcase"></i>
                                                <span>Vagas</span>
                                          </Link>
                                    </li>
                              </ul>
                        </nav>

                        <div className="sidebar-footer">
                              <button className="btn-logout" onClick={() => signOut({ callbackUrl: "/login" })}>
                                    <i className="fas fa-sign-out-alt"></i> Sair
                              </button>
                        </div>
                  </aside>
            );
      }

      // Render Other Roles (Partner, Job Seeker, Visitor) - Keep existing logic or simplify
      // For now, I will keep a simplified version for non-admins to avoid breaking their layouts,
      // but adapted to the new sidebar structure if possible, or fallback.
      // Since the prompt specifically asked for "minha tela do admin", I will prioritize that.
      // However, to avoid runtime errors for other roles, I'll render a compatible sidebar.

      const getNavSections = () => {
            switch (role) {
                  case "PARTNER":
                        return [
                              {
                                    title: "PARCERIA",
                                    items: [
                                          { name: "Dashboard", href: "/partner", icon: "fas fa-th-large" },
                                          { name: "Meu Perfil", href: "/partner/profile", icon: "fas fa-building" },
                                          { name: "Projetos", href: "/partner/projects", icon: "fas fa-project-diagram" },
                                    ],
                              },
                              {
                                    title: "SUPORTE",
                                    items: [
                                          { name: "Mensagens", href: "/partner/messages", icon: "fas fa-envelope" },
                                          { name: "Documentos", href: "/partner/docs", icon: "fas fa-file-pdf" },
                                    ],
                              },
                        ];
                  case "JOB_SEEKER":
                        return [
                              {
                                    title: "CARREIRA",
                                    items: [
                                          { name: "Vagas", href: "/jobs", icon: "fas fa-search" },
                                          { name: "Candidaturas", href: "/jobs/applications", icon: "fas fa-paper-plane" },
                                          { name: "Currículo", href: "/jobs/resume", icon: "fas fa-file-alt" },
                                    ],
                              },
                        ];
                  case "VISITOR":
                  default:
                        return [
                              {
                                    title: "COMUNIDADE",
                                    items: [
                                          { name: "Dashboard", href: "/visitor", icon: "fas fa-home" },
                                          { name: "Atividade", href: "/visitor/activity", icon: "fas fa-stream" },
                                          { name: "Eventos", href: "/visitor/events", icon: "fas fa-calendar" },
                                    ],
                              },
                              {
                                    title: "DESCUBRA",
                                    items: [
                                          { name: "Grupo SIMJS", href: "/grupo", icon: "fas fa-info-circle" },
                                          { name: "Parcerias", href: "/comunidade", icon: "fas fa-handshake" },
                                    ],
                              },
                        ];
            }
      };

      const sections = getNavSections();

      return (
            <aside className="admin-sidebar" id="adminSidebar">
                  <div className="sidebar-header">
                        <div className="sidebar-logo">
                              <img src="/assets/logo-simjs.png" alt="SIMJS" style={{ height: '42px' }} />
                        </div>
                  </div>

                  <nav className="sidebar-nav">
                        <ul className="nav-menu">
                              <li className="nav-item">
                                    <Link href="/" className="nav-link">
                                          <i className="fas fa-arrow-left"></i>
                                          <span>Voltar ao Site</span>
                                    </Link>
                              </li>
                              {sections.map((section, idx) => (
                                    <React.Fragment key={idx}>
                                          <li className="nav-section-title">{section.title}</li>
                                          {section.items.map(item => (
                                                <li key={item.href} className="nav-item">
                                                      <Link
                                                            href={item.href}
                                                            className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                                                      >
                                                            <i className={item.icon}></i>
                                                            <span>{item.name}</span>
                                                      </Link>
                                                </li>
                                          ))}
                                    </React.Fragment>
                              ))}
                        </ul>
                  </nav>

                  <div className="sidebar-footer">
                        <button className="btn-logout" onClick={() => signOut({ callbackUrl: "/login" })}>
                              <i className="fas fa-sign-out-alt"></i> Sair
                        </button>
                  </div>
            </aside>
      );
};

export default DashboardSidebar;
