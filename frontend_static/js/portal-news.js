/* portal-news.js — preencher placeholders semânticos, ticker acessível, pobot */
(function(){
  // Dados (para demo) — pode ser substituído por fetch
  const articles = [
    { id:1, title:'IA Generativa acelera inovação em aplicações empresariais', category:'Tecnologia', author:'M. Silva', time:'3 min', date:'2026-01-15', source:'Reuters', url:'#', thumb:'assets/Novo1.jpg' },
    { id:2, title:'Parcerias renováveis transformam matriz energética', category:'Energia', author:'A. Costa', time:'4 min', date:'2026-01-18', source:'BBC', url:'#', thumb:'assets/novo4.jpg' },
    { id:3, title:'Automação industrial reduz custos operacionais', category:'Indústria', author:'J. Almeida', time:'5 min', date:'2026-01-12', source:'CNBC', url:'#', thumb:'assets/pexels-lucaspezeta-5242049.jpg' },
    { id:4, title:'Telemedicina amplia acesso em áreas remotas', category:'Saúde', author:'D. Pereira', time:'2 min', date:'2026-01-20', source:'WHO', url:'#', thumb:'assets/pexels-august-de-richelieu-4427627.jpg' },
    { id:5, title:'Mercados emergentes captam capital estrangeiro', category:'Finanças', author:'L. Gomes', time:'3 min', date:'2026-01-11', source:'IMF', url:'#', thumb:'assets/pexels-kindelmedia-6868618.jpg' },
    { id:6, title:'Soluções de última milha com eficiência sustentável', category:'Logística', author:'R. Faria', time:'3 min', date:'2026-01-09', source:'Transport Topics', url:'#', thumb:'assets/novo1.jpg' },
    { id:7, title:'Iniciativas para hidrogénio verde avançam', category:'Energia', author:'A. Costa', time:'4 min', date:'2026-01-05', source:'Financial Times', url:'#', thumb:'assets/Novo%203.jpg' },
    { id:8, title:'Digital twins melhoram planeamento de cadeias', category:'Logística', author:'R. Faria', time:'6 min', date:'2025-12-28', source:'MIT Technology Review', url:'#', thumb:'assets/novo4.jpg' }
  ];

  const breaking = [
    'URGENTE: Cimeira Internacional aprova novo pacote de energia sustentável',
    'Exclusivo: Parcerias tecnológicas aceleram projetos locais',
    'Ações do setor tecnológico sobem após anúncios de investimento',
    'Estudo revela redução de emissões com rotas otimizadas'
  ];

  // Util helpers
  function el(id){ return document.getElementById(id); }
  function createEl(tag, props={}, children=[]){ const e = document.createElement(tag); Object.assign(e, props); children.forEach(c => e.appendChild(c)); return e; }

  // Fetch feed with fallback
  async function fetchFeed(url){
    try{
      const res = await fetch(url, {cache: 'no-cache'});
      if(!res.ok) throw new Error('Fetch failed');
      const json = await res.json();
      if(Array.isArray(json) && json.length) return json;
    }catch(e){ console.warn('Feed fetch erro:', e); }
    return [];
  }

  // Lazy-loading helper using IntersectionObserver
  function observeLazyImages(){
    const imgs = document.querySelectorAll('img.lazy-img');
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(ent => {
          if(ent.isIntersecting){
            const img = ent.target;
            if(img.dataset.src) img.src = img.dataset.src;
            if(img.dataset.srcset) img.srcset = img.dataset.srcset;
            img.classList.remove('lazy-img');
            obs.unobserve(img);
          }
        });
      }, {rootMargin: '100px'});
      imgs.forEach(img => io.observe(img));
    } else {
      imgs.forEach(img => { if(img.dataset.src) img.src = img.dataset.src; if(img.dataset.srcset) img.srcset = img.dataset.srcset; img.classList.remove('lazy-img'); });
    }
  }

  // Helpers for responsive vars and debounce
  function debounce(fn, wait=150){ let t; return function(...args){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), wait); }; }
  function setResponsiveVars(){
    const w = window.innerWidth;
    let mainH = '420px';
    if(w > 1400) mainH = '480px';
    else if(w > 1000) mainH = '420px';
    else if(w > 700) mainH = '340px';
    else mainH = '220px';
    document.documentElement.style.setProperty('--main-image-h', mainH);

    const durationSecs = Math.max(12, breaking.length * 6);
    document.documentElement.style.setProperty('--ticker-duration', durationSecs + 's');
  }

  // Apply visual view (default | compact | high-contrast)
  function applyView(view){
    const container = el('portalGrid');
    if(!container) return;
    container.classList.remove('compact','high-contrast');
    if(view === 'compact') container.classList.add('compact');
    if(view === 'high-contrast') container.classList.add('high-contrast');
    localStorage.setItem('newsView', view);
    updateToggleButtons(view);
  }
  function updateToggleButtons(view){
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      const is = btn.dataset.view === view;
      btn.classList.toggle('active', is);
      btn.setAttribute('aria-pressed', is ? 'true' : 'false');
    });
  }

  // Short helper to produce lazy image markup
  function lazyImgHtml(src, alt, cls=''){ return `<img class="${cls} lazy-img" data-src="${src}" data-srcset="${src} 600w" alt="${alt}" loading="lazy">`; }

  // Populate functions (using lazy images)
  function populateTicker(){
    const track = document.querySelector('.ticker-track');
    if(!track) return;
    track.innerHTML = '';
    const items = breaking.concat(breaking);
    items.forEach(txt => {
      const span = document.createElement('span');
      span.className = 'ticker-item';
      span.textContent = txt;
      track.appendChild(span);
    });

    // Update aria-live node periodically
    const live = el('breakingLive');
    if(live){
      let idx = 0; live.textContent = breaking[0];
      setInterval(() => { idx = (idx + 1) % breaking.length; live.textContent = breaking[idx]; }, 5000);
    }
  }

  function populateEditors(items){
    const list = el('editList'); if(!list) return; list.innerHTML = '';
    items.forEach(it => {
      const li = document.createElement('li'); li.className = 'edit-item';
      li.innerHTML = `
        <a href="${it.url}" class="edit-link">
          ${lazyImgHtml(it.thumb, it.title, 'edit-thumb')}
          <div class="edit-meta">
            <h4 class="edit-title">${it.title}</h4>
            <div class="edit-sub">${it.category} • ${it.time}</div>
          </div>
        </a>`;
      list.appendChild(li);
    });
  }

  function populateMain(item){
    const container = el('mainCardContainer'); if(!container) return;
    container.innerHTML = `
      <div class="main-card">
        <a href="${item.url}" class="main-link">
          <div class="main-image">${lazyImgHtml(item.thumb, item.title, '')}</div>
          <div class="main-content">
            <div class="cat">${item.category}</div>
            <h2 class="main-title">${item.title}</h2>
            <div class="meta">${item.author} • ${item.time}</div>
          </div>
        </a>
      </div>`;
  }

  function populateTrending(items){
    const ol = el('trendList'); if(!ol) return; ol.innerHTML = '';
    items.forEach((it, idx) => {
      const li = document.createElement('li'); li.className = 'trend-item';
      li.innerHTML = `
        <a href="${it.url}" class="trend-link">
          <span class="trend-num">${idx+1}</span>
          ${lazyImgHtml(it.thumb, it.title, 'trend-thumb')}
          <div class="trend-body">
            <div class="trend-title">${it.title}</div>
            <div class="trend-sub">${it.time}</div>
          </div>
        </a>`;
      ol.appendChild(li);
    });
  }

  function populateFeatured(items){
    const grid = el('fpGrid'); if(!grid) return; grid.innerHTML = '';
    items.slice(0,4).forEach(it => {
      const a = document.createElement('a'); a.className = 'fp-card'; a.href = it.url;
      a.innerHTML = `
        <div class="fp-thumb">${lazyImgHtml(it.thumb, it.title)}</div>
        <div class="fp-body">
          <div class="fp-cat">${it.category}</div>
          <h4 class="fp-title">${it.title}</h4>
          <div class="fp-meta">${it.time} • ${it.author}</div>
        </div>`;
      grid.appendChild(a);
    });
  }

  function populateExpress(items){
    const g1 = el('epGrid1'); const g2 = el('epGrid2'); if(!g1||!g2) return; g1.innerHTML=''; g2.innerHTML='';
    items.slice(0,6).forEach((it, idx) => {
      const a = document.createElement('a'); a.className='ep-card'; a.href=it.url;
      a.innerHTML = `${lazyImgHtml(it.thumb,it.title)}<div class="ep-info"><div class="ep-title">${it.title}</div><div class="ep-meta">${it.time}</div></div>`;
      if(idx%2===0) g1.appendChild(a); else g2.appendChild(a);
    });
  }

  // Init: fetch feed (if any), populate and add toggles/listeners
  async function init(){
    const container = el('portalGrid'); if(!container) return;
    const feedUrl = container.dataset.feed;

    // attempt fetch feed (fallback to local articles)
    let dataset = articles;
    if(feedUrl){ const fetched = await fetchFeed(feedUrl); if(fetched && fetched.length) dataset = fetched; }

    // responsive css vars
    setResponsiveVars(); window.addEventListener('resize', debounce(setResponsiveVars,150));

    // populate
    populateTicker();
    populateEditors(dataset.slice(1,4));
    populateMain(dataset[0]);
    populateTrending(dataset.slice(4,8));
    populateFeatured(dataset);
    populateExpress(dataset);

    // lazyload images
    observeLazyImages();

    // enable 3D tilt, reveal on scroll and parallax layers
    initCard3DEffects();

    // toggles
    const saved = localStorage.getItem('newsView') || 'default'; applyView(saved);
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.addEventListener('click', ()=> applyView(btn.dataset.view)));

    // keyboard focus visible helper
    document.addEventListener('keydown', (e) => { if(e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing'); });
  }

  // 3D interactions: tilt, reveal and parallax
  function initCard3DEffects(){
    const container = document.querySelector('.news-portal') || document.body;
    const cardSelector = '.fp-card, .ep-card, .edit-link, .trend-link, .main-card';
    const maxTilt = 7; // degrees
    let raf = null; let currentCard = null;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resetCard(c){ if(!c) return; c.style.removeProperty('--tilt-x'); c.style.removeProperty('--tilt-y'); c.classList.remove('is-tilting'); const m = c.querySelector('.fp-thumb img, .media-wrap img, .ep-card img'); if(m) m.style.transform = ''; const b = c.querySelector('.fp-body, .ep-info'); if(b) b.style.transform = ''; }

    if(!reduceMotion){
      container.addEventListener('pointermove', (e) => {
        const c = e.target.closest(cardSelector);
        if(!c){ if(currentCard){ resetCard(currentCard); currentCard=null; } return; }
        currentCard = c;
        if(raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const rect = c.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) - 0.5;
          const py = ((e.clientY - rect.top) / rect.height) - 0.5;
          const tiltX = (-py * maxTilt).toFixed(2) + 'deg';
          const tiltY = (px * maxTilt).toFixed(2) + 'deg';
          c.style.setProperty('--tilt-x', tiltX);
          c.style.setProperty('--tilt-y', tiltY);
          c.classList.add('is-tilting');
          const media = c.querySelector('.fp-thumb img, .media-wrap img, .ep-card img');
          const body = c.querySelector('.fp-body, .ep-info');
          if(media){ media.style.transform = `translateZ(${8 + Math.abs(px*10)}px) translateX(${(px*6).toFixed(2)}px) translateY(${(py*4).toFixed(2)}px) scale(1.03)`; }
          if(body){ body.style.transform = `translateZ(6px) translateX(${(px*3).toFixed(2)}px) translateY(${(py*2).toFixed(2)}px)`; }
        });
      }, { passive: true });

      container.addEventListener('pointerleave', () => { if(currentCard){ resetCard(currentCard); currentCard=null; } });
    }

    // reveal on scroll
    const obs = new IntersectionObserver((entries) => { entries.forEach(ent => { if(ent.isIntersecting){ ent.target.classList.add('in-view'); obs.unobserve(ent.target); } }); }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll(cardSelector).forEach(el => { el.classList.add('card-reveal'); obs.observe(el); });

    const mo = new MutationObserver(muts => { muts.forEach(m => { m.addedNodes.forEach(node => { if(node.nodeType!==1) return; if(node.matches && node.matches(cardSelector)){ node.classList.add('card-reveal'); obs.observe(node); } if(node.querySelectorAll){ node.querySelectorAll(cardSelector).forEach(n => { n.classList.add('card-reveal'); obs.observe(n); }); } }); }); });
    mo.observe(container, { childList:true, subtree:true });

    window.addEventListener('beforeunload', () => { try{ if(mo) mo.disconnect(); }catch(e){} try{ if(obs) obs.disconnect(); }catch(e){} }, { once: true });
  }


  document.addEventListener('DOMContentLoaded', init);
})();
