"use client";

import { useSession } from "next-auth/react";
// import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Removing automatic redirect to allow viewing the landing page
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/chat");
  //   }
  // }, [status, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-8 h-8 text-primary-500"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" 
                  />
                </svg>
                <span className="ml-2 text-xl font-bold">LeapGPT</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Features</a>
                <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">About</a>
                <a href="#pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Pricing</a>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Log in
              </Link>
              <Link href="/register" className="ml-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Hero Section with Background Questions */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 hero-gradient">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90 z-0"></div>

        {/* Background questions layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="floating-question left-[5%] top-[15%]">How should I validate my idea?</div>
          <div className="floating-question right-[10%] top-[20%]">What are some viable business ideas?</div>
          <div className="floating-question left-[15%] bottom-[30%]">Where are consumer markets heading?</div>
          <div className="floating-question right-[15%] top-[60%]">How can I achieve product-market fit?</div>
          <div className="floating-question left-[10%] top-[40%]">What industries are ripe for disruption?</div>
          <div className="floating-question right-[15%] bottom-[15%]">How do I find my target audience?</div>
          <div className="floating-question left-[20%] top-[25%]">What technology trends should I watch?</div>
          <div className="floating-question right-[30%] bottom-[20%]">How do I attract investors?</div>
          <div className="floating-question left-[40%] top-[80%]">How do I scale my business?</div>
          <div className="floating-question right-[5%] top-[45%]">What's my competitive advantage?</div>
          <div className="floating-question left-[10%] bottom-[15%]">How do I build a minimum viable product?</div>
          <div className="floating-question right-[50%] top-[10%]">What business model should I choose?</div>
          <div className="floating-question right-[30%] top-[25%]">What are some startup ideas that will solve a relevant problem?</div>
        </div>
        
        {/* Main content with higher z-index */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
          <div className="text-center">
            <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl">
              <span className="block">Unlock Business Intelligence</span>
              <span className="block text-primary-400 mt-3 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">with AI-Powered Insights</span>
            </h1>
            <p className="mt-8 max-w-lg mx-auto text-xl text-gray-300">
              LeapGPT analyzes market trends and identifies billion-dollar opportunities before they become obvious.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link href="/register" className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-900/30 md:text-xl md:px-10 transition-all duration-300 ease-in-out">
                Get Started
              </Link>
              <Link href="/login" className="px-8 py-4 border border-gray-700 text-lg font-medium rounded-md text-gray-200 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 md:text-xl md:px-10 transition-all duration-300 ease-in-out">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Powerful Business Intelligence</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Gain insights that give you a competitive edge in today's rapidly evolving markets.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="bg-primary-900/30 w-12 h-12 flex items-center justify-center rounded-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Market Insights</h3>
              <p className="mt-2 text-gray-300">
                Get in-depth analysis of market trends and opportunities across industries and regions.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="bg-primary-900/30 w-12 h-12 flex items-center justify-center rounded-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Trend Analysis</h3>
              <p className="mt-2 text-gray-300">
                Identify emerging trends and patterns that signal new business opportunities.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="bg-primary-900/30 w-12 h-12 flex items-center justify-center rounded-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Business Strategy</h3>
              <p className="mt-2 text-gray-300">
                Get actionable recommendations to position your business for future growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Ready to transform your business?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Create a free account today and start uncovering opportunities that others miss.
          </p>
          <div className="mt-8">
            <Link href="/register" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6 text-primary-500"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" 
              />
            </svg>
            <span className="ml-2 text-lg font-bold text-white">LeapGPT</span>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2023 LeapGPT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 