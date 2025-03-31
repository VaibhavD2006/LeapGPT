"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import LoadingDots from './LoadingDots';

interface MessageProps {
  content: string;
  isUser: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  isLoading?: boolean;
}

interface CodeProps extends React.ComponentPropsWithoutRef<'code'> {
  inline?: boolean;
  node?: any;
  className?: string;
  children?: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ content, isUser, user, isLoading }) => {
  return (
    <div className={`py-3 sm:py-4 ${isUser ? 'flex justify-end' : 'flex justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-3 sm:mr-4">
          <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary-600 text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-4 h-4 sm:w-6 sm:h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" 
              />
            </svg>
          </div>
        </div>
      )}
      
      <div className={`max-w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] ${isUser ? 'user-message' : 'bot-message'}`}>
        {isUser ? (
          <div className="bg-primary-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tr-none shadow text-sm sm:text-base">
            <p>{content}</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 text-gray-800 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl rounded-tl-none shadow-md text-sm sm:text-base">
            {isLoading ? (
              <div className="flex flex-col space-y-2">
                <div className="text-sm sm:text-base text-gray-800">{content}</div>
                <LoadingDots />
              </div>
            ) : (
              <ReactMarkdown 
                className="prose max-w-none text-sm sm:text-base"
                components={{
                  h1: ({node, ...props}) => <h1 className="text-xl sm:text-2xl text-primary-700 font-bold border-b border-gray-200 pb-2 mt-4 sm:mt-5 mb-3 sm:mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg sm:text-xl text-primary-600 font-bold mt-4 sm:mt-5 mb-2 sm:mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-base sm:text-lg text-primary-500 font-bold mt-3 sm:mt-4 mb-1 sm:mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-sm sm:text-base my-2 sm:my-3 text-gray-800" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 sm:pl-8 my-3 sm:my-4 space-y-1 sm:space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 sm:pl-8 my-3 sm:my-4 space-y-1 sm:space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="ml-1 sm:ml-2 text-sm sm:text-base mb-1 sm:mb-2 text-gray-800" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-primary-700" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-gray-600" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="pl-3 sm:pl-4 border-l-4 border-primary-200 italic text-gray-600 my-3 sm:my-4 text-sm sm:text-base" {...props} />,
                  code: ({node, ...props}: CodeProps) => 
                    props.inline 
                      ? <code className="bg-gray-100 px-1 py-0.5 rounded text-xs sm:text-sm font-mono text-gray-800" {...props} />
                      : <code className="block bg-gray-100 text-gray-800 p-2 sm:p-3 rounded-md text-xs sm:text-sm my-3 sm:my-4 overflow-x-auto font-mono" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
      
      {isUser && user && (
        <div className="flex-shrink-0 ml-3 sm:ml-4">
          <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full border-2 border-primary-400">
            {user.image ? (
              <Image 
                src={user.image} 
                alt={user.name || "User"} 
                width={40} 
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="bg-primary-600 h-full w-full flex items-center justify-center text-base sm:text-lg font-semibold text-white">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message; 