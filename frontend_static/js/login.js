/**
 * SIMJS Authentication Module
 * Handles login, registration, form validation, and user authentication
 * 
 * Features:
 * - Tab switching between Login and Register
 * - Real-time form validation
 * - Password strength checker
 * - Email validation
 * - Success messages and redirects
 * - Error handling and display
 * - Password visibility toggle
 */

class AuthManager {
    constructor() {
        // Tab elements
        this.tabButtons = document.querySelectorAll('.auth-tab-btn');
        this.tabContents = document.querySelectorAll('.auth-tab-content');
        this.switchLink = document.querySelector('.switch-link');
        this.switchText = document.getElementById('switchText');

        // Forms
        this.loginForm = document.getElementById('loginForm');

        // Login form fields
        this.loginEmail = document.getElementById('loginEmail');
        this.loginPassword = document.getElementById('loginPassword');
        this.rememberMe = document.getElementById('rememberMe');

        // Password visibility toggles
        this.passwordToggles = document.querySelectorAll('.password-toggle');

        // Success messages
        this.loginSuccess = document.getElementById('loginSuccess');

        // Validation patterns
        this.patterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            name: /^[a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ\s]{3,}$/,
        };

        // Password requirements
        this.passwordRequirements = {
            'req-length': { test: (pwd) => pwd.length >= 8, desc: 'Mínimo 8 caracteres' },
            'req-uppercase': { test: (pwd) => /[A-Z]/.test(pwd), desc: 'Uma letra maiúscula (A-Z)' },
            'req-lowercase': { test: (pwd) => /[a-z]/.test(pwd), desc: 'Uma letra minúscula (a-z)' },
            'req-number': { test: (pwd) => /\d/.test(pwd), desc: 'Um número (0-9)' },
            'req-special': { test: (pwd) => /[@$!%*?&]/.test(pwd), desc: 'Um caractere especial (!@#$%^&*)' },
        };

