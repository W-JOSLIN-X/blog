/**
 * 个人博客 - 动态效果脚本
 * 包含：打字效果、滚动揭示、粒子背景、统计数字动画等
 */

document.addEventListener('DOMContentLoaded', function () {
  initTypingEffect();
  initScrollReveal();
  initParticles();
  initStatCounter();
  initBackToTop();
  initHeaderScroll();
  initPhotoFilters();
  initLightbox();
  initThoughtLikes();
  initSkillBars();
  initSmoothNavScroll();
  initCurrentPageNav();
});

/* ===== 1. 打字效果 ===== */
function initTypingEffect() {
  var el = document.getElementById('typing-text');
  if (!el) return;
  var raw = el.getAttribute('data-texts') || '一名开发者|一个技术爱好者|一个终身学习者';
  var texts = raw.split('|');
  var textIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var speed = 100;

  function type() {
    var current = texts[textIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = 50;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      speed = 120;
    }

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 500);
}

/* ===== 2. 滚动揭示动画 (Intersection Observer) ===== */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    // 降级：直接显示所有元素
    document.querySelectorAll('.fade-in-section, .fade-in-item').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in-section').forEach(function (el) {
    sectionObserver.observe(el);
  });

  var itemObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // 给每个元素加递增延迟
        var delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 80;
        entry.target.style.transitionDelay = delay + 'ms';
        itemObserver.unobserve(entry.target);
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, 10);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.fade-in-item').forEach(function (el) {
    itemObserver.observe(el);
  });
}

/* ===== 3. 粒子背景 ===== */
function initParticles() {
  var container = document.getElementById('particles-bg');
  if (!container) return;

  var canvas = document.createElement('canvas');
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var particles = [];
  var maxParticles = 40;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  for (var i = 0; i < maxParticles; i++) {
    particles.push(createParticle());
  }

  // 连线
  function drawLine(p1, p2) {
    var dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    var maxDist = 150;
    if (dist < maxDist) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(79, 70, 229, ' + (1 - dist / maxDist) * 0.12 + ')';
      ctx.lineWidth = 0.5;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79, 70, 229, ' + p.opacity + ')';
      ctx.fill();
    }

    // 连线
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        drawLine(particles[i], particles[j]);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===== 4. 统计数字滚动动画 ===== */
function initStatCounter() {
  var statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  var animated = false;

  function animateStats() {
    if (animated) return;
    var heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    var rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animated = true;
      statNumbers.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count')) || 0;
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          // easeOutExpo
          var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(step);
      });
    }
  }

  // 初始检查
  setTimeout(animateStats, 300);
  window.addEventListener('scroll', animateStats);
}

