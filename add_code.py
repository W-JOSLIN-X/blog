# -*- coding: utf-8 -*-
from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

INPUT = r"C:\Users\lenovo\Desktop\大二\信拓\blog(1)\blog\信息技术实践与拓展-实验报告-已完成.docx"

doc = Document(INPUT)
paras = doc.paragraphs
body = doc.element.body

# Find the empty paragraph after the last JS code line
insert_before_idx = None
for i in range(120, 140):
    if not paras[i].text.strip():
        insert_before_idx = i
        break

if insert_before_idx is None:
    insert_before_idx = 120

anchor_elem = paras[insert_before_idx]._element
anchor_pos = list(body).index(anchor_elem)

def make_code_para(text):
    p = OxmlElement('w:p')
    pPr = OxmlElement('w:pPr')
    p.append(pPr)
    r = OxmlElement('w:r')
    rPr = OxmlElement('w:rPr')
    rf = OxmlElement('w:rFonts')
    for a in ('w:eastAsia','w:ascii','w:hAnsi'):
        rf.set(qn(a), 'Consolas')
    rPr.append(rf)
    sz = OxmlElement('w:sz')
    sz.set(qn('w:val'), '18')
    rPr.append(sz)
    r.append(rPr)
    t = OxmlElement('w:t')
    t.text = text
    t.set(qn('xml:space'), 'preserve')
    r.append(t)
    p.append(r)
    return p

lines = [
    "",
    "/* ===== 文章搜索过滤 ===== */",
    "function searchInit() {",
    "  var input = document.getElementById('search-input');",
    "  var items = document.querySelectorAll('.entry[data-search]');",
    "  input.addEventListener('input', function() {",
    "    var q = this.value.trim().toLowerCase();",
    "    for (var i = 0; i < items.length; i++) {",
    "      var data = items[i].getAttribute('data-search') || '';",
    "      items[i].style.display = (!q || data.indexOf(q) !== -1) ? '' : 'none';",
    "    }",
    "  });",
    "}",
    "",
    "/* ===== 目录生成与滚动监听 (TOC) ===== */",
    "function tocInit() {",
    "  var container = document.getElementById('toc');",
    "  var body = document.querySelector('.article__body');",
    "  if (!container || !body) return;",
    "  var headings = body.querySelectorAll('h2,h3');",
    "  if (headings.length < 2) { container.style.display = 'none'; return; }",
    "  for (var i = 0; i < headings.length; i++) {",
    "    var h = headings[i];",
    "    if (!h.id) h.id = 'sec-' + i;",
    "    var a = document.createElement('a');",
    "    a.href = '#' + h.id;",
    "    a.textContent = h.textContent;",
    "    if (h.tagName === 'H3') a.className = 'toc-h3';",
    "    container.appendChild(a);",
    "  }",
    "  var observer = new IntersectionObserver(function(entries) {",
    "    var activeId = null;",
    "    for (var j = 0; j < entries.length; j++) {",
    "      if (entries[j].isIntersecting) { activeId = entries[j].target.id; break; }",
    "    }",
    "    var links = container.querySelectorAll('a');",
    "    for (var k = 0; k < links.length; k++) {",
    "      links[k].classList[links[k].getAttribute('href') === '#' + activeId ? 'add' : 'remove']('is-active');",
    "    }",
    "  }, { rootMargin: '-10% 0px -70% 0px' });",
    "  headings.forEach(function(h) { observer.observe(h); });",
    "}",
    "",
    "/* ===== 代码一键复制 ===== */",
    "function codeCopyInit() {",
    "  var pres = document.querySelectorAll('.article__body pre');",
    "  for (var i = 0; i < pres.length; i++) {",
    "    var btn = document.createElement('button');",
    "    btn.className = 'copy-btn';",
    "    btn.textContent = '复制';",
    "    pres[i].appendChild(btn);",
    "    btn.addEventListener('click', function() {",
    "      var code = this.parentNode.querySelector('code');",
    "      navigator.clipboard.writeText(code.textContent);",
    "      this.textContent = '已复制';",
    "      this.classList.add('copied');",
    "      setTimeout(function(b) { b.textContent = '复制'; b.classList.remove('copied'); }, 2000, this);",
    "    });",
    "  }",
    "}",
    "",
    "/* ===== 碎片点赞粒子动画 ===== */",
    "function spawnParticles(btn) {",
    "  var rect = btn.getBoundingClientRect();",
    "  var cx = rect.left + rect.width / 2;",
    "  var cy = rect.top;",
    "  for (var j = 0; j < 8; j++) {",
    "    var p = document.createElement('span');",
    "    p.textContent = '\u2665';",
    "    p.className = 'like-particle';",
    "    p.style.cssText = 'position:fixed;z-index:999;font-size:14px;pointer-events:none;'",
    "      + 'left:' + cx + 'px;top:' + cy + 'px;';",
    "    var angle = (Math.PI * 2 * j) / 8;",
    "    var dist = 24 + Math.random() * 24;",
    "    p.style.setProperty('--lx', Math.cos(angle) * dist + 'px');",
    "    p.style.setProperty('--ly', Math.sin(angle) * dist - 24 + 'px');",
    "    document.body.appendChild(p);",
    "    setTimeout(function(el) { if (el.parentNode) el.parentNode.removeChild(el); }, 750, p);",
    "  }",
    "}",
    "",
    "/* ===== 模块初始化入口 ===== */",
    "document.addEventListener('DOMContentLoaded', function() {",
    "  darkInit();",
    "  searchInit();",
    "  tocInit();",
    "  codeCopyInit();",
    "  likesInit();",
    "  progressInit();",
    "  revealInit();",
    "  backTopInit();",
    "  filterInit();",
    "  lightboxInit();",
    "  navInit();",
    "});",
]

# Insert in reverse
for line in reversed(lines):
    body.insert(anchor_pos, make_code_para(line))

doc.save(INPUT)
print(f"Added {len(lines)} code lines. Done.")
