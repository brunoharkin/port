import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ChatInterface from "./components/ChatInterface";

const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtmTrack) {
      window.gtmTrack('pageview', { page: location.pathname });
    }
  }, [location]);
  return null;
}

function useInjectAnalytics() {
  useEffect(() => {
    if (import.meta.env.PROD) {
      // Google Tag Manager
      const gtmId = import.meta.env.VITE_GTM_ID;
      if (gtmId) {
        const script = document.createElement('script');
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `;
        document.head.appendChild(script);
        // GTM noscript
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src='https://www.googletagmanager.com/ns.html?id=${gtmId}' height='0' width='0' style='display:none;visibility:hidden'></iframe>`;
        document.body.prepend(noscript);
      }
      // Facebook Pixel
      const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
      if (pixelId) {
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
        // Pixel noscript
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1'/>`;
        document.body.prepend(noscript);
      }
    }
  }, []);
}

export default function App() {
  useInjectAnalytics();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Layout isChatOpen={isChatOpen}>
        <Suspense fallback={<div className="text-center py-20 text-white">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        {isChatOpen && (
          <ChatInterface onClose={() => setIsChatOpen(false)} />
        )}
      </Layout>
      <PageViewTracker />
    </Router>
  );
} 