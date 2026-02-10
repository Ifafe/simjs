# 🏗️ Arquitetura do Painel Administrativo SIMJS

## 📁 Estrutura de Arquivos

```
projeto/
├── admin.html                 # Painel principal
├── admin-login.html           # Página de login
├── css/
│   └── admin-dashboard.css    # Estilos do painel
├── js/
│   ├── admin-system.js        # Sistema de autenticação
│   ├── content-manager.js     # Gerenciador de conteúdo
│   └── admin-ui.js            # Gerenciador de UI
├── ADMIN-GUIDE.md             # Documentação completa
└── ADMIN-QUICKSTART.md        # Guia rápido
```

---

## 🔧 Arquivos JavaScript

### **1. admin-system.js**
**Responsabilidade:** Autenticação e Segurança

**Classes:**
- `AuthSystem` - Controla login, logout, tokens, permissões

**Métodos Principais:**
```javascript
authSystem.login(username, password)
authSystem.logout()
authSystem.isAuthenticated()
authSystem.hasPermission(permission)
authSystem.getCurrentUser()
```

**Dados Armazenados:**
- `adminUser` - Utilizador atual
- `adminToken` - Token JWT
- `adminUsers` - Lista de utilizadores

---

### **2. content-manager.js**
**Responsabilidade:** CRUD de Conteúdo

**Classes:**
- `ContentManager` - Gerencia todos os dados do site

**Métodos - Páginas:**
```javascript
contentManager.createPage(pageData)
contentManager.updatePage(id, pageData)
contentManager.deletePage(id)
contentManager.getPages(filter)
contentManager.getPageById(id)
```

**Métodos - Posts:**
```javascript
contentManager.createPost(postData)
contentManager.updatePost(id, postData)
contentManager.deletePost(id)
contentManager.getPosts(filter)
```

**Métodos - Mídia:**
```javascript
contentManager.addMedia(mediaData)
contentManager.deleteMedia(id)
contentManager.getMedia(filter)
```

**Métodos - Configurações:**
```javascript
contentManager.getConfig()
contentManager.updateConfig(configData)
```

**Métodos - Logs:**
```javascript
contentManager.logActivity(action, details)
contentManager.getActivityLogs(limit)
contentManager.getStatistics()
```

**Dados Armazenados:**
- `adminPages` - Páginas criadas
- `adminPosts` - Posts criados
- `adminMedia` - Mídia carregada
- `siteConfig` - Configurações
- `activityLogs` - Log de ações

---

### **3. admin-ui.js**
**Responsabilidade:** Interface do Utilizador

**Classes:**
- `UIManager` - Controla interações e navegação

**Métodos - Navegação:**
```javascript
uiManager.loadSection(sectionName)
uiManager.loadDashboard()
uiManager.toggleSidebar()
```

**Métodos - Páginas:**
```javascript
uiManager.loadPages()
uiManager.showPageForm(pageId)
uiManager.editPage(pageId)
uiManager.deletePage(pageId)
uiManager.savePage()
```

**Métodos - Mídia:**
```javascript
uiManager.loadMedia()
uiManager.deleteMedia(mediaId)
uiManager.copyMediaUrl(url)
```

**Métodos - Utilizadores:**
```javascript
uiManager.loadUsers()
uiManager.editUser(userId)
```

**Métodos - Utilidade:**
```javascript
uiManager.showNotification(message, type)
uiManager.formatTime(timestamp)
uiManager.logout()
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────┐
│  Utilizador     │
└────────┬────────┘
         │ interação
         ▼
┌─────────────────┐
│   admin-ui.js   │ ◄── Controla eventos e interface
│   (UIManager)   │
└────────┬────────┘
         │ chama
         ▼
┌─────────────────┐
│ content-manager │ ◄── Gerencia dados
│ (ContentMngr)   │
└────────┬────────┘
         │ guarda
         ▼
┌─────────────────┐
│ localStorage    │ ◄── Base de dados local
└─────────────────┘

┌─────────────────┐
│ admin-system.js │ ◄── Autentica utilizador
│ (AuthSystem)    │
└────────┬────────┘
         │
         ▼
    localStorage
```

---

## 🔐 Fluxo de Autenticação

