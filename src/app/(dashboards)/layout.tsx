"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function DashboardLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      const { data: session } = useSession();
      const userName = session?.user?.name || "Utilizador";
      const userImage = session?.user?.image || null;

      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

      const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
      const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

      // Close dropdown when clicking outside
      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  const target = event.target as HTMLElement;
                  if (!target.closest('.user-section')) {
                        setIsUserDropdownOpen(false);
                  }
            };

            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
      }, []);

      return (
            <div className="admin-body">
                  <DashboardSidebar mobileOpen={isSidebarOpen} />

                  {/* MAIN AREA */}
                  <div className={`admin-main ${isSidebarOpen ? 'active' : ''}`}>
                        {/* TOPBAR */}
                        <div className="admin-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: '70px', background: 'var(--bg-header)', borderBottom: '1px solid var(--border-color)' }}>
                              <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <button className="menu-toggle" id="menuToggle" onClick={toggleSidebar}>
                                          <i className="fas fa-bars"></i>
                                    </button>
                                    <div className="breadcrumb" id="breadcrumb">
                                          <span className="breadcrumb-item" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Dashboard</span>
                                    </div>
                              </div>

                              <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                    {/* Greeting & Quick Actions */}
                                    <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
                                          <span className="text-blue-400 font-medium">
                                                {new Date().getHours() < 12 ? "Bom dia" : new Date().getHours() < 18 ? "Boa tarde" : "Boa noite"},
                                                {/* @ts-ignore */}
                                                <strong className="text-white ml-1">[{session?.user?.role || "Admin"}]</strong>
                                          </span>

                                          <div className="h-4 w-[1px] bg-gray-700 mx-2"></div>

                                          <button className="hover:text-white transition-colors"><i className="fas fa-sun"></i></button>
                                          <button className="hover:text-white transition-colors"><i className="fas fa-question-circle"></i></button>
                                          <button className="hover:text-white transition-colors flex items-center gap-1"><i className="fas fa-globe"></i> PT</button>
                                          <button className="hover:text-white transition-colors relative">
                                                <i className="fas fa-bell"></i>
                                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                          </button>

                                          <div className="h-4 w-[1px] bg-gray-700 mx-2"></div>
                                    </div>

                                    {/* Profile Section */}
                                    <div className="user-section" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={toggleUserDropdown}>
                                          <div className="text-right hidden sm:block leading-tight">
                                                <div className="text-sm font-bold text-white">[Super] Diretor Geral</div>
                                                <div className="text-xs text-blue-400">{userName}</div>
                                          </div>

                                          <div className="relative">
                                                <button className="user-btn" id="userBtn" style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'white' }}>
                                                      {userImage ? (
                                                            <img src={userImage} alt={userName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                                      ) : (
                                                            <span className="font-bold">{userName.charAt(0).toUpperCase()}</span>
                                                      )}
                                                </button>
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></div>
                                          </div>

                                          <div className={`user-dropdown ${isUserDropdownOpen ? 'show' : ''}`} id="userDropdown" style={{ top: '60px' }}>
                                                <div className="px-4 py-3 border-b border-gray-700 mb-2">
                                                      <p className="text-sm text-white font-bold">{userName}</p>
                                                      <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
                                                </div>
                                                <Link href="/admin/profile" className="dropdown-item">
                                                      <i className="fas fa-user mr-2"></i> Meu Perfil
                                                </Link>
                                                <Link href="/admin/settings" className="dropdown-item">
                                                      <i className="fas fa-cog mr-2"></i> Configurações
                                                </Link>
                                                <div className="border-t border-gray-700 my-1"></div>
                                                <button className="dropdown-item w-full text-left text-red-400 hover:text-red-300" onClick={() => signOut({ callbackUrl: "/login" })}>
                                                      <i className="fas fa-sign-out-alt mr-2"></i> Sair
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        {/* CONTENT */}
                        <main className="admin-content">
                              {children}
                        </main>
                  </div>
            </div>
      );
}
