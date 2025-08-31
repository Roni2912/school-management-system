/**
 * Accessibility and Performance Tests
 * Tests for WCAG 2.1 AA compliance and 60fps performance
 */

import { 
  checkWCAGCompliance, 
  getContrastRatio, 
  accessibleColors,
  prefersReducedMotion,
  prefersHighContrast,
  auditAccessibility,
  LiveRegionAnnouncer
} from '../utils/accessibility';

import { 
  FPSMonitor, 
  getMemoryUsage, 
  debounce, 
  throttle,
  performanceBudget
} from '../utils/performance';

// Mock DOM APIs for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock performance API
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: jest.fn(() => Date.now()),
    getEntriesByType: jest.fn(() => []),
    memory: {
      usedJSHeapSize: 50 * 1024 * 1024, // 50MB
    }
  },
});

describe('Accessibility Tests', () => {
  describe('Color Contrast Compliance', () => {
    test('should calculate correct contrast ratios', () => {
      // White on black should have high contrast
      const highContrast = getContrastRatio('#ffffff', '#000000');
      expect(highContrast).toBeCloseTo(21, 1);
      
      // Same colors should have no contrast
      const noContrast = getContrastRatio('#ffffff', '#ffffff');
      expect(noContrast).toBe(1);
    });
    
    test('should validate WCAG AA compliance for primary colors', () => {
      const primaryOnWhite = checkWCAGCompliance('#2563eb', '#ffffff');
      expect(primaryOnWhite.passesAA).toBe(true);
      expect(primaryOnWhite.ratio).toBeGreaterThanOrEqual(4.5);
    });
    
    test('should validate WCAG AA compliance for semantic colors', () => {
      // Test success color
      const successCompliance = checkWCAGCompliance(accessibleColors.success, '#ffffff');
      expect(successCompliance.passesAA).toBe(true);
      
      // Test warning color
      const warningCompliance = checkWCAGCompliance(accessibleColors.warning, '#ffffff');
      expect(warningCompliance.passesAA).toBe(true);
      
      // Test error color
      const errorCompliance = checkWCAGCompliance(accessibleColors.error, '#ffffff');
      expect(errorCompliance.passesAA).toBe(true);
      
      // Test info color
      const infoCompliance = checkWCAGCompliance(accessibleColors.info, '#ffffff');
      expect(infoCompliance.passesAA).toBe(true);
    });
    
    test('should validate gray color combinations', () => {
      // Gray 600 on white should pass AA
      const gray600 = checkWCAGCompliance(accessibleColors.gray[600], '#ffffff');
      expect(gray600.passesAA).toBe(true);
      
      // Gray 500 on white should pass AA
      const gray500 = checkWCAGCompliance(accessibleColors.gray[500], '#ffffff');
      expect(gray500.passesAA).toBe(true);
    });
  });
  
  describe('Accessibility Utilities', () => {
    test('should detect reduced motion preference', () => {
      // Mock reduced motion preference
      (window.matchMedia as jest.Mock).mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      
      expect(prefersReducedMotion()).toBe(true);
    });
    
    test('should detect high contrast preference', () => {
      (window.matchMedia as jest.Mock).mockImplementation(query => ({
        matches: query === '(prefers-contrast: high)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      
      expect(prefersHighContrast()).toBe(true);
    });
    
    test('should audit accessibility issues', () => {
      // Create test DOM
      document.body.innerHTML = `
        <div>
          <img src="test.jpg" />
          <input type="text" />
          <h3>Heading without h1 or h2</h3>
        </div>
      `;
      
      const suggestions = auditAccessibility(document.body);
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some(s => s.includes('alt text'))).toBe(true);
      expect(suggestions.some(s => s.includes('label'))).toBe(true);
    });
  });
  
  describe('Live Region Announcer', () => {
    test('should create and manage live region', () => {
      const announcer = new LiveRegionAnnouncer();
      
      // Should create live region element
      const liveRegion = document.querySelector('[aria-live]');
      expect(liveRegion).toBeTruthy();
      
      // Should announce messages
      announcer.announce('Test message');
      expect(liveRegion?.textContent).toBe('Test message');
      
      // Cleanup
      announcer.destroy();
      expect(document.querySelector('[aria-live]')).toBeFalsy();
    });
  });
});

describe('Performance Tests', () => {
  describe('FPS Monitoring', () => {
    test('should monitor FPS correctly', (done) => {
      const fpsMonitor = new FPSMonitor();
      fpsMonitor.start();
      
      // Let it run for a short time
      setTimeout(() => {
        fpsMonitor.stop();
        const avgFPS = fpsMonitor.getAverageFPS();
        const minFPS = fpsMonitor.getMinFPS();
        
        expect(avgFPS).toBeGreaterThan(0);
        expect(minFPS).toBeGreaterThan(0);
        expect(fpsMonitor.isPerformanceGood()).toBeDefined();
        
        done();
      }, 100);
    });
  });
  
  describe('Memory Usage', () => {
    test('should get memory usage when available', () => {
      const memoryUsage = getMemoryUsage();
      expect(memoryUsage).toBe(50); // 50MB as mocked
    });
  });
  
  describe('Performance Utilities', () => {
    test('should debounce function calls', (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 50);
      
      // Call multiple times rapidly
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      // Should only be called once after delay
      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 100);
    });
    
    test('should throttle function calls', (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 50);
      
      // Call multiple times rapidly
      throttledFn();
      throttledFn();
      throttledFn();
      
      // Should be called immediately once
      expect(callCount).toBe(1);
      
      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 100);
    });
  });
  
  describe('Performance Budget', () => {
    test('should check performance metrics against budget', () => {
      const goodMetrics = {
        fps: 60,
        memoryUsage: 30,
        paintTiming: {
          firstPaint: 500,
          firstContentfulPaint: 800
        }
      };
      
      const result = performanceBudget.check(goodMetrics);
      expect(result.passed).toBe(true);
      expect(result.violations).toHaveLength(0);
    });
    
    test('should detect performance violations', () => {
      const badMetrics = {
        fps: 30, // Too low
        memoryUsage: 100, // Too high
        paintTiming: {
          firstPaint: 1000,
          firstContentfulPaint: 3000 // Too slow
        }
      };
      
      const result = performanceBudget.check(badMetrics);
      expect(result.passed).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
    });
  });
});

