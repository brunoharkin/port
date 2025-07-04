import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  
  // Não mostrar breadcrumbs na página inicial
  if (location.pathname === '/') return null;

  const breadcrumbItems = [
    { path: '/', name: 'Home', icon: <Home className="w-4 h-4" /> }
  ];

  if (location.pathname === '/portfolio') {
    breadcrumbItems.push({ path: '/portfolio', name: 'Portfólio' });
  } else if (location.pathname === '/contact') {
    breadcrumbItems.push({ path: '/contact', name: 'Contato' });
  }

  // Schema.org para breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://portfolio.ugaritdigital.com${item.path}`
    }))
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <nav aria-label="Breadcrumb" className="bg-black/60 px-4 py-2 text-sm text-gray-400">
        <ol className="list-reset flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-white font-medium">{item.name}</span>
              ) : (
                <Link 
                  to={item.path} 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  {item.icon && item.icon}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs; 