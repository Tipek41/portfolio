(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav, #excel-notes .top nav, .lab-header nav, .site-shellnav-links');
    if (!nav) return;

    const nested = Boolean(document.querySelector('.site-shellnav-brand[href="../"]'));
    const root = nested ? '../' : './';
    const links = [
      ['araclar.html', 'Araçlar ve Projeler', 'Tools & Projects'],
      ['makrolar.html', 'Makrolar', 'Macros'],
      ['excel-pratikleri.html', 'Excel Pratikleri', 'Excel Tips'],
      ['ui-lab.html', 'UI Laboratuvarı', 'UI Lab'],
      ['#about', 'Hakkımda', 'About']
    ];

    const render = () => {
      const english = document.documentElement.lang === 'en';
      nav.replaceChildren(...links.map(([path, tr, en]) => {
        const link = document.createElement('a');
        link.href = root + path;
        link.dataset.tr = tr;
        link.dataset.en = en;
        link.textContent = english ? en : tr;
        const target = new URL(link.href, location.href);
        if (target.pathname === location.pathname || (path === '#about' && location.hash === '#about')) {
          link.setAttribute('aria-current', 'page');
        }
        return link;
      }));
    };

    render();
    new MutationObserver(render).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  });
})();
