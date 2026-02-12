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
                        <div className="admin-topbar">
                              <div className="topbar-left">
                                    <button className="menu-toggle" id="menuToggle" onClick={toggleSidebar}>
                                          <i className="fas fa-bars"></i>
                                    </button>
                                    <div className="breadcrumb" id="breadcrumb">
                                          <span className="breadcrumb-item">Dashboard</span>
                                    </div>
                              </div>

                              <div className="topbar-right">
                                    <div className="user-section">
                                          <span className="user-name" id="userName">{userName}</span>
                                          <button className="user-btn" id="userBtn" onClick={toggleUserDropdown}>
                                                {userImage ? (
                                                      <img src={userImage} alt={userName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                                ) : (
                                                      <i className="fas fa-user-circle"></i>
                                                )}
                                          </button>

                                          <div className={`user-dropdown ${isUserDropdownOpen ? 'show' : ''}`} id="userDropdown">
                                                <Link href="/admin/profile" className="dropdown-item">
                                                      <i className="fas fa-user"></i> Perfil
                                                </Link>
                                                <button className="dropdown-item" onClick={() => signOut({ callbackUrl: "/login" })}>
                                                      <i className="fas fa-sign-out-alt"></i> Sair
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
