# 📋 SISTEMA DE REGISTRO COM TIPOS DE CONTA - DOCUMENTAÇÃO

## 🎯 Visão Geral

Novo sistema de registro na página de login que permite aos utilizadores escolher entre duas opções de inscrição:
- **Visitante** - Para participação na comunidade
- **Parceiro** - Para empresas e colaboradores

---

## 🏗️ Estrutura do Sistema

### 3 Passos do Registro

```
Passo 1: Escolha de Tipo de Conta
    ├─ Visitante (opção comum)
    └─ Parceiro (opção premium)
         ↓
Passo 2: Preencher Formulário Específico
    ├─ Se Visitante → Formulário Visitante
    └─ Se Parceiro → Formulário Parceiro
         ↓
Passo 3: Confirmação e Redirecionamento
    ├─ Visitante → comunidade.html
    └─ Parceiro → grupo.html
```

---

## 📊 Fluxo de Registro

### 1️⃣ **Seleção de Tipo**

Quando o utilizador clica em "Criar Conta", vê dois cartões com opções:

#### Cartão Visitante
- Ícone: Utilizador (<i class="fas fa-user"></i>)
- Descrição: "Para quem deseja explorar e participar da comunidade"
- Benefícios:
  - Acesso à comunidade
  - Ver eventos e depoimentos
  - Compartilhar feedback
  - Acesso a recursos gratuitos

#### Cartão Parceiro
- Ícone: Handshake (<i class="fas fa-handshake"></i>)
- Descrição: "Para empresas e colaboradores do Grupo SIMJS"
- Badge: "Premium"
- Benefícios:
  - Perfil empresarial
  - Dashboard analítico
  - Suporte dedicado
  - Acesso a recursos premium
  - Parcerias e colaborações

### 2️⃣ **Formulários Específicos**

#### Formulário Visitante

Campos:
- ✅ Nome Completo
- ✅ Email
- ✅ Idade (13-120)
- ✅ País (dropdown)
- ✅ Palavra-passe (com validação)
- ✅ Confirmar Palavra-passe
- ✅ Aceitar Termos e Condições
- ✅ Newsletter (opcional)

#### Formulário Parceiro

Campos:
- ✅ Nome da Empresa
- ✅ Nome do Responsável
- ✅ Email Comercial
- ✅ Telefone Comercial
- ✅ Tamanho da Empresa (dropdown)
- ✅ Sector/Indústria (dropdown)
- ✅ Website da Empresa (opcional)
- ✅ Palavra-passe (com validação)
- ✅ Confirmar Palavra-passe
- ✅ Aceitar Termos de Parceria
- ✅ Newsletter de Oportunidades (opcional)

### 3️⃣ **Validação**

Todos os campos têm validação em tempo real:
- Comprimento mínimo/máximo
- Formato de email
- Formato de telefone
- URL válida (website)
- Palavras-passe que correspondem
- Termos e condições aceitos

### 4️⃣ **Armazenamento**

#### Visitantes
- Salvos em: `localStorage['simjsUsers']`
- Estrutura:
```json
{
    "type": "visitante",
    "id": 1234567890,
    "fullName": "João Silva",
    "email": "joao@exemplo.com",
    "age": 28,
    "country": "PT",
    "password": "hashedPassword",
    "terms": true,
    "newsletter": true,
    "createdAt": "2026-01-25T10:30:00Z"
}
```

#### Parceiros
- Salvos em: `localStorage['simjsPartners']`
- Estrutura:
```json
{
    "type": "parceiro",
    "status": "pending_review",
    "id": 1234567890,
    "companyName": "Empresa Ltda.",
    "contactName": "João Silva",
    "email": "contato@empresa.com",
    "phone": "+244 923 456 789",
    "companySize": "medium",
    "industry": "tech",
    "website": "https://www.empresa.com",
    "password": "hashedPassword",
    "terms": true,
    "newsletter": true,
    "createdAt": "2026-01-25T10:30:00Z"
}
```

---

## 🎨 Design e UX

