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

    const shell = nav.closest('.nav');
    const controls = shell?.querySelector('.right');
    if (shell && controls && !controls.querySelector('.mobile-menu-toggle')) {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'mobile-menu-toggle';
      toggle.setAttribute('aria-controls', 'primary-navigation');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>';
      nav.id ||= 'primary-navigation';
      controls.append(toggle);

      const label = () => toggle.setAttribute(
        'aria-label',
        document.documentElement.lang === 'en' ? 'Open navigation menu' : 'Navigasyon menüsünü aç'
      );
      const close = () => {
        shell.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        label();
      };
      toggle.addEventListener('click', () => {
        const open = shell.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', document.documentElement.lang === 'en'
          ? (open ? 'Close navigation menu' : 'Open navigation menu')
          : (open ? 'Navigasyon menüsünü kapat' : 'Navigasyon menüsünü aç'));
      });
      nav.addEventListener('click', event => {
        if (event.target.closest('a')) close();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && shell.classList.contains('menu-open')) {
          close();
          toggle.focus();
        }
      });
      addEventListener('resize', () => {
        if (innerWidth > 650) close();
      }, {passive:true});
      label();
      new MutationObserver(label).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
      });
    }

    new MutationObserver(render).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  });
})();