```
1. Utilizador acessa admin-login.html
   ↓
2. Submete formulário (username, password)
   ↓
3. authSystem.login(username, password)
   ├─ Verifica se utilizador existe
   ├─ Verifica password (hash bcrypt)
   ├─ Gera token JWT
   └─ Guarda em localStorage
   ↓
4. Redireciona para admin.html
   ↓
5. UIManager checa authSystem.isAuthenticated()
   ├─ Se falso → redireciona para login
   └─ Se verdadeiro → carrega dashboard
```

---

## 📊 Estrutura de Dados

### **Página**
```javascript
{
    id: 1234567890,
    title: "Sobre",
    url: "sobre",
    content: "<h1>Conteúdo</h1>",
    status: "published", // draft, published, archived
    createdAt: "2026-01-23T10:30:00Z",
    updatedAt: "2026-01-23T14:45:00Z",
    author: "admin",
    meta: {
        description: "Descrição SEO",
        keywords: "palavra-chave1, palavra-chave2"
    }
}
```

### **Post**
```javascript
{
    id: 1234567890,
    title: "Novo Evento",
    content: "...",
    category: "eventos",
    tags: ["inovação", "parceria"],
    status: "published",
    image: "url-da-imagem",
    createdAt: "2026-01-23T10:30:00Z",
    updatedAt: "2026-01-23T14:45:00Z",
    author: "admin"
}
```

### **Mídia**
```javascript
{
    id: 1234567890,
    name: "imagem-produto.jpg",
    type: "image", // image, video
    url: "assets/imagem-produto.jpg",
    size: 245000,
    uploadedAt: "2026-01-23T10:30:00Z",
    uploadedBy: "admin",
    alt: "Descrição da imagem",
    categories: ["produtos", "galeria"]
}
```

### **Utilizador**
```javascript
{
    id: 1,
    username: "admin",
    password: "hash-bcrypt",
    name: "Administrador",
    email: "admin@simjs.com",
    role: "admin", // admin, editor, viewer
    permissions: ["all"]
}
```

### **Configuração**
```javascript
{
    siteName: "SIMJS",
    description: "Grupo SIMJS",
    email: "contacto@simjs.com",
    phone: "+244",
    colors: {
        primary: "#cc0000",
        secondary: "#ffffff"
    },
    seo: {
        description: "...",
        keywords: "...",
        ogImage: "..."
    },
    socialMedia: {
        facebook: "...",
        instagram: "...",
        linkedin: "..."
    },
    languages: ["pt", "en"]
}
```

---

## 🎨 Componentes UI

### **Layout Principal**
- `admin-sidebar` - Menu lateral
- `admin-topbar` - Barra superior
- `admin-main` - Conteúdo principal
- `admin-content` - Área de conteúdo

### **Componentes**
- `.stat-card` - Card de estatística
- `.content-table` - Tabela de conteúdo
- `.notification-toast` - Notificação
- `.admin-form` - Formulário
- `.dashboard-card` - Card do dashboard
- `.badge` - Etiqueta de status

---

## 🚀 Fluxo de Operações

### **Criar Página**
```
1. UIManager.showPageForm()
   ├─ Mostra modal de criação
   └─ Limpa formulário
   
2. Utilizador preenche dados
   
3. UIManager.savePage()
   ├─ Coleta dados do form
   ├─ Chama contentManager.createPage()
   ├─ Mostra notificação
   ├─ Recarrega lista
   └─ Fecha modal
   
4. contentManager.createPage()
   ├─ Cria objeto página
   ├─ Adiciona à lista
   ├─ Guarda em localStorage
   ├─ Log de atividade
   └─ Retorna página criada
```

### **Deletar Página**
```
1. UIManager.deletePage(id)
   ├─ Pede confirmação
   └─ Se confirmado:
   
2. contentManager.deletePage(id)
   ├─ Remove da lista
   ├─ Guarda em localStorage
   └─ Log de atividade
   
3. UIManager recarrega lista
```

---

## 🔄 Ciclo de Vida

