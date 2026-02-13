"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
      id: number;
      label: string;
      url: string;
      active: boolean;
}

const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
      const pathname = usePathname();

      useEffect(() => {
            const handleScroll = () => {
                  setIsScrolled(window.scrollY > 50);
            };
            window.addEventListener("scroll", handleScroll);

            // Fetch Menus
            fetch("/api/menus")
                  .then((res) => res.json())
                  .then((data) => {
                        if (Array.isArray(data) && data.length > 0) {
                              setMenuItems(data);
                        } else {
                              // Fallback defaults if API fails or empty
                              setMenuItems([
                                    { id: 1, label: "Home", url: "/", active: true },
                                    { id: 2, label: "Grupo", url: "/grupo", active: true },
                                    { id: 3, label: "Comunidade", url: "/comunidade", active: true },
                                    { id: 4, label: "Depoimento", url: "/depoimento", active: true },
                                    { id: 5, label: "Contacto", url: "/contacto", active: true },
                              ]);
                        }
                  })
                  .catch(() => {
                        // Fallback defaults
                        setMenuItems([
                              { id: 1, label: "Home", url: "/", active: true },
                              { id: 2, label: "Grupo", url: "/grupo", active: true },
                              { id: 3, label: "Comunidade", url: "/comunidade", active: true },
                              { id: 4, label: "Depoimento", url: "/depoimento", active: true },
                              { id: 5, label: "Contacto", url: "/contacto", active: true },
                        ]);
                  });

            return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

      return (
            <header className={`header ${isScrolled ? "scrolled" : ""}`} id="header">
                  <div className="container">
                        <div className="header-content">
                              {/* Logo */}
                              <Link href="/" className="logo">
                                    <img src="/assets/logo-simjs.png" alt="SIMJS" className="logo-img" />
                              </Link>

                              {/* Navigation */}
                              <nav className={`nav ${isMenuOpen ? "active" : ""}`} id="nav">
                                    <ul className="nav-list">
                                          {menuItems.map((item) => (
                                                <li className="nav-item" key={item.id}>
                                                      <Link href={item.url} className={`nav-link ${pathname === item.url ? "active" : ""}`}>
                                                            {item.label}
                                                      </Link>
                                                </li>
                                          ))}
                                    </ul>
                              </nav>

                              {/* Right Section */}
                              <div className="header-right">
                                    <Link href="/admin" className="btn-admin" title="Painel Admin">
                                          <i className="fas fa-shield-alt"></i>
                                    </Link>

                                    <div className="auth-buttons">
                                          <Link href="/login" className="btn-login">
                                                <i className="fas fa-sign-in-alt"></i>
                                                <span>Login</span>
                                          </Link>
                                    </div>

                                    {/* Language Selector (Simplified) */}
                                    <div className="language-selector">
                                          <button className="language-btn">
                                                <span className="lang-icon">🌐</span>
                                                <span className="lang-text">PT</span>
                                          </button>
                                    </div>

                                    {/* Mobile Toggle */}
                                    <button
                                          className={`mobile-toggle ${isMenuOpen ? "active" : ""}`}
                                          onClick={toggleMenu}
                                          aria-label="Toggle Menu"
                                    >
                                          <span></span>
                                          <span></span>
                                          <span></span>
                                    </button>
                              </div>
                        </div>
                  </div>
            </header>
      );
};

export default Header;
