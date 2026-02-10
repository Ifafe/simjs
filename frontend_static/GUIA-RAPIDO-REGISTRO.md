# 🚀 GUIA RÁPIDO - SISTEMA DE REGISTRO COM TIPOS DE CONTA

## O Que Mudou?

A página de login agora tem um **novo fluxo de registro** que permite escolher entre:
- **Visitante** - Para explorar a comunidade
- **Parceiro** - Para empresas (status premium)

---

## 🎯 Como Funciona

### Passo 1: Escolher Tipo
```
Página de Login
     ↓
"Criar Conta"
     ↓
DOIS CARTÕES APARECEM
┌──────────────────┐  ┌──────────────────┐
│   👤 VISITANTE   │  │  🤝 PARCEIRO     │
│ (Comunidade)     │  │ (Empresa)        │
└──────────────────┘  └──────────────────┘
```

### Passo 2: Preencher Formulário

**Se Visitante:**
- Nome, Email, Idade, País
- Palavra-passe (8+ chars, com maiúscula, minúscula, número, especial)

**Se Parceiro:**
- Empresa, Responsável, Email Comercial, Telefone
- Tamanho, Sector/Indústria
- Palavra-passe (mesmo requisitos)

### Passo 3: Confirmação
```
✓ Validação OK
  ↓
"Conta Criada com Sucesso!"
  ↓
Redireciona para:
  - Visitante → comunidade.html
  - Parceiro → grupo.html
```

---

## 📋 Campos por Tipo

### Visitante
| Campo | Obrigatório | Formato |
|-------|---|---|
| Nome | ✅ | Mín 3 chars |
| Email | ✅ | válido@dominio.com |
| Idade | ✅ | 13-120 |
| País | ✅ | Dropdown |
| Palavra-passe | ✅ | Forte (8+) |
| Newsletter | ❌ | Checkbox |

### Parceiro
| Campo | Obrigatório | Formato |
|-------|---|---|
| Empresa | ✅ | Mín 3 chars |
| Responsável | ✅ | Mín 3 chars |
| Email | ✅ | empresa@dominio.com |
| Telefone | ✅ | +244 ... |
| Tamanho | ✅ | Dropdown |
| Sector | ✅ | Dropdown |
| Website | ❌ | URL válida |
| Palavra-passe | ✅ | Forte (8+) |
| Newsletter | ❌ | Checkbox |

---

## ✅ Requisitos de Palavra-passe

