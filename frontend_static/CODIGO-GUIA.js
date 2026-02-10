/**
 * GUIA DE ORGANIZAÇÃO DO CÓDIGO
 * Grupo SIMJS Website
 * =====================================
 */

/*
 * ESTRUTURA HTML
 * =====================================
 * 
 * Padrão semântico:
 * 1. <header> - Navegação fixa com logo
 * 2. <main> - Conteúdo principal
 *    - <section class="hero"> - Hero com vídeo/carrossel
 *    - <section class="work-environment"> - Cards com hover effects
 *    - <section class="mvv-section"> - Missão, Visão, Valores
 *    - <section class="join-section"> - Call-to-action
 * 3. <footer> - Footer com links e newsletter
 * 
 * Todas as strings dinâmicas devem ter: data-i18n="chave"
 */

/*
 * ESTRUTURA CSS (style.css - 2387 linhas)
 * =====================================
 * 
 * 1. RESET & VARIÁVEIS (Root)
 *    - CSS variables (cores, sombras, gradientes)
 *    - Reset padrão
 *    - Acessibilidade base
 * 
 * 2. SPLASH SCREEN (@100-150)
 *    - Loading animation
 * 
 * 3. HEADER (@158-750)
 *    - Navbar dinâmico com scroll effects
 *    - Logo animations
 *    - Menu dropdown
 *    - Mobile toggle
 * 
 * 4. HERO SECTION (@690-800)
 *    - Background video
 *    - Overlay
 *    - Typography
 * 
 * 5. COMPONENTS (@800+)
 *    - Cards (.env-card com mouse tracking)
 *    - Forms
 *    - Carousels
 *    - Buttons
 * 
 * 6. RESPONSIVE (@1592+)
 *    - @media (max-width: 1024px)
 *    - @media (max-width: 768px)
 * 
 * TODO MELHORIAS CSS:
 * - Consolidar variáveis de cores
 * - Remover IDs redundantes (usar classes)
 * - Otimizar specificity
 */

/*
 * ESTRUTURA JAVASCRIPT
 * =====================================
 */

// ============== main.js (438 linhas) ==============
//
// INICIALIZAÇÃO: document.addEventListener('DOMContentLoaded', ...)
// 
// SEÇÕES:
//
// 1. LANGUAGE SELECTOR & TRANSLATION (~120 linhas)
//    - Toggle language dropdown
//    - Click outside behavior
//    - localStorage persistence
//    - Dynamic translation of all [data-i18n] elements
//    - Preserve child elements while translating
//    Deps: translations.js, localStorage
//
// 2. HEADER SCROLL DYNAMICS (~15 linhas)
//    - Add 'scrolled' class @ 20px
//    - Add 'compact' class @ 80px
//    - Logo resize on compact
//    Deps: CSS classes (.scrolled, .compact)
//
// 3. MOBILE MENU TOGGLE (~20 linhas)
//    - Click hambúrguer → toggle .active on nav
//    - Close menu on link click
//    - Double handler check (removed duplicate)
//    Deps: #mobileToggle, #nav, .nav-link
//
// 4. HERO CAROUSEL (~30 linhas)
//    - Auto-advance every 4s
//    - Click indicators to jump
//    Deps: #heroCarousel, .carousel-slide, .indicator
//
// 5. GROUP CAROUSEL (~40 linhas)
//    - Auto-advance every 5s
//    - Transition lock (isTransitioning flag)
//    - Add .prev class for exit animation
//    Deps: #groupCarousel, .carousel-slide, .carousel-dot
//
// 6. TESTIMONIAL CAROUSEL (~50 linhas)
//    - Auto-advance every 5s
//    - Prev/Next buttons
//    - Click indicators
//    Deps: #testimonialCarousel, .testimonial-slide, .testimonial-indicator
//
// 7. CARD MOUSE TRACKING (~50 linhas)
//    - Calculate mouse position relative to card
//    - Apply 3D transform (rotateX, rotateY)
//    - Different intensity for company cards
//    - CSS custom props: --mouse-x, --mouse-y
//    Deps: .env-card, @media query detection
//
// 8. ORGANOGRAM HOVER (~15 linhas)
//    - Scale 1.1 on hover
//    - Red glow shadow
//    Deps: .org-node
//
// 9. FORM HANDLING (~40 linhas)
//    - contactForm: show success message
//    - testimonialForm: show success message
//    - Replace form HTML on submit
//    Deps: #contactForm, #testimonialForm
//
// 10. STAR RATING (~30 linhas)
//     - Click to select rating
//     - Hover preview
//     - Preserve selectedRating value
//     Deps: .star-rating .star
//
// 11. MEDIA GALLERY HOVER (~10 linhas)
//     - Scale 1.05 on hover
//     Deps: .media-item
//
// REMOVED FEATURES:
// ❌ AOS (Animate On Scroll) - código comentado removido
// ❌ Test/debug console.logs - removido
// ❌ Variáveis não usadas - removido autoPlayInterval

