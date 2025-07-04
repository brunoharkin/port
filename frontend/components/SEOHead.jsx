import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  schema = null,
  noindex = false,
  canonical = null
}) => {
  const defaultTitle = "Ugarit Digital - Automação Inteligente e IA sob medida";
  const defaultDescription = "Automação inteligente, IA generativa e soluções digitais sob medida para empresas que querem ir além do comum. Ugarit Digital: sua transformação começa aqui.";
  const defaultImage = "https://portfolio.ugaritdigital.com/assets/hero-bg.svg";
  const defaultUrl = "https://portfolio.ugaritdigital.com";
  
  const finalTitle = title ? `${title} | Ugarit Digital` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  const finalCanonical = canonical || finalUrl;

  return (
    <Helmet>
      {/* Meta tags básicas */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords || "automação, agentes humanizados, inteligência artificial, chatbot, laboratório digital, Ugarit, automação de processos, IA, inovação, tecnologia"} />
      
      {/* Controle de indexação */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Ugarit Digital" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@ugaritdigital" />
      <meta name="twitter:creator" content="@ugaritdigital" />
      
      {/* Meta tags adicionais para SEO */}
      <meta name="author" content="Ugarit Digital" />
      <meta name="language" content="pt-BR" />
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="Mogi das Cruzes" />
      <meta name="geo.position" content="-23.5225;-46.1856" />
      <meta name="ICBM" content="-23.5225, -46.1856" />
      
      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Preconnect para performance */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
    </Helmet>
  );
};

export default SEOHead; 