### **Ao Iniciar o Painel**
```
1. admin.html carrega
2. admin-ui.js instancia UIManager
3. UIManager.init()
   ├─ Verifica authSystem.isAuthenticated()
   ├─ Se falso → redireciona login
   └─ Se verdadeiro:
      ├─ Setup event listeners
      ├─ Carrega dashboard
      ├─ Atualiza info do utilizador
      └─ Pronto para uso
```

### **Ao Fazer Login**
```
1. Utilizador acessa admin-login.html
2. Submete credenciais
3. authSystem.login()
   ├─ Valida dados
   ├─ Gera token
   ├─ Guarda em localStorage
   └─ Retorna sucesso
4. Redireciona para admin.html
```

### **Ao Mudar Seção**
```
1. Utilizador clica no menu
2. UIManager.loadSection(name)
   ├─ Atualiza nav ativa
   ├─ Mostra secção
   └─ Carrega dados específicos
      (Ex: UIManager.loadPages())
3. Dados carregados de contentManager
4. Interface atualiza
```

---

## 📈 Escalabilidade

### **Para Adicionar Novo Tipo de Conteúdo**

1. **Em `content-manager.js`:**
```javascript
class ContentManager {
    // ... código existente ...
    
    // Novo tipo
    getMyType() { }
    createMyType() { }
    updateMyType() { }
    deleteMyType() { }
}
```

2. **Em `admin-ui.js`:**
```javascript
loadMyType() {
    const items = contentManager.getMyType();
    // Renderizar no DOM
}

case 'meu-tipo':
    this.loadMyType();
    break;
```

3. **Em `admin.html`:**
```html
<!-- Seção HTML -->
<section class="content-section" id="meu-tipo-section">
    <!-- Conteúdo -->
</section>

<!-- Menu -->
<li><a href="#" class="nav-link" data-section="meu-tipo">Meu Tipo</a></li>
```

---

## 🔒 Camadas de Segurança

```
┌─────────────────────────────────────┐
│  1. Autenticação (Login/Token)      │
├─────────────────────────────────────┤
│  2. Autorização (Permissões)        │
├─────────────────────────────────────┤
│  3. Validação (Frontend)            │
├─────────────────────────────────────┤
│  4. Proteção CSRF (Headers)         │
├─────────────────────────────────────┤
│  5. Rate Limiting (Backend)         │
├─────────────────────────────────────┤
│  6. Encriptação (HTTPS)             │
└─────────────────────────────────────┘
```

---

## 📱 Responsividade

### **Breakpoints**
- `> 1200px` - Desktop
- `768px - 1200px` - Tablet
- `< 768px` - Mobile

### **Comportamento Responsivo**
- Sidebar → Drawer em mobile
- Tabelas → Cards em mobile
- Grid → Stack em mobile

---

## 🧪 Teste do Painel

### **Cenários de Teste**

1. **Autenticação**
   - [ ] Login com credenciais corretas
   - [ ] Login com credenciais erradas
   - [ ] Logout funciona
   - [ ] Token expira em 24h

2. **Conteúdo**
   - [ ] Criar página
   - [ ] Editar página
   - [ ] Deletar página
   - [ ] Filtrar páginas

3. **Mídia**
   - [ ] Upload imagem
   - [ ] Upload vídeo
   - [ ] Copiar URL
   - [ ] Deletar mídia

4. **Segurança**
   - [ ] Não consegue acessar sem login
   - [ ] Permissões funcionam
   - [ ] Dados não se perdem

---

## 📦 Produção

### **Antes de Deploy**

- [ ] Usar backend real (Node/PHP/Python)
- [ ] Implementar autenticação segura
- [ ] Usar banco de dados (PostgreSQL/MySQL)
- [ ] Adicionar HTTPS
- [ ] Otimizar performance
- [ ] Adicionar logging
- [ ] Testes automatizados
- [ ] Monitoramento
- [ ] Backups automáticos

### **Checklist de Segurança**

- [ ] Validação server-side
- [ ] SQL Injection protection
- [ ] XSS prevention
- [ ] CSRF tokens
- [ ] Rate limiting
- [ ] Autenticação OAuth2/JWT
- [ ] Senhas hasheadas (bcrypt)
- [ ] Logs de auditoria
- [ ] Backup automático
- [ ] Plano de recuperação

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2026
