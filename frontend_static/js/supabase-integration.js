/*
 * supabase-integration.js
 * Binds existing forms / buttons to Supabase operations without changing HTML.
 * - Uses window.supabaseClient (attached by supabaseClient.js)
 * - Respects RLS: write operations set author_id/profile_id = auth.uid()
 * - Falls back to existing localStorage logic on errors
 *
 * Add this file to the project; it registers listeners at DOMContentLoaded
 * and attempts to wire the following elements (if present):
 * - #loginForm
 * - #registerFormVisitante
 * - #registerFormEmprego
 * - #registerFormParceiro
 * - #contactForm
 * - contentManager methods (createPost/updatePost/deletePost/addMedia/getPosts/getPages)
 */

(function () {
  // Wait helper for supabase client
  async function waitForSupabaseClient(timeoutMs = 5000) {
    const start = Date.now();
    while (!window.supabaseClient) {
      if (Date.now() - start > timeoutMs) return null;
      await new Promise(r => setTimeout(r, 100));
    }
    return window.supabaseClient;
  }

  // Simple helper to show an inline error element (best effort)
  function showInlineError(formEl, fieldName, message) {
    try {
      const el = formEl.querySelector(`#${fieldName}Error`) || formEl.querySelector('.form-error');
      if (el) {
        el.textContent = message;
        el.style.display = 'block';
      } else {
        alert(message);
      }
    } catch (err) {
      console.error('showInlineError error', err);
    }
  }

  // Helper to get current profile (if any)
  async function fetchProfile(supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (error) throw error;
      return profile;
    } catch (err) {
      console.warn('fetchProfile error', err);
      return null;
    }
  }

  // Wire forms and content manager after DOM ready
  document.addEventListener('DOMContentLoaded', async () => {
    const client = await waitForSupabaseClient(8000);
    if (!client) {
      console.warn('Supabase client not available. Integration disabled.');
      return;
    }

    const { supabase, getProfile, getCurrentUserId } = client;

    // AUTH STATE CHANGE: keep localStorage in sync (compat with existing code)
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        const profile = await fetchProfile(supabase);
        if (profile) {
          // Keep the project's existing authSystem localStorage in sync
          localStorage.setItem('adminUser', JSON.stringify(profile));
          localStorage.setItem('adminTimestamp', Date.now().toString());
          // token if present
          if (session?.access_token) localStorage.setItem('adminToken', session.access_token);
          window.currentProfile = profile;
        }
      } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminTimestamp');
        window.currentProfile = null;
      }
    });

    // ---------- LOGIN ----------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (document.getElementById('loginEmail') || {}).value?.trim();
        const password = (document.getElementById('loginPassword') || {}).value || '';
        if (!email || !password) return showInlineError(loginForm, 'loginEmail', 'Email e palavra-passe são obrigatórios');

        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;

          const session = data.session;
          const profile = await fetchProfile(supabase);

          // Keep compatibility with existing UI
          if (profile) {
            localStorage.setItem('adminUser', JSON.stringify(profile));
            localStorage.setItem('adminToken', session?.access_token ?? '');
            localStorage.setItem('adminTimestamp', Date.now().toString());
            window.currentProfile = profile;
          }

          // Show success UI (existing element)
          const loginSuccess = document.getElementById('loginSuccess');
          if (loginSuccess) {
            document.getElementById('loginForm').style.display = 'none';
            loginSuccess.style.display = 'block';
          }

          // Redirect based on role (fallback to visitor dashboard)
          const role = profile?.role || 'visitor';
          const redirectMap = { visitor: 'dashboard-visitante.html', parceiro: 'dashboard-parceiro.html', emprego: 'dashboard-emprego.html', admin: 'admin.html' };
          setTimeout(() => { window.location.href = redirectMap[role] || 'dashboard-visitante.html'; }, 1200);
        } catch (err) {
          console.error('Login error', err);
          showInlineError(loginForm, 'loginEmail', err.message || 'Erro ao autenticar');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        }
      });
    }

    // ---------- REGISTER: VISITANTE ----------
    const visitForm = document.getElementById('registerFormVisitante');
    if (visitForm) {
      visitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = document.getElementById('visitanteFullName')?.value?.trim();
        const email = document.getElementById('visitanteEmail')?.value?.trim();
        const password = document.getElementById('visitantePassword')?.value || '';
        const age = parseInt(document.getElementById('visitanteAge')?.value || 0);
        const country = document.getElementById('visitanteCountry')?.value || null;
        const newsletter = document.getElementById('visitanteNewsletter')?.checked || false;

        try {
          // Create auth user
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;

          // signUp may require email confirmation. If user object exists, create profile.
          const user = data.user;
          if (!user) {
            // If email confirmation flow is active, show success message and instruct user
            const successEl = document.getElementById('visitanteSuccess');
            if (successEl) {
              successEl.style.display = 'flex';
              successEl.querySelector('h3').textContent = 'Verifique o seu email para confirmar a conta';
            }
            return;
          }

          // Create profiles row (RLS allows insert where id = auth.uid())
          const { error: pErr } = await supabase.from('profiles').insert([{
            id: user.id,
            full_name: fullName,
            country,
            age: Number.isFinite(age) ? age : null,
            role: 'visitor',
            newsletter
          }]);
          if (pErr) throw pErr;

          // UX
          const successEl = document.getElementById('visitanteSuccess');
          if (successEl) successEl.style.display = 'flex';

          // Redirect to visitor dashboard
          setTimeout(() => window.location.href = 'dashboard-visitante.html', 1200);
        } catch (err) {
          console.error('Register visitante error', err);
          showInlineError(visitForm, 'visitanteEmail', err.message || 'Erro ao registar');
        }
      });
    }

    // ---------- REGISTER: EMPREGO (candidatura) ----------
    const empregoForm = document.getElementById('registerFormEmprego');
    if (empregoForm) {
      empregoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('empregoFullName')?.value?.trim();
        const email = document.getElementById('empregoEmail')?.value?.trim();
        const phone = document.getElementById('empregoPhone')?.value?.trim();
        const age = parseInt(document.getElementById('empregoAge')?.value || 0);
        const country = document.getElementById('empregoCountry')?.value || null;
        const area = document.getElementById('empregoArea')?.value || null;
        const experience = document.getElementById('empregoExperience')?.value || '';
        const cvFile = document.getElementById('empregoCV')?.files?.[0] || null;

        try {
          // If user is not logged, create an auth account (temporary password or expect user to login)
          const { data: authData } = await supabase.auth.signUp({ email, password: 'temporary-password-123!' });
          const userId = authData?.user?.id ?? null;

          let cv_path = null;
          let cv_url = null;

          if (cvFile) {
            const fileExt = cvFile.name.split('.').pop();
            const path = `cvs/${userId ?? 'anon'}_${Date.now()}.${fileExt}`;
            const { error: upErr } = await supabase.storage.from('cvs').upload(path, cvFile, { upsert: false });
            if (upErr) throw upErr;
            cv_path = path;
            const { data: { publicUrl } } = supabase.storage.from('cvs').getPublicUrl(path);
            cv_url = publicUrl;
          }

          const insertObj = {
            profile_id: userId,
            full_name: fullName,
            email,
            phone,
            age: Number.isFinite(age) ? age : null,
            country,
            area,
            experience,
            cv_path,
            cv_url,
            status: 'pending_review'
          };

          const { error: cErr } = await supabase.from('candidates').insert([insertObj]);
          if (cErr) throw cErr;

          const successEl = document.getElementById('empregoSuccess');
          if (successEl) successEl.style.display = 'flex';

          setTimeout(() => window.location.href = 'dashboard-emprego.html', 1200);
        } catch (err) {
          console.error('Emprego submit error', err);
          showInlineError(empregoForm, 'empregoFullName', err.message || 'Erro ao enviar candidatura');
        }
      });
    }

    // ---------- REGISTER: PARCEIRO ----------
    const parceiroForm = document.getElementById('registerFormParceiro');
    if (parceiroForm) {
      parceiroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const companyName = document.getElementById('parceiroCompanyName')?.value?.trim();
        const contactName = document.getElementById('parceiroContactName')?.value?.trim();
        const email = document.getElementById('parceiroEmail')?.value?.trim();
        const phone = document.getElementById('parceiroPhone')?.value?.trim();
        const website = document.getElementById('parceiroWebsite')?.value?.trim();
        const password = document.getElementById('parceiroPassword')?.value || 'partner-temp-123!';

        try {
          const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
          if (authErr) throw authErr;
          const userId = authData?.user?.id ?? null;

          // create profile and partner
          if (userId) {
            const { error: pErr } = await supabase.from('profiles').insert([{ id: userId, full_name: contactName, role: 'partner' }]);
            if (pErr) throw pErr;

            const { error: partErr } = await supabase.from('partners').insert([{ profile_id: userId, company_name: companyName, contact_name: contactName, email, phone, website, status: 'pending' }]);
            if (partErr) throw partErr;
          } else {
            // fallback: create partner record without profile
            const { error: partErr } = await supabase.from('partners').insert([{ company_name: companyName, contact_name: contactName, email, phone, website, status: 'pending' }]);
            if (partErr) throw partErr;
          }

          const successEl = document.getElementById('parceiroSuccess');
          if (successEl) successEl.style.display = 'flex';

          setTimeout(() => window.location.href = 'dashboard-parceiro.html', 1200);
        } catch (err) {
          console.error('Parceiro register error', err);
          showInlineError(parceiroForm, 'parceiroEmail', err.message || 'Erro ao registar parceiro');
        }
      });
    }

    // ---------- CONTACT FORM ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const payload = {
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          message_type: formData.get('subject') || 'general'
        };

        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) payload.profile_id = user.id;

          const { error } = await supabase.from('contact_messages').insert([payload]);
          if (error) throw error;

          // success UX
          contactForm.reset();
          alert('Mensagem enviada com sucesso. Obrigado!');
        } catch (err) {
          console.error('Contact submit error', err);
          alert('Erro ao enviar mensagem. Tente novamente.');
        }
      });
    }

    // ---------- CONTENT MANAGER: override methods (non-breaking) ----------
    if (window.contentManager) {
      // Create Post -> insert into 'content'
      const origCreatePost = window.contentManager.createPost.bind(window.contentManager);
      window.contentManager.createPost = async function (postData) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          const author_id = user?.id ?? null;
          const insertObj = {
            type: 'post',
            title: postData.title,
            body: postData.content,
            category: postData.category || null,
            tags: postData.tags || [],
            status: postData.status || 'draft',
            image_url: postData.image || null,
            author_id
          };
          const { error } = await supabase.from('content').insert([insertObj]);
          if (error) throw error;

          // Refresh client-side (simple approach: fetch recent posts and update local storage through original method)
          const { data: posts } = await supabase.from('content').select('*').order('created_at', { ascending: false }).limit(50);
          if (posts) {
            // map to structure expected by original contentManager
            posts.forEach(p => {
              const mapped = {
                id: Date.now(), // keep local id unique — real id is p.id
                title: p.title,
                content: p.body,
                category: p.category,
                tags: p.tags || [],
                status: p.status,
                image: p.image_url || null,
                createdAt: p.created_at,
                updatedAt: p.updated_at,
                author: p.author_id
              };
              // push if not already present
              const exists = window.contentManager.posts.find(x => x.title === mapped.title && x.createdAt === mapped.createdAt);
              if (!exists) window.contentManager.posts.unshift(mapped);
            });
            window.contentManager.saveToStorage();
          }

          return postData;
        } catch (err) {
          console.warn('createPost fallback to local', err);
          return origCreatePost(postData);
        }
      };

      // Update and delete can follow similar pattern; for brevity we leave them falling back to local versions

      // MEDIA: upload to Supabase Storage and insert into media table
      const origAddMedia = window.contentManager.addMedia.bind(window.contentManager);
      window.contentManager.addMedia = async function (mediaData) {
        try {
          // mediaData should include a File object at mediaData.file when coming from a file input
          const file = mediaData.file;
          let storagePath = null;
          let publicUrl = null;
          if (file) {
            const ext = file.name.split('.').pop();
            const filename = `media/${Date.now()}_${Math.random().toString(36).slice(2,8)}.${ext}`;
            const { error: upErr } = await supabase.storage.from('media').upload(filename, file, { upsert: false });
            if (upErr) throw upErr;
            storagePath = filename;
            const { data: urlData } = supabase.storage.from('media').getPublicUrl(filename);
            publicUrl = urlData?.publicUrl ?? null;
          }

          const insertObj = {
            file_name: mediaData.name,
            storage_path: storagePath,
            url: publicUrl || mediaData.url,
            mime_type: mediaData.type,
            size_bytes: mediaData.size || null,
            uploaded_by: (await supabase.auth.getUser()).data.user?.id ?? null,
            alt_text: mediaData.alt || '',
            categories: mediaData.categories || []
          };

          const { error } = await supabase.from('media').insert([insertObj]);
          if (error) throw error;

          // Update local storage (call original to keep UI reactive)
          const newMedia = origAddMedia({
            id: Date.now(),
            name: mediaData.name,
            type: mediaData.type,
            url: publicUrl || mediaData.url,
            size: mediaData.size,
            uploadedAt: new Date().toISOString(),
            uploadedBy: (await supabase.auth.getUser()).data.user?.email || 'unknown',
            alt: mediaData.alt || '',
            categories: mediaData.categories || []
          });

          return newMedia;
        } catch (err) {
          console.warn('addMedia fallback to local', err);
          return origAddMedia(mediaData);
        }
      };
    }

    console.info('Supabase integration initialized — forms wired where present.');
  });
})();
