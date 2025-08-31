/**
 * Performance optimization utilities
 */

// Image optimization helpers
export const getOptimizedImageProps = (
  src: string,
  alt: string,
  priority = false
) => ({
  src,
  alt,
  priority,
  quality: 85,
  placeholder: "blur" as const,
  blurDataURL:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
});

// Debounce utility for search and form inputs
export function debounce(func: (...args: unknown[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: unknown[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for scroll events
export function throttle(func: (...args: unknown[]) => void, limit: number) {
  let inThrottle: boolean;

  return (...args: unknown[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Memory usage monitoring (development only)
export const logMemoryUsage = () => {
  // Memory monitoring removed for production
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof document !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string) => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }
};
