import React, { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload de recursos críticos
    const preloadResources = () => {
      const criticalResources = [
        '/assets/hero-bg.svg',
        '/assets/UgaritLogo.svg',
        '/assets/agente-ecommerce.webp'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
      });
    };

    // Lazy loading de imagens
    const setupLazyLoading = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Prefetch de páginas
    const prefetchPages = () => {
      const pages = ['/portfolio', '/contact'];
      pages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Otimização de fontes
    const optimizeFonts = () => {
      // Preload de fontes críticas
      // (adicione aqui se usar fontes customizadas)
    };

    // Executar otimizações
    preloadResources();
    setupLazyLoading();
    prefetchPages();
    optimizeFonts();
  }, []);

  return null; // Componente não renderiza nada
};

export default PerformanceOptimizer; 