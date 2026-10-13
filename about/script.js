const translatable = [...document.querySelectorAll('[data-en]')];
translatable.forEach((element) => { element.dataset.zh = element.innerHTML; });
let language = 'zh';
let currentFilter = 'all';
let toastTimer;

const citations = {
  davr: '@misc{wu2025davr,\n  title={Improving VQA Reliability: A Dual-Assessment Approach with Self-Reflection and Cross-Model Verification},\n  author={Wu, Xixian and Ou, Yang and Tian, Pengchao and Yang, Zian and Zhang, Jielei and Li, Peiyi and Gao, Longwen},\n  year={2025},\n  eprint={2512.14770},\n  archivePrefix={arXiv},\n  primaryClass={cs.CV},\n  url={https://arxiv.org/abs/2512.14770}\n}',
  perceptive: '@article{guo2025perceptive,\n  title={Identification of perceptive users based on the graph convolutional network},\n  author={Guo, Qiang and Luo, Yong and Ou, Yang and Liu, Min and Liu, Jian-Guo},\n  journal={Expert Systems with Applications},\n  year={2025},\n  doi={10.1016/j.eswa.2024.125844}\n}',
  influence: '@article{ou2022influence,\n  title={Identification of spreading influence nodes via multi-level structural attributes based on the graph convolutional network},\n  author={Ou, Yang and Guo, Qiang and Xing, Jia-Liang and Liu, Jian-Guo},\n  journal={Expert Systems with Applications},\n  year={2022},\n  doi={10.1016/j.eswa.2022.117515}\n}',
  networks: '@article{ou2022networks,\n  title={Identifying spreading influence nodes for social networks},\n  author={Ou, Yang and Guo, Qiang and Liu, Jianguo},\n  journal={Frontiers of Engineering Management},\n  year={2022},\n  note={Online publication},\n  doi={10.1007/s42524-022-0190-8}\n}',
  banking: '@article{chen2022banking,\n  title={Core-middle-periphery network model for China banking system},\n  author={Chen, Na and Liu, Jianguo and Chen, Yihui and Tu, Ding and Ou, Yang and Jiang, Mingzhu},\n  journal={Frontiers in Physics},\n  year={2022},\n  doi={10.3389/fphy.2022.981650}\n}'
};

function updateFilterStatus() {
  const count = document.querySelectorAll('.paper-item:not([hidden])').length;
  document.getElementById('filter-status').textContent = language === 'zh' ? `显示 ${count} 项研究成果` : `Showing ${count} research works`;
}

function setLanguage(next) {
  language = next === 'en' ? 'en' : 'zh';
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  translatable.forEach((element) => {
    if (language === 'zh') element.innerHTML = element.dataset.zh;
    else element.innerHTML = element.dataset.en;
  });
  const toggle = document.getElementById('language-toggle');
  toggle.querySelector('span').textContent = language === 'zh' ? 'EN' : '中文';
  toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  toggle.title = toggle.getAttribute('aria-label');
  document.title = language === 'zh' ? '欧阳 Yang Ou | 内容安全与多模态研究' : 'Yang Ou | Content Safety & Multimodal Research';
  document.querySelector('.portrait').alt = language === 'zh' ? '欧阳的个人照片' : 'Portrait of Yang Ou';
  document.getElementById('menu-toggle').setAttribute('aria-label', language === 'zh' ? '导航菜单' : 'Navigation menu');
  document.getElementById('menu-toggle').title = language === 'zh' ? '导航' : 'Navigation';
  document.getElementById('close-citation').setAttribute('aria-label', language === 'zh' ? '关闭' : 'Close');
  document.getElementById('close-citation').title = language === 'zh' ? '关闭' : 'Close';
  document.querySelectorAll('.citation-button').forEach((button) => {
    button.title = language === 'zh' ? '复制 BibTeX' : 'Copy BibTeX';
    button.setAttribute('aria-label', `${button.title}: ${button.closest('.paper-content').querySelector('h3').textContent}`);
  });
  try { localStorage.setItem('ouyang-language', language); } catch { /* Storage can be unavailable in local-file previews. */ }
  updateFilterStatus();
}

document.getElementById('language-toggle').addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
try { if (localStorage.getItem('ouyang-language') === 'en') setLanguage('en'); } catch { /* The default language remains Chinese. */ }

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((filter) => {
      const active = filter.dataset.filter === currentFilter;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.paper-item').forEach((paper) => {
      paper.hidden = currentFilter !== 'all' && paper.dataset.status !== currentFilter;
    });
    updateFilterStatus();
  });
});

function showToast(message) {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
}

document.querySelectorAll('.citation-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = citations[button.dataset.citation];
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      showToast(language === 'zh' ? 'BibTeX 已复制' : 'BibTeX copied');
    } catch {
      document.getElementById('citation-text').value = text;
      document.getElementById('citation-dialog').showModal();
    }
  });
});
document.getElementById('close-citation').addEventListener('click', () => document.getElementById('citation-dialog').close());
document.getElementById('select-citation').addEventListener('click', () => document.getElementById('citation-text').select());
document.getElementById('citation-dialog').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
  }
});

const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded', 'false'); }
menuToggle.addEventListener('click', () => {
  mobileNav.hidden = !mobileNav.hidden;
  menuToggle.setAttribute('aria-expanded', String(!mobileNav.hidden));
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 681px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navLinks.forEach((link) => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));
