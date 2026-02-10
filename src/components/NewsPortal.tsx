"use client";

import React, { useEffect, useState, useRef } from "react";

const articles = [
      { id: 1, title: 'IA Generativa acelera inovação em aplicações empresariais', category: 'Tecnologia', author: 'M. Silva', time: '3 min', date: '2026-01-15', source: 'Reuters', url: '#', thumb: '/assets/Novo1.jpg' },
      { id: 2, title: 'Parcerias renováveis transformam matriz energética', category: 'Energia', author: 'A. Costa', time: '4 min', date: '2026-01-18', source: 'BBC', url: '#', thumb: '/assets/novo4.jpg' },
      { id: 3, title: 'Automação industrial reduz custos operacionais', category: 'Indústria', author: 'J. Almeida', time: '5 min', date: '2026-01-12', source: 'CNBC', url: '#', thumb: '/assets/pexels-lucaspezeta-5242049.jpg' },
      { id: 4, title: 'Telemedicina amplia acesso em áreas remotas', category: 'Saúde', author: 'D. Pereira', time: '2 min', date: '2026-01-20', source: 'WHO', url: '#', thumb: '/assets/pexels-august-de-richelieu-4427627.jpg' },
      { id: 5, title: 'Mercados emergentes captam capital estrangeiro', category: 'Finanças', author: 'L. Gomes', time: '3 min', date: '2026-01-11', source: 'IMF', url: '#', thumb: '/assets/pexels-kindelmedia-6868618.jpg' },
      { id: 6, title: 'Soluções de última milha com eficiência sustentável', category: 'Logística', author: 'R. Faria', time: '3 min', date: '2026-01-09', source: 'Transport Topics', url: '#', thumb: '/assets/novo1.jpg' },
      { id: 7, title: 'Iniciativas para hidrogénio verde avançam', category: 'Energia', author: 'A. Costa', time: '4 min', date: '2026-01-05', source: 'Financial Times', url: '#', thumb: '/assets/Novo%203.jpg' },
      { id: 8, title: 'Digital twins melhoram planeamento de cadeias', category: 'Logística', author: 'R. Faria', time: '6 min', date: '2025-12-28', source: 'MIT Technology Review', url: '#', thumb: '/assets/novo4.jpg' }
];

const NewsPortal = () => {
      const [view, setView] = useState("default");
      const containerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            // Intersection Observer for reveal effects
            const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                        if (entry.isIntersecting) {
                              entry.target.classList.add("in-view");
                        }
                  });
            }, { threshold: 0.1 });

            const cards = containerRef.current?.querySelectorAll(".fp-card, .ep-card, .edit-link, .trend-link, .main-card");
            cards?.forEach(card => {
                  card.classList.add("card-reveal");
                  observer.observe(card);
            });

            return () => observer.disconnect();
      }, []);

      return (
            <section className="news-portal" id="news-portal" ref={containerRef}>
                  <div className="container">
                        <div className="section-header">
                              <h2>Onde a <span className="text-gradient">Inovação</span> Acontece — Notícias por Sector</h2>
                              <p className="section-desc">Atualizações internacionais selecionadas por sector: Tecnologia, Energia, Indústria, Saúde, Finanças, Logística.</p>
                        </div>

                        <div className={`portal-grid modern-portal ${view}`}>

                              {/* Breaking Bar */}
                              <div className="breaking-bar" role="region" aria-label="Últimas Notícias">
                                    <div className="breaking-label">Últimas Notícias</div>
                                    <div className="breaking-ticker" aria-hidden="true">
                                          <div className="ticker-track">
                                                <span>URGENTE: Cimeira Internacional aprova novo pacote de energia sustentável</span>
                                                <span>Exclusivo: Parcerias tecnológicas aceleram projetos locais</span>
                                          </div>
                                    </div>
                              </div>

                              {/* Main Grid Layout */}
                              <div className="news-main-grid">

                                    {/* Editor Picks */}
                                    <aside className="editor-picks">
                                          <div className="col-header"><h3>Escolhas do Editor</h3></div>
                                          <ul className="edit-list">
                                                {articles.slice(1, 4).map(item => (
                                                      <li key={item.id} className="edit-item">
                                                            <a href={item.url} className="edit-link">
                                                                  <img src={item.thumb} alt={item.title} className="edit-thumb" />
                                                                  <div className="edit-meta">
                                                                        <h4 className="edit-title">{item.title}</h4>
                                                                        <div className="edit-sub">{item.category} • {item.time}</div>
                                                                  </div>
                                                            </a>
                                                      </li>
                                                ))}
                                          </ul>
                                    </aside>

                                    {/* Main News Card */}
                                    <main className="main-news">
                                          <div className="main-card">
                                                <a href={articles[0].url} className="main-link">
                                                      <div className="main-image">
                                                            <img src={articles[0].thumb} alt={articles[0].title} />
                                                      </div>
                                                      <div className="main-content">
                                                            <div className="cat">{articles[0].category}</div>
                                                            <h2 className="main-title">{articles[0].title}</h2>
                                                            <div className="meta">{articles[0].author} • {articles[0].time}</div>
                                                      </div>
                                                </a>
                                          </div>
                                    </main>

                                    {/* Trending */}
                                    <aside className="trending-now">
                                          <div className="col-header"><h3>Tendências</h3></div>
                                          <ol className="trend-list">
                                                {articles.slice(4, 8).map((item, idx) => (
                                                      <li key={item.id} className="trend-item">
                                                            <a href={item.url} className="trend-link">
                                                                  <span className="trend-num">{idx + 1}</span>
                                                                  <img src={item.thumb} alt={item.title} className="trend-thumb" />
                                                                  <div className="trend-body">
                                                                        <div className="trend-title">{item.title}</div>
                                                                        <div className="trend-sub">{item.time}</div>
                                                                  </div>
                                                            </a>
                                                      </li>
                                                ))}
                                          </ol>
                                    </aside>

                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default NewsPortal;