        this.init();
    }

    /**
     * Initialize all event listeners and functionality
     */
    init() {
        this.setupTabSwitching();
        this.setupFormValidation();
        this.setupPasswordToggles();
        this.setupSocialButtons();
        this.setupFormSubmission();
        this.loadRememberedEmail();
    }

    /**
     * Setup tab switching between Login and Register
     */
    setupTabSwitching() {
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        this.switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTab = document.querySelector('.auth-tab-content.active');
            const newTab = currentTab.id === 'login' ? 'register' : 'login';
            this.switchTab(newTab);
        });
    }

    /**
     * Switch between login and register tabs
     * @param {string} tabName - Name of tab to switch to
     */
    switchTab(tabName) {
        // Update buttons
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update content
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabName);
        });

        // Update footer text
        if (tabName === 'login') {
            this.switchText.innerHTML = 'Não tem conta? <a href="#" class="switch-link">Criar Conta</a>';
            this.switchLink = document.querySelector('.switch-link');
            this.switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab('register');
            });
        } else {
            this.switchText.innerHTML = 'Já tem conta? <a href="#" class="switch-link">Entrar</a>';
            this.switchLink = document.querySelector('.switch-link');
            this.switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab('login');
            });
        }

        // Clear previous errors
        this.clearAllErrors();
    }

    /**
     * Setup real-time form validation
     */
    setupFormValidation() {
        // Login form validation
        this.loginEmail.addEventListener('blur', () => this.validateLoginEmail());
        this.loginPassword.addEventListener('blur', () => this.validateLoginPassword());
    }

    /**
     * Setup password visibility toggles
     */
    setupPasswordToggles() {
        this.passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = toggle.dataset.target;
                const input = document.getElementById(targetId);
                const icon = toggle.querySelector('i');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }

    /**
     * Setup social login buttons (placeholder functionality)
     */
    setupSocialButtons() {
        const socialButtons = document.querySelectorAll('.btn-social');
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.title.toLowerCase();
                console.log(`Social login with ${provider} - Implementar integração real`);
                alert(`Integração ${provider} em desenvolvimento...`);
            });
        });
    }

    /**
     * Setup form submission handlers
     */
    setupFormSubmission() {
        this.loginForm.addEventListener('submit', (e) => this.handleLoginSubmit(e));
    }

    /**
     * ========== VALIDATION METHODS ==========
     */

    /**
     * Validate login email
     */
    validateLoginEmail() {
        const email = this.loginEmail.value.trim();
        const errorEl = document.getElementById('loginEmailError');
        
        if (!email) {
            this.showError(errorEl, 'Email é obrigatório');
            return false;
        }

        if (!this.patterns.email.test(email)) {
            this.showError(errorEl, 'Por favor, insira um email válido');
            return false;
        }

        this.clearError(errorEl);
        return true;
    }

    /**
     * Validate login password
     */
    validateLoginPassword() {
        const password = this.loginPassword.value;
        const errorEl = document.getElementById('loginPasswordError');

        if (!password) {
            this.showError(errorEl, 'Palavra-passe é obrigatória');
            return false;
        }

        if (password.length < 6) {
            this.showError(errorEl, 'Palavra-passe deve ter no mínimo 6 caracteres');
            return false;
        }

        this.clearError(errorEl);
        return true;
    }



    /**
     * ========== FORM SUBMISSION HANDLERS ==========
     */

    /**
     * Handle login form submission
     */
    handleLoginSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const isEmailValid = this.validateLoginEmail();
        const isPasswordValid = this.validateLoginPassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        // Show loading state
        const submitBtn = this.loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

        // Simulate API call
        setTimeout(() => {
            this.showLoginSuccess();

            // Save email if remember me is checked
            if (this.rememberMe.checked) {
                localStorage.setItem('rememberedEmail', this.loginEmail.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard-emprego.html';
            }, 2000);
        }, 1500);
    }



    /**
     * ========== UTILITY METHODS ==========
     */

    /**
     * Show error message
     */
    showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    /**
     * Clear error message
     */
    clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    /**
     * Clear all error messages
     */
    clearAllErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(el => this.clearError(el));
    }

    /**
     * Show login success message
     */
    showLoginSuccess() {
        this.loginForm.style.display = 'none';
        this.loginSuccess.style.display = 'block';
    }

    /**
     * Show register success message
     */
    showRegisterSuccess() {
        this.registerForm.style.display = 'none';
        this.registerSuccess.style.display = 'block';
    }

    /**
     * Check if email is already taken (simulado)
     */
    isEmailTaken(email) {
        const takenEmails = ['admin@simjs.com', 'test@simjs.com'];
        return takenEmails.includes(email.toLowerCase());
    }

    /**
     * Save user data to localStorage
     */
    saveUserData(data) {
        // Em produção, seria enviado para um servidor
        const users = JSON.parse(localStorage.getItem('simjs_users') || '[]');
        users.push(data);
        localStorage.setItem('simjs_users', JSON.stringify(users));
        console.log('Utilizador registado:', data);
    }

    /**
     * Load remembered email from localStorage
     */
    loadRememberedEmail() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            this.loginEmail.value = rememberedEmail;
            this.rememberMe.checked = true;
        }
    }
}

/**
 * Registration Type Manager
 * Handles the selection of registration type (Visitante or Parceiro)
 */
class RegistrationTypeManager {
    constructor() {
        this.typeStep = document.getElementById('registerTypeStep');
        this.typeCards = document.querySelectorAll('.type-card');
        this.visitanteForm = document.getElementById('registerFormVisitante');
        this.empregoForm = document.getElementById('registerFormEmprego');
        this.parceiroForm = document.getElementById('registerFormParceiro');
        this.selectedType = null;

        this.init();
    }

