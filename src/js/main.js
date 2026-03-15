// Entry point and global logic
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu-panel');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      menuBtn.innerHTML = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Highlight active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu-panel a').forEach(link => {
    if (link.getAttribute('href') === currentPath || (currentPath === '/' && link.getAttribute('href') === '/index.html')) {
      link.classList.add('active');
    }
  });
});