toggle.addEventListener('change', () => {
  let currentPath = window.location.pathname;

  if (toggle.checked) {
    // French selected — ensure /fr prefix
    if (!currentPath.startsWith('/fr')) {
      currentPath = '/fr' + (currentPath === '/' ? '/index.html' : currentPath);
    }
    window.location.href = currentPath;
  } else {
    // English selected — remove /fr prefix
    if (currentPath.startsWith('/fr')) {
      currentPath = currentPath.replace(/^\/fr/, '') || '/';
    }
    window.location.href = currentPath;
  }
});
