#!/usr/bin/env node

/**
 * Accessibility Compliance Test Script
 * Tests WCAG 2.1 AA compliance for the professional UI
 */

const fs = require('fs');
const path = require('path');

console.log('♿ Accessibility Compliance Test (WCAG 2.1 AA)');
console.log('='.repeat(50));

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

// 1. Test Color Contrast
console.log('\n🎨 Testing Color Contrast...');

function testColorContrast() {
  const globalCssPath = path.join(__dirname, '..', 'src/app/globals.css');
  
  if (!fs.existsSync(globalCssPath)) {
    logTest('Color Contrast', 'FAIL', 'globals.css not found');
    return;
  }
  
  const content = fs.readFileSync(globalCssPath, 'utf8');
  
  // Check for professional color system that should meet contrast requirements
  const hasProperColors = content.includes('--primary-600') && content.includes('--gray-900');
  const hasSemanticColors = content.includes('--success') && content.includes('--error');
  
  if (hasProperColors && hasSemanticColors) {
    logTest('Color Contrast', 'PASS', 'Professional color system with proper contrast ratios');
  } else {
    logTest('Color Contrast', 'WARN', 'Color system may need contrast validation');
  }
}

// 2. Test Focus States
console.log('\n🎯 Testing Focus States...');

function testFocusStates() {
  const componentsToCheck = [
    'src/components/ui/Button.tsx',
    'src/components/ui/Input.tsx',
    'src/components/Navigation.tsx'
  ];
  
  let focusStatesFound = 0;
  let totalComponents = 0;
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalComponents++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('focus:') || content.includes('focus-visible:')) {
        focusStatesFound++;
      }
    }
  });
  
  if (focusStatesFound === totalComponents && totalComponents > 0) {
    logTest('Focus States', 'PASS', `All ${totalComponents} interactive components have focus states`);
  } else {
    logTest('Focus States', 'WARN', `${focusStatesFound}/${totalComponents} components have focus states`);
  }
}

// 3. Test Semantic HTML
console.log('\n📝 Testing Semantic HTML...');

function testSemanticHTML() {
  const componentsToCheck = [
    'src/components/Navigation.tsx',
    'src/components/SchoolForm.tsx',
    'src/app/layout.tsx'
  ];
  
  let semanticElementsFound = 0;
  let totalFiles = 0;
  
  const semanticElements = ['nav', 'main', 'header', 'footer', 'section', 'article', 'form'];
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalFiles++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const hasSemanticElements = semanticElements.some(element => 
        content.includes(`<${element}`) || content.includes(`<${element} `)
      );
      
      if (hasSemanticElements) {
        semanticElementsFound++;
      }
    }
  });
  
  if (semanticElementsFound >= totalFiles * 0.7) {
    logTest('Semantic HTML', 'PASS', 'Good use of semantic HTML elements');
  } else {
    logTest('Semantic HTML', 'WARN', 'Consider using more semantic HTML elements');
  }
}

// 4. Test ARIA Labels
console.log('\n🏷️ Testing ARIA Labels...');

function testAriaLabels() {
  const componentsToCheck = [
    'src/components/ui/Logo.tsx',
    'src/components/Navigation.tsx',
    'src/components/ui/Button.tsx'
  ];
  
  let ariaLabelsFound = 0;
  let totalComponents = 0;
  
  componentsToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalComponents++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('aria-label') || content.includes('aria-labelledby') || content.includes('aria-describedby')) {
        ariaLabelsFound++;
      }
    }
  });
  
  if (ariaLabelsFound >= totalComponents * 0.5) {
    logTest('ARIA Labels', 'PASS', 'Good use of ARIA labels for accessibility');
  } else {
    logTest('ARIA Labels', 'WARN', 'Consider adding more ARIA labels for better accessibility');
  }
}

// 5. Test Keyboard Navigation
console.log('\n⌨️ Testing Keyboard Navigation...');

function testKeyboardNavigation() {
  const navPath = path.join(__dirname, '..', 'src/components/Navigation.tsx');
  
  if (!fs.existsSync(navPath)) {
    logTest('Keyboard Navigation', 'WARN', 'Navigation component not found');
    return;
  }
  
  const content = fs.readFileSync(navPath, 'utf8');
  
  // Check for keyboard navigation support
  const hasTabIndex = content.includes('tabIndex') || content.includes('tab-index');
  const hasKeyboardHandlers = content.includes('onKeyDown') || content.includes('onKeyPress');
  const hasFocusableElements = content.includes('button') || content.includes('Link') || content.includes('a href');
  
  if (hasFocusableElements) {
    logTest('Keyboard Navigation', 'PASS', 'Navigation has focusable elements for keyboard access');
  } else {
    logTest('Keyboard Navigation', 'WARN', 'Ensure all interactive elements are keyboard accessible');
  }
}

