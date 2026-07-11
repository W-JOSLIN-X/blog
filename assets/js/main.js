;(function(){
  'use strict';

  /* ---- Dark Mode ---- */
  function darkInit() {
    var saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var icon = btn.querySelector('.theme-toggle__icon');
    if (icon) icon.textContent = saved === 'dark' ? '\u2600' : '\u263E';
    btn.addEventListener('click', function() {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (icon) icon.textContent = next === 'dark' ? '\u2600' : '\u263E';
    });
  }

  /* ---- Progress Bar ---- */
  function progressInit() {
    var bar = document.getElementById('progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', function() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) { bar.style.width = '0%'; return; }
      bar.style.width = (window.scrollY / h * 100) + '%';
    });
  }

  /* ---- TOC Builder ---- */
  function tocInit() {
    var container = document.getElementById('toc');
    if (!container) return;
    var body = document.querySelector('.article__body');
    if (!body) { container.style.display = 'none'; return; }
    var headings = body.querySelectorAll('h2,h3');
    if (headings.length < 2) { container.style.display = 'none'; return; }

    var title = document.createElement('div');
    title.className = 'toc__title';
    title.textContent = '\u76ee\u5f55';
    container.appendChild(title);

    var links = [];
    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      var id = h.id || ('h-' + i);
      if (!h.id) h.id = id;
      var a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = h.textContent;
      if (h.tagName === 'H3') a.className = 'toc-h3';
      container.appendChild(a);
      links.push(a);
    }

    /* scroll spy */
    var observer = new IntersectionObserver(function(entries) {
      var activeId = null;
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) { activeId = entries[j].target.id; break; }
      }
      if (!activeId) {
        var firstVisible = null;
        for (var k = 0; k < headings.length; k++) {
          var r = headings[k].getBoundingClientRect();
          if (r.top >= 0 && r.top < window.innerHeight / 3) { activeId = headings[k].id; break; }
          if (!firstVisible && r.bottom > 0) firstVisible = headings[k].id;
        }
        if (!activeId) activeId = firstVisible;
      }
      for (var m = 0; m < links.length; m++) {
        links[m].classList[links[m].getAttribute('href') === '#' + activeId ? 'add' : 'remove']('is-active');
      }
    }, { rootMargin: '-10% 0px -70% 0px' });

    for (var n = 0; n < headings.length; n++) observer.observe(headings[n]);
  }

  /* ---- Code Copy ---- */
  function codeCopyInit() {
    var pres = document.querySelectorAll('.article__body pre');
    for (var i = 0; i < pres.length; i++) {
      (function(pre) {
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '\u590d\u5236';
        pre.appendChild(btn);
        btn.addEventListener('click', function() {
          var code = pre.querySelector('code');
          var text = code ? code.textContent : pre.textContent;
          var ok = false;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            ok = true;
          } else {
            var ta = document.createElement('textarea');
            ta.value = text; ta.style.cssText = 'position:fixed;left:-9999px';
            document.body.appendChild(ta); ta.select();
            ok = document.execCommand('copy');
            document.body.removeChild(ta);
          }
          if (ok) {
            btn.textContent = '\u2714 \u5df2\u590d\u5236';
            btn.classList.add('copied');
            setTimeout(function() { btn.textContent = '\u590d\u5236'; btn.classList.remove('copied'); }, 2000);
          }
        });
      })(pres[i]);
    }
  }

  /* ---- Search ---- */
  function searchInit() {
    var input = document.getElementById('search-input');
    if (!input) return;
    var items = document.querySelectorAll('.entry[data-search]');
    input.addEventListener('input', function() {
      var q = input.value.trim().toLowerCase();
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        if (!q || (el.getAttribute('data-search') || '').indexOf(q) !== -1) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      }
    });
  }

  /* ---- Gallery Filter ---- */
  function filterInit() {
    var btns = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.gallery__item[data-category]');
    if (!btns.length || !items.length) return;

    function apply(filter) {
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList[btns[i].getAttribute('data-filter') === filter ? 'add' : 'remove']('is-active');
      }
      for (var j = 0; j < items.length; j++) {
        var el = items[j];
        if (filter === 'all' || el.getAttribute('data-category') === filter) {
          el.style.display = ''; el.style.opacity = '1';
        } else {
          el.style.opacity = '0';
          setTimeout(function(e) { e.style.display = 'none'; }.bind(null, el), 250);
        }
      }
    }

    for (var k = 0; k < btns.length; k++) {
      btns[k].addEventListener('click', function() { apply(this.getAttribute('data-filter')); });
    }
  }

  /* ---- Lightbox ---- */
  function lightboxInit() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var close = document.getElementById('lightbox-close');
    var img = document.getElementById('lightbox-img');
    var caption = document.getElementById('lightbox-caption');

    var cards = document.querySelectorAll('.gallery__item');
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function() {
        var src = this.querySelector('img');
        var title = this.getAttribute('data-title') || '';
        var desc = this.getAttribute('data-desc') || '';
        if (caption) caption.textContent = title + (desc ? ' \u2014 ' + desc : '');
        if (img && src && src.src) { img.src = src.src; }
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }
    function shut() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
    if (close) close.addEventListener('click', shut);
    lb.addEventListener('click', function(e) { if (e.target === lb) shut(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') shut(); });
  }

  /* ---- Like Particles ---- */
  function likesInit() {
    var btns = document.querySelectorAll('.fragment__like');
    var key = 'bl_likes';

    var data = {};
    try { data = JSON.parse(localStorage.getItem(key)) || {}; } catch(e) {}

    for (var i = 0; i < btns.length; i++) {
      (function(btn) {
        var id = btn.getAttribute('data-id');
        var countEl = btn.querySelector('.fragment__like-count');
        if (!id || !countEl) return;

        var saved = data[id];
        if (saved) { countEl.textContent = saved.count || 0; if (saved.liked) btn.classList.add('is-liked'); }

        btn.addEventListener('click', function(e) {
          var count = parseInt(countEl.textContent) || 0;
          var liked = btn.classList.contains('is-liked');
          if (liked) {
            btn.classList.remove('is-liked');
            count = Math.max(0, count - 1);
            data[id] = { count: count, liked: false };
          } else {
            btn.classList.add('is-liked');
            count += 1;
            data[id] = { count: count, liked: true };
            spawnParticles(btn);
          }
          countEl.textContent = count;
          try { localStorage.setItem(key, JSON.stringify(data)); } catch(e) {}
        });
      })(btns[i]);
    }

    function spawnParticles(btn) {
      var rect = btn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top;
      for (var j = 0; j < 8; j++) {
        var p = document.createElement('span');
        p.textContent = '\u2764';
        p.className = 'like-particle';
        var angle = (Math.PI * 2 * j) / 8 + (Math.random() - 0.5) * 0.5;
        var dist = 24 + Math.random() * 24;
        p.style.setProperty('--lx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ly', Math.sin(angle) * dist - 20 - Math.random() * 20 + 'px');
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.position = 'fixed';
        p.style.zIndex = '999';
        document.body.appendChild(p);
        setTimeout(function(el) { if (el.parentNode) el.parentNode.removeChild(el); }.bind(null, p), 750);
      }
    }
  }

  /* ---- Meters ---- */
  function metersInit() {
    var fills = document.querySelectorAll('.meter__fill');
    if (!fills.length) return;
    var done = false;
    var section = document.querySelector('.about-grid');
    function run() {
      if (done || !section) return;
      var r = section.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        done = true;
        for (var i = 0; i < fills.length; i++) {
          setTimeout(function(el) { el.style.width = el.getAttribute('data-width'); }.bind(null, fills[i]), i * 140);
        }
      }
    }
    setTimeout(run, 300);
    window.addEventListener('scroll', run);
  }

  /* ---- Reveal ---- */
  function revealInit() {
    if (!('IntersectionObserver' in window)) {
      var els = document.querySelectorAll('.reveal');
      for (var i = 0; i < els.length; i++) els[i].classList.add('is-visible');
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          var el = entries[i].target;
          var siblings = el.parentNode ? el.parentNode.children : [];
          var idx = Array.prototype.indexOf.call(siblings, el);
          el.style.transitionDelay = (idx * 50) + 'ms';
          obs.unobserve(el);
          requestAnimationFrame(function(e) { e.classList.add('is-visible'); }.bind(null, el));
        }
      }
    }, { threshold: 0.05 });
    var items = document.querySelectorAll('.reveal');
    for (var j = 0; j < items.length; j++) obs.observe(items[j]);
  }

  /* ---- Back to Top ---- */
  function backTopInit() {
    var btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      btn.classList[window.scrollY > 400 ? 'add' : 'remove']('is-visible');
    });
    btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---- Nav Active ---- */
  function navInit() {
    var links = document.querySelectorAll('.sidebar__nav a');
    var path = window.location.pathname;
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href === path || (href === '/' && path === '/')) { links[i].classList.add('is-active'); }
      else if (path !== '/' && href !== '/' && path.indexOf(href) === 0) { links[i].classList.add('is-active'); }
    }
  }

  /* ---- Toast ---- */
  window.showToast = function(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 300); }, 1800);
  };

  window.copyText = function(text) {
    if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function() { showToast('\u5df2\u590d\u5236\uff1a' + text); }); }
    else {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      showToast('\u5df2\u590d\u5236\uff1a' + text);
    }
  };

  /* ---- Boot ---- */
  document.addEventListener('DOMContentLoaded', function() {
    darkInit();
    progressInit();
    tocInit();
    codeCopyInit();
    searchInit();
    filterInit();
    lightboxInit();
    likesInit();
    metersInit();
    revealInit();
    backTopInit();
    navInit();
    setTimeout(function() {
      var h = window.location.hash;
      if (h) { var el = document.querySelector(h); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
    }, 300);
  });
})();
