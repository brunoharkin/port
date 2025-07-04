export function createPageUrl(page) {
  if (!page) return "/";
  const slug = page.toLowerCase();
  if (slug === "home") return "/";
  return `/${slug}`;
}

// Re-export analytics functions
export * from './analytics'; 