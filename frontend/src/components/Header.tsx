"use client";

import React from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  userData?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-lg">
      <div className="w-full flex items-center justify-between">
        {/* LeapGPT Logo - Left side with p-6 padding */}
        <div className="flex items-center space-x-3 p-6">
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-10 h-10 text-white"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" 
              />
            </svg>
            <div className="absolute inset-0 bg-white opacity-20 rounded-full blur-md"></div>
          </div>
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity">LeapGPT</Link>
            <div className="text-xs font-medium text-primary-100">Powered by AI & Consulting Insights</div>
          </div>
        </div>
        
        {/* Right side content with p-6 padding */}
        <div className="flex items-center space-x-4 p-6">
          <div className="hidden md:block text-sm font-medium text-white/90 bg-primary-900/30 px-4 py-2 rounded-full">
            <span className="mr-2">🚀</span> Discover Market Opportunities
          </div>
          
          {userData && (
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium">{userData.name}</div>
                <div className="text-xs text-primary-100">{userData.email}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary-400">
                  {userData.image ? (
                    <Image 
                      src={userData.image} 
                      alt={userData.name || "User"} 
                      width={40} 
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-primary-600 h-full w-full flex items-center justify-center text-lg font-semibold">
                      {userData.name ? userData.name[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="p-2 text-white/70 hover:text-white hover:bg-primary-600/30 rounded-full transition-colors"
                  title="Sign out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 