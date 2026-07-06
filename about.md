---
layout: default
title: 关于
---

<div class="page-intro fade-in-section">
  <h1 class="page-title">👤 关于我</h1>
  <p class="page-subtitle">一个热爱技术与生活的开发者</p>
</div>

<div class="about-content">
  <div class="glass-card about-card-h fade-in-item" style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
    <div class="profile-avatar" style="width:80px;height:80px;margin:0;">
      <img src="{{ '/assets/images/avatar.jpg' | relative_url }}" alt="头像">
      <div class="avatar-placeholder">👤</div>
    </div>
    <div>
      <h2 style="font-size:1.2em;color:#fff;margin-bottom:4px;">{{ site.author }}</h2>
      <p class="about-bio-text">小趴菜</p>
    </div>
  </div>

  <div class="glass-card about-card-h fade-in-item">
    <h2>🛠️ 技能</h2>
    <div class="skill-bars">
      <div class="skill-item">
        <div class="skill-info"><span>Python</span><span>90%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width:0%" data-width="90%"></div></div>
      </div>
      <div class="skill-item">
        <div class="skill-info"><span>C / C++</span><span>80%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width:0%" data-width="80%"></div></div>
      </div>
      <div class="skill-item">
        <div class="skill-info"><span>Java</span><span>75%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width:0%" data-width="75%"></div></div>
      </div>
    </div>
  </div>

  <div class="glass-card about-card-h fade-in-item">
    <h2>📅 经历</h2>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content"><h3>2024 - 至今</h3><p>软件工程本科</p></div>
      </div>
    </div>
  </div>

  <div class="glass-card about-card-h fade-in-item">
    <h2>📬 联系方式</h2>
    <div class="contact-grid">
      <a href="#" class="contact-item" onclick="copyText('{{ site.email }}');return false;"><span>📧</span> 邮箱</a>
      <a href="https://github.com/haop11" target="_blank" class="contact-item"><span>🐙</span> GitHub</a>
      <a href="#" class="contact-item" onclick="copyText('3044779172');return false;"><span>💬</span> QQ</a>
    </div>
  </div>

  <div class="glass-card about-card-h fade-in-item">
    <h2>关于本站</h2>
    <p class="about-bio-text">本站使用 <a href="https://jekyllrb.com" target="_blank">Jekyll</a> 构建，托管在 <a href="https://pages.github.com" target="_blank">GitHub Pages</a> 上。主题为自主设计开发，采用玻璃拟态风格。</p>
  </div>
</div>
