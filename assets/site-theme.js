/* Shared appearance preference, applied before rendering to avoid a theme flash. */
(() => {
  const key = 'tolga-theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem(key); } catch {}
  let explicit = saved === 'light' || saved === 'dark';
  const apply = theme => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#08131f' : '#f1f5fa');
    update();
  };
  function update() {
    const button = document.querySelector('.theme-switch');
    if (!button) return;
    const en = document.documentElement.lang === 'en';
    const dark = document.documentElement.dataset.theme === 'dark';
    button.setAttribute('aria-checked', String(dark));
    button.setAttribute('aria-label', en ? 'Night mode' : 'Gece modu');
    button.title = en ? 'Switch day / night mode' : 'Gündüz / gece modunu değiştir';
    button.querySelector('.theme-label').textContent = en ? (dark ? 'Night' : 'Day') : (dark ? 'Gece' : 'Gündüz');
  }
  apply(explicit ? saved : (system.matches ? 'dark' : 'light'));
  system.addEventListener('change', event => { if (!explicit) apply(event.matches ? 'dark' : 'light'); });
  addEventListener('storage', event => {
    if (event.key !== key) return;
    explicit = event.newValue === 'dark' || event.newValue === 'light';
    apply(explicit ? event.newValue : (system.matches ? 'dark' : 'light'));
  });
  document.addEventListener('DOMContentLoaded', () => {
    const host = document.querySelector('header .right') || document.querySelector('header .languages, header .langs');
    if (!host) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'theme-switch'; button.setAttribute('role', 'switch');
    button.innerHTML = '<span class="theme-label"></span><span class="theme-track" aria-hidden="true"><svg class="theme-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg><svg class="theme-moon" viewBox="0 0 24 24"><path d="M20 15A9 9 0 0 1 9 4 9 9 0 1 0 20 15Z"/></svg><span class="theme-knob"></span></span>';
    if (host.classList.contains('right')) host.append(button); else host.after(button);
    button.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      explicit = true; try { localStorage.setItem(key, theme); } catch {}
      apply(theme);
    });
    new MutationObserver(update).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
    update();
  });
})();