// ============== header.js (109 linhas) ==============
//
// IIFE (Immediately Invoked Function Expression)
// Executa ao carregar a página
//
// FUNÇÕES:
// - buildHeaderHTML() → retorna HTML string do header
// - applyPersistedLanguage() → sincroniza idioma do localStorage
// - injectHeader() → injeta header no DOM ou substitui existente
//
// QUANDO USAR:
// - Páginas dinâmicas sem header inline
// - Páginas geradas dinamicamente (SPA)
//
// QUANDO NÃO USAR:
// - index.html já tem header inline (HTML é injetado)
// - Causa redundância em pages normais
//
// NOTA: index.html tem seu próprio header hardcoded
//       header.js é backup para outras páginas

// ============== translations.js (~80 linhas) ==============
//
// ESTRUTURA:
// window.translations = {
//     'pt': { key: 'value', ... },
//     'en': { key: 'value', ... },
//     'hi': { key: 'value', ... },
//     'zh': { key: 'value', ... }
// }
//
// COMO USAR:
// 1. Adicionar data-i18n="minha-chave" no HTML
// 2. Adicionar 'minha-chave' em todos os idiomas em translations.js
// 3. main.js faz o resto automaticamente
//
// CHAVES ATUAIS:
// - nav-* (navegação)
// - hero-* (hero section)
// - work-env-* (work environment)
// - values-* (valores)
// - join-* (join section)
// - btn-* (botões)

/*
 * FLUXO DE TRADUÇÃO
 * =====================================
 * 
 * 1. Página carrega → DOMContentLoaded
// 2. main.js executa
// 3. Lê localStorage.getItem('selectedLanguage') || 'pt'
// 4. Traduz todos os [data-i18n] elementos
// 5. User clica em outro idioma → repete
// 6. localStorage persiste a escolha
 */

/*
 * PADRÕES DE CÓDIGO
 * =====================================
 * 
 * ✅ CORRETO:
 * 
 * const element = document.getElementById('id');
 * if (element) {
 *     element.addEventListener('click', function(e) {
 *         e.preventDefault();
 *     });
 * }
 * 
 * ✅ CORRETO (mais moderno):
 * 
 * const handleClick = (e) => {
 *     e.preventDefault();
 *     // ...
 * };
 * document.getElementById('id')?.addEventListener('click', handleClick);
 * 
 * ✅ CORRETO (classList):
 * 
 * element.classList.add('active');
 * element.classList.remove('active');
 * element.classList.toggle('active', condition);
 * 
 * ❌ ERRADO:
 * 
 * element.className = 'active'; // Sobrescreve todas as classes
 * 
 * ✅ CORRETO (localStorage):
 * 
 * localStorage.setItem('key', value);
 * const value = localStorage.getItem('key') || 'default';
 * 
 * ❌ ERRADO (sessionStorage para lang):
 * 
 * sessionStorage se limpa ao fechar aba → ruim para idioma
 */

/*
 * CHECKLIST DE MANUTENÇÃO
 * =====================================
 * 
 * Ao adicionar novo conteúdo:
 * 
 * ☐ Criar estrutura semântica em HTML
 * ☐ Adicionar classes CSS descritivas
 * ☐ Adicionar data-i18n para textos dinâmicos
 * ☐ Adicionar chave em translations.js (4 idiomas)
 * ☐ Adicionar funcionalidade em main.js (se interativo)
 * ☐ Testar responsividade (768px, 1024px)
 * ☐ Testar todos os idiomas
 * ☐ Adicionar comentários no código
 * ☐ Validar acessibilidade (alt text, aria labels)
 * ☐ Minificar antes de deploy
 */

/*
 * PERFORMANCE TIPS
 * =====================================
 * 
 * ✅ FEITO:
 * - Remover console.logs em produção
 * - Remover código comentado
 * - Usar CSS variables para theming
 * - Event delegation em loops grandes
 * 
 * TODO:
 * - Lazy loading de imagens (sizes, srcset)
 * - Minify CSS/JS
 * - Critical CSS inline
 * - Service worker para offline
 * - CDN para assets estáticos
 * - Reduce animations em @media (prefers-reduced-motion)
 */

/*
 * ACESSIBILIDADE
 * =====================================
 * 
 * ✅ IMPLEMENTADO:
 * - aria-label em buttons
 * - document.documentElement.lang = lang
 * - :focus-visible com outline
 * 
 * TODO:
 * - role="navigation" em nav
 * - aria-current="page" na página ativa
 * - aria-expanded em dropdowns
 * - Rotas de teclado (Tab, Arrow keys)
 * - Alt text em todas as imagens
 * - Skip link para conteúdo
 */
