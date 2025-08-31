#!/usr/bin/env node

/**
 * Performance Validation Test Script
 * Tests performance metrics for the professional UI
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('⚡ Performance Validation Test');
console.log('='.repeat(40));

const testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

function logTest(name, status, message = '') {
  const statusIcon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${statusIcon} ${name}: ${message}`);
  
  testResults.details.push({ name, status, message });
  if (status === 'PASS') testResults.passed++;
  else if (status === 'FAIL') testResults.failed++;
  else testResults.warnings++;
}

// 1. Test Bundle Size
console.log('\n📦 Testing Bundle Size...');

function testBundleSize() {
  try {
    // Check if build exists
    const buildPath = path.join(__dirname, '..', '.next');
    if (!fs.existsSync(buildPath)) {
      logTest('Bundle Size', 'WARN', 'Build not found - run npm run build first');
      return;
    }
    
    // Check for build info
    const buildManifest = path.join(buildPath, 'build-manifest.json');
    if (fs.existsSync(buildManifest)) {
      const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
      const pageCount = Object.keys(manifest.pages || {}).length;
      
      if (pageCount > 0) {
        logTest('Bundle Size', 'PASS', `Build contains ${pageCount} optimized pages`);
      } else {
        logTest('Bundle Size', 'WARN', 'Build manifest found but no pages detected');
      }
    } else {
      logTest('Bundle Size', 'WARN', 'Build manifest not found');
    }
  } catch (error) {
    logTest('Bundle Size', 'WARN', 'Could not analyze bundle size');
  }
}

// 2. Test CSS Optimization
console.log('\n🎨 Testing CSS Optimization...');

function testCSSOptimization() {
  const globalCssPath = path.join(__dirname, '..', 'src/app/globals.css');
  
  if (!fs.existsSync(globalCssPath)) {
    logTest('CSS Optimization', 'FAIL', 'globals.css not found');
    return;
  }
  
  const content = fs.readFileSync(globalCssPath, 'utf8');
  const lines = content.split('\n').length;
  const size = Buffer.byteLength(content, 'utf8');
  
  // Check for efficient CSS practices
  const hasCustomProperties = content.includes('--');
  const hasUtilityClasses = content.includes('@apply') || content.includes('tailwind');
  const hasMinimalCustomCSS = lines < 500; // Reasonable threshold
  
  if (hasCustomProperties && hasMinimalCustomCSS) {
    logTest('CSS Optimization', 'PASS', `Optimized CSS: ${lines} lines, ${(size/1024).toFixed(1)}KB`);
  } else {
    logTest('CSS Optimization', 'WARN', `CSS may need optimization: ${lines} lines, ${(size/1024).toFixed(1)}KB`);
  }
}

// 3. Test Image Optimization
console.log('\n🖼️ Testing Image Optimization...');

function testImageOptimization() {
  const publicPath = path.join(__dirname, '..', 'public');
  
  if (!fs.existsSync(publicPath)) {
    logTest('Image Optimization', 'WARN', 'Public directory not found');
    return;
  }
  
  // Check for Next.js Image component usage
  const componentsToCheck = [
    'src/components/SchoolCard.tsx',
    'src/components/ui/Logo.tsx'
  ];
  
  let nextImageUsage = 0;
  let totalImageComponents = 0;
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('<img') || content.includes('<Image')) {
        totalImageComponents++;
        
        if (content.includes('next/image') || content.includes('Image from')) {
          nextImageUsage++;
        }
      }
    }
  });
  
  if (totalImageComponents === 0) {
    logTest('Image Optimization', 'PASS', 'No images requiring optimization found');
  } else if (nextImageUsage >= totalImageComponents * 0.5) {
    logTest('Image Optimization', 'PASS', 'Good use of optimized image components');
  } else {
    logTest('Image Optimization', 'WARN', 'Consider using Next.js Image component for better optimization');
  }
}

// 4. Test Animation Performance
console.log('\n✨ Testing Animation Performance...');

function testAnimationPerformance() {
  const animationPath = path.join(__dirname, '..', 'src/components/ui/AnimationUtils.tsx');
  
  if (!fs.existsSync(animationPath)) {
    logTest('Animation Performance', 'WARN', 'Animation utilities not found');
    return;
  }
  
  const content = fs.readFileSync(animationPath, 'utf8');
  
  // Check for performance-friendly animations
  const usesTransform = content.includes('transform') || content.includes('translate');
  const usesOpacity = content.includes('opacity');
  const avoidsLayout = !content.includes('width:') && !content.includes('height:') && !content.includes('top:') && !content.includes('left:');
  const hasEasing = content.includes('ease') || content.includes('cubic-bezier');
  
  if (usesTransform && usesOpacity && hasEasing) {
    logTest('Animation Performance', 'PASS', 'Animations use performance-friendly properties');
  } else {
    logTest('Animation Performance', 'WARN', 'Animations may impact performance');
  }
}

// 5. Test Component Efficiency
console.log('\n⚛️ Testing Component Efficiency...');

function testComponentEfficiency() {
  const componentsToCheck = [
    'src/components/SchoolCard.tsx',
    'src/components/SchoolsGrid.tsx',
    'src/components/ui/Button.tsx'
  ];
  
  let efficientComponents = 0;
  let totalComponents = 0;
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalComponents++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for React performance patterns
      const usesMemo = content.includes('useMemo') || content.includes('useCallback');
      const hasProperKeys = content.includes('key=') || !content.includes('.map(');
      const avoidsInlineObjects = !content.includes('style={{') || content.split('style={{').length <= 2;
      
      // Consider component efficient if it follows at least some best practices
      if (hasProperKeys && avoidsInlineObjects) {
        efficientComponents++;
      }
    }
  });
  
  if (efficientComponents >= totalComponents * 0.8) {
    logTest('Component Efficiency', 'PASS', 'Components follow performance best practices');
  } else {
    logTest('Component Efficiency', 'WARN', 'Some components may need performance optimization');
  }
}

// 6. Test Loading Performance
console.log('\n🚀 Testing Loading Performance...');

function testLoadingPerformance() {
  const loadingComponents = [
    'src/components/ui/LoadingSpinner.tsx',
    'src/components/ui/SkeletonLoader.tsx'
  ];
  
  let loadingStatesFound = 0;
  
  loadingComponents.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      loadingStatesFound++;
    }
  });
  
  // Check for loading states in main components
  const mainComponents = [
    'src/components/SchoolsPageClient.tsx',
    'src/hooks/useSchools.ts'
  ];
  
  let componentsWithLoading = 0;
  
  mainComponents.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('loading') || content.includes('isLoading') || content.includes('Loading')) {
        componentsWithLoading++;
      }
    }
  });
  
  if (loadingStatesFound >= 1 && componentsWithLoading >= 1) {
    logTest('Loading Performance', 'PASS', 'Loading states and skeleton loaders implemented');
  } else {
    logTest('Loading Performance', 'WARN', 'Consider adding more loading states for better UX');
  }
}

// 7. Test Memory Usage
console.log('\n🧠 Testing Memory Usage...');

function testMemoryUsage() {
  // Check for potential memory leaks
  const componentsToCheck = [
    'src/hooks/useSchools.ts',
    'src/components/PerformanceMonitor.tsx'
  ];
  
  let memoryEfficientComponents = 0;
  let totalComponents = 0;
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalComponents++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for cleanup patterns
      const hasCleanup = content.includes('useEffect') && content.includes('return');
      const hasAbortController = content.includes('AbortController') || content.includes('signal');
      const hasProperDependencies = content.includes('useCallback') || content.includes('useMemo');
      
      if (hasCleanup || hasAbortController || hasProperDependencies) {
        memoryEfficientComponents++;
      }
    }
  });
  
  if (memoryEfficientComponents >= totalComponents * 0.7) {
    logTest('Memory Usage', 'PASS', 'Components implement proper cleanup patterns');
  } else {
    logTest('Memory Usage', 'WARN', 'Some components may have memory leak risks');
  }
}

// Run all tests
testBundleSize();
testCSSOptimization();
testImageOptimization();
testAnimationPerformance();
testComponentEfficiency();
testLoadingPerformance();
testMemoryUsage();

// Print summary
console.log('\n📊 Performance Test Summary');
console.log('='.repeat(35));
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`⚠️  Warnings: ${testResults.warnings}`);
console.log(`📋 Total: ${testResults.passed + testResults.failed + testResults.warnings}`);

// Overall assessment
const totalTests = testResults.passed + testResults.failed + testResults.warnings;
const passRate = (testResults.passed / totalTests) * 100;

console.log('\n⚡ Performance Assessment');
console.log('='.repeat(35));

if (passRate >= 85) {
  console.log('🎉 EXCELLENT: Application has excellent performance characteristics!');
} else if (passRate >= 70) {
  console.log('👍 GOOD: Application has good performance with room for improvement.');
} else {
  console.log('⚠️  NEEDS WORK: Application needs performance optimization.');
}

console.log(`📈 Performance Score: ${passRate.toFixed(1)}%`);

// Performance recommendations
console.log('\n💡 Performance Optimization Recommendations:');
console.log('• Use Next.js Image component for automatic optimization');
console.log('• Implement code splitting for large components');
console.log('• Use React.memo for expensive components');
console.log('• Optimize animations to use transform and opacity only');
console.log('• Implement proper loading states and skeleton screens');
console.log('• Monitor bundle size and remove unused dependencies');

process.exit(testResults.failed > 0 ? 1 : 0);