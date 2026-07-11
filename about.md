---
layout: default
title: 关于
---

<div class="pg-head reveal">
  <h1 class="pg-head__title">关于</h1>
  <p class="pg-head__sub">一个热爱技术与生活的开发者</p>
</div>

<div class="about">
  <!-- 简介 -->
  <div class="panel reveal">
    <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
      <div class="hero__avatar" style="margin:0;">
        <img src="{{ '/assets/images/avatar.jpg' | relative_url }}" alt="头像">
      </div>
      <div>
        <h2 style="font-size:1.1em;margin-bottom:4px;">{{ site.author }}</h2>
        <p class="about__bio">写代码，拍照片，记录生活的温度。</p>
      </div>
    </div>
  </div>

  <!-- 技能 -->
  <div class="panel reveal">
    <h2>技能</h2>
    <div class="meter-list">
      <div class="meter">
        <span class="meter__label">Python</span>
        <div class="meter__bar"><div class="meter__fill" style="width:0%" data-width="90%"></div></div>
      </div>
      <div class="meter">
        <span class="meter__label">C / C++</span>
        <div class="meter__bar"><div class="meter__fill" style="width:0%" data-width="80%"></div></div>
      </div>
      <div class="meter">
        <span class="meter__label">Java</span>
        <div class="meter__bar"><div class="meter__fill" style="width:0%" data-width="75%"></div></div>
      </div>
    </div>
  </div>

  <!-- 经历 -->
  <div class="panel reveal">
    <h2>经历</h2>
    <div class="timeline">
      <div class="timeline__item">
        <div class="timeline__dot"></div>
        <div class="timeline__content">
          <h3>2024 - 至今</h3>
          <p>软件工程本科</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 联系 -->
  <div class="panel reveal">
    <h2>联系方式</h2>
    <div class="contact-grid">
      <a href="#" class="contact-item" onclick="copyText('{{ site.email }}');return false;">&#x1f4e7; 邮箱</a>
      <a href="https://github.com/W-JOSLIN-X" target="_blank" class="contact-item">&#x1f419; GitHub</a>
      <a href="#" class="contact-item" onclick="copyText('3044779172');return false;">&#x1f4ac; QQ</a>
    </div>
  </div>

  <!-- 关于本站 -->
  <div class="panel reveal">
    <h2>关于本站</h2>
    <p class="about__bio">本站使用 <a href="https://jekyllrb.com" target="_blank">Jekyll</a> 构建，托管在 <a href="https://pages.github.com" target="_blank">GitHub Pages</a> 上。主题为自主设计开发，简约编辑风格。</p>
  </div>
</div>