/* ===== 5. 回到顶部按钮 ===== */
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== 6. 头部滚动阴影 ===== */
function initHeaderScroll() {
  var header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ===== 7. 照片筛选 ===== */
function initPhotoFilters() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var photos = document.querySelectorAll('.photo-card-h[data-category]');
  if (filterBtns.length === 0 || photos.length === 0) return;

  // 筛选核心逻辑
  function applyFilter(filter) {
    // 激活对应按钮
    filterBtns.forEach(function (b) {
      if (b.getAttribute('data-filter') === filter) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // 显示/隐藏照片
    photos.forEach(function (photo, index) {
      photo.style.transitionDelay = index * 30 + 'ms';
      if (filter === 'all' || photo.getAttribute('data-category') === filter) {
        photo.style.display = '';
        setTimeout(function () {
          photo.style.opacity = '1';
          photo.style.transform = 'scale(1)';
        }, 10);
      } else {
        photo.style.opacity = '0';
        photo.style.transform = 'scale(0.9)';
        setTimeout(function () {
          photo.style.display = 'none';
        }, 300);
      }
    });

    // 更新 URL hash（不触发页面滚动）
    if (history.pushState) {
      var newHash = filter === 'all' ? '' : '#' + encodeURIComponent(filter);
      var newUrl = window.location.pathname + newHash;
      history.pushState(null, '', newUrl);
    }
  }

  // 按钮点击事件
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      applyFilter(filter);
      // 平滑滚动到照片区域
      var grid = document.getElementById('photos-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 页面加载时根据 URL hash 自动筛选
  if (window.location.hash) {
    var hashFilter = decodeURIComponent(window.location.hash.substring(1));
    var validFilters = ['风景', '城市', '旅行', '自然', '生活', '动物'];
    if (validFilters.indexOf(hashFilter) !== -1) {
      setTimeout(function () {
        applyFilter(hashFilter);
        // 滚动到照片区域
        var grid = document.getElementById('photos-grid');
        if (grid) {
          setTimeout(function () {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      }, 100);
    }
  }
}

/* ===== 8. 灯箱 ===== */
function initLightbox() {
  var lightbox = document.getElementById('lightbox');
  var closeBtn = document.getElementById('lightbox-close');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxPlaceholder = document.getElementById('lightbox-placeholder');
  if (!lightbox) return;

  var photoCards = document.querySelectorAll('.photo-card');
  var caption = document.getElementById('lightbox-caption');

  photoCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var img = card.querySelector('img');
      var title = card.querySelector('.photo-title');
      var desc = card.querySelector('.photo-desc');

      if (caption && title) {
        caption.textContent = (title.textContent || '') + (desc ? ' — ' + desc.textContent : '');
      }

      // 判断是真实图片还是占位
      if (img && img.src && !img.src.includes('placeholder')) {
        // 显示真实图片
        if (lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxImg.style.display = '';
        }
        if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'none';
      } else {
        // 显示占位提示
        if (lightboxImg) lightboxImg.style.display = 'none';
        if (lightboxPlaceholder) lightboxPlaceholder.style.display = '';
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ===== 9. 说说点赞 ===== */
function initThoughtLikes() {
  var likeBtns = document.querySelectorAll('.thought-like-btn');
  var storageKey = 'blog_thought_likes';

  // 从 localStorage 读取已有数据
  var likesData = {};
  try {
    likesData = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (e) {
    likesData = {};
  }

  // 初始化每个按钮的点赞数和状态
  likeBtns.forEach(function (btn) {
    var id = btn.getAttribute('data-like-id');
    var countEl = btn.querySelector('.like-count');
    if (!id || !countEl) return;

    var saved = likesData[id];
    if (saved) {
      countEl.textContent = saved.count || 0;
      if (saved.liked) {
        btn.classList.add('liked');
      }
    }
  });

  // 绑定点击事件
  likeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-like-id');
      var countEl = btn.querySelector('.like-count');
      if (!id || !countEl) return;

      var count = parseInt(countEl.textContent) || 0;
      var liked = btn.classList.contains('liked');

      if (liked) {
        // 取消点赞
        btn.classList.remove('liked');
        count = Math.max(0, count - 1);
        countEl.textContent = count;
        likesData[id] = { count: count, liked: false };
      } else {
        // 点赞
        btn.classList.add('liked');
        count = count + 1;
        countEl.textContent = count;
        likesData[id] = { count: count, liked: true };
        // 粒子特效
        createLikeParticles(btn);
      }

      // 保存到 localStorage
      try {
        localStorage.setItem(storageKey, JSON.stringify(likesData));
      } catch (e) { /* quota exceeded, ignore */ }
    });
  });
}

function createLikeParticles(btn) {
  var rect = btn.getBoundingClientRect();
  var cx = rect.left + rect.width / 2;
  var cy = rect.top + rect.height / 2;

  for (var i = 0; i < 6; i++) {
    var particle = document.createElement('span');
    particle.textContent = '❤️';
    particle.style.cssText =
      'position:fixed;z-index:9999;font-size:14px;pointer-events:none;' +
      'left:' + cx + 'px;top:' + cy + 'px;opacity:1;' +
      'transition:all 0.7s ease-out;';
    document.body.appendChild(particle);

    var angle = (Math.PI * 2 * i) / 6;
    var dist = 30 + Math.random() * 30;
    var dx = Math.cos(angle) * dist;
    var dy = Math.sin(angle) * dist;

    // 用 setTimeout 确保浏览器先渲染初始位置，再触发过渡动画
    setTimeout(function () {
      particle.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(0.3)';
      particle.style.opacity = '0';
    }, 10);

    // 动画结束后移除 DOM
    setTimeout(function () {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 750);
  }
}

/* ===== 10. 技能条动画 ===== */
function initSkillBars() {
  var skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length === 0) return;

  var animated = false;
  var skillsSection = document.querySelector('.about-skills');

  function animateSkills() {
    if (animated || !skillsSection) return;
    var rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animated = true;
      skillFills.forEach(function (fill, index) {
        setTimeout(function () {
          fill.style.width = fill.getAttribute('data-width');
        }, index * 150);
      });
    }
  }

  setTimeout(animateSkills, 300);
  window.addEventListener('scroll', animateSkills);
}

/* ===== 11. 导航当前页面高亮 ===== */
function initCurrentPageNav() {
  var navLinks = document.querySelectorAll('.site-nav a');
  var currentPath = window.location.pathname;

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (href === '/' && currentPath === '/')) {
      link.classList.add('active');
    }
    // 处理子路径匹配
    if (currentPath !== '/' && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    }
  });
}

/* ===== 12. 平滑导航（当前页面内滚动） ===== */
function initSmoothNavScroll() {
  // 已经通过 CSS scroll-behavior:smooth 实现
  // 这里处理页面加载时的 hash 定位
  if (window.location.hash) {
    setTimeout(function () {
      var target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }
}

/* ===== 13. 图片懒加载（预留） ===== */
// 浏览器原生 loading="lazy" 已支持，无需额外代码
// 如需更高级的懒加载，取消下方注释：
/*
function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imgObserver.observe(img);
    });
  }
}
*/