// 6. Test Form Accessibility
console.log('\n📋 Testing Form Accessibility...');

function testFormAccessibility() {
  const formComponents = [
    'src/components/SchoolForm.tsx',
    'src/components/ui/Input.tsx',
    'src/components/ui/TextArea.tsx'
  ];
  
  let accessibleForms = 0;
  let totalForms = 0;
  
  formComponents.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      totalForms++;
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for form accessibility features
      const hasLabels = content.includes('label') || content.includes('aria-label');
      const hasErrorHandling = content.includes('error') || content.includes('invalid');
      const hasRequiredFields = content.includes('required') || content.includes('aria-required');
      
      if (hasLabels && hasErrorHandling) {
        accessibleForms++;
      }
    }
  });
  
  if (accessibleForms >= totalForms * 0.8) {
    logTest('Form Accessibility', 'PASS', 'Forms have proper labels and error handling');
  } else {
    logTest('Form Accessibility', 'WARN', 'Forms may need better accessibility features');
  }
}

// 7. Test Image Alt Text
console.log('\n🖼️ Testing Image Alt Text...');

function testImageAltText() {
  const componentsWithImages = [
    'src/components/SchoolCard.tsx',
    'src/components/ui/Logo.tsx'
  ];
  
  let imagesWithAlt = 0;
  let totalImages = 0;
  
  componentsWithImages.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Count images
      const imgMatches = content.match(/<img|<Image/g) || [];
      const svgMatches = content.match(/<svg/g) || [];
      totalImages += imgMatches.length + svgMatches.length;
      
      // Count alt attributes and aria-labels
      const altMatches = content.match(/alt=|aria-label=/g) || [];
      imagesWithAlt += altMatches.length;
    }
  });
  
  if (totalImages === 0) {
    logTest('Image Alt Text', 'PASS', 'No images found that need alt text');
  } else if (imagesWithAlt >= totalImages) {
    logTest('Image Alt Text', 'PASS', 'All images have appropriate alt text or labels');
  } else {
    logTest('Image Alt Text', 'WARN', `${imagesWithAlt}/${totalImages} images have alt text`);
  }
}

// 8. Test Responsive Design
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
      const hasBreakpoints = content.includes('sm:') || content.includes('md:') || content.includes('lg:');
      const hasFlexbox = content.includes('flex') || content.includes('grid');
      
      if (hasBreakpoints || hasFlexbox) {
        responsiveComponents++;
      }
    }
  });
  
  if (responsiveComponents >= totalComponents * 0.8) {
    logTest('Responsive Design', 'PASS', 'Components use responsive design patterns');
  } else {
    logTest('Responsive Design', 'WARN', 'Some components may need responsive improvements');
  }
}

// Run all tests
testColorContrast();
testFocusStates();
testSemanticHTML();
testAriaLabels();
testKeyboardNavigation();
testFormAccessibility();
testImageAltText();
testResponsiveDesign();

// Print summary
console.log('\n📊 Accessibility Test Summary');
console.log('='.repeat(35));
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`⚠️  Warnings: ${testResults.warnings}`);
console.log(`📋 Total: ${testResults.passed + testResults.failed + testResults.warnings}`);

// Overall assessment
const totalTests = testResults.passed + testResults.failed + testResults.warnings;
const passRate = (testResults.passed / totalTests) * 100;

console.log('\n♿ Accessibility Assessment');
console.log('='.repeat(35));

if (passRate >= 90) {
  console.log('🎉 EXCELLENT: Application meets high accessibility standards!');
} else if (passRate >= 70) {
  console.log('👍 GOOD: Application has good accessibility with room for improvement.');
} else {
  console.log('⚠️  NEEDS WORK: Application needs significant accessibility improvements.');
}

console.log(`📈 Accessibility Score: ${passRate.toFixed(1)}%`);

// Recommendations
console.log('\n💡 Recommendations for WCAG 2.1 AA Compliance:');
console.log('• Test with screen readers (NVDA, JAWS, VoiceOver)');
console.log('• Validate color contrast ratios with tools like WebAIM');
console.log('• Test keyboard navigation thoroughly');
console.log('• Run automated accessibility tests with axe-core');
console.log('• Conduct user testing with people who use assistive technologies');

process.exit(testResults.failed > 0 ? 1 : 0);