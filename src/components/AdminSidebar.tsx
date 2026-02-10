"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
      const pathname = usePathname();

      const sections = [
            {
                  title: "CONTEÚDO", items: [
                        { name: "Dashboard", href: "/admin", icon: "fas fa-th-large" },
                        { name: "Seções", href: "/admin/secoes", icon: "fas fa-th" }
                  ]
            },
            {
                  title: "EDITAR SITE", items: [
                        { name: "Página Inicial", href: "/admin/homepage", icon: "fas fa-home" },
                        { name: "Grupo", href: "/admin/grupo", icon: "fas fa-building" },
                        { name: "Comunidade", href: "/admin/comunidade", icon: "fas fa-users" }
                  ]
            }
      ];

      return (
            <aside className="admin-sidebar">
                  <div className="sidebar-header">
                        <div className="sidebar-logo">
                              <i className="fas fa-shield-alt"></i>
                              <span>ADMIN SIMJS</span>
                        </div>
                  </div>

                  <nav className="sidebar-nav">
                        <ul className="nav-menu">
                              {sections.map((section, idx) => (
                                    <React.Fragment key={idx}>
                                          <li className="nav-section-title">{section.title}</li>
                                          {section.items.map(item => (
                                                <li key={item.href} className="nav-item">
                                                      <Link
                                                            href={item.href}
                                                            className={`nav-link ${pathname === item.href ? "active" : ""}`}
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
                        <button className="btn-logout">
                              <i className="fas fa-sign-out-alt"></i> Sair
                        </button>
                  </div>
            </aside>
      );
};

export default AdminSidebar;
