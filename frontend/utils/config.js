// Configurações centralizadas do projeto
export const config = {
  // Informações do projeto
  project: {
    name: 'Ugarit Digital',
    version: '1.0.0',
    description: 'Portfolio moderno e interativo'
  },

  // Configurações de contato
  contact: {
    email: 'contato@ugaritdigital.com',
    phone: '+55 (11) 99999-9999',
    whatsapp: '+5511999999999'
  },

  // Redes sociais
  social: {
    linkedin: 'https://linkedin.com/in/ugaritdigital',
    github: 'https://github.com/ugaritdigital',
    instagram: 'https://instagram.com/ugaritdigital'
  },

  // Configurações de animação
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  // Breakpoints responsivos
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
};

export default config; 