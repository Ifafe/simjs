/* ========== ADMIN PANEL JAVASCRIPT ========== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Admin Panel
    initAdminPanel();
    initNavigation();
    initEventListeners();
});

// Initialize Admin Panel
function initAdminPanel() {
    // Check if user is on admin page
    if (document.querySelector('.admin-header')) {
        document.body.classList.add('admin-body');
    }
}

// Navigation Handling
function initNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link, .sidebar-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            loadSection(section);
            
            // Update active state
            document.querySelectorAll('.admin-nav-link, .sidebar-link').forEach(l => {
                l.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Load Section
function loadSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const contentId = sectionName + '-content';
    const selectedSection = document.getElementById(contentId);
    
    if (selectedSection) {
        selectedSection.classList.add('active');
        // Scroll to top
        document.querySelector('.admin-main').scrollTop = 0;
    }
}

// Event Listeners
function initEventListeners() {
    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Tem a certeza que deseja fazer logout?')) {
                // Simulate logout
                alert('Logout realizado com sucesso!');
                window.location.href = 'index.html';
            }
        });
    }
    
    // Add Company Button
    const addCompanyBtn = document.getElementById('addCompanyBtn');
    if (addCompanyBtn) {
        addCompanyBtn.addEventListener('click', showAddCompanyModal);
    }
    
    // Form Submissions
    initFormHandlers();
    
    // Table Actions
    initTableActions();
}

// Form Handlers
function initFormHandlers() {
    // Save buttons
    const saveButtons = document.querySelectorAll('.btn-primary');
    
    saveButtons.forEach(btn => {
        if (btn.textContent.includes('Guardar') || btn.textContent.includes('Enviar')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleFormSubmit(this);
            });
        }
    });
}

// Handle Form Submit
function handleFormSubmit(button) {
    const form = button.closest('form') || button.closest('.edit-fields');
    
    if (form) {
        // Get form data
        const formData = new FormData(form);
        
        // Simulate save
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            showNotification('Alterações guardadas com sucesso!', 'success');
        }, 1500);
    }
}

// Table Actions
function initTableActions() {
    // Edit buttons
    document.querySelectorAll('.btn-table-action.edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const name = row.querySelector('td:first-child').textContent;
            showNotification(`Editando: ${name}`, 'info');
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.btn-table-action.delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const name = row.querySelector('td:first-child').textContent;
            
            if (confirm(`Tem a certeza que deseja eliminar: ${name}?`)) {
                row.style.opacity = '0.5';
                setTimeout(() => {
                    row.remove();
                    showNotification('Item eliminado com sucesso!', 'success');
                }, 500);
            }
        });
    });
}

// Show Add Company Modal
function showAddCompanyModal() {
    const formContent = `
        <div class="modal-form">
            <h3>Adicionar Nova Empresa</h3>
            <div class="form-group">
                <label>Nome da Empresa</label>
                <input type="text" placeholder="Ex: SIMJS Consultoria" class="form-input">
            </div>
            <div class="form-group">
                <label>Sector</label>
                <input type="text" placeholder="Ex: Consultoria" class="form-input">
            </div>
            <div class="form-group">
                <label>Descrição</label>
                <textarea placeholder="Descrição da empresa..." class="form-textarea"></textarea>
            </div>
            <div class="form-group">
                <label>URL da Logo</label>
                <input type="text" placeholder="assets/logo.jpg" class="form-input">
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <button class="btn-primary" onclick="saveNewCompany()">Adicionar</button>
                <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
            </div>
        </div>
    `;
    
    showModal('Adicionar Empresa', formContent);
}

// Show Modal
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.admin-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'admin-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles if not present
    addModalStyles();
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close Modal
function closeModal() {
    const modal = document.querySelector('.admin-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Save New Company
function saveNewCompany() {
    const inputs = document.querySelectorAll('.modal-form .form-input, .modal-form .form-textarea');
    const name = inputs[0].value;
    
    if (!name) {
        showNotification('Por favor, preencha todos os campos!', 'error');
        return;
    }
    
    // Simulate save
    showNotification(`Empresa "${name}" adicionada com sucesso!`, 'success');
    closeModal();
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification notification-${type}`;
    
    const iconMap = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'info': 'fa-info-circle',
        'warning': 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not present
    addNotificationStyles();
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add Modal Styles
function addModalStyles() {
    if (document.querySelector('#admin-modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'admin-modal-styles';
    style.textContent = `
        .admin-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            z-index: 2001;
            background: #1a1a2e;
            border: 1px solid #3a3f5c;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem;
            border-bottom: 1px solid #3a3f5c;
            background: rgba(204, 0, 0, 0.1);
        }
        
        .modal-header h2 {
            margin: 0;
            color: #e0e0e0;
            font-size: 1.5rem;
        }
        
        .modal-close {
            background: transparent;
            border: none;
            color: #e0e0e0;
            cursor: pointer;
            font-size: 1.5rem;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            color: #cc0000;
            transform: rotate(90deg);
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .modal-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .modal-form h3 {
            margin: 0 0 1rem;
            color: #e0e0e0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Add Notification Styles
function addNotificationStyles() {
    if (document.querySelector('#admin-notification-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'admin-notification-styles';
    style.textContent = `
        .admin-notification {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            max-width: 400px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 600;
            z-index: 3000;
            animation: slideInNotif 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .notification-success {
            background: rgba(16, 185, 129, 0.95);
            color: white;
        }
        
        .notification-error {
            background: rgba(239, 68, 68, 0.95);
            color: white;
        }
        
        .notification-info {
            background: rgba(59, 130, 246, 0.95);
            color: white;
        }
        
        .notification-warning {
            background: rgba(245, 158, 11, 0.95);
            color: white;
        }
        
        .admin-notification i {
            font-size: 1.25rem;
        }
        
        @keyframes slideInNotif {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @media (max-width: 768px) {
            .admin-notification {
                right: 1rem;
                left: 1rem;
                bottom: 1rem;
            }
            
            .modal-content {
                width: 95%;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export functions for global use
window.closeModal = closeModal;
window.saveNewCompany = saveNewCompany;

/* ========== TABS SYSTEM ========== */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabsContainer = this.closest('.tabs');
            const tabsContentContainer = tabsContainer.nextElementSibling;
            const tabIndex = Array.from(tabButtons).indexOf(this);
            
            // Get all tab buttons in this tabs container
            const siblingsButtons = tabsContainer.querySelectorAll('.tab-btn');
            const siblingsContent = tabsContentContainer.querySelectorAll('.tab-content');
            
            // Remove active class from all tabs
            siblingsButtons.forEach(btn => btn.classList.remove('active'));
            siblingsContent.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            siblingsContent[tabIndex].classList.add('active');
        });
    });
}

// Initialize tabs when page loads
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
});
