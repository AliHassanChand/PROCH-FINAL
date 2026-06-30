/**
 * Resolves the correct API endpoint URL.
 * In the AI Studio preview environment and standard Cloud Run containers,
 * accessing URLs ending in `.php` triggers GFE (Google Front End) 403 Forbidden protection.
 * This helper dynamically strips the `.php` suffix for development/preview environments,
 * while preserving the exact `.php` extension for the Hostinger production deployment.
 */
export function getApiUrl(endpoint: string): string {
  const isDevOrStudio = 
    window.location.hostname.includes("aistudio") || 
    window.location.hostname.includes("run.app") || 
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("127.0.0.1");

  if (isDevOrStudio && endpoint.endsWith(".php")) {
    return endpoint.slice(0, -4); // Removes '.php' from the end
  }
  return endpoint;
}
