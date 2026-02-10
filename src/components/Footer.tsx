import React from "react";
import Link from "next/link";

const Footer = () => {
      return (
            <footer className="footer">
                  <div className="container">
                        <div className="footer-grid">
                              <div className="footer-brand">
                                    <img src="/assets/logo-simjs.png" alt="SIMJS" className="footer-logo" />
                                    <p>Um grupo empresarial comprometido com a inovação e excelência em múltiplos sectores.</p>
                                    <div className="social-links">
                                          <a href="#" className="social-link"><i className="fab fa-facebook"></i></a>
                                          <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                                          <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                                          <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                                    </div>
                              </div>

                              <div className="footer-links">
                                    <h4>Links Rápidos</h4>
                                    <ul>
                                          <li><Link href="/">Início</Link></li>
                                          <li><Link href="/grupo">Grupo</Link></li>
                                          <li><Link href="/comunidade">Comunidade</Link></li>
                                          <li><Link href="/depoimento">Depoimentos</Link></li>
                                          <li><Link href="/contacto">Contacto</Link></li>
                                    </ul>
                              </div>

                              <div className="footer-contact">
                                    <h4>Contacto</h4>
                                    <ul>
                                          <li><i className="fas fa-map-marker-alt"></i> Luanda, Angola</li>
                                          <li><i className="fas fa-phone"></i> +244 923 000 000</li>
                                          <li><i className="fas fa-envelope"></i> info@gruposimjs.com</li>
                                    </ul>
                              </div>

                              <div className="footer-newsletter">
                                    <h4>Newsletter</h4>
                                    <p>Receba as últimas novidades do grupo SIMJS.</p>
                                    <form className="newsletter-form">
                                          <input type="email" placeholder="Seu e-mail" />
                                          <button type="submit">Subscrever</button>
                                    </form>
                              </div>
                        </div>

                        <div className="footer-bottom">
                              <p>© {new Date().getFullYear()} Grupo SIMJS. Todos os direitos reservados.</p>
                              <div className="footer-legal">
                                    <a href="#">Política de Privacidade</a>
                                    <a href="#">Termos de Uso</a>
                              </div>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
