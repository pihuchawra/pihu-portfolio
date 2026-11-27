const siteMenu = document.querySelector('.site-menu');

if (siteMenu) {
  const toggle = siteMenu.querySelector('button');
  const links = siteMenu.querySelector('nav');
  let pinned = false;

  function setOpen(open) {
    links.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }

  function closeMenu() {
    pinned = false;
    setOpen(false);
  }

  setOpen(false);
  siteMenu.dataset.enhanced = '';
  toggle.hidden = false;

  siteMenu.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') setOpen(true);
  });
  siteMenu.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && !pinned && !siteMenu.contains(document.activeElement)) {
      closeMenu();
    }
  });
  toggle.addEventListener('click', () => {
    pinned = !pinned;
    setOpen(pinned);
  });
  siteMenu.addEventListener('focusout', event => {
    if (!siteMenu.contains(event.relatedTarget)) closeMenu();
  });
  document.addEventListener('pointerdown', event => {
    if (!siteMenu.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || links.hidden) return;
    if (siteMenu.contains(document.activeElement)) toggle.focus();
    closeMenu();
  });
}
