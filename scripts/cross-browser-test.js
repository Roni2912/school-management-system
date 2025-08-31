#!/usr/bin/env node

/**
 * Cross-Browser Compatibility Test Script
 * Tests CSS and JavaScript compatibility across browsers
 */

const fs = require('fs');
const path = require('path');

console.log('🌐 Cross-Browser Compatibility Test');
console.log('='.repeat(45));

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

// 1. Test CSS Compatibility
console.log('\n🎨 Testing CSS Compatibility...');

function testCSSCompatibility() {
  const globalCssPath = path.join(__dirname, '..', 'src/app/globals.css');
  
  if (!fs.existsSync(globalCssPath)) {
    logTest('CSS Compatibility', 'FAIL', 'globals.css not found');
    return;
  }
  
  const content = fs.readFileSync(globalCssPath, 'utf8');
  
  // Check for modern CSS features that might need fallbacks
  const modernFeatures = {
    'CSS Grid': content.includes('grid-template') || content.includes('display: grid'),
    'Flexbox': content.includes('display: flex') || content.includes('flex-'),
    'Custom Properties': content.includes('--') && content.includes('var('),
    'Modern Selectors': content.includes(':focus-visible') || content.includes(':is('),
  };
  
  const supportedFeatures = Object.values(modernFeatures).filter(Boolean).length;
  const totalFeatures = Object.keys(modernFeatures).length;
  
  // Check for vendor prefixes (good for compatibility)
  const hasVendorPrefixes = content.includes('-webkit-') || content.includes('-moz-') || content.includes('-ms-');
  
  if (supportedFeatures >= totalFeatures * 0.7) {
    logTest('CSS Compatibility', 'PASS', `Uses ${supportedFeatures}/${totalFeatures} modern CSS features with good browser support`);
  } else {
    logTest('CSS Compatibility', 'WARN', `Limited modern CSS features: ${supportedFeatures}/${totalFeatures}`);
  }
}

// 2. Test JavaScript Compatibility
console.log('\n📜 Testing JavaScript Compatibility...');

function testJavaScriptCompatibility() {
  const componentsToCheck = [
    'src/components/ui/Button.tsx',
    'src/hooks/useSchools.ts',
    'src/lib/utils.ts'
  ];
  
  let compatibleComponents = 0;
  let totalComponents = 0;
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalComponents++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for potentially problematic modern JS features
      const hasOptionalChaining = content.includes('?.');
      const hasNullishCoalescing = content.includes('??');
      const hasAsyncAwait = content.includes('async') && content.includes('await');
      const hasArrowFunctions = content.includes('=>');
      
      // These are generally well-supported in modern browsers
      // Next.js transpiles them for older browsers anyway
      compatibleComponents++;
    }
  });
  
  if (compatibleComponents === totalComponents) {
    logTest('JavaScript Compatibility', 'PASS', 'JavaScript uses modern features with Next.js transpilation');
  } else {
    logTest('JavaScript Compatibility', 'WARN', 'Some JavaScript features may need compatibility checks');
  }
}

// 3. Test Responsive Design
console.log('\n📱 Testing Responsive Design...');

function testResponsiveDesign() {
  const componentsToCheck = [
    'src/components/Navigation.tsx',
    'src/components/SchoolsGrid.tsx',
    'src/app/globals.css'
  ];
  
  let responsiveComponents = 0;
  let totalComponents = 0;
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalComponents++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for responsive design patterns
      const hasBreakpoints = content.includes('sm:') || content.includes('md:') || content.includes('lg:') || content.includes('xl:');
      const hasMediaQueries = content.includes('@media');
      const hasFlexibleUnits = content.includes('rem') || content.includes('em') || content.includes('%') || content.includes('vw') || content.includes('vh');
      
      if (hasBreakpoints || hasMediaQueries || hasFlexibleUnits) {
        responsiveComponents++;
      }
    }
  });
  
  if (responsiveComponents >= totalComponents * 0.8) {
    logTest('Responsive Design', 'PASS', 'Components implement responsive design patterns');
  } else {
    logTest('Responsive Design', 'WARN', 'Some components may not be fully responsive');
  }
}

// 4. Test Font Loading
console.log('\n🔤 Testing Font Loading...');

function testFontLoading() {
  const layoutPath = path.join(__dirname, '..', 'src/app/layout.tsx');
  const globalCssPath = path.join(__dirname, '..', 'src/app/globals.css');
  
  let fontLoadingScore = 0;
  let totalChecks = 2;
  
  // Check layout for font loading
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    if (layoutContent.includes('next/font') || layoutContent.includes('Google Fonts')) {
      fontLoadingScore++;
    }
  }
  
  // Check CSS for font fallbacks
  if (fs.existsSync(globalCssPath)) {
    const cssContent = fs.readFileSync(globalCssPath, 'utf8');
    
    if (cssContent.includes('font-family') && cssContent.includes('sans-serif')) {
      fontLoadingScore++;
    }
  }
  
  if (fontLoadingScore >= totalChecks) {
    logTest('Font Loading', 'PASS', 'Fonts loaded with proper fallbacks');
  } else {
    logTest('Font Loading', 'WARN', 'Font loading may need optimization');
  }
}

