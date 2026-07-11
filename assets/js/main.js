;(function(){
  'use strict';
  var state = {};

  /* ---- Reveal on scroll ---- */
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
          el.style.transitionDelay = (idx * 60) + 'ms';
          obs.unobserve(el);
          requestAnimationFrame(function(e) { return function() { e.classList.add('is-visible'); }; }(el));
        }
      }
    }, { threshold: 0.05 });
    var items = document.querySelectorAll('.reveal');
    for (var j = 0; j < items.length; j++) obs.observe(items[j]);
  }

  /* ---- Back to top ---- */
  function backTopInit() {
    var btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      btn.classList[window.scrollY > 500 ? 'add' : 'remove']('is-visible');
    });
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Topbar scroll shadow ---- */
  function topbarInit() {
    var bar = document.querySelector('.topbar');
    if (!bar) return;
    window.addEventListener('scroll', function() {
      bar.classList[window.scrollY > 10 ? 'add' : 'remove']('scrolled');
    });
  }

  /* ---- Active nav ---- */
  function navMarkInit() {
    var links = document.querySelectorAll('.topbar__nav a');
    var path = window.location.pathname;
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href === path || (href === '/' && path === '/')) {
        links[i].classList.add('is-active');
      } else if (path !== '/' && href !== '/' && path.indexOf(href) === 0) {
        links[i].classList.add('is-active');
      }
    }
  }

  /* ---- Photo filters ---- */
  function filterInit() {
    var btns = document.querySelectorAll('.filter-bar__btn');
    var items = document.querySelectorAll('.gallery__item');
    if (!btns.length || !items.length) return;

    function apply(filter) {
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList[btns[i].getAttribute('data-filter') === filter ? 'add' : 'remove']('is-active');
      }
      for (var j = 0; j < items.length; j++) {
        var el = items[j];
        el.style.transitionDelay = j * 25 + 'ms';
        if (filter === 'all' || el.getAttribute('data-category') === filter) {
          el.style.display = '';
          requestAnimationFrame(function(e) { e.style.opacity = '1'; e.style.transform = 'scale(1)'; }.bind(null, el));
        } else {
          el.style.opacity = '0';
          el.style.transform = 'scale(.95)';
          setTimeout(function(e) { e.style.display = 'none'; }.bind(null, el), 300);
        }
      }
      if (history.pushState) {
        history.pushState(null, '', window.location.pathname + (filter === 'all' ? '' : '#' + encodeURIComponent(filter)));
      }
    }

    for (var k = 0; k < btns.length; k++) {
      btns[k].addEventListener('click', function() {
        apply(this.getAttribute('data-filter'));
        var grid = document.getElementById('photos-grid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    if (window.location.hash) {
      var f = decodeURIComponent(window.location.hash.substring(1));
      if (['风景','城市','旅行','自然','生活','动物'].indexOf(f) !== -1) {
        setTimeout(function() { apply(f); }, 100);
      }
    }
  }

  /* ---- Lightbox ---- */
  function lightboxInit() {
    var lb = document.getElementById('lightbox');
    var close = document.getElementById('lightbox-close');
    var img = document.getElementById('lightbox-img');
    var caption = document.getElementById('lightbox-caption');
    if (!lb) return;

    var cards = document.querySelectorAll('.gallery__item');
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function() {
        var src = this.querySelector('img');
        var title = this.getAttribute('data-title') || '';
        var desc = this.getAttribute('data-desc') || '';
        if (caption) caption.textContent = title + (desc ? ' \u2014 ' + desc : '');
        if (img && src && src.src) {
          img.src = src.src;
          img.style.display = '';
        } else if (img) {
          img.style.display = 'none';
        }
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }

    function shut() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (close) close.addEventListener('click', shut);
    lb.addEventListener('click', function(e) { if (e.target === lb) shut(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') shut(); });
  }

  /* ---- Thought likes ---- */
  function likesInit() {
    var btns = document.querySelectorAll('.murmur__like');
    var key = 'blog_like_data';

    try { state.likes = JSON.parse(localStorage.getItem(key)) || {}; } catch(e) { state.likes = {}; }

    for (var i = 0; i < btns.length; i++) {
      (function(btn) {
        var id = btn.getAttribute('data-id');
        var countEl = btn.querySelector('.murmur__like-count');
        if (!id || !countEl) return;

        var saved = state.likes[id];
        if (saved) {
          countEl.textContent = saved.count || 0;
          if (saved.liked) btn.classList.add('is-liked');
        }

        btn.addEventListener('click', function() {
          var count = parseInt(countEl.textContent) || 0;
          var liked = btn.classList.contains('is-liked');
          if (liked) {
            btn.classList.remove('is-liked');
            count = Math.max(0, count - 1);
            state.likes[id] = { count: count, liked: false };
          } else {
            btn.classList.add('is-liked');
            count += 1;
            state.likes[id] = { count: count, liked: true };
          }
          countEl.textContent = count;
          try { localStorage.setItem(key, JSON.stringify(state.likes)); } catch(e) {}
        });
      })(btns[i]);
    }
  }

  /* ---- Skill meters ---- */
  function metersInit() {
    var fills = document.querySelectorAll('.meter__fill');
    if (!fills.length) return;
    var done = false;
    var section = document.querySelector('.about');
    function run() {
      if (done || !section) return;
      var r = section.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        done = true;
        for (var i = 0; i < fills.length; i++) {
          setTimeout(function(el) {
            el.style.width = el.getAttribute('data-width');
          }.bind(null, fills[i]), i * 150);
        }
      }
    }
    setTimeout(run, 300);
    window.addEventListener('scroll', run);
  }

  /* ---- Clipboard ---- */
  window.copyText = function(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        window.showToast && showToast('\u5df2\u590d\u5236\uff1a' + text);
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      window.showToast && showToast('\u5df2\u590d\u5236\uff1a' + text);
    }
  };

  window.showToast = function(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);z-index:9999;background:#1a1a1a;color:#fff;padding:10px 24px;border-radius:20px;font-size:.88em;';
    document.body.appendChild(t);
    setTimeout(function() { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(function() { document.body.removeChild(t); }, 300); }, 1500);
  };

  /* ---- Boot ---- */
  document.addEventListener('DOMContentLoaded', function() {
    revealInit();
    backTopInit();
    topbarInit();
    navMarkInit();
    filterInit();
    lightboxInit();
    likesInit();
    metersInit();
    setTimeout(function nav() {
      var h = window.location.hash;
      if (h) { var el = document.querySelector(h); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
    }, 300);
  });
})();
