"use client";

import React from 'react';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  onClick,
  active = false
}) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'bg-primary-700/90 text-white ring-2 ring-primary-400/50' 
          : 'bg-gray-800/60 hover:bg-gray-700/70 text-gray-300 hover:text-white border border-gray-700/50'
      }`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="flex-shrink-0 text-primary-400">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
};

export default ActionButton; 