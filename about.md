---
layout: default
title: 关于
---

<div class="page-intro fade-in-section">
  <h1 class="page-title">👤 关于我</h1>
  <p class="page-subtitle">一个热爱技术与生活的开发者</p>
</div>

<div class="about-content">
  <!-- 个人介绍卡片 -->
  <div class="about-card fade-in-item">
    <div class="about-avatar-lg">
      <div class="avatar-placeholder-lg">
        <span>👤</span>
        <p>头像预留位</p>
      </div>
      <img class="avatar-img" src="{{ '/assets/images/avatar.jpg' | relative_url }}" alt="头像">
    </div>
    <div class="about-info">
      <h2>{{ site.author }}</h2>
      <p class="about-bio">全栈开发者 / 开源爱好者 / 终身学习者</p>
      <div class="about-tags">
        <span>Python</span><span>JavaScript</span><span>Go</span><span>React</span>
      </div>
    </div>
  </div>

  <!-- 技能条 -->
  <div class="about-skills fade-in-item">
    <h2>🛠️ 技能</h2>
    <div class="skill-bars">
      <div class="skill-item">
        <div class="skill-info"><span>Python</span><span>90%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width: 0%" data-width="90%"></div></div>
      </div>
      <div class="skill-item">
        <div class="skill-info"><span>JavaScript / TypeScript</span><span>85%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width: 0%" data-width="85%"></div></div>
      </div>
      <div class="skill-item">
        <div class="skill-info"><span>React / Vue</span><span>80%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width: 0%" data-width="80%"></div></div>
      </div>
      <div class="skill-item">
        <div class="skill-info"><span>Go</span><span>70%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width: 0%" data-width="70%"></div></div>
      </div>
      <div class="skill-item">
        <div class="skill-info"><span>Docker / K8s</span><span>65%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="width: 0%" data-width="65%"></div></div>
      </div>
    </div>
  </div>

  <!-- 时间线 -->
  <div class="about-timeline fade-in-item">
    <h2>📅 经历</h2>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>2024 - 至今</h3>
          <p>高级软件开发工程师 @ XX 科技</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>2022 - 2024</h3>
          <p>后端开发工程师 @ YY 网络</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>2018 - 2022</h3>
          <p>计算机科学本科 @ ZZ 大学</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 联系方式 -->
  <div class="about-contact fade-in-item">
    <h2>📬 联系方式</h2>
    <div class="contact-grid">
      <a href="mailto:{{ site.email }}" class="contact-item">
        <span class="contact-icon">📧</span>
        <span>邮箱</span>
      </a>
      <a href="https://github.com/haop11" target="_blank" class="contact-item">
        <span class="contact-icon">🐙</span>
        <span>GitHub</span>
      </a>
      <a href="#" class="contact-item">
        <span class="contact-icon">🐦</span>
        <span>Twitter</span>
      </a>
      <a href="#" class="contact-item">
        <span class="contact-icon">💼</span>
        <span>LinkedIn</span>
      </a>
    </div>
  </div>

  <div class="about-footer fade-in-item">
    <h2>关于本站</h2>
    <p>本站使用 <a href="https://jekyllrb.com" target="_blank">Jekyll</a> 构建，托管在 <a href="https://pages.github.com" target="_blank">GitHub Pages</a> 上。主题为自主设计开发。</p>
  </div>
</div>
