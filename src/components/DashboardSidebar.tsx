"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface NavItem {
      name: string;
      href: string;
      icon: string;
}

interface NavSection {
      title: string;
      items: NavItem[];
}

const DashboardSidebar = () => {
      const { data: session } = useSession();
      const pathname = usePathname();
      const [role, setRole] = useState<string>("VISITOR");

      useEffect(() => {
            // @ts-ignore
            if (session?.user?.role) {
                  // @ts-ignore
                  setRole(session.user.role);
            }
      }, [session]);

      const getNavSections = (): NavSection[] => {
            switch (role) {
                  case "ADMIN":
                        return [
                              {
                                    title: "GESTÃO",
                                    items: [
                                          { name: "Global Admin", href: "/admin", icon: "fas fa-shield-alt" },
                                          { name: "Utilizadores", href: "/admin/users", icon: "fas fa-users-cog" },
                                          { name: "Conteúdo Site", href: "/admin/cms", icon: "fas fa-edit" },
                                    ],
                              },
                              {
                                    title: "OPERAÇÕES",
                                    items: [
                                          { name: "Parceiros", href: "/admin/partners", icon: "fas fa-handshake" },
                                          { name: "Vagas Emprego", href: "/admin/jobs", icon: "fas fa-briefcase" },
                                    ],
                              },
                        ];
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
            <aside className="admin-sidebar" style={{ width: '250px', minWidth: '250px', height: '100vh', position: 'sticky', top: 0 }}>
                  <div className="sidebar-header">
                        <div className="sidebar-logo">
                              <img src="/assets/logo-simjs.png" alt="SIMJS" style={{ height: '42px' }} />
                        </div>
                  </div>

                  <nav className="sidebar-nav" style={{ marginLeft: '3%' }}>
                        <ul className="nav-menu">
                              {sections.map((section, idx) => (
                                    <React.Fragment key={idx}>
                                          <li className="nav-section-title" style={{ marginTop: idx === 0 ? '0' : '20px' }}>{section.title}</li>
                                          {section.items.map(item => (
                                                <li key={item.href} className="nav-item">
                                                      <Link
                                                            href={item.href}
                                                            className={`nav-link ${pathname === item.href ? "active" : ""}`}
                                                            style={{ marginRight: '7%' }}
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
                        <button
                              className="btn-logout"
                              onClick={() => import("next-auth/react").then(({ signOut }) => signOut({ callbackUrl: "/login" }))}
                        >
                              <i className="fas fa-sign-out-alt"></i> Sair
                        </button>
                  </div>
            </aside>
      );
};

export default DashboardSidebar;