### Cartões de Seleção

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│      👤 Visitante           │  │  🤝 Parceiro (Premium)      │
├─────────────────────────────┤  ├─────────────────────────────┤
│ Para exploração e           │  │ Para empresas e             │
│ participação na comunidade  │  │ colaboradores               │
├─────────────────────────────┤  ├─────────────────────────────┤
│ ✓ Acesso à comunidade       │  │ ✓ Perfil empresarial        │
│ ✓ Ver eventos               │  │ ✓ Dashboard analítico       │
│ ✓ Compartilhar feedback     │  │ ✓ Suporte dedicado          │
│ ✓ Recursos gratuitos        │  │ ✓ Recursos premium          │
│                              │  │ ✓ Parcerias                 │
│                              │  │                              │
│ [Registar como Visitante]   │  │ [Registar como Parceiro]   │
└─────────────────────────────┘  └─────────────────────────────┘
```

### Animações

- Transição entre passos: `fadeInUp` (0.3s)
- Hover nos cartões: `translateY(-5px)` + sombra
- Seleção: mudança de cor + border

---

## 💻 Implementação Técnica

### Ficheiros Modificados

#### `login.html`
- Novo HTML para seleção de tipo
- Dois formulários separados (visitante e parceiro)
- Estrutura responsiva com grids

#### `css/login.css`
- `.registration-types` - Grid de cartões
- `.type-card` - Estilos dos cartões
- `.type-card.selected` - Estado selecionado
- `.type-benefits` - Lista de benefícios
- `.btn-back` - Botão voltar
- Estilos responsivos para mobile

#### `js/login.js`
- Classe `RegistrationTypeManager`
- Métodos:
  - `selectType(type)` - Selecionar tipo
  - `backToTypeSelection()` - Voltar
  - `validateVisitanteForm(data)` - Validar visitante
  - `validateParceiroForm(data)` - Validar parceiro
  - `handleVisitanteSubmit(e)` - Submeter visitante
  - `handleParceiroSubmit(e)` - Submeter parceiro

---

## ✅ Validações

### Visitante

| Campo | Regras |
|-------|--------|
| Nome Completo | Mín 3 caracteres |
| Email | Formato válido |
| Idade | 13-120 anos |
| País | Obrigatório |
| Palavra-passe | 8+ chars, maiúscula, minúscula, número, especial |
| Confirmar | Deve corresponder |
| Termos | Deve aceitar |

### Parceiro

| Campo | Regras |
|-------|--------|
| Nome Empresa | Mín 3 caracteres |
| Nome Responsável | Mín 3 caracteres |
| Email | Formato válido (comercial) |
| Telefone | Formato válido |
| Tamanho | Obrigatório |
| Sector | Obrigatório |
| Website | URL válida (se preenchido) |
| Palavra-passe | 8+ chars, maiúscula, minúscula, número, especial |
| Confirmar | Deve corresponder |
| Termos | Deve aceitar |

---

## 🎯 Comportamentos

### Ao Selecionar Tipo

1. Cartão fica com cor diferente (`.selected`)
2. Formulário aparece com animação
3. Página desce para o formulário
4. Botão "Voltar" aparece no topo do formulário

### Ao Clicar "Voltar"

1. Formulário é limpo
2. Volta à tela de seleção
3. Cartões voltam ao estado normal
4. Página desce para os cartões

### Ao Submeter Visitante

1. Validação de todos os campos
2. Se válido: exibe mensagem de sucesso
3. Após 2 segundos: redireciona para `comunidade.html`
4. Dados salvos em `localStorage['simjsUsers']`

### Ao Submeter Parceiro

1. Validação de todos os campos
2. Se válido: exibe mensagem de sucesso
3. Após 2 segundos: redireciona para `grupo.html`
4. Dados salvos em `localStorage['simjsPartners']` com `status: 'pending_review'`

---

## 🔄 Fluxo de Dados

```javascript
// Visitante Flow
Login Page
  ↓
Click "Criar Conta"
  ↓
Vê 2 Cartões (Visitante/Parceiro)
  ↓
Clica "Registar como Visitante"
  ↓
Formulário Visitante Aparece
  ↓
Preenche Campos
  ↓
Clica "Criar Conta de Visitante"
  ↓
Validação ✓
  ↓
Salva em localStorage['simjsUsers']
  ↓
Mensagem de Sucesso
  ↓
Redireciona para comunidade.html
```

---

## 📱 Responsividade

### Desktop (> 768px)
- Cartões em 2 colunas lado-a-lado
- Formulários em largura normal
- Layout completo visível

### Tablet (480px - 768px)
- Cartões em 2 colunas (ajustado)
- Padding reduzido
- Fontes ligeiramente menores

### Mobile (< 480px)
- Cartões em 1 coluna (empilhados)
- Padding comprimido
- Botões full-width
- Fontes otimizadas

---

## 🎓 Exemplos de Uso

### Registar como Visitante

```
1. Clique em "Criar Conta" na página de login
2. Clique no cartão "Visitante"
3. Preencha:
   - Nome: João Silva
   - Email: joao@exemplo.com
   - Idade: 28
   - País: Portugal
   - Palavra-passe: MyPass@123
4. Aceite os Termos
5. Clique em "Criar Conta de Visitante"
6. Será redirecionado para a comunidade
```

### Registar como Parceiro

```
1. Clique em "Criar Conta" na página de login
2. Clique no cartão "Parceiro"
3. Preencha:
   - Empresa: Acme Inc.
   - Responsável: João Silva
   - Email: joao@acme.com
   - Telefone: +244 923 456 789
   - Tamanho: Média (51-200)
   - Sector: Tecnologia
4. Aceite os Termos de Parceria
5. Clique em "Criar Conta de Parceiro"
6. Será redirecionado para a página de grupo
7. Sua solicitação aguardará análise
```

---

## 🔐 Segurança

### Validações

- ✅ Email válido (verificado)
- ✅ Palavra-passe forte (8+ chars, maiúscula, minúscula, número, especial)
- ✅ Telefone válido (formato verificado)
- ✅ URL válida (se preenchido)
- ✅ Termos aceitos

### Armazenamento

- ✅ localStorage (desenvolvimento)
- ⏳ Servidor (produção)
- ⏳ Hash de password (futuro)
- ⏳ Verificação de email (futuro)

---

## 🚀 Próximos Passos

### Melhorias Futuras

1. **Verificação de Email**
   - Enviar email de confirmação
   - Validar email antes de ativar conta

2. **Review de Parceiros**
   - Dashboard admin para revisar parceiros
   - Aprovação/rejeição de solicitações
   - Notificações por email

3. **Perfis Detalhados**
   - Foto de perfil
   - Biografia
   - Links sociais

4. **Integração Backend**
   - Salvar em base de dados
   - API endpoints
   - Hash de passwords com bcrypt

5. **Dashboard Diferenciado**
   - Dashboard para visitantes
   - Dashboard para parceiros
   - Analytics para parceiros

6. **Notificações**
   - Email de boas-vindas
   - Confirmação de registro
   - Atualizações para parceiros

---

## 📞 Suporte

Para dúvidas sobre o novo sistema de registro:

1. Consulte a documentação acima
2. Verifique o código em `login.html`, `login.css` e `login.js`
3. Teste os fluxos de registro
4. Contacte o desenvolvimento para modificações

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Status**: ✅ Completo e Funcional
