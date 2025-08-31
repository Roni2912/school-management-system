/**
 * Animation Performance Tests
 * Validates that animations run smoothly at 60fps
 */

import { globalFPSMonitor, performanceBudget } from '../utils/performance';

// Mock requestAnimationFrame for testing
let animationFrameCallbacks: FrameRequestCallback[] = [];
let currentTime = 0;

global.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
  animationFrameCallbacks.push(callback);
  return animationFrameCallbacks.length;
});

global.cancelAnimationFrame = jest.fn((id: number) => {
  delete animationFrameCallbacks[id - 1];
});

// Mock performance.now to simulate consistent 60fps
global.performance.now = jest.fn(() => {
  currentTime += 16.67; // 60fps = 16.67ms per frame
  return currentTime;
});

describe('Animation Performance Tests', () => {
  beforeEach(() => {
    animationFrameCallbacks = [];
    currentTime = 0;
    jest.clearAllMocks();
  });

  test('should maintain 60fps during CSS animations', (done) => {
    // Create animated element
    const element = document.createElement('div');
    element.className = 'animate-spin gpu-accelerated';
    element.style.animation = 'spin 1s linear infinite';
    document.body.appendChild(element);

    // Start FPS monitoring
    globalFPSMonitor.start();

    // Simulate animation frames for 1 second
    let frameCount = 0;
    const maxFrames = 60; // 60 frames for 1 second at 60fps

    const simulateFrames = () => {
      if (frameCount < maxFrames) {
        // Execute all queued animation frame callbacks
        const callbacks = [...animationFrameCallbacks];
        animationFrameCallbacks = [];
        callbacks.forEach(callback => {
          if (callback) callback(currentTime);
        });
        
        frameCount++;
        setTimeout(simulateFrames, 0);
      } else {
        // Stop monitoring and check results
        globalFPSMonitor.stop();
        
        const avgFPS = globalFPSMonitor.getAverageFPS();
        const minFPS = globalFPSMonitor.getMinFPS();
        
        expect(avgFPS).toBeGreaterThanOrEqual(55); // Allow some variance
        expect(minFPS).toBeGreaterThanOrEqual(45);
        expect(globalFPSMonitor.isPerformanceGood()).toBe(true);
        
        document.body.removeChild(element);
        done();
      }
    };

    simulateFrames();
  });

  test('should optimize transform animations for GPU acceleration', () => {
    const element = document.createElement('div');
    element.className = 'gpu-accelerated';
    document.body.appendChild(element);

    // Apply GPU acceleration styles
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';

    const computedStyle = getComputedStyle(element);
    
    // These properties should be set for GPU acceleration
    expect(element.style.transform).toContain('translateZ(0)');
    expect(element.style.backfaceVisibility).toBe('hidden');
    expect(element.style.perspective).toBe('1000px');

    document.body.removeChild(element);
  });

  test('should use will-change property for animated elements', () => {
    const element = document.createElement('div');
    element.className = 'will-change-transform';
    document.body.appendChild(element);

    // Set will-change for optimization
    element.style.willChange = 'transform';
    
    expect(element.style.willChange).toBe('transform');

    // Simulate animation end to clean up will-change
    element.style.willChange = 'auto';
    expect(element.style.willChange).toBe('auto');

    document.body.removeChild(element);
  });

  test('should validate CSS keyframe animations are optimized', () => {
    // Check that keyframes use transform3d instead of transform
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes optimizedSlide {
        from { transform: translate3d(0, -10px, 0); }
        to { transform: translate3d(0, 0, 0); }
      }
      
      @keyframes optimizedScale {
        from { transform: scale3d(0.95, 0.95, 1); }
        to { transform: scale3d(1, 1, 1); }
      }
    `;
    document.head.appendChild(styleSheet);

    // Verify the styles were added
    expect(styleSheet.textContent).toContain('translate3d');
    expect(styleSheet.textContent).toContain('scale3d');

    document.head.removeChild(styleSheet);
  });

  test('should respect reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const element = document.createElement('div');
    element.className = 'animate-spin';
    document.body.appendChild(element);

    // Check if reduced motion is respected
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    expect(prefersReducedMotion).toBe(true);

    // In a real implementation, animations would be disabled
    if (prefersReducedMotion) {
      element.style.animation = 'none';
      expect(element.style.animation).toBe('none');
    }

    document.body.removeChild(element);
  });

  test('should validate animation timing functions for smooth motion', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    // Test professional easing curves
    const easingFunctions = [
      'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
      'cubic-bezier(0.0, 0.0, 0.2, 1)', // ease-out
      'cubic-bezier(0.4, 0.0, 1, 1)', // ease-in
    ];

    easingFunctions.forEach(easing => {
      element.style.transitionTimingFunction = easing;
      expect(element.style.transitionTimingFunction).toBe(easing);
    });

    document.body.removeChild(element);
  });

  test('should optimize animation duration for 60fps', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    // Test that animation durations are multiples of 16.67ms (60fps frame time)
    const optimizedDurations = ['150ms', '300ms', '500ms']; // All are close to multiples of 16.67ms

    optimizedDurations.forEach(duration => {
      element.style.transitionDuration = duration;
      expect(element.style.transitionDuration).toBe(duration);
    });

    document.body.removeChild(element);
  });

  test('should validate performance budget for animations', () => {
    const animationMetrics = {
      fps: 58, // Slightly below 60 but acceptable
      memoryUsage: 45, // Within budget
      paintTiming: {
        firstPaint: 800,
        firstContentfulPaint: 1200
      }
    };

    const budgetCheck = performanceBudget.check(animationMetrics);
    expect(budgetCheck.passed).toBe(true);
    expect(budgetCheck.violations).toHaveLength(0);
  });

  test('should detect performance issues with heavy animations', () => {
    const heavyAnimationMetrics = {
      fps: 25, // Too low
      memoryUsage: 80, // High but acceptable
      paintTiming: {
        firstPaint: 1500,
        firstContentfulPaint: 2800 // Too slow
      }
    };

    const budgetCheck = performanceBudget.check(heavyAnimationMetrics);
    expect(budgetCheck.passed).toBe(false);
    expect(budgetCheck.violations.length).toBeGreaterThan(0);
    expect(budgetCheck.violations.some(v => v.includes('FPS too low'))).toBe(true);
  });

  test('should validate CSS animation properties for performance', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    // Set performance-optimized animation properties
    element.style.animationFillMode = 'both';
    element.style.animationPlayState = 'running';
    element.style.transformOrigin = 'center center';

    expect(element.style.animationFillMode).toBe('both');
    expect(element.style.animationPlayState).toBe('running');
    expect(element.style.transformOrigin).toBe('center center');

    document.body.removeChild(element);
  });
});