(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const setLanguage = lang => {
    document.documentElement.lang = lang;
    $$('[data-tr][data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
    $$('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    try { localStorage.setItem('siteLanguage', lang); } catch (_) {}
  };

  $$('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  let savedLanguage = 'tr';
  try { savedLanguage = localStorage.getItem('siteLanguage') || 'tr'; } catch (_) {}
  setLanguage(savedLanguage === 'en' ? 'en' : 'tr');

  $$('.segment-control').forEach(control => {
    control.addEventListener('click', event => {
      const button = event.target.closest('[data-segment]');
      if (!button) return;
      $$('[data-segment]', control).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      $('.segment-thumb', control).style.transform = `translateX(${Number(button.dataset.segment) * 100}%)`;
    });
  });

  $$('.copy-demo').forEach(button => button.addEventListener('click', async () => {
    const label = $('.copy-label', button);
    const lang = document.documentElement.lang;
    try { await navigator.clipboard.writeText($('.copy-value', button).textContent); } catch (_) {}
    button.classList.remove('is-copying');
    void button.offsetWidth;
    button.classList.add('is-copying');
    label.textContent = lang === 'en' ? 'Copied' : 'Kopyalandı';
    window.setTimeout(() => { label.textContent = lang === 'en' ? 'Copy' : 'Kopyala'; }, 1500);
  }));

  $$('.done-demo').forEach(button => button.addEventListener('click', () => {
    button.classList.remove('is-done');
    void button.offsetWidth;
    button.classList.add('is-done');
    const label = $('span', button);
    label.textContent = document.documentElement.lang === 'en' ? 'Completed' : 'Tamamlandı';
  }));

  $$('.accordion-demo button').forEach(button => button.addEventListener('click', () => {
    const demo = button.closest('.accordion-demo');
    const open = !demo.classList.contains('is-open');
    demo.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  }));

  $$('.search-demo button').forEach(button => button.addEventListener('click', () => {
    const form = button.closest('.search-demo');
    const open = !form.classList.contains('is-open');
    form.classList.toggle('is-open', open);
    if (open) window.setTimeout(() => $('input', form).focus(), 200);
  }));

  $$('.portal-demo button').forEach(button => button.addEventListener('click', event => {
    const demo = button.closest('.portal-demo');
    const layer = $('.portal-layer', demo);
    const bounds = demo.getBoundingClientRect();
    layer.style.left = `${event.clientX - bounds.left - 12}px`;
    layer.style.top = `${event.clientY - bounds.top - 12}px`;
    demo.classList.remove('is-open');
    void demo.offsetWidth;
    demo.classList.add('is-open');
  }));
})();
