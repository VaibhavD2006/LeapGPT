"use client";

import React from 'react';

const LoadingDots: React.FC = () => {
  return (
    <div className="flex justify-start items-center py-4 px-4">
      <div className="mr-4 flex items-center justify-center h-10 w-10 rounded-full bg-primary-600 text-white">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" 
          />
        </svg>
      </div>
      
      <div className="bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-2xl rounded-tl-none shadow-md max-w-[140px]">
        <div className="flex items-center justify-center loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDots; 