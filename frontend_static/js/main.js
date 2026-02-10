/**
 * SIMJS Main JavaScript
 * Manages all interactive functionality including:
 * - Language selection and translation
 * - Header scroll dynamics
 * - Mobile menu
 * - Carousels and slides
 * - Form handling
 * - Visual effects and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. LANGUAGE SELECTOR & TRANSLATION
    // ============================================
    
    const languageSelector = document.getElementById('languageSelector');
    
    // Check if languageSelector exists
    if (languageSelector) {
        const languageBtn = languageSelector.querySelector('.language-btn');
        const langOptions = languageSelector.querySelectorAll('.lang-option');
        const langText = languageBtn.querySelector('.lang-text');

        // Toggle language menu
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageSelector.classList.toggle('active');
        });
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageSelector.contains(e.target)) {
                languageSelector.classList.remove('active');
            }
        });

        // Language codes mapping
        const languageNames = {
            'pt': 'PT',
            'en': 'EN',
            'hi': 'HI',
            'zh': 'ZH'
        };

        // Get current language from localStorage or default to Portuguese
        let currentLanguage = localStorage.getItem('selectedLanguage') || 'pt';
        
        // Update display on page load
        langText.textContent = languageNames[currentLanguage];
        updateActiveLanguage(currentLanguage);
        translatePage(currentLanguage);

        // Language option click handlers
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                
                localStorage.setItem('selectedLanguage', lang);
                currentLanguage = lang;
                
                langText.textContent = languageNames[lang];
                updateActiveLanguage(lang);
                translatePage(lang);
                languageSelector.classList.remove('active');
            });
        });

        function updateActiveLanguage(lang) {
            langOptions.forEach(option => {
                option.classList.toggle('active', option.getAttribute('data-lang') === lang);
            });
        }

        function translatePage(lang) {
            if (typeof window.translations === 'undefined') {
                console.error('Translations not loaded');
                return;
            }
            
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translations = window.translations;
                
                if (translations[lang] && translations[lang][key]) {
                    const childElements = Array.from(element.children);
                    
                    if (childElements.length > 0) {
                        // Clear all content but keep child elements
                        while (element.firstChild) {
                            element.removeChild(element.firstChild);
                        }
                        
                        // Add translated text
                        element.appendChild(document.createTextNode(translations[lang][key]));
                        
                        // Re-append child elements with space before them
                        element.appendChild(document.createTextNode(' '));
                        childElements.forEach(child => {
                            element.appendChild(child);
                        });
                    } else {
                        // Simple text replacement
                        element.textContent = translations[lang][key];
                    }
                }
            });

            // Update page language attribute
            document.documentElement.lang = lang;
        }
    }

    // ========== HEADER COMPORTAMENTO ==========
    // Header agora acompanha o scroll naturalmente (position: relative)
    // Sem lógica de scroll necessária

    // Ensure mobile menu toggling works outside specific feature blocks
    const mobileToggleGlobal = document.getElementById('mobileToggle');
    const navGlobal = document.getElementById('nav');
    if (mobileToggleGlobal && navGlobal) {
        mobileToggleGlobal.addEventListener('click', function() {
            navGlobal.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navGlobal.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navGlobal.classList.contains('active')) {
                    navGlobal.classList.remove('active');
                    mobileToggleGlobal.classList.remove('active');
                }
            });
        });
    }

    // ========== GROUP CAROUSEL (GRUPO PAGE) ==========
    const groupCarousel = document.getElementById('groupCarousel');
    if (groupCarousel) {
        const slides = groupCarousel.querySelectorAll('.carousel-slide');
        const dots = groupCarousel.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        let isTransitioning = false;

        function showSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            // Remove active class from previous slide
            const prevSlide = slides[currentIndex];
            prevSlide.classList.remove('active');
            prevSlide.classList.add('prev');

            // Add active class to new slide
            slides[index].classList.remove('prev');
            slides[index].classList.add('active');

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;

            // Reset transition flag after animation completes
            setTimeout(() => {
                isTransitioning = false;
                prevSlide.classList.remove('prev');
            }, 800);
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        // Auto-advance carousel
        setInterval(nextSlide, 5000);

        // Navigation dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }

    // ========== COMUNIDADE CAROUSEL ==========
    const comunidadeCarousel = document.getElementById('comunidadeCarousel');
    if (comunidadeCarousel) {
        const slides = comunidadeCarousel.querySelectorAll('.carousel-slide');
        const dots = comunidadeCarousel.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        let isTransitioning = false;

        function showSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            const prevSlide = slides[currentIndex];
            prevSlide.classList.remove('active');
            prevSlide.classList.add('prev');

            slides[index].classList.remove('prev');
            slides[index].classList.add('active');

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;

            setTimeout(() => {
                isTransitioning = false;
                prevSlide.classList.remove('prev');
            }, 800);
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        setInterval(nextSlide, 5000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }

    // ========== DEPOIMENTO CAROUSEL ==========
    const depoimentoCarousel = document.getElementById('depoimentoCarousel');
    if (depoimentoCarousel) {
        const slides = depoimentoCarousel.querySelectorAll('.carousel-slide');
        const dots = depoimentoCarousel.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        let isTransitioning = false;

        function showSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            const prevSlide = slides[currentIndex];
            prevSlide.classList.remove('active');
            prevSlide.classList.add('prev');

            slides[index].classList.remove('prev');
            slides[index].classList.add('active');

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;

            setTimeout(() => {
                isTransitioning = false;
                prevSlide.classList.remove('prev');
            }, 800);
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        setInterval(nextSlide, 5000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }

    // ========== CONTACTO CAROUSEL ==========
    const contactoCarousel = document.getElementById('contactoCarousel');
    if (contactoCarousel) {
        const slides = contactoCarousel.querySelectorAll('.carousel-slide');
        const dots = contactoCarousel.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        let isTransitioning = false;

        function showSlide(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            const prevSlide = slides[currentIndex];
            prevSlide.classList.remove('active');
            prevSlide.classList.add('prev');

            slides[index].classList.remove('prev');
            slides[index].classList.add('active');

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;

            setTimeout(() => {
                isTransitioning = false;
                prevSlide.classList.remove('prev');
            }, 800);
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        setInterval(nextSlide, 5000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }

    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        // Auto-advance
        setInterval(nextSlide, 4000);

        // Click indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });
    }

    // ========== TESTIMONIAL CAROUSEL ==========
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial-slide');
        const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        let testimonialIndex = 0;

        function showTestimonial(index) {
            testimonials.forEach((t, i) => {
                t.classList.toggle('active', i === index);
            });
            testimonialIndicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
        }

        function nextTestimonial() {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        }

        function prevTestimonial() {
            testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(testimonialIndex);
        }

        // Auto-advance
        setInterval(nextTestimonial, 5000);

        // Navigation buttons
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

        // Click indicators
        testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                testimonialIndex = index;
                showTestimonial(testimonialIndex);
            });
        });
    }

    // ========== CARD MOUSE TRACKING EFFECT ==========
    const envCards = document.querySelectorAll('.env-card');

    envCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Atualizar variáveis CSS para efeitos baseados no mouse
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);

            // Efeito 3D com intensidade ajustada para a seção de empresas
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const isCompanyCard = this.closest('.companies-section') !== null;
            const tiltFactor = isCompanyCard ? 0.12 : 0.05; // mais intenso nos cards de empresas
            const elevate = isCompanyCard ? -20 : -15;
            const scale = isCompanyCard ? 1.04 : 1.02;

            const rotateX = (y - centerY) * tiltFactor;
            const rotateY = (centerX - x) * tiltFactor;

            this.style.transform = `translateY(${elevate}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
            this.style.boxShadow = isCompanyCard
                ? '0 25px 60px -15px rgba(204,0,0,0.35)'
                : '';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0)';
            this.style.boxShadow = '';
            this.style.setProperty('--mouse-x', '50%');
            this.style.setProperty('--mouse-y', '50%');
        });
    });

    // ========== ORGANOGRAM HOVER EFFECT ==========
    const orgNodes = document.querySelectorAll('.org-node');
    orgNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
            this.style.boxShadow = '0 20px 40px -10px hsla(0, 85%, 50%, 0.5)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // ========== FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = `
                <div class="success-icon">✓</div>
                <h3>Mensagem Enviada!</h3>
                <p>Entraremos em contacto consigo brevemente.</p>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successDiv);
        });
    }

    const testimonialForm = document.getElementById('testimonialForm');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = `
                <div class="success-icon">✓</div>
                <h3>Obrigado!</h3>
                <p>O seu depoimento foi enviado com sucesso.</p>
            `;
            
            testimonialForm.innerHTML = '';
            testimonialForm.appendChild(successDiv);
        });
    }

    // ========== STAR RATING ==========
    const starRating = document.querySelectorAll('.star-rating .star');
    let selectedRating = 5;

    starRating.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            updateStars();
        });

        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });

        star.addEventListener('mouseleave', function() {
            updateStars();
        });
    });

    function highlightStars(count) {
        starRating.forEach((star, i) => {
            star.classList.toggle('filled', i < count);
        });
    }

    function updateStars() {
        highlightStars(selectedRating);
    }

    // ============================================
    // ADMIN PANEL ACCESS - Keyboard Shortcut
    // ============================================
    
    const adminLink = document.getElementById('adminLink');
    let adminKeyPressed = false;

    // Keyboard shortcut: Ctrl+Shift+A to toggle admin panel button visibility
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            
            if (adminLink) {
                const currentDisplay = window.getComputedStyle(adminLink).display;
                adminLink.style.display = currentDisplay === 'none' ? 'inline-flex' : 'none';
                
                // Visual feedback
                if (adminLink.style.display !== 'none') {
                    adminLink.style.animation = 'none';
                    setTimeout(() => {
                        adminLink.style.animation = '';
                    }, 10);
                }
            }
        }
    });
});
