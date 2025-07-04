import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// Função global para rastrear eventos
window.gtmTrack = (event, params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
};

// Carregamento assíncrono dos scripts de analytics
const loadAnalytics = () => {
  // GTM Script
  const gtmId = import.meta.env.VITE_GTM_ID;
  if (gtmId) {
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);
    
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<iframe src='https://www.googletagmanager.com/ns.html?id=${gtmId}' height='0' width='0' style='display:none;visibility:hidden'></iframe>`;
    document.body.appendChild(noscript);
  }

  // Facebook Pixel
  const fbPixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
  if (fbPixelId) {
    const script = document.createElement('script');
    script.async = true;
    script.innerHTML = `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${fbPixelId}');
    fbq('track', 'PageView');`;
    document.head.appendChild(script);
    
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1' />`;
    document.body.appendChild(noscript);
  }
};

// Carregar analytics após o DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAnalytics);
} else {
  loadAnalytics();
}

// Facebook Pixel - PageView por rolagem e tempo
const fbPixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
if (fbPixelId && typeof window !== 'undefined') {
  let pageViewSent = false;
  function sendPageViewOnce() {
    if (!pageViewSent && window.fbq) {
      window.fbq('track', 'PageView');
      pageViewSent = true;
    }
  }
  
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
      sendPageViewOnce();
    }
  });
  
  setTimeout(() => {
    sendPageViewOnce();
  }, 30000);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 