A palavra-passe deve ter:
- ✓ **Mínimo 8 caracteres**
- ✓ **Maiúscula** (A-Z)
- ✓ **Minúscula** (a-z)
- ✓ **Número** (0-9)
- ✓ **Especial** (!@#$%^&*)

Exemplo: `MyPass@123`

---

## 🎨 Experiência Visual

### Cartões de Seleção
- Hover: sobem 5px + sombra
- Clique: cor muda + border ativa
- Responsivo: 2 colunas (desktop) / 1 coluna (mobile)

### Formulários
- Aparecem com animação fadeInUp
- Botão "Voltar" no topo
- Validação em tempo real
- Requisitos de password animados

### Mensagens
- **Sucesso**: Ícone ✓, verde, conta criada
- **Erro**: Ícone ⚠️, vermelho, mensagem clara

---

## 🔍 Troubleshooting

### "Palavra-passe não válida"
**Solução**: Adicione maiúscula, minúscula, número e caractere especial

### "Palavras-passe não correspondem"
**Solução**: Confirme que digitou exatamente a mesma em ambos campos

### "Email inválido"
**Solução**: Use formato: nome@dominio.com

### "Não consigo voltar"
**Solução**: Clique no botão "← Voltar" no topo do formulário

---

## 💾 Onde os Dados são Salvos?

### Visitantes
- Local: `localStorage['simjsUsers']`
- Estrutura: Array de objetos
- Exemplo:
```json
{
  "type": "visitante",
  "fullName": "João Silva",
  "email": "joao@exemplo.com",
  "age": 28,
  "country": "PT",
  "newsletter": true
}
```

### Parceiros
- Local: `localStorage['simjsPartners']`
- Status: `"pending_review"` (aguardando análise)
- Exemplo:
```json
{
  "type": "parceiro",
  "companyName": "Acme Inc",
  "email": "joao@acme.com",
  "status": "pending_review"
}
```

---

## 🎯 Casos de Uso

### Cenário 1: Utilizador Quer Explorar Comunidade
```
1. Clica "Criar Conta"
2. Vê 2 cartões
3. Clica "Registar como Visitante"
4. Preenche: João, joao@email.com, 25, Portugal, MyPass@123
5. Aceita termos
6. Conta criada! → vai para comunidade.html
```

### Cenário 2: Empresa Quer Ser Parceira
```
1. Clica "Criar Conta"
2. Vê 2 cartões
3. Clica "Registar como Parceiro"
4. Preenche: 
   - Empresa: Empresa XYZ
   - Responsável: João Silva
   - Email: joao@xyz.com
   - Telefone: +244 923456789
   - Tamanho: Pequena
   - Sector: Tecnologia
5. Aceita termos de parceria
6. Conta criada! → vai para grupo.html
7. Solicitação em "pending_review"
```

---

## 🔄 Fluxo Completo Visual

```
┌─────────────────────────────────────┐
│ Página de Login                      │
├─────────────────────────────────────┤
│ [Entrar] [Criar Conta] ← TAB ATIVO  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Escolha o Tipo de Conta             │
├─────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐    │
│ │   VISITANTE │ │  PARCEIRO   │    │
│ │      👤     │ │      🤝     │    │
│ └─────────────┘ └─────────────┘    │
└─────────────────────────────────────┘
         ↓ clica em um
    ┌──────────────────┐
    │ VISITANTE:       │  ou  │ PARCEIRO:       │
    │ [← Voltar]       │      │ [← Voltar]      │
    │ Nome             │      │ Empresa         │
    │ Email            │      │ Responsável     │
    │ Idade            │      │ Email Comercial │
    │ País             │      │ Telefone        │
    │ Palavra-passe    │      │ Tamanho         │
    │ Confirmar        │      │ Sector          │
    │ [Criar]          │      │ Website         │
    │ ✓ Sucesso →      │      │ Palavra-passe   │
    │   comunidade.    │      │ Confirmar       │
    │   html           │      │ [Criar]         │
    │                  │      │ ✓ Sucesso →     │
    │                  │      │   grupo.html    │
    └──────────────────┘      └─────────────────┘
```

---

## 📱 Compatibilidade

| Dispositivo | Suporte | Notas |
|---|---|---|
| Desktop | ✅ | Experiência completa |
| Tablet | ✅ | Cartões lado-a-lado |
| Mobile | ✅ | Cartões empilhados |
| Navegadores | ✅ | Chrome, Firefox, Safari, Edge |

---

## 🎓 Para Developers

### Adicionar Novo Tipo de Conta

1. Abra `login.html`
2. Copie um `.type-card` e modifique:
```html
<div class="type-card" data-type="novo_tipo">
    <div class="type-icon">
        <i class="fas fa-icon"></i>
    </div>
    <h3>Novo Tipo</h3>
    <p>Descrição...</p>
    <ul class="type-benefits">
        <li><i class="fas fa-check"></i> Benefício 1</li>
    </ul>
    <button class="btn-auth btn-auth-primary select-type" data-type="novo_tipo">
        Registar
    </button>
</div>
```

3. Abra `js/login.js`
4. Adicione validação:
```javascript
validateNovoTipoForm(data) {
    // sua lógica
}

handleNovoTipoSubmit(e) {
    // sua lógica
}
```

### Acessar Dados Salvos

```javascript
// Visitantes
const users = JSON.parse(localStorage.getItem('simjsUsers') || '[]');

// Parceiros
const partners = JSON.parse(localStorage.getItem('simjsPartners') || '[]');

// Encontrar um parceiro específico
const partner = partners.find(p => p.email === 'joao@empresa.com');
```

---

## ⚠️ Limitações Atuais

- ❌ Dados salvos apenas em localStorage (não persistem após clear)
- ❌ Não valida email (apenas formato)
- ❌ Não valida telefone internacionalmente
- ❌ Password não é hash (apenas texto)
- ❌ Sem verificação de email

---

## 🔮 Melhorias Futuras

- ✅ Integração com backend
- ✅ Hash de password (bcrypt)
- ✅ Verificação de email
- ✅ Dashboard admin para parceiros
- ✅ Perfis de utilizador
- ✅ 2FA (autenticação dupla)

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Status**: ✅ Completo

*Perguntas? Consulte REGISTRO-TIPOS-CONTA.md para documentação completa.*
