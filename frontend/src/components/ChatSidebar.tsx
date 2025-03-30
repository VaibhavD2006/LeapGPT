"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Message {
  content: string;
  isUser: boolean;
  title?: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface ChatSidebarProps {
  activeChatId?: string;
  onNewChat: () => void;
  onSwitchChat: (id: string) => void;
  chatHistory: Chat[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  activeChatId, 
  onNewChat, 
  onSwitchChat,
  chatHistory 
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  // Format date as relative time (e.g. 2 days ago)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div 
      className={`bg-gray-900 border-r border-gray-800 h-full flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Toggle sidebar collapse button */}
      <button 
        className="absolute -right-3 top-16 bg-gray-800 border border-gray-700 rounded-full p-1 z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-0' : 'rotate-180'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      {/* New Chat button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="bg-primary-600 hover:bg-primary-700 text-white w-full rounded-lg py-3 font-medium flex items-center justify-center transition-colors"
        >
          {collapsed ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          ) : (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Chat
            </>
          )}
        </button>
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-2">
          {!collapsed && chatHistory.length > 0 && (
            <h2 className="text-sm font-medium text-gray-400 px-2 mb-2">Recent Conversations</h2>
          )}
          
          {chatHistory.length === 0 && !collapsed && (
            <div className="text-sm text-gray-500 px-3 py-4 text-center">
              No conversation history yet.
              <br />
              Start a new chat to begin!
            </div>
          )}
          
          <ul className="space-y-1">
            {chatHistory.map((chat) => (
              <li key={chat.id}>
                <button 
                  onClick={() => onSwitchChat(chat.id)}
                  className={`flex items-center px-3 py-2 rounded-lg w-full text-left ${
                    activeChatId === chat.id 
                      ? 'bg-gray-800 text-white'  
                      : 'text-gray-300 hover:bg-gray-800/70'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5 text-gray-400"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" 
                      />
                    </svg>
                  </div>
                  
                  {!collapsed && (
                    <div className="ml-3 flex-1 overflow-hidden">
                      <p className="text-sm truncate">{chat.title}</p>
                      <p className="text-xs text-gray-500">{formatDate(chat.timestamp)}</p>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar; 