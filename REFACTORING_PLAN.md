# Plano de Refatoração e Expansão: SIMJS v1 Multi-Role CMS

Este plano detalha a transformação do projeto SIMJS v1 de um site institucional simples para um sistema de gestão multi-nível com interfaces premium e segurança baseada em funções (RBAC).

## 1. Visão Geral das Funções (Roles)

| Função | Descrição | Acessos |
| :--- | :--- | :--- |
| **Manager (Admin)** | Administrador do site | Controle total: CMS, usuários, configurações globais. |
| **Partner (Parceiro)** | Empresas/Indivíduos parceiros | Dashboard de parcerias, status de projetos, suporte. |
| **Job Seeker (Emprego)** | Candidatos a vagas | Dashboard de candidaturas, perfil profissional, vagas salvas. |
| **Visitor (Visitante)** | Usuário comum registado | Feed de notícias personalizado, eventos, fórum/comunidade. |

---

## 2. Arquitetura de Dados (Prisma Schema)

### Alterações no Modelo `User`

* Adicionar campo `role` como Enum: `ADMIN`, `PARTNER`, `VISITOR`, `JOB_SEEKER`.
* Adicionar relações para modelos específicos.

### Novos Modelos

* `PartnerProfile`: Dados da empresa, setor, documentos.
* `JobOpening`: Vagas disponíveis (postadas pelo Admin).
* `Application`: Candidaturas enviadas pelos Job Seekers.
* `CommunityPost`: Posts ou interações para o dashboard de Visitante.

---

## 3. Backend & Segurança (Express)

### Middleware de Autenticação (RBAC)

* Implementar `checkRole(['ADMIN', 'PARTNER'])` para proteger rotas específicas.
* Substituir "mock tokens" por JWT reais para maior segurança.

### Novos Endpoints API

* `/api/partner/*`: Gestão de dados de parceiros.
* `/api/jobs/*`: Listagem e candidatura a vagas.
* `/api/visitor/activity`: Feed de atividades.

---

## 4. Frontend & UI/UX (Next.js)

### Design System Premium

* Refatorar `globals.css` para um design "Glassmorphism" / Moderno.
* Paleta de cores: `#CC0000` (Vermelho SIMJS), tons de cinza profundos, gradientes suaves.
* Tipografia: Inter & Space Grotesk (como visto no protótipo).

### Estrutura de Rotas (Dashboards)

* `src/app/admin/`: Painel do Gerente (Refatorado).
* `src/app/partner/`: Painel do Parceiro (Novo).
* `src/app/visitor/`: Painel do Visitante (Novo - baseado no `dashboard-visitante.html`).
* `src/app/jobs/`: Painel de Emprego (Novo).

### Componentes Reutilizáveis

* `SideNav`: Menu lateral dinâmico que muda conforme o `role`.
* `StatCard`: Cartões de estatísticas consistentes.
* `DataTable`: Para listagens em todos os dashboards.

---

## 5. Cronograma de Implementação

1. **Semana 1: Infraestrutura**
    * Atualizar Schema Prisma e migrar base de dados.
    * Implementar JWT e Middleware de Roles no backend.
2. **Semana 2: UI & Dashboard Visitante**
    * Implementar novo Design System.
    * Converter `dashboard-visitante.html` para componente Next.js.
3. **Semana 3: Parceiros & Emprego**
    * Criar dashboards de Parceiro e Job Seeker.
    * Conectar APIs de candidaturas e perfis.
4. **Semana 4: Admin & Polimento**
    * Refatorar o Admin para incluir gestão de vagas e parceiros.
    * Testes de segurança e otimização de performance.
