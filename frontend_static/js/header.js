// Injects a common header across all pages and initializes language persistence
(function() {
  function buildHeaderHTML() {
    return `
    <header class="header" id="header">
      <div class="container">
        <div class="header-content">
          <a href="index.html" class="logo">
            <img src="assets/logo-simjs.png" alt="SIMJS" class="logo-img">
          </a>
          <nav class="nav" id="nav">
            <ul class="nav-list">
              <li class="nav-item has-submenu">
                <a href="index.html" class="nav-link" data-i18n="nav-simjs">Home<span class="arrow">▼</span></a>
                <ul class="submenu">
                  <li><a href="quem-somos.html">Quem Somos</a></li>
                </ul>
              </li>
              <li class="nav-item has-submenu">
                <a href="grupo.html" class="nav-link" data-i18n="nav-grupo">Grupo<span class="arrow">▼</span></a>
                <ul class="submenu">
                  <li><a href="grupo.html#empresas" data-i18n="nav-empresas">Empresas</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a href="comunidade.html" class="nav-link" data-i18n="nav-comunidade">Comunidade</a>
              </li>
              <li class="nav-item">
                <a href="depoimento.html" class="nav-link" data-i18n="nav-depoimento">Depoimento</a>
              </li>
              <li class="nav-item">
                <a href="contacto.html" class="nav-link" data-i18n="nav-contacto">Contacto</a>
              </li>
            </ul>
          </nav>
          <div class="header-right">
            <div class="auth-buttons">
              <a href="login.html" class="btn-login">
                <i class="fas fa-sign-in-alt"></i>
                <span data-i18n="btn-login">Login</span>
              </a>
            </div>
            <div class="language-selector" id="languageSelector">
              <button class="language-btn" aria-label="Seletor de idiomas">
                <span class="lang-icon">🌐</span>
                <span class="lang-text">PT</span>
              </button>
              <ul class="language-menu">
                <li><a href="#" data-lang="pt" class="lang-option">Português</a></li>
                <li><a href="#" data-lang="en" class="lang-option">English</a></li>
                <li><a href="#" data-lang="hi" class="lang-option">हिन्दी</a></li>
                <li><a href="#" data-lang="zh" class="lang-option">中文</a></li>
              </ul>
            </div>
            <button class="mobile-toggle" id="mobileToggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>`;
  }

  function applyPersistedLanguage() {
    const languageSelector = document.getElementById('languageSelector');
    if (!languageSelector) return;

    const languageBtn = languageSelector.querySelector('.language-btn');
    const langOptions = languageSelector.querySelectorAll('.lang-option');
    const langText = languageBtn.querySelector('.lang-text');

    const languageNames = { pt: 'PT', en: 'EN', hi: 'HI', zh: 'ZH' };
    const lang = localStorage.getItem('selectedLanguage') || 'pt';
    langText.textContent = languageNames[lang] || 'PT';

    // Set active class
    langOptions.forEach(opt => opt.classList.toggle('active', opt.getAttribute('data-lang') === lang));

    // If translations.js is loaded, translate now
    if (window.translations && window.translations[lang]) {
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.translations[lang][key]) {
          el.textContent = window.translations[lang][key];
        }
      });
      document.documentElement.lang = lang;
    }
  }

  function injectHeader() {
    // If page already has a header, replace it; else insert at top of body
    const existingHeader = document.getElementById('header');
    const headerHTML = buildHeaderHTML();
    if (existingHeader) {
      existingHeader.outerHTML = headerHTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    applyPersistedLanguage();
  }

  // Run after DOMContentLoaded or immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();