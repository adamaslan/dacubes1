import React from 'react';

interface LoadingFallbackProps {
  message?: string;
  className?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Loading...", 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 dark:text-gray-200">{message}</p>
    </div>
  );
};

export default LoadingFallback;