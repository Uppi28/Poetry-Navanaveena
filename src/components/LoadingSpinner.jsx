import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner 