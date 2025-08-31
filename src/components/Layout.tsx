import React from 'react';
import Navigation from './Navigation';
import { PageTransition } from './ui/AnimationUtils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className={className}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      {/* Professional Footer */}
      <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-medium">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">SchoolHub Pro</h3>
                  <p className="text-sm text-gray-600 font-medium">Professional School Management</p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed max-w-lg">
                Enterprise-grade school management system designed for educational institutions worldwide. 
                Streamline administration, enhance communication, and deliver exceptional educational experiences 
                with our comprehensive platform.
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2 leading-none">99.9%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2 leading-none">24/7</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2 leading-none">WCAG</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Compliant</div>
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Platform Features</h4>
              <ul className="space-y-3">
                {[
                  'School Directory Management',
                  'Professional Registration Forms',
                  'Real-time Data Validation',
                  'Responsive Design System',
                  'Advanced Search & Filtering',
                  'Enterprise Security'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Built With</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Frontend</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Next.js 14 (React Framework)</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Backend</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>MySQL Database</li>
                    <li>API Routes</li>
                    <li>Server Components</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Quality</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Accessibility (WCAG 2.1)</li>
                    <li>Performance Optimized</li>
                    <li>Error Boundaries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p className="text-sm text-gray-500">
                  © 2024 SchoolHub Pro. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
                  <span>•</span>
                  <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
                  <span>•</span>
                  <button className="hover:text-gray-700 transition-colors">Contact Support</button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System Status: Operational</span>
                </div>
                <span>•</span>
                <span>Version 1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;