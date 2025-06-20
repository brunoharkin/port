import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// GTM Script
const gtmId = import.meta.env.VITE_GTM_ID;
if (gtmId) {
  // Adiciona o script do GTM no head
  const script = document.createElement("script");
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;
  document.head.appendChild(script);
  // Adiciona o noscript no body
  const noscript = document.createElement("noscript");
  noscript.innerHTML = `<iframe src='https://www.googletagmanager.com/ns.html?id=${gtmId}' height='0' width='0' style='display:none;visibility:hidden'></iframe>`;
  document.body.appendChild(noscript);
}

// Função global para rastrear eventos
window.gtmTrack = (event, params = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 