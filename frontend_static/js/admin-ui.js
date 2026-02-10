/**
 * Gerenciador de Interface do Painel Administrativo
 * Controla a navegação, modais, notificações e interações
 */

class UIManager {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }

    /**
     * Inicializar o painel
     */
    init() {
        // Verificar autenticação
        if (!authSystem.isAuthenticated()) {
            window.location.href = 'admin-login.html';
            return;
        }

        this.setupEventListeners();
        this.loadDashboard();
        this.updateUserInfo();
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Navegação
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                this.loadSection(section);
            });
        });

        // Logout
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            this.logout();
        });

        // Toggle sidebar
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });

        document.getElementById('menuToggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Novo formulário
        document.getElementById('btnNewPage')?.addEventListener('click', () => {
            this.showPageForm();
        });

        // Form submit
        document.getElementById('pageForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePage();
        });

        document.getElementById('siteConfigForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSiteConfig();
        });
    }

    /**
     * Carregar seção
     */
    loadSection(sectionName) {
        // Atualizar navegação ativa
        document.querySelectorAll('[data-section]').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');

        // Mostrar seção
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`)?.classList.add('active');

        this.currentSection = sectionName;

        // Carregar dados específicos
        switch(sectionName) {
            case 'paginas':
                this.loadPages();
                break;
            case 'imagens':
                this.loadMedia();
                break;
            case 'usuarios':
                this.loadUsers();
                break;
        }
    }

    /**
     * Carregar dashboard
     */
    loadDashboard() {
        const stats = contentManager.getStatistics();
        
        document.getElementById('pagesCount').textContent = stats.totalPages;
        document.getElementById('postsCount').textContent = stats.totalPosts;
        document.getElementById('mediaCount').textContent = stats.totalMedia;
        document.getElementById('usersCount').textContent = authSystem.users.length;

        this.loadActivityLogs();
    }

    /**
     * Carregar logs de atividade
     */
    loadActivityLogs() {
        const logs = contentManager.getActivityLogs();
        const listHTML = logs.map(log => `
            <li class="activity-item">
                <span class="activity-icon">
                    <i class="fas fa-${this.getActivityIcon(log.action)}"></i>
                </span>
                <div class="activity-content">
                    <p class="activity-title">${log.action}</p>
                    <small class="activity-time">${this.formatTime(log.timestamp)}</small>
                </div>
            </li>
        `).join('');

        const activityList = document.getElementById('activityList');
        if (activityList) {
            activityList.innerHTML = listHTML || '<li class="empty">Nenhuma atividade</li>';
        }
    }

    /**
     * Carregar páginas
     */
    loadPages() {
        const pages = contentManager.getPages();
        const tbody = document.getElementById('pagesTableBody');
        const emptyState = document.getElementById('emptyPages');

        if (pages.length === 0) {
            tbody.innerHTML = '';
            emptyState.style.display = 'flex';
            return;
        }

        emptyState.style.display = 'none';
        tbody.innerHTML = pages.map(page => `
            <tr>
                <td>${page.title}</td>
                <td><code>${page.url}</code></td>
                <td><span class="badge badge-${page.status}">${page.status}</span></td>
                <td>${new Date(page.createdAt).toLocaleDateString('pt-PT')}</td>
                <td>
                    <button class="btn-small" onclick="uiManager.editPage(${page.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-small danger" onclick="uiManager.deletePage(${page.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Carregar mídia
     */
    loadMedia() {
        const media = contentManager.getMedia();
        const grid = document.getElementById('mediaGrid');
        const emptyState = document.getElementById('emptyMedia');

        if (media.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'flex';
            return;
        }

        emptyState.style.display = 'none';
        grid.innerHTML = media.map(item => `
            <div class="media-card">
                <div class="media-preview">
                    ${item.type === 'image' 
                        ? `<img src="${item.url}" alt="${item.alt}">` 
                        : `<video src="${item.url}" controls></video>`}
                </div>
                <div class="media-info">
                    <h3>${item.name}</h3>
                    <p class="media-date">${new Date(item.uploadedAt).toLocaleDateString('pt-PT')}</p>
                    <div class="media-actions">
                        <button class="btn-small" onclick="uiManager.copyMediaUrl('${item.url}')">
                            <i class="fas fa-copy"></i> Copiar
                        </button>
                        <button class="btn-small danger" onclick="uiManager.deleteMedia(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Carregar utilizadores
     */
    loadUsers() {
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = authSystem.users.map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="badge badge-success">Ativo</span></td>
                <td>
                    <button class="btn-small" onclick="uiManager.editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-small danger" ${user.id === 1 ? 'disabled' : ''}>
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Mostrar formulário de página
     */
    showPageForm(pageId = null) {
        const modal = document.getElementById('pageModal');
        const form = document.getElementById('pageForm');
        const title = document.getElementById('modalTitle');

        if (pageId) {
            const page = contentManager.getPageById(pageId);
            if (page) {
                title.textContent = 'Editar Página';
                document.getElementById('pageTitle').value = page.title;
                document.getElementById('pageUrl').value = page.url;
                document.getElementById('pageContent').value = page.content;
                document.getElementById('pageStatus').value = page.status;
                form.dataset.pageId = pageId;
            }
        } else {
            title.textContent = 'Nova Página';
            form.reset();
            delete form.dataset.pageId;
        }

        modal.style.display = 'flex';

        // Close modal
        document.getElementById('modalClose')?.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        document.getElementById('modalCancel')?.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    /**
     * Salvar página
     */
    savePage() {
        const form = document.getElementById('pageForm');
        const pageId = form.dataset.pageId;

        const pageData = {
            title: document.getElementById('pageTitle').value,
            url: document.getElementById('pageUrl').value,
            content: document.getElementById('pageContent').value,
            status: document.getElementById('pageStatus').value
        };

        if (pageId) {
            contentManager.updatePage(parseInt(pageId), pageData);
            this.showNotification('Página atualizada com sucesso', 'success');
        } else {
            contentManager.createPage(pageData);
            this.showNotification('Página criada com sucesso', 'success');
        }

        document.getElementById('pageModal').style.display = 'none';
        this.loadPages();
    }

    /**
     * Editar página
     */
    editPage(pageId) {
        this.showPageForm(pageId);
    }

    /**
     * Deletar página
     */
    deletePage(pageId) {
        if (confirm('Tem a certeza que deseja eliminar esta página?')) {
            contentManager.deletePage(pageId);
            this.showNotification('Página eliminada', 'info');
            this.loadPages();
        }
    }

    /**
     * Deletar mídia
     */
    deleteMedia(mediaId) {
        if (confirm('Tem a certeza que deseja remover esta mídia?')) {
            contentManager.deleteMedia(mediaId);
            this.showNotification('Mídia removida', 'info');
            this.loadMedia();
        }
    }

    /**
     * Copiar URL de mídia
     */
    copyMediaUrl(url) {
        navigator.clipboard.writeText(url);
        this.showNotification('URL copiada para clipboard', 'success');
    }

    /**
     * Guardar configurações do site
     */
    saveSiteConfig() {
        const config = {
            siteName: document.getElementById('siteName')?.value || 'SIMJS',
            description: document.getElementById('siteDescription')?.value || '',
            email: document.getElementById('siteEmail')?.value || '',
            phone: document.getElementById('sitePhone')?.value || ''
        };

        contentManager.updateConfig(config);
        this.showNotification('Configurações guardadas com sucesso', 'success');
    }

    /**
     * Atualizar informações do utilizador
     */
    updateUserInfo() {
        const user = authSystem.getCurrentUser();
        if (user) {
            document.getElementById('userName').textContent = user.name || user.username;
        }
    }

    /**
     * Logout
     */
    logout() {
        if (confirm('Tem a certeza que deseja sair?')) {
            authSystem.logout();
            window.location.href = 'admin-login.html';
        }
    }

    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        const sidebar = document.getElementById('adminSidebar');
        sidebar?.classList.toggle('collapsed');
    }

    /**
     * Mostrar notificação
     */
    showNotification(message, type = 'info') {
        const toast = document.getElementById('notificationToast');
        const icon = toast.querySelector('.toast-icon');
        const messageEl = toast.querySelector('.toast-message');

        messageEl.textContent = message;
        toast.className = `notification-toast notification-${type}`;

        // Ícone
        const icons = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle',
            'info': 'fas fa-info-circle'
        };
        icon.innerHTML = `<i class="${icons[type]}"></i>`;

        toast.style.display = 'flex';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    /**
     * Formatar tempo
     */
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Agora';
        if (diff < 3600) return `Há ${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `Há ${Math.floor(diff / 3600)}h`;
        return date.toLocaleDateString('pt-PT');
    }

    /**
     * Obter ícone de atividade
     */
    getActivityIcon(action) {
        const icons = {
            'Página criada': 'file-plus',
            'Página atualizada': 'file-edit',
            'Página deletada': 'file-minus',
            'Mídia adicionada': 'image-plus',
            'Mídia removida': 'image-minus',
            'Post criado': 'pen-plus',
            'Configuração atualizada': 'cog'
        };
        return icons[action] || 'file';
    }

    /**
     * Editar utilizador
     */
    editUser(userId) {
        alert('Edição de utilizador em desenvolvimento');
    }
}

// Instância global - apenas se não estiver na página de login
if (!window.location.pathname.includes('admin-login')) {
    const uiManager = new UIManager();
}
