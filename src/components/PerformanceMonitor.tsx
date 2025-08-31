'use client'

import { useEffect } from 'react'

interface PerformanceMonitorProps {
  enabled?: boolean
}

export default function PerformanceMonitor({ enabled = process.env.NODE_ENV === 'development' }: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Performance metrics are collected but not logged in production
      })
    })

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (error) {
      // Performance Observer not fully supported
    }

    // Monitor memory usage
    const memoryInterval = setInterval(() => {
      const memory = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory
      if (memory) {
        const memoryUsage = {
          used: Math.round(memory.usedJSHeapSize / 1048576),
          total: Math.round(memory.totalJSHeapSize / 1048576),
          limit: Math.round(memory.jsHeapSizeLimit / 1048576),
        }
        
        // Memory usage monitoring (no logging in production)
      }
    }, 30000) // Check every 30 seconds

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      // Long task detection (no logging in production)
    })

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch (error) {
      // Long Task Observer not supported
    }

    // Cleanup
    return () => {
      observer.disconnect()
      longTaskObserver.disconnect()
      clearInterval(memoryInterval)
    }
  }, [enabled])

  // Component doesn't render anything
  return null
}

// Web Vitals reporting function
export const reportWebVitals = (metric: { name: string; value: number; id: string }) => {
  // In production, you might want to send this to an analytics service
  // Example: analytics.track('Web Vital', metric)
}