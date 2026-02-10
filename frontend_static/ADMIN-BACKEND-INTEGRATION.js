/* ========== ADMIN PANEL - BACKEND INTEGRATION EXAMPLES ========== */

/**
 * EXEMPLOS DE INTEGRAÇÃO COM BACKEND
 * 
 * Este ficheiro contém exemplos de como implementar o salvamento
 * e carregamento de dados do backend para o painel admin.
 * 
 * Nota: Todos os exemplos assumem um backend REST API.
 * Adapte os endpoints segundo a sua implementação.
 */

// ==========================================
// 1. HOMEPAGE - HERO SECTION
// ==========================================

/**
 * Salvar alterações da secção Hero
 * POST /api/homepage/hero
 */
async function saveHeroSection() {
    try {
        const heroData = {
            title: document.querySelector('[data-field="hero-title"]').value,
            highlight: document.querySelector('[data-field="hero-highlight"]').value,
            subtitle: document.querySelector('[data-field="hero-subtitle"]').value,
            ctaText: document.querySelector('[data-field="hero-cta"]').value,
            ctaLink: document.querySelector('[data-field="hero-cta-link"]').value || '#'
        };

        const response = await fetch('http://localhost:3000/api/homepage/hero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(heroData)
        });

        if (response.ok) {
            showNotification('Hero section guardado com sucesso!', 'success');
            // Opcional: Atualizar preview em tempo real
            updateHeroPreview(heroData);
        } else {
            showNotification('Erro ao guardar hero section', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro de conexão', 'error');
    }
}

/**
 * Carregar dados da Hero section
 * GET /api/homepage/hero
 */
async function loadHeroSection() {
    try {
        const response = await fetch('http://localhost:3000/api/homepage/hero', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.querySelector('[data-field="hero-title"]').value = data.title || '';
            document.querySelector('[data-field="hero-highlight"]').value = data.highlight || '';
            document.querySelector('[data-field="hero-subtitle"]').value = data.subtitle || '';
            document.querySelector('[data-field="hero-cta"]').value = data.ctaText || '';
            document.querySelector('[data-field="hero-cta-link"]').value = data.ctaLink || '#';
        }
    } catch (error) {
        console.error('Erro ao carregar hero section:', error);
    }
}

// ==========================================
// 2. TIMELINE - HISTÓRIA
// ==========================================

/**
 * Adicionar evento à timeline
 * POST /api/homepage/timeline
 */
async function addTimelineEvent() {
    try {
        const eventData = {
            year: document.querySelector('[data-field="timeline-year"]').value,
            title: document.querySelector('[data-field="timeline-title"]').value,
            description: document.querySelector('[data-field="timeline-desc"]').value
        };

        const response = await fetch('http://localhost:3000/api/homepage/timeline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(eventData)
        });

        if (response.ok) {
            showNotification('Evento adicionado com sucesso!', 'success');
            loadTimelineEvents(); // Recarregar lista
            // Limpar formulário
            document.querySelector('[data-field="timeline-year"]').value = '';
            document.querySelector('[data-field="timeline-title"]').value = '';
            document.querySelector('[data-field="timeline-desc"]').value = '';
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao adicionar evento', 'error');
    }
}

/**
 * Carregar eventos da timeline
 * GET /api/homepage/timeline
 */
async function loadTimelineEvents() {
    try {
        const response = await fetch('http://localhost:3000/api/homepage/timeline', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            const events = await response.json();
            const container = document.querySelector('.timeline-editor');
            container.innerHTML = '';

            events.forEach(event => {
                const eventHTML = `
                    <div class="timeline-item">
                        <input type="text" value="${event.year}" placeholder="Ano">
                        <input type="text" value="${event.title}" placeholder="Título">
                        <textarea placeholder="Descrição">${event.description}</textarea>
                        <div class="form-actions">
                            <button onclick="deleteTimelineEvent(${event.id})" class="btn-secondary">Eliminar</button>
                        </div>
                    </div>
                `;
                container.innerHTML += eventHTML;
            });
        }
    } catch (error) {
        console.error('Erro ao carregar timeline:', error);
    }
}

/**
 * Deletar evento da timeline
 * DELETE /api/homepage/timeline/:id
 */
async function deleteTimelineEvent(eventId) {
    if (!confirm('Tem a certeza que deseja eliminar este evento?')) return;

    try {
        const response = await fetch(`http://localhost:3000/api/homepage/timeline/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            showNotification('Evento eliminado com sucesso!', 'success');
            loadTimelineEvents(); // Recarregar lista
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao eliminar evento', 'error');
    }
}

// ==========================================
// 3. SERVIÇOS
// ==========================================

/**
 * Adicionar novo serviço
 * POST /api/homepage/services
 */
async function addService() {
    try {
        const serviceData = {
            icon: document.querySelector('[data-field="service-icon"]').value,
            title: document.querySelector('[data-field="service-title"]').value,
            description: document.querySelector('[data-field="service-desc"]').value
        };

        const response = await fetch('http://localhost:3000/api/homepage/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(serviceData)
        });

        if (response.ok) {
            showNotification('Serviço adicionado com sucesso!', 'success');
            loadServices();
            document.querySelector('[data-field="service-title"]').value = '';
            document.querySelector('[data-field="service-desc"]').value = '';
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao adicionar serviço', 'error');
    }
}

/**
 * Carregar lista de serviços
 * GET /api/homepage/services
 */
async function loadServices() {
    try {
        const response = await fetch('http://localhost:3000/api/homepage/services', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            const services = await response.json();
            const container = document.querySelector('.services-editor');
            container.innerHTML = '';

            services.forEach(service => {
                const serviceHTML = `
                    <div class="service-item">
                        <div class="service-info">
                            <h4>${service.title}</h4>
                            <p>${service.description}</p>
                        </div>
                        <button onclick="deleteService(${service.id})" class="btn-secondary">Eliminar</button>
                    </div>
                `;
                container.innerHTML += serviceHTML;
            });
        }
    } catch (error) {
        console.error('Erro ao carregar serviços:', error);
    }
}

/**
 * Deletar serviço
 * DELETE /api/homepage/services/:id
 */
async function deleteService(serviceId) {
    if (!confirm('Tem a certeza que deseja eliminar este serviço?')) return;

    try {
        const response = await fetch(`http://localhost:3000/api/homepage/services/${serviceId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            showNotification('Serviço eliminado com sucesso!', 'success');
            loadServices();
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao eliminar serviço', 'error');
    }
}

// ==========================================
// 4. PÁGINA GRUPO
// ==========================================

/**
 * Salvar dados da página Grupo
 * POST /api/grupo
 */
async function saveGrupoPage() {
    try {
        const grupoData = {
            description: document.querySelector('[data-field="grupo-desc"]').value,
            vision: document.querySelector('[data-field="grupo-vision"]').value,
            mission: document.querySelector('[data-field="grupo-mission"]').value
        };

        const response = await fetch('http://localhost:3000/api/grupo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(grupoData)
        });

        if (response.ok) {
            showNotification('Página Grupo guardada com sucesso!', 'success');
        } else {
            showNotification('Erro ao guardar Página Grupo', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro de conexão', 'error');
    }
}

/**
 * Carregar dados da página Grupo
 * GET /api/grupo
 */
async function loadGrupoPage() {
    try {
        const response = await fetch('http://localhost:3000/api/grupo', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.querySelector('[data-field="grupo-desc"]').value = data.description || '';
            document.querySelector('[data-field="grupo-vision"]').value = data.vision || '';
            document.querySelector('[data-field="grupo-mission"]').value = data.mission || '';
        }
    } catch (error) {
        console.error('Erro ao carregar página Grupo:', error);
    }
}

// ==========================================
// 5. DEPOIMENTOS
// ==========================================

/**
 * Adicionar novo depoimento
 * POST /api/depoimentos
 */
async function addTestimonial() {
    try {
        const testimonialData = {
            author: document.querySelector('[data-field="testimonial-author"]').value,
            position: document.querySelector('[data-field="testimonial-position"]').value,
            text: document.querySelector('[data-field="testimonial-text"]').value,
            image: document.querySelector('[data-field="testimonial-image"]').value
        };

        const response = await fetch('http://localhost:3000/api/depoimentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(testimonialData)
        });

        if (response.ok) {
            showNotification('Depoimento adicionado com sucesso!', 'success');
            loadTestimonials();
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao adicionar depoimento', 'error');
    }
}

/**
 * Carregar depoimentos
 * GET /api/depoimentos
 */
async function loadTestimonials() {
    try {
        const response = await fetch('http://localhost:3000/api/depoimentos', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            const testimonials = await response.json();
            const container = document.querySelector('.testimonials-list');
            container.innerHTML = '';

            testimonials.forEach(testimonial => {
                const testimonialHTML = `
                    <div class="testimonial-card">
                        <p>"${testimonial.text}"</p>
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                        <button onclick="deleteTestimonial(${testimonial.id})" class="btn-secondary">Eliminar</button>
                    </div>
                `;
                container.innerHTML += testimonialHTML;
            });
        }
    } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
    }
}

/**
 * Deletar depoimento
 * DELETE /api/depoimentos/:id
 */
async function deleteTestimonial(testimonialId) {
    if (!confirm('Tem a certeza que deseja eliminar este depoimento?')) return;

    try {
        const response = await fetch(`http://localhost:3000/api/depoimentos/${testimonialId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            showNotification('Depoimento eliminado com sucesso!', 'success');
            loadTestimonials();
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao eliminar depoimento', 'error');
    }
}

// ==========================================
// 6. CONTACTO
// ==========================================

/**
 * Salvar configurações de contacto
 * POST /api/contacto
 */
async function saveContactInfo() {
    try {
        const contactData = {
            email: document.querySelector('[data-field="contact-email"]').value,
            phone: document.querySelector('[data-field="contact-phone"]').value,
            address: document.querySelector('[data-field="contact-address"]').value,
            hours: document.querySelector('[data-field="contact-hours"]').value
        };

        const response = await fetch('http://localhost:3000/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok) {
            showNotification('Informações de contacto guardadas com sucesso!', 'success');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao guardar contacto', 'error');
    }
}

/**
 * Carregar informações de contacto
 * GET /api/contacto
 */
async function loadContactInfo() {
    try {
        const response = await fetch('http://localhost:3000/api/contacto', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.querySelector('[data-field="contact-email"]').value = data.email || '';
            document.querySelector('[data-field="contact-phone"]').value = data.phone || '';
            document.querySelector('[data-field="contact-address"]').value = data.address || '';
            document.querySelector('[data-field="contact-hours"]').value = data.hours || '';
        }
    } catch (error) {
        console.error('Erro ao carregar contacto:', error);
    }
}

// ==========================================
// 7. HEADER E FOOTER
// ==========================================

/**
 * Salvar configurações do Header
 * POST /api/header
 */
async function saveHeader() {
    try {
        const headerData = {
            logoUrl: document.querySelector('[data-field="header-logo"]').value,
            logoText: document.querySelector('[data-field="header-logo-text"]').value,
            backgroundColor: document.querySelector('[data-field="header-bg-color"]').value,
            sticky: document.querySelector('[data-field="header-sticky"]').checked
        };

        const response = await fetch('http://localhost:3000/api/header', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(headerData)
        });

        if (response.ok) {
            showNotification('Header guardado com sucesso!', 'success');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao guardar header', 'error');
    }
}

/**
 * Salvar configurações do Footer
 * POST /api/footer
 */
async function saveFooter() {
    try {
        const footerData = {
            copyright: document.querySelector('[data-field="footer-copyright"]').value,
            description: document.querySelector('[data-field="footer-desc"]').value,
            logoUrl: document.querySelector('[data-field="footer-logo"]').value
        };

        const response = await fetch('http://localhost:3000/api/footer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(footerData)
        });

        if (response.ok) {
            showNotification('Footer guardado com sucesso!', 'success');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao guardar footer', 'error');
    }
}

// ==========================================
// UTILITÁRIOS
// ==========================================

/**
 * Obter token de autenticação
 */
function getAuthToken() {
    return localStorage.getItem('adminToken') || '';
}

/**
 * Mostrar notificação
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(notification);
    notification.style.display = 'flex';

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Fazer upload de imagem
 * POST /api/uploads
 */
async function uploadImage(file, onSuccess) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:3000/api/uploads', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            onSuccess(data.url);
            showNotification('Imagem enviada com sucesso!', 'success');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao enviar imagem', 'error');
    }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

/**
 * Inicializar seção quando carregada
 */
function initSectionHandlers() {
    // Handlers para Hero
    document.querySelector('[name="save-hero"]')?.addEventListener('click', saveHeroSection);

    // Handlers para Timeline
    document.querySelector('[name="add-timeline"]')?.addEventListener('click', addTimelineEvent);

    // Handlers para Serviços
    document.querySelector('[name="add-service"]')?.addEventListener('click', addService);

    // Handlers para Grupo
    document.querySelector('[name="save-grupo"]')?.addEventListener('click', saveGrupoPage);

    // Handlers para Depoimentos
    document.querySelector('[name="add-testimonial"]')?.addEventListener('click', addTestimonial);

    // Handlers para Contacto
    document.querySelector('[name="save-contact"]')?.addEventListener('click', saveContactInfo);

    // Handlers para Header/Footer
    document.querySelector('[name="save-header"]')?.addEventListener('click', saveHeader);
    document.querySelector('[name="save-footer"]')?.addEventListener('click', saveFooter);

    // Carregar dados existentes
    loadHeroSection();
    loadTimelineEvents();
    loadServices();
    loadGrupoPage();
    loadTestimonials();
    loadContactInfo();
}

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', initSectionHandlers);

// ==========================================
// FIM DO FICHEIRO
// ==========================================

/**
 * PRÓXIMOS PASSOS PARA INTEGRAÇÃO:
 * 
 * 1. Adapte os endpoints da API segundo sua implementação
 * 2. Certifique-se de que a autenticação está correta
 * 3. Implemente os handlers de click nos botões
 * 4. Teste cada seção individualmente
 * 5. Adicione validação de formulário antes de enviar
 * 6. Implemente tratamento de erros mais robusto
 * 7. Adicione confirmações para ações destrutivas (delete)
 * 8. Teste upload de imagens
 * 9. Implemente cache para melhor performance
 * 10. Adicione offline mode se necessário
 */
