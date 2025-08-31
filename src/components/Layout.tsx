import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 transition-colors duration-500">
      <Navigation />
      <main className={`animate-fade-in ${className}`}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span className="text-xl animate-bounce-subtle">🎓</span>
              <span className="text-sm">
                © 2024 School Management System. Built with Next.js & MySQL.
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <span>⚡</span>
                <span>Fast & Responsive</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <span>🔒</span>
                <span>Secure</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-foreground transition-colors">
                <span>📱</span>
                <span>Mobile-First</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;