(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const text = (tr, en) => document.documentElement.lang === 'en' ? en : tr;

  function bindSegment(control) {
    if (!control) return;
    const buttons = $$('[data-segment]', control);
    buttons.forEach(button => button.addEventListener('click', () => {
      const index = Number(button.dataset.segment);
      control.style.setProperty('--segment-index', index);
      buttons.forEach((item, at) => item.setAttribute('aria-pressed', String(at === index)));
      if (control.classList.contains('hero-segment')) {
        const messages = [
          ['Projenin genel görünümü hazır.', 'The project overview is ready.'],
          ['Maliyet ve ilerleme ayrıntıları açıldı.', 'Cost and progress details are open.'],
          ['İş akışı ve otomasyon adımları gösteriliyor.', 'Workflow and automation steps are shown.']
        ];
        const result = $('[data-result]');
        result.dataset.tr = messages[index][0]; result.dataset.en = messages[index][1]; result.textContent = messages[index][document.documentElement.lang === 'en' ? 1 : 0];
      }
    }));
  }
  $$('.segment-control').forEach(bindSegment);

  $$('.lab-row-trigger').forEach(trigger => trigger.addEventListener('click', () => {
    const row = trigger.closest('.lab-row');
    const open = row.classList.contains('is-open');
    $$('.lab-row').forEach(item => { item.classList.remove('is-open'); $('.lab-row-trigger', item).setAttribute('aria-expanded', 'false'); });
    if (!open) { row.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }
  }));

  document.addEventListener('click', async event => {
    const copyButton = event.target.closest('.copy-demo');
    if (copyButton) {
      copyButton.classList.remove('is-copied'); copyButton.classList.add('is-copying');
      try { await navigator.clipboard.writeText($('.copy-value', copyButton).textContent); } catch {}
      setTimeout(() => { copyButton.classList.remove('is-copying'); copyButton.classList.add('is-copied'); $('.copy-label', copyButton).textContent = text('Kopyalandı', 'Copied'); }, 380);
      setTimeout(() => { copyButton.classList.remove('is-copied'); $('.copy-label', copyButton).textContent = text('Kopyala', 'Copy'); }, 1800);
      return;
    }
    const doneButton = event.target.closest('.done-demo');
    if (doneButton) {
      doneButton.classList.remove('is-done'); void doneButton.offsetWidth; doneButton.classList.add('is-done');
      $('span', doneButton).textContent = text('Tamamlandı', 'Completed');
      setTimeout(() => { doneButton.classList.remove('is-done'); $('span', doneButton).textContent = text('İşlemi tamamla', 'Complete action'); }, 1900);
      return;
    }
    const accordionButton = event.target.closest('.mini-accordion button');
    if (accordionButton) {
      const item = accordionButton.closest('.mini-accordion'); const open = item.classList.toggle('is-open'); accordionButton.setAttribute('aria-expanded', String(open));
      return;
    }
    const searchButton = event.target.closest('.search-demo button');
    if (searchButton) {
      const box = searchButton.closest('.search-demo'); const open = box.classList.toggle('is-open'); if (open) $('input', box).focus();
      return;
    }
  });
  const portalDemo = $('.portal-demo');
  if (portalDemo) portalDemo.addEventListener('click', () => portalDemo.classList.toggle('is-open'));

  $$('[data-lang]').forEach(button => button.addEventListener('click', () => {
    const lang = button.dataset.lang; document.documentElement.lang = lang;
    document.title = lang === 'tr' ? 'UI Hareket Laboratuvarı · Tolga İpek' : 'UI Motion Lab · Tolga İpek';
    $$('[data-tr]').forEach(element => element.textContent = element.dataset[lang]);
    $$('[data-lang]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.lang === lang)));
    $$('[data-placeholder-tr]').forEach(input => input.placeholder = input.dataset[lang === 'tr' ? 'placeholderTr' : 'placeholderEn']);
  }));
})();
