// Global error handler
export function setupErrorHandler(app) {
  // Vue global error handler
  app.config.errorHandler = (err, instance, info) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('Global error:', err)
      console.error('Component:', instance)
      console.error('Error info:', info)
    }
    
    // You could send errors to a logging service here
    // logErrorToService(err, info)
  }
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (import.meta.env.DEV) {
      console.error('Unhandled promise rejection:', event.reason)
    }
    
    // Prevent default browser behavior
    event.preventDefault()
  })
  
  // Handle global errors
  window.addEventListener('error', (event) => {
    if (import.meta.env.DEV) {
      console.error('Global error:', event.error)
    }
    
    // You could show a toast notification here
    // showErrorToast(event.error.message)
  })
}

// Helper function to safely execute async operations
export async function safeAsync(fn, fallback = null) {
  try {
    return await fn()
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Async operation failed:', error)
    }
    return fallback
  }
}