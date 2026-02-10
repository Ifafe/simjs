# Funcionalidades Adicionadas ao Painel Admin

## Resumo Geral
O painel administrativo foi expandido com uma seção completa intitulada **"EDITAR SITE"** que permite ao administrador editar todo o conteúdo do website SIMJS de forma centralizada.

---

## Nova Seção: EDITAR SITE
Localização: Barra lateral > Seção "EDITAR SITE"

### 1. **Página Inicial (Homepage)**
- **Localização no código**: `#homepage-section`
- **Sistema de Tabs**: 3 abas separadas
  
#### Aba 1: Herói (Hero Section)
- Campo para editar: Título Principal
- Campo para editar: Texto em Destaque
- Campo para editar: Subtítulo
- Campo para editar: Texto do Botão CTA

#### Aba 2: História (About/Timeline)
- Timeline interativa para adicionar eventos históricos
- Cada evento pode ter:
  - Ano/Data
  - Título do evento
  - Descrição detalhada
- Botão para adicionar novos eventos à timeline

#### Aba 3: Serviços
- Grid de serviços com opção de editar cada um
- Cada serviço contém:
  - Ícone (seleção)
  - Título
  - Descrição
- Botão para adicionar novos serviços
- Botão para remover serviços

---

### 2. **Página Grupo**
- **Localização no código**: `#grupo-section`
- Campo para editar: Descrição da Empresa
- Campo para editar: Visão da Empresa
- Campo para editar: Missão da Empresa
- Botão para adicionar novas descrições
- Opção de fazer upload de imagem de apresentação

---

### 3. **Página Comunidade**
- **Localização no código**: `#comunidade-page-section`
- **Sistema de Tabs**: 2 abas separadas

#### Aba 1: Vídeos
- Campo para adicionar título de seção
- Campo para descrição da seção de vídeos
- Opção para fazer upload/adicionar vídeos
- Gerenciador de vídeos existentes (editar/deletar)

#### Aba 2: Eventos
- Campo para adicionar título de seção
- Campo para descrição da seção de eventos
- Opção para criar/editar eventos
- Gerenciador de eventos existentes

---

### 4. **Página Depoimentos**
- **Localização no código**: `#depoimento-page-section`
- Campo para editar título da página
- Campo para descrição da página
- Gerenciador de depoimentos (CRUD completo):
  - Adicionar novo depoimento
  - Editar depoimento existente
  - Deletar depoimento
  - Campos: Autor, Cargo, Texto, Foto

---

### 5. **Página Contacto**
- **Localização no código**: `#contacto-page-section`
- **Sistema de Tabs**: 2 abas separadas

#### Aba 1: Informações de Contacto
- Campo para editar: Email
- Campo para editar: Telefone
- Campo para editar: Endereço
- Campo para editar: Horário de Funcionamento
- Opção de adicionar múltiplos endereços

#### Aba 2: Configuração de Formulário
- Campo para editar: Título do Formulário
- Campo para editar: Descrição do Formulário
- Toggle para ativar/desativar formulário
- Campos customizáveis do formulário
- Gerenciador de campos (adicionar/remover)

---

### 6. **Header e Footer**
- **Localização no código**: `#header-footer-section`
- **Sistema de Tabs**: 3 abas separadas

#### Aba 1: Header (Cabeçalho)
- Upload de logo
- Preview do logo
- Campo para editar texto do logo/branding
- Opção de cor de fundo do header
- Toggle para sticky/fixo

#### Aba 2: Footer (Rodapé)
- Upload de logo do footer
- Campo para editar texto de copyright
- Campo para editar descrição da empresa
- Opção de cores do footer
- Toggle para newsletter

#### Aba 3: Menu de Navegação
- Gerenciador de itens do menu (adicionar/editar/remover)
- Reordenação de itens (drag-and-drop pronto para implementar)
- Campos para cada item:
  - Texto do link
  - URL/Destino
  - Ícone (opcional)
  - Visibilidade (ativo/inativo)

---

## Recursos Técnicos Implementados

### Sistema de Tabs
- Implementação com CSS puro (sem dependências)
- Animações suaves com `fadeInUp`
- Classe `.active` para estado ativo
- Suporta múltiplas abas na mesma página
- Totalmente responsivo

### Elementos de Formulário
- Inputs de texto
- Textareas para conteúdo longo
- Color pickers para cores
- File inputs para uploads de mídia
- Select dropdowns para opções
- Checkboxes e toggles para booleanos

### Estilos CSS Adicionados
```css
/* Sistema de Tabs */
.tabs { /* Contêiner das abas */ }
.tab-btn { /* Botão de aba */ }
.tab-btn.active { /* Aba ativa */ }
.tab-content { /* Conteúdo da aba */ }
.tab-content.active { /* Conteúdo ativo */ }

/* Editores Especializados */
.timeline-editor { /* Timeline de eventos */ }
.services-editor { /* Grade de serviços */ }
.menu-items { /* Lista de itens de menu */ }
.color-grid { /* Grade de cores */ }
.upload-area { /* Área de upload */ }
```