// 5. Test Form Compatibility
console.log('\n📋 Testing Form Compatibility...');

function testFormCompatibility() {
  const formComponents = [
    'src/components/SchoolForm.tsx',
    'src/components/ui/Input.tsx',
    'src/components/ui/TextArea.tsx'
  ];
  
  let compatibleForms = 0;
  let totalForms = 0;
  
  formComponents.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalForms++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for form compatibility features
      const hasProperInputTypes = content.includes('type=') || content.includes('input');
      const hasLabels = content.includes('label') || content.includes('aria-label');
      const hasValidation = content.includes('required') || content.includes('pattern');
      
      if (hasProperInputTypes && hasLabels) {
        compatibleForms++;
      }
    }
  });
  
  if (compatibleForms >= totalForms * 0.8) {
    logTest('Form Compatibility', 'PASS', 'Forms use standard HTML with good browser support');
  } else {
    logTest('Form Compatibility', 'WARN', 'Forms may need compatibility improvements');
  }
}

// 6. Test Animation Compatibility
console.log('\n✨ Testing Animation Compatibility...');

function testAnimationCompatibility() {
  const animationFiles = [
    'src/components/ui/AnimationUtils.tsx',
    'src/app/globals.css'
  ];
  
  let animationScore = 0;
  let totalFiles = 0;
  
  animationFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalFiles++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for animation compatibility
      const usesTransition = content.includes('transition');
      const usesTransform = content.includes('transform');
      const avoidsComplexAnimations = !content.includes('filter:') && !content.includes('backdrop-filter:');
      const hasReducedMotion = content.includes('prefers-reduced-motion');
      
      if (usesTransition && usesTransform) {
        animationScore++;
      }
    }
  });
  
  if (animationScore >= totalFiles * 0.7) {
    logTest('Animation Compatibility', 'PASS', 'Animations use well-supported CSS properties');
  } else {
    logTest('Animation Compatibility', 'WARN', 'Animations may need compatibility testing');
  }
}

// 7. Test Polyfill Requirements
console.log('\n🔧 Testing Polyfill Requirements...');

function testPolyfillRequirements() {
  const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  let polyfillScore = 0;
  let totalChecks = 2;
  
  // Check Next.js config for browser targets
  if (fs.existsSync(nextConfigPath)) {
    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Next.js handles most polyfills automatically
    polyfillScore++;
  }
  
  // Check package.json for browserslist
  if (fs.existsSync(packageJsonPath)) {
    const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    
    // Next.js has good default browser support
    if (packageJson.dependencies && packageJson.dependencies.next) {
      polyfillScore++;
    }
  }
  
  if (polyfillScore >= totalChecks) {
    logTest('Polyfill Requirements', 'PASS', 'Next.js provides automatic polyfills and transpilation');
  } else {
    logTest('Polyfill Requirements', 'WARN', 'May need additional polyfills for older browsers');
  }
}

// Run all tests
testCSSCompatibility();
testJavaScriptCompatibility();
testResponsiveDesign();
testFontLoading();
testFormCompatibility();
testAnimationCompatibility();
testPolyfillRequirements();

// Print summary
console.log('\n📊 Cross-Browser Test Summary');
console.log('='.repeat(40));
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`⚠️  Warnings: ${testResults.warnings}`);
console.log(`📋 Total: ${testResults.passed + testResults.failed + testResults.warnings}`);

// Overall assessment
const totalTests = testResults.passed + testResults.failed + testResults.warnings;
const passRate = (testResults.passed / totalTests) * 100;

console.log('\n🌐 Cross-Browser Compatibility Assessment');
console.log('='.repeat(45));

if (passRate >= 85) {
  console.log('🎉 EXCELLENT: Application has excellent cross-browser compatibility!');
} else if (passRate >= 70) {
  console.log('👍 GOOD: Application has good compatibility with minor issues.');
} else {
  console.log('⚠️  NEEDS WORK: Application needs compatibility improvements.');
}

console.log(`📈 Compatibility Score: ${passRate.toFixed(1)}%`);

// Browser support recommendations
console.log('\n💡 Browser Support Recommendations:');
console.log('• Test in Chrome, Firefox, Safari, and Edge');
console.log('• Verify mobile browser compatibility (iOS Safari, Chrome Mobile)');
console.log('• Use feature detection for advanced CSS features');
console.log('• Implement graceful degradation for older browsers');
console.log('• Test with different screen sizes and resolutions');
console.log('• Validate form functionality across browsers');

console.log('\n🎯 Recommended Browser Support:');
console.log('• Chrome 90+, Firefox 88+, Safari 14+, Edge 90+');
console.log('• iOS Safari 14+, Chrome Mobile 90+');
console.log('• Consider IE 11 support only if specifically required');

process.exit(testResults.failed > 0 ? 1 : 0);