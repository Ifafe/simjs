-- Seed script: Admin profile, sample content (page + post) and sample partner
-- IMPORTANT: Replace <ADMIN_UUID> with the actual id from auth.users (UUID)
-- Get a user id example: SELECT id, email FROM auth.users WHERE email = 'admin@simjs.com';
-- If you don't have an auth user yet, create one via Supabase Dashboard or Admin API, then run this script.

-- Note about RLS: If you have RLS enabled on profiles (recommended), you MUST run the INSERT
-- as the user themselves (session where auth.uid() = id) or use the Service Role key (run from server-side).

-- ====================
-- 1) INSERT ADMIN PROFILE (replace <ADMIN_UUID>)
-- ====================
INSERT INTO profiles (id, username, full_name, role, newsletter, is_active, created_at, updated_at)
VALUES (
  '<ADMIN_UUID>'::uuid, -- <-- REPLACE with auth.users.id for the admin user
  'admin',
  'Administrador SIMJS',
  'admin',
  true,
  true,
  NOW(),
  NOW()
);

-- ====================
-- 2) SAMPLE CONTENT: a page and a blog post authored by the admin
-- ====================
INSERT INTO content (id, type, title, slug, excerpt, body, author_id, status, tags, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'page', 'Página de Exemplo', 'pagina-exemplo', 'Página de exemplo criada pelo seed', 'Conteúdo de exemplo para a página inicial.', '<ADMIN_UUID>'::uuid, 'published', ARRAY['example','page'], NOW(), NOW()),
  (gen_random_uuid(), 'post', 'Notícia de Lançamento', 'noticia-lancamento', 'Exemplo de post', 'Este é um post de exemplo publicado pelo administrador.', '<ADMIN_UUID>'::uuid, 'published', ARRAY['news','announcement'], NOW(), NOW());

-- ====================
-- 3) SAMPLE PARTNER
-- ====================
INSERT INTO partners (id, profile_id, company_name, contact_name, email, phone, website, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  '<ADMIN_UUID>'::uuid,
  'SIMJS Exemplo Lda',
  'Responsavel Exemplo',
  'parceiro@example.com',
  '+244 922 000 000',
  'https://www.example-parceiro.com',
  'approved',
  NOW(),
  NOW()
);

-- ====================
-- Verification queries (run after the seed):
-- SELECT * FROM profiles WHERE id = '<ADMIN_UUID>'::uuid;
-- SELECT * FROM content ORDER BY created_at DESC LIMIT 10;
-- SELECT * FROM partners ORDER BY created_at DESC LIMIT 10;

-- ====================
-- Troubleshooting / Notes:
-- 1) If INSERT into profiles fails due to RLS, insert it in a server-side script using Service Role key
--    or first create the auth user (signUp) and then create the profile from that user's session.
-- 2) To create the auth user programmatically (service role) use Supabase Admin API or Dashboard.
-- 3) After running this script, test login/sign-in & access policies work as expected.
-- ====================