    init() {
        // Type card selection
        this.typeCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.select-type')) {
                    const type = card.dataset.type;
                    this.selectType(type);
                }
            });
        });

        // Back buttons
        document.getElementById('backFromVisitante')?.addEventListener('click', () => this.backToTypeSelection());
        document.getElementById('backFromEmprego')?.addEventListener('click', () => this.backToTypeSelection());
        document.getElementById('backFromParceiro')?.addEventListener('click', () => this.backToTypeSelection());

        // Select type buttons
        document.querySelectorAll('.select-type').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = btn.dataset.type;
                this.selectType(type);
            });
        });

        // Form submissions
        this.visitanteForm?.addEventListener('submit', (e) => this.handleVisitanteSubmit(e));
        this.empregoForm?.addEventListener('submit', (e) => this.handleEmpregoSubmit(e));
        this.parceiroForm?.addEventListener('submit', (e) => this.handleParceiroSubmit(e));

        // Password validations for all forms
        this.setupPasswordValidation('visitante');
        this.setupPasswordValidation('emprego');
        this.setupPasswordValidation('parceiro');
    }

    selectType(type) {
        this.selectedType = type;

        // Update UI
        this.typeCards.forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.type === type) {
                card.classList.add('selected');
            }
        });

        // Show appropriate form
        setTimeout(() => {
            this.typeStep.style.display = 'none';
            if (type === 'visitante') {
                this.visitanteForm.style.display = 'block';
                this.empregoForm.style.display = 'none';
                this.parceiroForm.style.display = 'none';
            } else if (type === 'emprego') {
                this.empregoForm.style.display = 'block';
                this.visitanteForm.style.display = 'none';
                this.parceiroForm.style.display = 'none';
            } else if (type === 'parceiro') {
                this.parceiroForm.style.display = 'block';
                this.visitanteForm.style.display = 'none';
                this.empregoForm.style.display = 'none';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    }

    backToTypeSelection() {
        this.typeStep.style.display = 'block';
        this.visitanteForm.style.display = 'none';
        this.parceiroForm.style.display = 'none';
        this.selectedType = null;

        // Reset selections
        this.typeCards.forEach(card => card.classList.remove('selected'));
        
        // Clear forms
        this.clearVisitanteForm();
        this.clearParceiroForm();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setupPasswordValidation(type) {
        const prefix = type;
        const passwordInput = document.getElementById(`${prefix}Password`);
        
        if (!passwordInput) return;

        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            this.updatePasswordRequirements(type, password);
        });
    }

    updatePasswordRequirements(type, password) {
        const requirements = {
            'length': password.length >= 8,
            'uppercase': /[A-Z]/.test(password),
            'lowercase': /[a-z]/.test(password),
            'number': /[0-9]/.test(password),
            'special': /[!@#$%^&*]/.test(password)
        };

        Object.entries(requirements).forEach(([key, met]) => {
            const req = document.getElementById(`req-${type}-${key}`);
            if (req) {
                req.classList.toggle('met', met);
            }
        });

        return Object.values(requirements).every(v => v);
    }

    async handleVisitanteSubmit(e) {
        e.preventDefault();

        const visitanteData = {
            type: 'visitante',
            fullName: document.getElementById('visitanteFullName').value,
            email: document.getElementById('visitanteEmail').value,
            age: parseInt(document.getElementById('visitanteAge').value),
            country: document.getElementById('visitanteCountry').value,
            password: document.getElementById('visitantePassword').value,
            confirmPassword: document.getElementById('visitanteConfirmPassword').value,
            terms: document.getElementById('visitanteTerms').checked,
            newsletter: document.getElementById('visitanteNewsletter').checked
        };

        // Validation
        if (!this.validateVisitanteForm(visitanteData)) {
            return;
        }

        try {
            // Show success message
            document.getElementById('visitanteSuccess').style.display = 'flex';
            
            // Save to localStorage
            const users = JSON.parse(localStorage.getItem('simjsUsers') || '[]');
            users.push({
                ...visitanteData,
                createdAt: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('simjsUsers', JSON.stringify(users));

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard-visitante.html';
            }, 2000);
        } catch (error) {
            console.error('Erro ao registar visitante:', error);
            this.showError('visitante', 'Erro ao criar conta. Tente novamente.');
        }
    }

    async handleEmpregoSubmit(e) {
        e.preventDefault();

        const empregoData = {
            type: 'emprego',
            fullName: document.getElementById('empregoFullName').value,
            email: document.getElementById('empregoEmail').value,
            phone: document.getElementById('empregoPhone').value,
            age: parseInt(document.getElementById('empregoAge').value),
            country: document.getElementById('empregoCountry').value,
            area: document.getElementById('empregoArea').value,
            experience: document.getElementById('empregoExperience').value,
            cv: document.getElementById('empregoCV').files[0],
            password: document.getElementById('empregoPassword').value,
            confirmPassword: document.getElementById('empregoConfirmPassword').value,
            terms: document.getElementById('empregoTerms').checked,
            newsletter: document.getElementById('empregoNewsletter').checked
        };

        // Validation
        if (!this.validateEmpregoForm(empregoData)) {
            return;
        }

        try {
            // Show success message
            document.getElementById('empregoSuccess').style.display = 'flex';

            // Save to localStorage
            const candidates = JSON.parse(localStorage.getItem('simjsCandidates') || '[]');
            candidates.push({
                ...empregoData,
                status: 'pending_review',
                createdAt: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('simjsCandidates', JSON.stringify(candidates));

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard-emprego.html';
            }, 2000);
        } catch (error) {
            console.error('Erro ao enviar candidatura:', error);
            this.showError('emprego', 'Erro ao enviar candidatura. Tente novamente.');
        }
    }

    async handleParceiroSubmit(e) {
        e.preventDefault();

        const parceiroData = {
            type: 'parceiro',
            companyName: document.getElementById('parceiroCompanyName').value,
            contactName: document.getElementById('parceiroContactName').value,
            email: document.getElementById('parceiroEmail').value,
            phone: document.getElementById('parceiroPhone').value,
            companySize: document.getElementById('parceiroSize').value,
            industry: document.getElementById('parceiroIndustry').value,
            website: document.getElementById('parceiroWebsite').value,
            password: document.getElementById('parceiroPassword').value,
            confirmPassword: document.getElementById('parceiroConfirmPassword').value,
            terms: document.getElementById('parceiroTerms').checked,
            newsletter: document.getElementById('parceiroNewsletter').checked
        };

        // Validation
        if (!this.validateParceiroForm(parceiroData)) {
            return;
        }

        try {
            // Show success message
            document.getElementById('parceiroSuccess').style.display = 'flex';

            // Save to localStorage
            const partners = JSON.parse(localStorage.getItem('simjsPartners') || '[]');
            partners.push({
                ...parceiroData,
                status: 'pending_review',
                createdAt: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('simjsPartners', JSON.stringify(partners));

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard-parceiro.html';
            }, 2000);
        } catch (error) {
            console.error('Erro ao registar parceiro:', error);
            this.showError('parceiro', 'Erro ao criar conta. Tente novamente.');
        }
    }

    validateVisitanteForm(data) {
        const errors = {};

        if (data.fullName.length < 3) {
            errors.fullName = 'Nome deve ter pelo menos 3 caracteres';
        }

        if (!this.isValidEmail(data.email)) {
            errors.email = 'Email inválido';
        }

        if (data.age < 13 || data.age > 120) {
            errors.age = 'Idade deve estar entre 13 e 120 anos';
        }

        if (!data.country) {
            errors.country = 'País é obrigatório';
        }

        if (!this.isValidPassword(data.password)) {
            errors.password = 'Palavra-passe não atende aos requisitos';
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Palavras-passe não correspondem';
        }

        if (!data.terms) {
            errors.terms = 'Deve aceitar os Termos e Condições';
        }

        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, message]) => {
                const errorEl = document.getElementById(`visitante${field.charAt(0).toUpperCase() + field.slice(1)}Error`);
                if (errorEl) errorEl.textContent = message;
            });
            return false;
        }

        return true;
    }

    validateEmpregoForm(data) {
        const errors = {};

        if (data.fullName.length < 3) {
            errors.fullName = 'Nome deve ter pelo menos 3 caracteres';
        }

        if (!this.isValidEmail(data.email)) {
            errors.email = 'Email inválido';
        }

        if (!this.isValidPhone(data.phone)) {
            errors.phone = 'Telefone inválido';
        }

        if (data.age < 13 || data.age > 120) {
            errors.age = 'Idade deve estar entre 13 e 120 anos';
        }

        if (!data.country) {
            errors.country = 'País é obrigatório';
        }

        if (!data.area) {
            errors.area = 'Área de interesse é obrigatória';
        }

        if (!data.experience) {
            errors.experience = 'Nível de experiência é obrigatório';
        }

        if (!data.cv) {
            errors.cv = 'Currículo é obrigatório';
        } else if (!data.cv.type.includes('pdf')) {
            errors.cv = 'Currículo deve ser um arquivo PDF';
        }

        if (!this.isValidPassword(data.password)) {
            errors.password = 'Palavra-passe não atende aos requisitos';
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Palavras-passe não correspondem';
        }

        if (!data.terms) {
            errors.terms = 'Deve aceitar os Termos e Condições para Candidaturas';
        }

        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, message]) => {
                const errorEl = document.getElementById(`emprego${field.charAt(0).toUpperCase() + field.slice(1)}Error`);
                if (errorEl) errorEl.textContent = message;
            });
            return false;
        }

        return true;
    }

    validateParceiroForm(data) {
        const errors = {};

        if (data.companyName.length < 3) {
            errors.companyName = 'Nome da empresa deve ter pelo menos 3 caracteres';
        }

        if (data.contactName.length < 3) {
            errors.contactName = 'Nome do responsável deve ter pelo menos 3 caracteres';
        }

        if (!this.isValidEmail(data.email)) {
            errors.email = 'Email comercial inválido';
        }

        if (!this.isValidPhone(data.phone)) {
            errors.phone = 'Telefone inválido';
        }

        if (!data.companySize) {
            errors.size = 'Tamanho da empresa é obrigatório';
        }

        if (!data.industry) {
            errors.industry = 'Sector/Indústria é obrigatório';
        }

        if (data.website && !this.isValidUrl(data.website)) {
            errors.website = 'URL do website inválida';
        }

        if (!this.isValidPassword(data.password)) {
            errors.password = 'Palavra-passe não atende aos requisitos';
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Palavras-passe não correspondem';
        }

        if (!data.terms) {
            errors.terms = 'Deve aceitar os Termos e Condições de Parceria';
        }

        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, message]) => {
                const errorEl = document.getElementById(`parceiro${field.charAt(0).toUpperCase() + field.slice(1)}Error`);
                if (errorEl) errorEl.textContent = message;
            });
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }

    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    isValidPassword(password) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password) && 
               password.length >= 8;
    }

    showError(type, message) {
        const successEl = document.getElementById(`${type}Success`);
        if (successEl) {
            successEl.innerHTML = `
                <div class="error-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3>Erro ao Registar</h3>
                <p>${message}</p>
            `;
        }
    }

    clearVisitanteForm() {
        this.visitanteForm.reset();
        document.querySelectorAll('.visitante-error').forEach(el => el.textContent = '');
    }

    clearParceiroForm() {
        this.parceiroForm.reset();
        document.querySelectorAll('.parceiro-error').forEach(el => el.textContent = '');
    }
}

/**
 * Initialize Auth Manager when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
    
    // Initialize Registration Type Manager when on register tab
    const registerTab = document.getElementById('register');
    if (registerTab) {
        new RegistrationTypeManager();
    }
});
