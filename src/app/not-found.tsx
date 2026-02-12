"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
      return (
            <>
                  <Header />
                  <main className="min-h-screen flex flex-col">
                        <section className="page-hero flex-grow flex items-center justify-center relative overflow-hidden" style={{ minHeight: '60vh' }}>
                              <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #111 0%, #000 100%)', position: 'absolute', inset: 0, zIndex: -1 }}></div>

                              <div className="container text-center relative z-10">
                                    <h1 style={{ fontSize: '8rem', fontWeight: '800', lineHeight: 1, marginBottom: '20px' }}>
                                          <span className="text-gradient">404</span>
                                    </h1>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff' }}>Página Não En encontrada</h2>
                                    <p style={{ color: '#888', marginBottom: '40px', maxWidth: '600px', marginInline: 'auto' }}>
                                          Desculpe, a página que você está procurando não existe ou foi movida.
                                    </p>

                                    <Link href="/" className="btn-primary" style={{ display: 'inline-block', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', background: '#cc0000', color: '#fff' }}>
                                          Voltar ao Início
                                    </Link>
                              </div>
                        </section>
                  </main>
                  <Footer />
            </>
      );
}
