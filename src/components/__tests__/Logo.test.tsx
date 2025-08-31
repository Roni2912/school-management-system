import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '@/components/ui/Logo';

describe('Logo Component', () => {
  it('renders full logo by default', () => {
    render(<Logo />);
    
    // Check if the logo text is present
    expect(screen.getByText('SchoolHub')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    
    // Check if the SVG logo is present
    expect(screen.getByLabelText('SchoolHub Pro Logo')).toBeInTheDocument();
  });

  it('renders icon only variant', () => {
    render(<Logo variant="icon" />);
    
    // Should have the SVG logo
    expect(screen.getByLabelText('SchoolHub Pro Logo')).toBeInTheDocument();
    
    // Should not have text
    expect(screen.queryByText('SchoolHub')).not.toBeInTheDocument();
    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });

  it('renders text only variant', () => {
    render(<Logo variant="text" />);
    
    // Should have text
    expect(screen.getByText('SchoolHub')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    
    // Should not have SVG logo
    expect(screen.queryByLabelText('SchoolHub Pro Logo')).not.toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender, container } = render(<Logo size="sm" />);
    let logoContainer = container.firstChild as HTMLElement;
    expect(logoContainer).toHaveClass('h-8');

    rerender(<Logo size="lg" />);
    logoContainer = container.firstChild as HTMLElement;
    expect(logoContainer).toHaveClass('h-12');
  });

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-class" />);
    const logoContainer = container.firstChild as HTMLElement;
    expect(logoContainer).toHaveClass('custom-class');
  });

  it('shows tagline when enabled', () => {
    render(<Logo showTagline={true} size="lg" />);
    expect(screen.getByText(/Professional School Management/)).toBeInTheDocument();
  });

  it('does not show tagline for small size', () => {
    render(<Logo showTagline={true} size="sm" />);
    expect(screen.queryByText(/Professional School Management/)).not.toBeInTheDocument();
  });
});