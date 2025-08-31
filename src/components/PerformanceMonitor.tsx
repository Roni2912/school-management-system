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
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          console.log('Navigation Timing:', {
            'DNS Lookup': navEntry.domainLookupEnd - navEntry.domainLookupStart,
            'TCP Connection': navEntry.connectEnd - navEntry.connectStart,
            'Request': navEntry.responseStart - navEntry.requestStart,
            'Response': navEntry.responseEnd - navEntry.responseStart,
            'DOM Processing': navEntry.domContentLoadedEventEnd - navEntry.responseEnd,
            'Total Load Time': navEntry.loadEventEnd - navEntry.fetchStart,
          })
        }

        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }

        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming & { processingStart: number }
          console.log('FID:', fidEntry.processingStart - entry.startTime)
        }

        if (entry.entryType === 'layout-shift') {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
          if (!clsEntry.hadRecentInput) {
            console.log('CLS:', clsEntry.value)
          }
        }
      })
    })

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (error) {
      console.warn('Performance Observer not fully supported:', error)
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
        
        // Only log if memory usage is high
        if (memoryUsage.used > 50) {
          console.log('Memory Usage (MB):', memoryUsage)
        }
      }
    }, 30000) // Check every 30 seconds

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn('Long Task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
        })
      })
    })

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch (error) {
      console.warn('Long Task Observer not supported:', error)
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
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
  
  // In production, you might want to send this to an analytics service
  // Example: analytics.track('Web Vital', metric)
}