# 📊 Guia do Painel Administrativo SIMJS

## 🚀 Como Usar as Funcionalidades

### **1. Acessar o Painel Administrativo**

1. Abra `admin-login.html` no seu navegador
2. Use as credenciais de demo:
   - **Utilizador:** `admin`
   - **Palavra-passe:** `12345678`

### **2. Dashboard**

O dashboard mostra:
- **Estatísticas rápidas:** Total de páginas, posts, mídia e utilizadores
- **Atividade recente:** Últimas ações realizadas no painel
- **Ações rápidas:** Botões para criar novos itens rapidamente

### **3. Gerenciamento de Conteúdo**

#### **Páginas**
- Criar nova página: Clique em "Nova Página"
- Editar página: Clique no ícone ✏️ na linha da página
- Deletar página: Clique no ícone 🗑️ (confirmação obrigatória)
- Status: Rascunho, Publicado ou Arquivado

#### **Posts**
- Similar às páginas
- Adicione categorias e tags
- Defina autor e data

#### **Seções**
- Gerencie seções do site
- Ative/desative conforme necessário

### **4. Gestão de Mídia**

#### **Upload de Imagens e Vídeos**
1. Vá para "Mídia" → "Imagens" ou "Vídeos"
2. Clique em "Upload"
3. Selecione arquivos (suporta múltiplos)
4. Defina nome, alt text e categorias
5. Clique em "Guardar"

#### **Usando Mídia no Conteúdo**
- Copie a URL: Clique no botão "Copiar" na mídia
- Cole em seus posts/páginas
- Use em galerias e banners

### **5. Personalização**

#### **Cores e Tema**
1. Vá para "Personalização" → "Cores & Tema"
2. Clique nas cores para mudar
3. Cor Primária: Vermelha (#cc0000) - afeta botões, links, acentos
4. Cor Secundária: Branca (#ffffff) - fundo padrão
5. Clique "Guardar Alterações"

#### **Menus**
- Organize estrutura de navegação
- Defina ordem e nível de profundidade
- Ative/desative itens

#### **Banners**
- Crie banners promocionais
- Defina imagem, texto e CTA
- Escolha em qual página exibir

### **6. Configurações**

#### **Site**
- Nome do site
- Descrição geral
- Email de contacto
- Telefone

#### **SEO**
- Meta description por página
- Keywords
- Open Graph (redes sociais)
- Sitemap automático

#### **Idiomas**
- Ative/desative idiomas
- Traduza conteúdo
- Defina idioma padrão

#### **Contacto**
- Emails de recepção
- Campos do formulário
- Configurações de notificação

### **7. Utilizadores**

- Ver lista de utilizadores
- Criar novo utilizador
- Definir permissões
- Editar perfis

---

## 🔒 Segurança

### **Autenticação**
- Login com utilizador e palavra-passe
- Sessão expira em 24 horas
- Token JWT (simulado)
- Logout automático por inatividade

### **Permissões**
- **Admin:** Acesso total
- **Editor:** Gerencia conteúdo
- **Visualizador:** Apenas leitura

### **Boas Práticas**
- ✅ Mude a palavra-passe padrão
- ✅ Não compartilhe credenciais
- ✅ Use HTTPS em produção
- ✅ Faça backup regular
- ✅ Valide dados no backend

---

## 💾 Dados Armazenados

Os dados são guardados em **localStorage** do navegador:
- `adminUser` - Utilizador autenticado
- `adminToken` - Token de sessão
- `adminPages` - Páginas criadas
- `adminPosts` - Posts criados
- `adminMedia` - Mídia enviada
- `adminUsers` - Utilizadores
- `siteConfig` - Configurações do site
- `activityLogs` - Log de ações

### **Exportar/Importar Dados**
```javascript
// Exportar
const allData = {
    pages: JSON.parse(localStorage.getItem('adminPages')),
    posts: JSON.parse(localStorage.getItem('adminPosts')),
    media: JSON.parse(localStorage.getItem('adminMedia')),
    config: JSON.parse(localStorage.getItem('siteConfig'))
};
console.log(JSON.stringify(allData));

// Importar
localStorage.setItem('adminPages', JSON.stringify(data.pages));
```

---

## 🛠️ Personalizar o Painel

### **Adicionar Nova Seção**

1. **HTML** (em `admin.html`):
```html
<section class="content-section" id="nova-secao-section">
    <div class="section-header">
        <h1>Minha Nova Seção</h1>
    </div>
    <!-- Conteúdo -->
</section>

<!-- Menu -->
<li class="nav-item">
    <a href="#" class="nav-link" data-section="nova-secao">
        <i class="fas fa-icon"></i>
        <span>Nova Seção</span>
    </a>
</li>
```

2. **JavaScript** (em `admin-ui.js`):
```javascript
case 'nova-secao':
    this.loadNovaSecao();
    break;
```

### **Adicionar Novo Campo no Form**

```html
<div class="form-group">
    <label for="meuCampo">Meu Campo</label>
    <input type="text" id="meuCampo" required>
</div>
```

---

## 📱 Integração com Site Público

### **Usar Dados do Painel no Site**

```javascript
// Em qualquer página pública
const config = JSON.parse(localStorage.getItem('siteConfig'));
const pages = JSON.parse(localStorage.getItem('adminPages'));

// Usar dados
document.querySelector('.site-name').textContent = config.siteName;
document.querySelector('.site-email').textContent = config.email;
```

### **Sincronizar com Backend Real**

Substitua localStorage por API calls:

```javascript
// Antes
const pages = JSON.parse(localStorage.getItem('adminPages'));

// Depois
const pages = await fetch('/api/pages').then(r => r.json());
```

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Não consegue fazer login | Limpe localStorage: `localStorage.clear()` |
| Dados desapareceram | Verifique se localStorage está ativado |
| Permissões não funcionam | Verifique role do utilizador em localStorage |
| Formulários não submitem | Verifique validação no console (F12) |

---

## 🚀 Próximos Passos

1. **Integrar com Backend Real**
   - Substituir localStorage por API REST
   - Implementar autenticação segura
   - Usar banco de dados

2. **Melhorias de UX**
   - Editor WYSIWYG (Quill, TinyMCE)
   - Drag & drop para reorganizar
   - Pré-visualização ao vivo
   - Dark mode

3. **Recursos Avançados**
   - Sistema de papéis granular
   - Histórico de versões
   - Recuperação de lixo
   - Busca avançada
   - Estatísticas detalhadas

4. **Performance**
   - Lazy loading
   - Cache inteligente
   - Compressão de mídia
   - Otimização de imagens

---

## 📞 Suporte

Para dúvidas ou sugestões:
- **Email:** contacto@simjs.com
- **Documentação:** [docs.simjs.com](https://docs.simjs.com)
- **GitHub:** [github.com/simjs](https://github.com/simjs)

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2026
