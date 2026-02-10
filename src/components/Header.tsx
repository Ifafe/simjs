"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const pathname = usePathname();

      useEffect(() => {
            const handleScroll = () => {
                  setIsScrolled(window.scrollY > 50);
            };
            window.addEventListener("scroll", handleScroll);
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
                                          <li className="nav-item">
                                                <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                                                      Home
                                                </Link>
                                          </li>
                                          <li className="nav-item">
                                                <Link href="/grupo" className={`nav-link ${pathname === "/grupo" ? "active" : ""}`}>
                                                      Grupo
                                                </Link>
                                          </li>
                                          <li className="nav-item">
                                                <Link href="/comunidade" className={`nav-link ${pathname === "/comunidade" ? "active" : ""}`}>
                                                      Comunidade
                                                </Link>
                                          </li>
                                          <li className="nav-item">
                                                <Link href="/depoimento" className={`nav-link ${pathname === "/depoimento" ? "active" : ""}`}>
                                                      Depoimento
                                                </Link>
                                          </li>
                                          <li className="nav-item">
                                                <Link href="/contacto" className={`nav-link ${pathname === "/contacto" ? "active" : ""}`}>
                                                      Contacto
                                                </Link>
                                          </li>
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
