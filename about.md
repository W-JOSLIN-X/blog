---
layout: default
title: 关于
---

<div class="pg-head reveal">
  <h1 class="pg-head__title">关于</h1>
  <p class="pg-head__sub">一个热爱技术与生活的开发者</p>
</div>

<div class="about-grid">
  <div class="panel about-card reveal">
    <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
      <div style="width:64px;height:64px;border-radius:50%;overflow:hidden;border:2px solid var(--c-border-sub);flex-shrink:0;">
        <img src="{{ '/assets/images/9c5bcbb8f7f8daf40fef136246fc0430.jpg' | relative_url }}" alt="头像" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div>
        <h2 style="margin-bottom:4px;font-family:'Noto Serif SC',Georgia,serif;">{{ site.author }}</h2>
        <p class="about-bio">软件工程专业在读，对编程、摄影和阅读有持久的热爱。主攻 Python 和 C++，课余喜欢折腾小项目，从命令行工具到 Web 应用都愿意尝试。最近在学习数据分析，也通过这个博客记录思考和收获。始终相信技术可以改变世界，但生活的温度同样重要——一杯咖啡、一趟旅行、一本好书，都是不可或缺的部分。</p>
      </div>
    </div>
  </div>

  <div class="panel about-card reveal">
    <h2>技能</h2>
    <div class="meter-list">
      <div class="meter"><span class="meter__label">Python</span><div class="meter__bar"><div class="meter__fill" data-width="90%"></div></div></div>
      <div class="meter"><span class="meter__label">C / C++</span><div class="meter__bar"><div class="meter__fill" data-width="80%"></div></div></div>
      <div class="meter"><span class="meter__label">Java</span><div class="meter__bar"><div class="meter__fill" data-width="75%"></div></div></div>
      <div class="meter"><span class="meter__label">JavaScript</span><div class="meter__bar"><div class="meter__fill" data-width="65%"></div></div></div>
    </div>
  </div>

  <div class="panel about-card reveal">
    <h2>经历</h2>
    <div class="timeline">
      <div class="timeline__item">
        <div class="timeline__dot"></div>
        <div class="timeline__content"><h3>2024 - 至今</h3><p>软件工程本科在读</p></div>
      </div>
      <div class="timeline__item">
        <div class="timeline__dot"></div>
        <div class="timeline__content"><h3>2026 夏</h3><p>搭建个人博客，开始记录技术学习笔记</p></div>
      </div>
    </div>
  </div>

  <div class="panel about-card reveal">
    <h2>联系方式</h2>
    <div class="contact-cards">
      <a href="#" class="contact-card" onclick="copyText('{{ site.email }}');return false;">&#x1f4e7; 邮箱</a>
      <a href="https://github.com/W-JOSLIN-X" target="_blank" class="contact-card">&#x1f419; GitHub</a>
      <a href="#" class="contact-card" onclick="copyText('3044779172');return false;">&#x1f4ac; QQ</a>
    </div>
  </div>

  <div class="panel about-card reveal">
    <h2>关于本站</h2>
    <p class="about-bio">使用 <a href="https://jekyllrb.com" target="_blank">Jekyll</a> 构建，托管于 <a href="https://pages.github.com" target="_blank">GitHub Pages</a>。主题为自主设计，支持暗色模式切换。</p>
  </div>
</div>
