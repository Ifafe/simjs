"use client";

import React, { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      const { data: session } = useSession();
      const [userName, setUserName] = useState("Utilizador");

      useEffect(() => {
            if (session?.user?.name) {
                  setUserName(session.user.name);
            }
      }, [session]);

      return (
            <div className="admin-body" style={{ display: 'flex', background: 'var(--bg-deep)', minHeight: '100vh', marginLeft: '0' }}>
                  <DashboardSidebar />

                  <div className="admin-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, marginLeft: 0 }}>
                        {/* Topbar */}
                        <div className="admin-topbar" style={{
                              height: '70px',
                              background: 'rgba(10, 5, 5, 0.8)',
                              backdropFilter: 'blur(10px)',
                              borderBottom: '1px solid var(--border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0 30px',
                              position: 'sticky',
                              top: 0,
                              zIndex: 100
                        }}>
                              <div className="topbar-left">
                                    <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-primary)' }}>Bem-vindo, {userName}</h2>
                              </div>

                              <div className="topbar-right" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                          <i className="fas fa-bell"></i>
                                    </button>
                                    <Link href="/admin/profile" style={{
                                          width: '40px',
                                          height: '40px',
                                          borderRadius: '50%',
                                          background: 'var(--gradient-red)',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          color: 'white',
                                          fontWeight: 700,
                                          overflow: 'hidden',
                                          textDecoration: 'none'
                                    }}>
                                          {session?.user?.image ? (
                                                <img
                                                      src={session.user.image}
                                                      alt={userName}
                                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                          ) : (
                                                userName.charAt(0)
                                          )}
                                    </Link>
                              </div>
                        </div>

                        {/* Content */}
                        <main className="admin-content" style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
                              {children}
                        </main>
                  </div>
            </div>
      );
}
