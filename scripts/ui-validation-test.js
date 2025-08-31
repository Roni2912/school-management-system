#!/usr/bin/env node

/**
 * Comprehensive UI Validation Test Script
 * Tests all aspects of the professional UI redesign implementation
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Professional UI Implementation Validation Test');
console.log('='.repeat(50));

// Test results tracking
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

// 1. Test Theme System Removal
console.log('\n📋 Testing Theme System Removal...');

function testThemeRemoval() {
  const filesToCheck = [
    'src/app/globals.css',
    'src/components/Navigation.tsx',
    'src/app/layout.tsx'
  ];
  
  let darkModeReferences = 0;
  let themeToggleReferences = 0;
  
  filesToCheck.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for dark mode references
      const darkModeMatches = content.match(/dark:|dark-mode|darkMode/gi) || [];
      darkModeReferences += darkModeMatches.length;
      
      // Check for theme toggle references
      const themeToggleMatches = content.match(/theme.*toggle|toggle.*theme/gi) || [];
      themeToggleReferences += themeToggleMatches.length;
    }
  });
  
  if (darkModeReferences === 0 && themeToggleReferences === 0) {
    logTest('Theme System Removal', 'PASS', 'No dark mode or theme toggle references found');
  } else {
    logTest('Theme System Removal', 'FAIL', `Found ${darkModeReferences} dark mode and ${themeToggleReferences} theme toggle references`);
  }
}

// 2. Test Professional Color System
console.log('\n🎨 Testing Professional Color System...');

function testColorSystem() {
  const globalCssPath = path.join(__dirname, '..', 'src/app/globals.css');
  
  if (!fs.existsSync(globalCssPath)) {
    logTest('Professional Color System', 'FAIL', 'globals.css not found');
    return;
  }
  
  const content = fs.readFileSync(globalCssPath, 'utf8');
  
  // Check for professional color variables
  const requiredColors = [
    '--primary-50',
    '--primary-500',
    '--primary-600',
    '--gray-50',
    '--gray-900'
  ];
  
  const missingColors = requiredColors.filter(color => !content.includes(color));
  
  if (missingColors.length === 0) {
    logTest('Professional Color System', 'PASS', 'All required color variables found');
  } else {
    logTest('Professional Color System', 'FAIL', `Missing colors: ${missingColors.join(', ')}`);
  }
}

// 3. Test Typography System
console.log('\n📝 Testing Typography System...');

function testTypographySystem() {
  const globalCssPath = path.join(__dirname, '..', 'src/app/globals.css');
  
  if (!fs.existsSync(globalCssPath)) {
    logTest('Typography System', 'FAIL', 'globals.css not found');
    return;
  }
  
  const content = fs.readFileSync(globalCssPath, 'utf8');
  
  // Check for professional fonts
  const hasInter = content.includes('Inter') || content.includes('font-sans');
  const hasPoppins = content.includes('Poppins') || content.includes('font-heading');
  
  if (hasInter && hasPoppins) {
    logTest('Typography System', 'PASS', 'Professional fonts (Inter, Poppins) configured');
  } else {
    logTest('Typography System', 'WARN', 'Some professional fonts may be missing');
  }
}

// 4. Test Logo Implementation
console.log('\n🏢 Testing Logo Implementation...');

function testLogoImplementation() {
  const logoPath = path.join(__dirname, '..', 'src/components/ui/Logo.tsx');
  
  if (!fs.existsSync(logoPath)) {
    logTest('Logo Implementation', 'FAIL', 'Logo component not found');
    return;
  }
  
  const content = fs.readFileSync(logoPath, 'utf8');
  
  // Check for logo variants
  const hasFullVariant = content.includes("variant === 'full'") || content.includes("// Full logo (default)");
  const hasIconVariant = content.includes("variant === 'icon'");
  const hasTextVariant = content.includes("variant === 'text'");
  const hasSVG = content.includes('<svg');
  const hasSchoolHub = content.includes('SchoolHub');
  
  if (hasFullVariant && hasIconVariant && hasTextVariant && hasSVG && hasSchoolHub) {
    logTest('Logo Implementation', 'PASS', 'Professional logo with all variants implemented');
  } else {
    logTest('Logo Implementation', 'FAIL', 'Logo implementation incomplete');
  }
}

// 5. Test Navigation System
console.log('\n🧭 Testing Navigation System...');

function testNavigationSystem() {
  const navPath = path.join(__dirname, '..', 'src/components/Navigation.tsx');
  
  if (!fs.existsSync(navPath)) {
    logTest('Navigation System', 'FAIL', 'Navigation component not found');
    return;
  }
  
  const content = fs.readFileSync(navPath, 'utf8');
  
  // Check for professional navigation features
  const hasLogo = content.includes('Logo');
  const hasNavLinks = content.includes('nav') || content.includes('navigation');
  const hasResponsive = content.includes('mobile') || content.includes('md:') || content.includes('lg:');
  
  if (hasLogo && hasNavLinks && hasResponsive) {
    logTest('Navigation System', 'PASS', 'Professional navigation with logo and responsive design');
  } else {
    logTest('Navigation System', 'WARN', 'Navigation system may need improvements');
  }
}

// 6. Test Button Component
console.log('\n🔘 Testing Button Component...');

function testButtonComponent() {
  const buttonPath = path.join(__dirname, '..', 'src/components/ui/Button.tsx');
  
  if (!fs.existsSync(buttonPath)) {
    logTest('Button Component', 'FAIL', 'Button component not found');
    return;
  }
  
  const content = fs.readFileSync(buttonPath, 'utf8');
  
  // Check for button variants
  const hasPrimary = content.includes('primary');
  const hasSecondary = content.includes('secondary');
  const hasHoverEffects = content.includes('hover:');
  const hasLoadingState = content.includes('loading') || content.includes('disabled');
  
  if (hasPrimary && hasSecondary && hasHoverEffects && hasLoadingState) {
    logTest('Button Component', 'PASS', 'Professional button with variants and states');
  } else {
    logTest('Button Component', 'WARN', 'Button component may need additional features');
  }
}

// 7. Test Input Components
console.log('\n📝 Testing Input Components...');

function testInputComponents() {
  const inputPath = path.join(__dirname, '..', 'src/components/ui/Input.tsx');
  const textAreaPath = path.join(__dirname, '..', 'src/components/ui/TextArea.tsx');
  
  let inputScore = 0;
  let totalInputTests = 2;
  
  if (fs.existsSync(inputPath)) {
    const inputContent = fs.readFileSync(inputPath, 'utf8');
    const hasFocusStates = inputContent.includes('focus:');
    const hasErrorStates = inputContent.includes('error');
    
    if (hasFocusStates && hasErrorStates) {
      inputScore++;
    }
  }
  
  if (fs.existsSync(textAreaPath)) {
    const textAreaContent = fs.readFileSync(textAreaPath, 'utf8');
    const hasTextAreaStyling = textAreaContent.includes('textarea') || textAreaContent.includes('TextArea');
    
    if (hasTextAreaStyling) {
      inputScore++;
    }
  }
  
  if (inputScore === totalInputTests) {
    logTest('Input Components', 'PASS', 'Professional input and textarea components implemented');
  } else {
    logTest('Input Components', 'WARN', `${inputScore}/${totalInputTests} input components found`);
  }
}

// 8. Test School Card Design
console.log('\n🏫 Testing School Card Design...');

function testSchoolCardDesign() {
  const cardPath = path.join(__dirname, '..', 'src/components/SchoolCard.tsx');
  
  if (!fs.existsSync(cardPath)) {
    logTest('School Card Design', 'FAIL', 'SchoolCard component not found');
    return;
  }
  
  const content = fs.readFileSync(cardPath, 'utf8');
  
  // Check for professional card features
  const hasHoverEffects = content.includes('hover:');
  const hasShadows = content.includes('shadow');
  const hasRoundedCorners = content.includes('rounded');
  const hasImageHandling = content.includes('img') || content.includes('Image');
  
  if (hasHoverEffects && hasShadows && hasRoundedCorners && hasImageHandling) {
    logTest('School Card Design', 'PASS', 'Professional school card with hover effects and styling');
  } else {
    logTest('School Card Design', 'WARN', 'School card design may need improvements');
  }
}

// 9. Test Responsive Grid System
console.log('\n📱 Testing Responsive Grid System...');

function testGridSystem() {
  const gridPath = path.join(__dirname, '..', 'src/components/ui/ProfessionalGrid.tsx');
  const schoolsGridPath = path.join(__dirname, '..', 'src/components/SchoolsGrid.tsx');
  
  let hasGrid = false;
  let hasResponsive = false;
  
  [gridPath, schoolsGridPath].forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('grid')) {
        hasGrid = true;
      }
      
      if (content.includes('sm:') || content.includes('md:') || content.includes('lg:')) {
        hasResponsive = true;
      }
    }
  });
  
  if (hasGrid && hasResponsive) {
    logTest('Responsive Grid System', 'PASS', 'Professional responsive grid system implemented');
  } else {
    logTest('Responsive Grid System', 'WARN', 'Grid system may need responsive improvements');
  }
}

// 10. Test Animation System
console.log('\n✨ Testing Animation System...');

function testAnimationSystem() {
  const animationPath = path.join(__dirname, '..', 'src/components/ui/AnimationUtils.tsx');
  
  if (!fs.existsSync(animationPath)) {
    logTest('Animation System', 'WARN', 'AnimationUtils component not found');
    return;
  }
  
  const content = fs.readFileSync(animationPath, 'utf8');
  
  // Check for animation features
  const hasTransitions = content.includes('transition');
  const hasAnimations = content.includes('animate') || content.includes('animation');
  const hasEasing = content.includes('ease') || content.includes('cubic-bezier');
  
  if (hasTransitions && hasAnimations) {
    logTest('Animation System', 'PASS', 'Professional animation system implemented');
  } else {
    logTest('Animation System', 'WARN', 'Animation system may need improvements');
  }
}

// Run all tests
testThemeRemoval();
testColorSystem();
testTypographySystem();
testLogoImplementation();
testNavigationSystem();
testButtonComponent();
testInputComponents();
testSchoolCardDesign();
testGridSystem();
testAnimationSystem();

// Print summary
console.log('\n📊 Test Summary');
console.log('='.repeat(30));
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`⚠️  Warnings: ${testResults.warnings}`);
console.log(`📋 Total: ${testResults.passed + testResults.failed + testResults.warnings}`);

// Overall assessment
const totalTests = testResults.passed + testResults.failed + testResults.warnings;
const passRate = (testResults.passed / totalTests) * 100;

console.log('\n🎯 Overall Assessment');
console.log('='.repeat(30));

if (passRate >= 80) {
  console.log('🎉 EXCELLENT: Professional UI implementation is highly successful!');
} else if (passRate >= 60) {
  console.log('👍 GOOD: Professional UI implementation is mostly successful with minor improvements needed.');
} else {
  console.log('⚠️  NEEDS WORK: Professional UI implementation needs significant improvements.');
}

console.log(`📈 Success Rate: ${passRate.toFixed(1)}%`);

// Exit with appropriate code
process.exit(testResults.failed > 0 ? 1 : 0);