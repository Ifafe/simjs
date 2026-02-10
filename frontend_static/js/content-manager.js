/**
 * Sistema de Gerenciamento de Conteúdo
 * CRUD completo para páginas, posts, mídia, etc.
 */

class ContentManager {
    constructor() {
        this.pages = [];
        this.posts = [];
        this.media = [];
        this.sections = [];
        this.loadFromStorage();
    }

    /**
     * ===== PÁGINAS =====
     */

    createPage(pageData) {
        const page = {
            id: Date.now(),
            title: pageData.title,
            url: pageData.url,
            content: pageData.content,
            status: pageData.status || 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: authSystem.currentUser?.username || 'admin',
            meta: {
                description: pageData.description || '',
                keywords: pageData.keywords || ''
            }
        };

        this.pages.push(page);
        this.saveToStorage();
        this.logActivity('Página criada', `${page.title}`);
        return page;
    }

    updatePage(id, pageData) {
        const page = this.pages.find(p => p.id === id);
        if (!page) return null;

        Object.assign(page, {
            ...pageData,
            updatedAt: new Date().toISOString()
        });

        this.saveToStorage();
        this.logActivity('Página atualizada', `${page.title}`);
        return page;
    }

    deletePage(id) {
        const index = this.pages.findIndex(p => p.id === id);
        if (index === -1) return false;

        const page = this.pages[index];
        this.pages.splice(index, 1);
        this.saveToStorage();
        this.logActivity('Página deletada', `${page.title}`);
        return true;
    }

    getPages(filter = {}) {
        let filtered = [...this.pages];

        if (filter.status) {
            filtered = filtered.filter(p => p.status === filter.status);
        }

        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchLower) ||
                p.url.toLowerCase().includes(searchLower)
            );
        }

        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    getPageById(id) {
        return this.pages.find(p => p.id === id);
    }

    /**
     * ===== POSTS =====
     */

    createPost(postData) {
        const post = {
            id: Date.now(),
            title: postData.title,
            content: postData.content,
            category: postData.category || 'geral',
            tags: postData.tags || [],
            status: postData.status || 'draft',
            image: postData.image || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            author: authSystem.currentUser?.username || 'admin'
        };

        this.posts.push(post);
        this.saveToStorage();
        this.logActivity('Post criado', `${post.title}`);
        return post;
    }

    updatePost(id, postData) {
        const post = this.posts.find(p => p.id === id);
        if (!post) return null;

        Object.assign(post, {
            ...postData,
            updatedAt: new Date().toISOString()
        });

        this.saveToStorage();
        this.logActivity('Post atualizado', `${post.title}`);
        return post;
    }

    deletePost(id) {
        const index = this.posts.findIndex(p => p.id === id);
        if (index === -1) return false;

        const post = this.posts[index];
        this.posts.splice(index, 1);
        this.saveToStorage();
        this.logActivity('Post deletado', `${post.title}`);
        return true;
    }

    getPosts(filter = {}) {
        let filtered = [...this.posts];

        if (filter.status) {
            filtered = filtered.filter(p => p.status === filter.status);
        }

        if (filter.category) {
            filtered = filtered.filter(p => p.category === filter.category);
        }

        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchLower)
            );
        }

        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    /**
     * ===== MÍDIA =====
     */

    addMedia(mediaData) {
        const media = {
            id: Date.now(),
            name: mediaData.name,
            type: mediaData.type, // image, video
            url: mediaData.url,
            size: mediaData.size,
            uploadedAt: new Date().toISOString(),
            uploadedBy: authSystem.currentUser?.username || 'admin',
            alt: mediaData.alt || '',
            categories: mediaData.categories || []
        };

        this.media.push(media);
        this.saveToStorage();
        this.logActivity('Mídia adicionada', `${media.name}`);
        return media;
    }

    deleteMedia(id) {
        const index = this.media.findIndex(m => m.id === id);
        if (index === -1) return false;

        const media = this.media[index];
        this.media.splice(index, 1);
        this.saveToStorage();
        this.logActivity('Mídia removida', `${media.name}`);
        return true;
    }

    getMedia(filter = {}) {
        let filtered = [...this.media];

        if (filter.type) {
            filtered = filtered.filter(m => m.type === filter.type);
        }

        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            filtered = filtered.filter(m => 
                m.name.toLowerCase().includes(searchLower)
            );
        }

        return filtered.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    }

    /**
     * ===== CONFIGURAÇÕES =====
     */

    getConfig() {
        let config = JSON.parse(localStorage.getItem('siteConfig') || '{}');
        return {
            siteName: config.siteName || 'SIMJS',
            description: config.description || 'Grupo SIMJS',
            email: config.email || 'contacto@simjs.com',
            phone: config.phone || '+244',
            colors: {
                primary: config.colors?.primary || '#cc0000',
                secondary: config.colors?.secondary || '#ffffff'
            },
            seo: config.seo || {},
            socialMedia: config.socialMedia || {},
            languages: config.languages || ['pt', 'en']
        };
    }

    updateConfig(configData) {
        localStorage.setItem('siteConfig', JSON.stringify(configData));
        this.logActivity('Configuração atualizada', 'Configurações do site');
        return configData;
    }

    /**
     * ===== LOG DE ATIVIDADES =====
     */

    logActivity(action, details) {
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.unshift({
            id: Date.now(),
            action: action,
            details: details,
            user: authSystem.currentUser?.username || 'system',
            timestamp: new Date().toISOString()
        });

        // Manter apenas últimos 100 logs
        if (logs.length > 100) {
            logs.pop();
        }

        localStorage.setItem('activityLogs', JSON.stringify(logs));
    }

    getActivityLogs(limit = 10) {
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        return logs.slice(0, limit);
    }

    /**
     * ===== ARMAZENAMENTO =====
     */

    saveToStorage() {
        localStorage.setItem('adminPages', JSON.stringify(this.pages));
        localStorage.setItem('adminPosts', JSON.stringify(this.posts));
        localStorage.setItem('adminMedia', JSON.stringify(this.media));
    }

    loadFromStorage() {
        this.pages = JSON.parse(localStorage.getItem('adminPages') || '[]');
        this.posts = JSON.parse(localStorage.getItem('adminPosts') || '[]');
        this.media = JSON.parse(localStorage.getItem('adminMedia') || '[]');
    }

    /**
     * ===== ESTATÍSTICAS =====
     */

    getStatistics() {
        return {
            totalPages: this.pages.length,
            totalPosts: this.posts.length,
            totalMedia: this.media.length,
            publishedPages: this.pages.filter(p => p.status === 'published').length,
            publishedPosts: this.posts.filter(p => p.status === 'published').length,
            lastUpdated: this.pages.length > 0 
                ? new Date(this.pages[0].updatedAt).toLocaleDateString('pt-PT')
                : 'Nunca'
        };
    }
}

// Instância global
const contentManager = new ContentManager();
