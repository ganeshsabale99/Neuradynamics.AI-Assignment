import React from 'react';

const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4'
  };
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className={`
        ${sizeClasses[size]} 
        border-b-blue-500 
        border-r-blue-500 
        border-t-blue-200 
        border-l-blue-200
        rounded-full 
        animate-spin
      `}></div>
    </div>
  );
};

export default Loader;