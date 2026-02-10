import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsPortal from "@/components/NewsPortal";

async function getHeroData() {
  try {
    const hero = await prisma.heroSection.findUnique({ where: { id: 1 } });
    return hero || {
      title: "Soluções Empresariais",
      highlight: "Inovadoras",
      subtitle: "Transformamos ideias em resultados. Descubra como o Grupo SIMJS pode impulsionar o seu negócio.",
      ctaText: "Comece Agora",
      ctaLink: "/login"
    };
  } catch (error) {
    return {
      title: "Soluções Empresariais",
      highlight: "Inovadoras",
      subtitle: "Transformamos ideias em resultados. Descubra como o Grupo SIMJS pode impulsionar o seu negócio.",
      ctaText: "Comece Agora",
      ctaLink: "/login"
    };
  }
}

export default async function Home() {
  const heroData = await getHeroData();

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <video autoPlay muted loop className="hero-video">
            <source src="/assets/bg-office.mp4" type="video/mp4" />
            <source src="/assets/bg-office.webm" type="video/webm" />
            Seu navegador não suporta vídeo HTML5
          </video>
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <div className="hero-text">
              <h1>
                <span>{heroData.title}</span>{" "}
                <span className="text-gradient">{heroData.highlight}</span>
              </h1>
              <p>
                {heroData.subtitle}
              </p>
              <a href={heroData.ctaLink} className="btn-cta btn-lg">
                {heroData.ctaText}
              </a>
            </div>
          </div>
        </section>

        {/* Section Divider with Animated Logo */}
        <div className="section-divider">
          <div className="divider-content">
            <div className="logo-scroll-container">
              <div className="logo-item">
                <img
                  src="/assets/logo-simjs.png"
                  alt="SIMJS Logo"
                  className="scrolling-logo"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/assets/logo-simjs.png"
                  alt="SIMJS Logo"
                  className="scrolling-logo"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/assets/logo-simjs.png"
                  alt="SIMJS Logo"
                  className="scrolling-logo"
                />
              </div>
            </div>
            <div className="divider-glow"></div>
          </div>
        </div>

        {/* News Portal Section */}
        <NewsPortal />

        {/* Join Us Section */}
        <section className="join-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag"></span>
              <h2>
                <span>Junta-te a</span>{" "}
                <span className="text-gradient">Nós</span>
              </h2>
              <br />
              <br />
              <p className="section-desc">
                Descubra as diversas formas de fazer parte do Grupo SIMJS.
              </p>
            </div>

            <div className="join-grid">
              <div className="join-card">
                <div className="join-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3>Trabalhe Connosco</h3>
                <p>
                  Faça parte de uma equipa inovadora e dinâmica. Descubra oportunidades de
                  carreira no Grupo SIMJS.
                </p>
                <a href="/login" className="join-link">
                  Ver Vagas →
                </a>
              </div>
              <div className="join-card">
                <div className="join-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Seja Parceiro</h3>
                <p>
                  Junte-se à nossa rede de parceiros estratégicos e cresça junto com o
                  Grupo SIMJS.
                </p>
                <a href="/comunidade" className="join-link">
                  Tornar Parceiro →
                </a>
              </div>
              <div className="join-card">
                <div className="join-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Faça Parte da Comunidade</h3>
                <p>
                  Conecte-se com empreendedores, investidores e profissionais do nosso
                  ecossistema.
                </p>
                <a href="/comunidade" className="join-link">
                  Conhecer Comunidade →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
