'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

// Professional Fade In Animation Component
export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  triggerOnce?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 500,
  direction = 'up',
  className,
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) setHasTriggered(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, triggerOnce, hasTriggered]);

  const getTransformClasses = () => {
    const baseTransform = isVisible ? 'translate-x-0 translate-y-0' : '';
    const initialTransform = {
      up: 'translate-y-8',
      down: '-translate-y-8',
      left: 'translate-x-8',
      right: '-translate-x-8',
      none: ''
    };

    return isVisible ? baseTransform : initialTransform[direction];
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-out',
        getTransformClasses(),
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// Professional Stagger Animation for Lists
export interface StaggerProps {
  children: React.ReactNode[];
  delay?: number;
  staggerDelay?: number;
  className?: string;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  delay = 0,
  staggerDelay = 100,
  className
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeIn
          key={index}
          delay={delay + (index * staggerDelay)}
          direction="up"
          className="w-full"
        >
          {child}
        </FadeIn>
      ))}
    </div>
  );
};

// Professional Scale Animation Component
export interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  scale?: number;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 300,
  className,
  scale = 0.95
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-out',
        isVisible ? 'opacity-100 scale-100' : `opacity-0 scale-[${scale}]`,
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// Professional Hover Lift Effect
export interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  liftAmount?: number;
  duration?: number;
  shadow?: boolean;
}

export const HoverLift: React.FC<HoverLiftProps> = ({
  children,
  className,
  liftAmount = 4,
  duration = 200,
  shadow = true
}) => {
  return (
    <div
      className={cn(
        'transition-all ease-out cursor-pointer',
        shadow && 'hover:shadow-medium',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transform: 'translateY(0px)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `translateY(-${liftAmount}px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
      }}
    >
      {children}
    </div>
  );
};

// Professional Loading Dots Animation
export const LoadingDots: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'bg-current rounded-full animate-pulse',
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  );
};

// Professional Shimmer Effect
export interface ShimmerProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  children,
  className,
  active = true
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
      {active && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </div>
  );
};

// Professional Bounce Animation
export const BounceIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-600 ease-bounce',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
        className
      )}
    >
      {children}
    </div>
  );
};

// Professional Page Transition Wrapper
export const PageTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out',
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {children}
    </div>
  );
};

// Professional Form Field Animation
export const FormFieldAnimation: React.FC<{
  children: React.ReactNode;
  error?: boolean;
  success?: boolean;
  className?: string;
}> = ({ children, error, success, className }) => {
  return (
    <div
      className={cn(
        'transition-all duration-200 ease-out',
        error && 'animate-shake',
        success && 'animate-bounce-subtle',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FadeIn;