/**
 * Sistema de Autenticação e Segurança
 * Gerencia login, permissões e proteção de rotas
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = [
            {
                id: 1,
                username: 'admin',
                password: this.hashPassword('12345678'),
                name: 'Administrador',
                role: 'admin',
                email: 'admin@simjs.com',
                permissions: ['all']
            }
        ];
        this.loadFromStorage();
    }

    /**
     * Hash simplificado para password (NOTA: Em produção usar bcrypt no backend)
     */
    hashPassword(password) {
        return btoa(password); // Base64 encoding (não é seguro, apenas para demo)
    }

    /**
     * Verificar password
     */
    verifyPassword(password, hash) {
        return btoa(password) === hash;
    }

    /**
     * Login do utilizador
     */
    login(username, password) {
        const user = this.users.find(u => u.username === username);
        
        if (!user) {
            return {
                success: false,
                message: 'Utilizador não encontrado'
            };
        }

        if (!this.verifyPassword(password, user.password)) {
            return {
                success: false,
                message: 'Palavra-passe incorreta'
            };
        }

        // Gerar token
        const token = this.generateToken(user);
        
        // Guardar sessão
        this.currentUser = { ...user, password: undefined };
        localStorage.setItem('adminUser', JSON.stringify(this.currentUser));
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminTimestamp', Date.now().toString());

        return {
            success: true,
            message: 'Login realizado com sucesso',
            user: this.currentUser,
            token: token
        };
    }

    /**
     * Logout
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminTimestamp');
    }

    /**
     * Gerar token JWT (simulado)
     */
    generateToken(user) {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            user_id: user.id,
            username: user.username,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 horas
        }));
        const signature = btoa('secret-key');
        
        return `${header}.${payload}.${signature}`;
    }

    /**
     * Verificar se está autenticado
     */
    isAuthenticated() {
        const user = localStorage.getItem('adminUser');
        const token = localStorage.getItem('adminToken');
        const timestamp = localStorage.getItem('adminTimestamp');

        if (!user || !token || !timestamp) {
            return false;
        }

        // Verificar se token expirou (24 horas)
        const sessionAge = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 horas

        if (sessionAge > maxAge) {
            this.logout();
            return false;
        }

        this.currentUser = JSON.parse(user);
        return true;
    }

    /**
     * Verificar permissões
     */
    hasPermission(permission) {
        if (!this.currentUser) return false;
        if (this.currentUser.role === 'admin') return true;
        return this.currentUser.permissions.includes(permission);
    }

    /**
     * Obter utilizador atual
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Criar novo utilizador
     */
    createUser(userData) {
        const newUser = {
            id: this.users.length + 1,
            ...userData,
            password: this.hashPassword(userData.password)
        };
        this.users.push(newUser);
        this.saveToStorage();
        return newUser;
    }

    /**
     * Guardar dados no localStorage
     */
    saveToStorage() {
        localStorage.setItem('adminUsers', JSON.stringify(this.users));
    }

    /**
     * Carregar dados do localStorage
     */
    loadFromStorage() {
        const stored = localStorage.getItem('adminUsers');
        if (stored) {
            this.users = JSON.parse(stored);
        }
    }
}

// Instância global
const authSystem = new AuthSystem();
