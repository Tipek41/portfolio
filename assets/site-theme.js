/* Shared appearance preference, applied before rendering to avoid a theme flash. */
(() => {
  const key = 'tolga-theme';
  const untilKey = 'tolga-theme-until';
  const istanbul = { latitude: 41.0082, longitude: 28.9784, timeZone: 'Europe/Istanbul' };
  const rad = degrees => degrees * Math.PI / 180;
  const normalize = (value, range) => (value % range + range) % range;
  const dayOfYear = (year, month, day) => Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000);
  const istanbulDate = (date = new Date()) => {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: istanbul.timeZone, year: 'numeric', month: 'numeric', day: 'numeric'
    }).formatToParts(date).reduce((result, part) => {
      if (part.type !== 'literal') result[part.type] = Number(part.value);
      return result;
    }, {});
    return { year: parts.year, month: parts.month, day: parts.day };
  };
  const solarTime = ({ year, month, day }, sunrise) => {
    const longitudeHour = istanbul.longitude / 15;
    const estimate = dayOfYear(year, month, day) + ((sunrise ? 6 : 18) - longitudeHour) / 24;
    const meanAnomaly = 0.9856 * estimate - 3.289;
    const trueLongitude = normalize(meanAnomaly + 1.916 * Math.sin(rad(meanAnomaly)) + 0.02 * Math.sin(rad(2 * meanAnomaly)) + 282.634, 360);
    let rightAscension = normalize(Math.atan(0.91764 * Math.tan(rad(trueLongitude))) * 180 / Math.PI, 360);
    rightAscension += Math.floor(trueLongitude / 90) * 90 - Math.floor(rightAscension / 90) * 90;
    rightAscension /= 15;
    const sinDeclination = 0.39782 * Math.sin(rad(trueLongitude));
    const cosDeclination = Math.cos(Math.asin(sinDeclination));
    const hourCosine = (Math.cos(rad(90.833)) - sinDeclination * Math.sin(rad(istanbul.latitude))) /
      (cosDeclination * Math.cos(rad(istanbul.latitude)));
    const hourAngle = (sunrise ? 360 - Math.acos(hourCosine) * 180 / Math.PI : Math.acos(hourCosine) * 180 / Math.PI) / 15;
    const utcHour = normalize(hourAngle + rightAscension - 0.06571 * estimate - 6.622 - longitudeHour, 24);
    return Date.UTC(year, month - 1, day) + utcHour * 3600000;
  };
  const solarState = (now = Date.now()) => {
    const date = istanbulDate(new Date(now));
    const sunrise = solarTime(date, true);
    const sunset = solarTime(date, false);
    const tomorrow = istanbulDate(new Date(now + 86400000));
    if (now < sunrise) return { theme: 'dark', next: sunrise };
    if (now < sunset) return { theme: 'light', next: sunset };
    return { theme: 'dark', next: solarTime(tomorrow, true) };
  };
  let saved;
  let savedUntil = 0;
  try {
    saved = localStorage.getItem(key);
    savedUntil = Number(localStorage.getItem(untilKey)) || 0;
  } catch {}
  let explicit = (saved === 'light' || saved === 'dark') && savedUntil > Date.now();
  let automaticTimer;
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
  const applyAutomatic = () => {
    if (explicit && savedUntil > Date.now()) {
      apply(saved);
    } else {
      explicit = false;
      const state = solarState();
      apply(state.theme);
      try { localStorage.removeItem(key); localStorage.removeItem(untilKey); } catch {}
      savedUntil = state.next;
    }
    clearTimeout(automaticTimer);
    const next = explicit ? savedUntil : solarState().next;
    automaticTimer = setTimeout(applyAutomatic, Math.max(1000, Math.min(next - Date.now() + 1000, 2147483647)));
  };
  applyAutomatic();
  addEventListener('storage', event => {
    if (event.key !== key && event.key !== untilKey) return;
    try {
      saved = localStorage.getItem(key);
      savedUntil = Number(localStorage.getItem(untilKey)) || 0;
    } catch {}
    explicit = (saved === 'light' || saved === 'dark') && savedUntil > Date.now();
    applyAutomatic();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const primaryNav = document.querySelector('header nav');
    if (primaryNav && !primaryNav.querySelector('a[href$="ui-lab.html"]')) {
      const labLink = document.createElement('a');
      labLink.href = 'ui-lab.html';
      labLink.dataset.tr = 'UI Laboratuvarı'; labLink.dataset.en = 'UI Lab';
      labLink.textContent = document.documentElement.lang === 'en' ? 'UI Lab' : 'UI Laboratuvarı';
      const aboutLink = [...primaryNav.querySelectorAll('a')].find(link => link.hash === '#about');
      primaryNav.insertBefore(labLink, aboutLink || null);
    }
    const toolGrid = document.querySelector('.home .tools');
    if (toolGrid && !toolGrid.querySelector('a[href="ui-lab.html"]')) {
      const card = document.createElement('a');
      card.className = 'tool'; card.href = 'ui-lab.html';
      card.innerHTML = '<span class="icon" style="--accent:#139cff"><svg aria-hidden="true"><use href="#palette"></use></svg></span><div><h3 data-tr="UI Hareket Laboratuvarı" data-en="UI Motion Lab">UI Hareket Laboratuvarı</h3></div><span class="arrow" aria-hidden="true">→</span>';
      toolGrid.append(card);
    }
    const host = document.querySelector('header .right') || document.querySelector('header .languages, header .langs');
    if (!host) return;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'theme-switch'; button.setAttribute('role', 'switch');
    button.innerHTML = '<span class="theme-label"></span><span class="theme-track" aria-hidden="true"><svg class="theme-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg><svg class="theme-moon" viewBox="0 0 24 24"><path d="M20 15A9 9 0 0 1 9 4 9 9 0 1 0 20 15Z"/></svg><span class="theme-knob"></span></span>';
    if (host.classList.contains('right')) host.append(button); else host.after(button);
    const scenes = new Map();
    if (document.querySelector('.home:not(.catalog) .hero-background')) {
      for (const [theme, time] of [['light', 'day'], ['dark', 'night']]) {
        const image = new Image();
        image.src = `assets/jeddah-office-${time}.webp`;
        scenes.set(theme, image.decode().catch(() => {}));
      }
    }
    let switching = false;
    button.addEventListener('click', async () => {
      if (switching) return;
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      const state = solarState();
      explicit = true;
      saved = theme;
      savedUntil = state.next;
      try { localStorage.setItem(key, theme); localStorage.setItem(untilKey, String(savedUntil)); } catch {}
      clearTimeout(automaticTimer);
      automaticTimer = setTimeout(applyAutomatic, Math.max(1000, savedUntil - Date.now() + 1000));
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduced) { apply(theme); return; }
      switching = true;
      await scenes.get(theme);
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.documentElement.style.setProperty('--portal-x', `${x}px`);
      document.documentElement.style.setProperty('--portal-y', `${y}px`);
      document.documentElement.style.setProperty('--portal-radius', `${radius}px`);
      try {
        await document.startViewTransition(() => apply(theme)).finished;
      } catch {
        apply(theme);
      } finally {
        switching = false;
      }
    });
    new MutationObserver(update).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
    update();

    const nav = document.querySelector('header nav');
    const links = nav ? [...nav.querySelectorAll('a')] : [];
    if (nav && links.length) {
      const indicator = document.createElement('span');
      indicator.className = 'nav-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      nav.append(indicator);
      const current = () => links.find(link => link.matches('[aria-current],.current')) ||
        links.find(link => link.hash && link.hash === location.hash) ||
        links.find(link => new URL(link.href, location.href).pathname === location.pathname) || links[0];
      const move = link => {
        if (!link || innerWidth <= 650) return;
        indicator.style.transform = `translate3d(${link.offsetLeft}px,0,0) scaleX(${link.offsetWidth})`;
        indicator.classList.add('is-visible');
      };
      links.forEach(link => {
        link.addEventListener('pointerenter', () => move(link));
        link.addEventListener('focus', () => move(link));
      });
      nav.addEventListener('pointerleave', () => move(current()));
      nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) move(current()); });
      addEventListener('resize', () => move(current()), {passive:true});
      addEventListener('hashchange', () => move(current()));
      requestAnimationFrame(() => move(current()));
    }

    document.querySelectorAll('details > summary').forEach(summary => {
      if (summary.querySelector('.details-mark')) return;
      const mark = document.createElement('span');
      mark.className = 'details-mark';
      mark.setAttribute('aria-hidden', 'true');
      summary.append(mark);
    });

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const items = document.querySelectorAll('.tool, .macro-card, .note-card');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('motion-in');
          observer.unobserve(entry.target);
        });
      }, {threshold:.12});
      items.forEach((item, index) => {
        item.style.setProperty('--motion-delay', `${Math.min(index % 6, 5) * 55}ms`);
        observer.observe(item);
      });
    }
  });
})();
