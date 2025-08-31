/**
 * Performance monitoring and optimization utilities
 */

/**
 * Performance metrics interface
 */
interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  paintTiming?: {
    firstPaint?: number;
    firstContentfulPaint?: number;
  };
  navigationTiming?: {
    domContentLoaded: number;
    loadComplete: number;
  };
}

/**
 * FPS Monitor for animation performance
 */
export class FPSMonitor {
  private frames: number[] = [];
  private lastTime = 0;
  private isRunning = false;
  private animationId: number | null = null;
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick();
  }
  
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  private tick = () => {
    if (!this.isRunning) return;
    
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;
    
    const fps = 1000 / delta;
    this.frames.push(fps);
    
    // Keep only last 60 frames (1 second at 60fps)
    if (this.frames.length > 60) {
      this.frames.shift();
    }
    
    this.animationId = requestAnimationFrame(this.tick);
  };
  
  getAverageFPS(): number {
    if (this.frames.length === 0) return 0;
    const sum = this.frames.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.frames.length);
  }
  
  getMinFPS(): number {
    return this.frames.length > 0 ? Math.round(Math.min(...this.frames)) : 0;
  }
  
  isPerformanceGood(): boolean {
    const avgFPS = this.getAverageFPS();
    const minFPS = this.getMinFPS();
    return avgFPS >= 55 && minFPS >= 45; // Allow some variance from 60fps
  }
}

/**
 * Memory usage monitor
 */
export function getMemoryUsage(): number | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
  if (!memory) return undefined;
  
  return Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
}

/**
 * Get paint timing metrics
 */
export function getPaintTiming() {
  if (typeof window === 'undefined') return undefined;
  
  const paintEntries = performance.getEntriesByType('paint');
  const result: { firstPaint?: number; firstContentfulPaint?: number } = {};
  
  paintEntries.forEach(entry => {
    if (entry.name === 'first-paint') {
      result.firstPaint = Math.round(entry.startTime);
    } else if (entry.name === 'first-contentful-paint') {
      result.firstContentfulPaint = Math.round(entry.startTime);
    }
  });
  
  return result;
}

/**
 * Get navigation timing metrics
 */
export function getNavigationTiming() {
  if (typeof window === 'undefined') return undefined;
  
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (!navigation) return undefined;
  
  return {
    domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.startTime),
    loadComplete: Math.round(navigation.loadEventEnd - navigation.startTime),
  };
}

/**
 * Comprehensive performance metrics collector
 */
export function collectPerformanceMetrics(): Promise<PerformanceMetrics> {
  const fpsMonitor = new FPSMonitor();
  fpsMonitor.start();
  
  // Collect FPS for 2 seconds
  return new Promise<PerformanceMetrics>((resolve) => {
    setTimeout(() => {
      fpsMonitor.stop();
      
      resolve({
        fps: fpsMonitor.getAverageFPS(),
        memoryUsage: getMemoryUsage(),
        paintTiming: getPaintTiming(),
        navigationTiming: getNavigationTiming(),
      });
    }, 2000);
  });
}

/**
 * Optimize animations for better performance
 */
export function optimizeAnimation(element: HTMLElement) {
  // Enable GPU acceleration
  element.style.transform = element.style.transform || 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
  
  // Use will-change for elements that will animate
  element.style.willChange = 'transform, opacity';
  
  // Clean up will-change after animation
  const cleanup = () => {
    element.style.willChange = 'auto';
    element.removeEventListener('animationend', cleanup);
    element.removeEventListener('transitionend', cleanup);
  };
  
  element.addEventListener('animationend', cleanup);
  element.addEventListener('transitionend', cleanup);
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(this: unknown, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy loading utility for images
 */
export function setupLazyLoading() {
  if (typeof window === 'undefined') return;
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
  
  return imageObserver;
}

/**
 * CSS optimization utilities
 */
export const cssOptimization = {
  /**
   * Remove unused CSS classes from the DOM
   */
  removeUnusedClasses(element: HTMLElement, usedClasses: string[]) {
    const allClasses = Array.from(element.classList);
    const unusedClasses = allClasses.filter(cls => !usedClasses.includes(cls));
    
    unusedClasses.forEach(cls => {
      element.classList.remove(cls);
    });
    
    return unusedClasses;
  },
  
  /**
   * Optimize CSS animations for 60fps
   */
  optimizeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      /* Force GPU acceleration for better performance */
      .gpu-accelerated,
      .animate-spin,
      .animate-bounce,
      .animate-pulse {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      /* Optimize transitions */
      .optimized-transition {
        transition-property: transform, opacity;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(style);
  }
};

/**
 * Performance monitoring hook for React components
 */
export function usePerformanceMonitor(componentName: string) {
  if (typeof window === 'undefined') return;
  
  const startTime = performance.now();
  
  // Monitor component render time
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  if (renderTime > 16) { // More than one frame at 60fps
    console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms (> 16ms)`);
  }
  
  // Monitor memory usage
  const memoryUsage = getMemoryUsage();
  if (memoryUsage && memoryUsage > 100) { // More than 100MB
    console.warn(`High memory usage: ${memoryUsage}MB`);
  }
}

/**
 * Bundle size analyzer (development only)
 */
export function analyzeBundleSize() {
  if (process.env.NODE_ENV !== 'development') return;
  
  // This would integrate with webpack-bundle-analyzer
  console.log('Bundle analysis available in development mode');
  console.log('Run: npm run build:analyze');
}

/**
 * Performance budget checker
 */
export const performanceBudget = {
  maxBundleSize: 250, // KB
  maxRenderTime: 16, // ms (60fps)
  maxMemoryUsage: 50, // MB
  minFPS: 55,
  
  check(metrics: PerformanceMetrics): { passed: boolean; violations: string[] } {
    const violations: string[] = [];
    
    if (metrics.fps < this.minFPS) {
      violations.push(`FPS too low: ${metrics.fps} (min: ${this.minFPS})`);
    }
    
    if (metrics.memoryUsage && metrics.memoryUsage > this.maxMemoryUsage) {
      violations.push(`Memory usage too high: ${metrics.memoryUsage}MB (max: ${this.maxMemoryUsage}MB)`);
    }
    
    if (metrics.paintTiming?.firstContentfulPaint && metrics.paintTiming.firstContentfulPaint > 2500) {
      violations.push(`First Contentful Paint too slow: ${metrics.paintTiming.firstContentfulPaint}ms`);
    }
    
    return {
      passed: violations.length === 0,
      violations
    };
  }
};

// Export singleton FPS monitor
export const globalFPSMonitor = new FPSMonitor();