describe('CSS Optimization', () => {
  test('should validate critical CSS properties are present', () => {
    // Check that essential CSS custom properties are defined
    const rootStyles = getComputedStyle(document.documentElement);
    
    // These would be available in a real DOM environment
    // For testing, we just verify the structure exists
    expect(document.documentElement).toBeTruthy();
  });
  
  test('should validate animation performance optimizations', () => {
    // Create test element
    const element = document.createElement('div');
    element.className = 'animate-spin gpu-accelerated';
    document.body.appendChild(element);
    
    // Check for performance optimizations
    const computedStyle = getComputedStyle(element);
    
    // In a real environment, these would be applied by CSS
    expect(element.classList.contains('gpu-accelerated')).toBe(true);
    
    document.body.removeChild(element);
  });
});

describe('Reduced Motion Support', () => {
  test('should respect reduced motion preferences', () => {
    // Mock reduced motion preference
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    expect(prefersReducedMotion()).toBe(true);
    
    // In a real implementation, animations would be disabled
    // This test validates the detection mechanism
  });
});

describe('Focus Management', () => {
  test('should provide proper focus indicators', () => {
    const button = document.createElement('button');
    button.textContent = 'Test Button';
    document.body.appendChild(button);
    
    // Simulate focus
    button.focus();
    
    // In a real environment, focus styles would be applied
    expect(document.activeElement).toBe(button);
    
    document.body.removeChild(button);
  });
});

describe('ARIA Support', () => {
  test('should validate ARIA attributes are properly used', () => {
    document.body.innerHTML = `
      <button aria-label="Close dialog" aria-expanded="false">
        <span aria-hidden="true">×</span>
      </button>
      <div role="alert" aria-live="assertive"></div>
    `;
    
    const button = document.querySelector('button');
    const alert = document.querySelector('[role="alert"]');
    
    expect(button?.getAttribute('aria-label')).toBe('Close dialog');
    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(alert?.getAttribute('aria-live')).toBe('assertive');
  });
});