function applyTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');
  localStorage.setItem('dp_theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? '☀' : '☾';
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(localStorage.getItem('dp_theme') || 'dark');
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = localStorage.getItem('dp_theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
});