### JavaScript Adicionado
```javascript
function initTabs() {
    /* Inicializa o sistema de tabs */
    /* Adiciona event listeners em todos os botões de aba */
    /* Gerencia transições entre abas */
}
```

---

## Como Usar

### Acessar as Funcionalidades
1. Fazer login no painel admin (`admin.html`)
2. Na barra lateral esquerda, descer até a seção **"EDITAR SITE"**
3. Clicar no item desejado (Homepage, Grupo, Comunidade, etc.)
4. A seção carrega com o conteúdo específico

### Editar Conteúdo
1. Selecionar a página que deseja editar
2. Se a página tiver múltiplas abas, clicar na aba desejada
3. Preencher os campos de formulário
4. Clicar em "Salvar" para guardar as alterações

### Adicionar Novos Itens
- Usar os botões **"Adicionar"** em seções como:
  - Serviços (na aba Serviços)
  - Eventos (na aba Eventos)
  - Depoimentos
  - Itens de Menu

### Fazer Upload de Imagens/Vídeos
1. Clicar na área **"Arrastar ficheiro aqui"**
2. Selecionar ficheiro do computador
3. Visualizar preview antes de salvar

---

## Integração com Backend

Atualmente, o painel está preparado com a interface completa. Para funcionamento total:

### O que Falta Implementar
1. **Endpoint de Salvamento**: Criar routes no backend para:
   - POST `/api/homepage/save` - Salvar alterações da homepage
   - POST `/api/grupo/save` - Salvar alterações da página grupo
   - POST `/api/comunidade/save` - Salvar alterações da comunidade
   - POST `/api/depoimentos/save` - Salvar depoimentos
   - POST `/api/contacto/save` - Salvar configurações de contacto
   - POST `/api/header-footer/save` - Salvar header/footer
   - POST `/api/uploads` - Upload de imagens/vídeos

2. **Salvamento em localStorage**: Já implementado para demo, mas usar API real em produção

3. **Carregamento de Dados**: Fetch dos dados existentes para pré-popular os formulários

### JavaScript para Conectar ao Backend
```javascript
// Exemplo para salvar conteúdo da homepage
async function saveHomepage() {
    const homepageData = {
        hero: {
            title: document.querySelector('#hero-title').value,
            highlight: document.querySelector('#hero-highlight').value,
            subtitle: document.querySelector('#hero-subtitle').value,
            ctaText: document.querySelector('#hero-cta').value
        }
    };
    
    const response = await fetch('/api/homepage/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homepageData)
    });
    
    if (response.ok) {
        showNotification('Homepage salva com sucesso!', 'success');
    }
}
```

---

## Estrutura de Ficheiros

### Ficheiros Modificados
- `admin.html` - Adicionadas 6 novas seções com formulários completos
- `css/admin-dashboard.css` - Adicionados estilos para tabs e componentes
- `js/admin.js` - Adicionada função `initTabs()` para gerenciar abas

### Novas Classes CSS
- `.tabs` - Contêiner das abas
- `.tab-btn` - Botão individual de aba
- `.tab-content` - Conteúdo de cada aba
- `.timeline-editor` - Editor de timeline
- `.services-editor` - Editor de serviços
- `.menu-items` - Lista de itens de menu
- `.upload-area` - Área de upload de ficheiros

---

## Próximos Passos Recomendados

1. **Implementar Salvamento**: Conectar formulários a backend/localStorage
2. **Adicionar Validação**: Validar campos antes de salvar
3. **Implementar Upload Real**: Permitir upload real de imagens/vídeos
4. **Sincronização Live**: Atualizar site em tempo real quando conteúdo é editado
5. **Histórico de Versões**: Guardar versões anteriores do conteúdo
6. **Permissões de Usuários**: Controlar quem pode editar o quê
7. **Preview Live**: Mostrar preview das alterações antes de salvar

---

## Status Atual

✅ **Interface Completa** - 100%
- HTML estrutura pronta
- CSS estilos aplicados
- JavaScript inicialização funcional

⚠️ **Funcionalidade** - 50%
- Forms visíveis e preenchíveis
- Tabs funcionais
- Salvamento em localStorage (demo)
- **Falta**: Conexão real com backend/banco de dados

---

## Contato e Suporte

Para dúvidas sobre implementação ou customizações, consulte:
- `ADMIN-FUNCIONALIDADES.md` - Guia completo de funcionalidades
- `ADMIN-GUIDE.md` - Guia de uso passo-a-passo
- `ADMIN-ARCHITECTURE.md` - Documentação técnica

