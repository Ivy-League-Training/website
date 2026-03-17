/* ============================================================
   INCLUDES LOADER — loads header_menu.html and footer_menu.html
   into every page that has #header-mount and #footer-mount divs
   ============================================================ */

// Define toggleNav globally first so it's available as soon as header renders
window.toggleNav = function(btn) {
  const menu = document.getElementById('nav-menu');
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
};

(async function() {
  // Determine base path (works from any subdirectory depth)
  const base = document.querySelector('meta[name="base-path"]')?.content || '';

  async function loadInclude(selector, file) {
    const el = document.getElementById(selector);
    if (!el) return;
    try {
      const res = await fetch(base + file);
      if (!res.ok) throw new Error(res.status);
      el.innerHTML = await res.text();
    } catch(e) {
      console.warn('Could not load include:', file, e);
    }
  }

  // Load header and footer in parallel
  await Promise.all([
    loadInclude('header-mount', 'includes/header_menu.html'),
    loadInclude('footer-mount', 'includes/footer_menu.html'),
  ]);

  // Highlight active nav link after header loads
  const path = '/' + (window.location.pathname.split('/').pop().replace('.html','') || '');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace('.html','');
    if (href === path || (path === '/' && href === '/')) a.classList.add('active');
  });

})();
