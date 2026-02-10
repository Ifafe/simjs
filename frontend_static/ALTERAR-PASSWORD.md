# 🔐 Alterar Palavra-passe no Painel Administrativo

## ✅ Funcionalidade Adicionada

Agora pode **alterar a sua palavra-passe** diretamente no painel administrativo!

---

## 📍 Como Acessar

### Passo 1: Entrar no Painel
```
URL: admin.html
Utilizador: admin
Palavra-passe: 12345678
```

### Passo 2: Ir para Configurações
```
Menu Esquerdo (Sidebar)
↓
Configurações
↓
Clique em "Alterar Senha" (botão roxo)
```

---

## 🔄 Como Alterar a Palavra-passe

### Campo 1: Palavra-passe Atual
- Introduza a sua palavra-passe **atual** (exemplo: 12345678)
- Sistema verifica se está correta

### Campo 2: Nova Palavra-passe
- **Requisitos:**
  - ✅ Mínimo 8 caracteres
  - ✅ Deve conter letras (a-z, A-Z)
  - ✅ Deve conter números (0-9)
  
- **Exemplos válidos:**
  - `NovaPass123`
  - `Segura2026`
  - `Admin@2026`

### Campo 3: Confirmar Palavra-passe
- Repita a **nova palavra-passe**
- Deve ser **exatamente igual** ao Campo 2

### Passo Final
- Clique em **"Atualizar Palavra-passe"** (botão azul)
- Verá mensagem ✅ de sucesso
- Palavra-passe foi atualizada!

---

## 📋 Validações Aplicadas

| Validação | Erro | Solução |
|-----------|------|--------|
| Palavra-passe atual vazia | "A palavra-passe atual é obrigatória" | Preencha o campo |
| Palavra-passe atual incorreta | "A palavra-passe atual está incorreta" | Verifique e tente novamente |
| Nova palavra-passe < 8 caracteres | "A palavra-passe deve ter pelo menos 8 caracteres" | Use mais caracteres |
| Sem letras E números | "A palavra-passe deve conter letras e números" | Adicione letras e números |
| Confirmação diferente | "As palavras-passe não coincidem" | Certifique-se que são iguais |

---

## 🎯 Exemplo Prático

### ❌ NÃO FUNCIONA:
```
Atual: 12345678
Nova: abc123       ← Menos de 8 caracteres
Confirmação: abc123
Resultado: ❌ ERRO - "A palavra-passe deve ter pelo menos 8 caracteres"
```

### ✅ FUNCIONA:
```
Atual: 12345678
Nova: NovaPassword123
Confirmação: NovaPassword123
Resultado: ✅ SUCESSO - "Palavra-passe atualizada com sucesso!"
```

---

## 💾 O Que Acontece Após Alterar

1. ✅ Sistema valida todos os campos
2. ✅ Verifica se palavra-passe atual está correta
3. ✅ Armazena a nova palavra-passe (encriptada)
4. ✅ Mostra mensagem de sucesso
5. ✅ Modal fecha automaticamente
6. ✅ **Próximo login usará a NOVA palavra-passe**

---

## 🔐 Segurança

- ✅ Palavra-passe nunca é mostrada em texto plano
- ✅ Campos de senha usam `type="password"`
- ✅ Validação de força da palavra-passe
- ✅ Confirmação requerida
- ✅ Dados armazenados encriptados no localStorage

---

## ⚠️ Atenção

### Depois de Alterar:

1. **Guarde a nova palavra-passe** num local seguro
2. **Na próxima vez que fizer login**, use a **NOVA palavra-passe**
3. Se esqueceu a nova palavra-passe:
   - Abra Browser DevTools (F12)
   - Console → `localStorage.clear()`
   - Refresque a página
   - Use credenciais demo: `admin / 12345678`

---

## 🆘 Problemas?

### Modal não abre
- Certifique-se que está autenticado
- Tente F5 (refresque a página)
- Verifique o console (F12) para erros

### Não consegue alterar
- Verifique a palavra-passe atual
- Certifique-se que a nova tem 8+ caracteres
- Confirme que nova e confirmação são iguais

### Esqueceu a nova palavra-passe
- Use as credenciais demo para resetar:
  ```
  Utilizador: admin
  Palavra-passe: 12345678
  ```

---

## 📊 Resumo

| Item | Status |
|------|--------|
| Funcionalidade | ✅ Implementada |
| Design | ✅ Profissional |
| Validação | ✅ Completa |
| Segurança | ✅ Básica |
| Mobile | ✅ Responsivo |
| Dark Mode | ✅ Suportado |

---

**Versão:** 1.0.0  
**Data:** 23 Janeiro 2026  
**Status:** ✅ PRONTO PARA USAR
