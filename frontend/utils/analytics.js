// Configuração de Analytics e Tracking
export const trackEvent = (eventName, parameters = {}) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'user_interaction',
      event_label: window.location.pathname,
      ...parameters
    });
  }

  // Google Tag Manager
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }

  // Console log para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, parameters);
  }
};

// Tracking de navegação
export const trackPageView = (pageTitle, pagePath) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_ID, {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }
};

// Tracking de conversões
export const trackConversion = (conversionType, value = null) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
    currency: 'BRL'
  });
};

// Tracking de engajamento
export const trackEngagement = (action, element = null) => {
  trackEvent('engagement', {
    action: action,
    element: element,
    page: window.location.pathname
  });
};

// Tracking de tempo na página
export const trackTimeOnPage = (seconds) => {
  trackEvent('time_on_page', {
    seconds: seconds,
    page: window.location.pathname
  });
};

// Tracking de scroll
export const trackScroll = (percentage) => {
  trackEvent('scroll_depth', {
    percentage: percentage,
    page: window.location.pathname
  });
};

// Tracking de formulários
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
    page: window.location.pathname
  });
};

// Tracking de cliques em CTA
export const trackCTAClick = (ctaName, ctaLocation) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    page: window.location.pathname
  });
};

// Tracking de visualização de agentes
export const trackAgentView = (agentId, agentName) => {
  trackEvent('agent_view', {
    agent_id: agentId,
    agent_name: agentName,
    page: window.location.pathname
  });
};

// Tracking de teste de agente
export const trackAgentTest = (agentId, agentName) => {
  trackEvent('agent_test', {
    agent_id: agentId,
    agent_name: agentName,
    page: window.location.pathname
  });
};

// Tracking de contato
export const trackContact = (method) => {
  trackEvent('contact', {
    method: method,
    page: window.location.pathname
  });
};

// Inicialização do analytics
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Configurar listeners para eventos de engajamento
    let scrollTimeout;
    let lastScrollPercentage = 0;

    // Tracking de scroll
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercentage > lastScrollPercentage && scrollPercentage % 25 === 0) {
          trackScroll(scrollPercentage);
          lastScrollPercentage = scrollPercentage;
        }
      }, 100);
    });

    // Tracking de tempo na página
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackTimeOnPage(timeOnPage);
    });

    // Tracking de cliques em links externos
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.hostname !== window.location.hostname) {
        trackEvent('external_link_click', {
          url: link.href,
          text: link.textContent.trim()
        });
      }
    });
  }
}; 