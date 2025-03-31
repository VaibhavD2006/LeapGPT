"use client";

import { useState, useEffect, useRef } from 'react';
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
  onDeleteChat: (id: string) => void;
  onRenameChat: (id: string, newTitle: string) => void;
  chatHistory: Chat[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  activeChatId, 
  onNewChat, 
  onSwitchChat,
  onDeleteChat,
  onRenameChat,
  chatHistory 
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Check if screen size is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse on small screens
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Format date as relative time (e.g. 2 days ago)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return 'Previous 30 Days';
    
    return date.toLocaleDateString();
  };

  // Group chats by date
  const groupChatsByDate = () => {
    const groups: Record<string, Chat[]> = {};
    
    chatHistory.forEach(chat => {
      const date = new Date(chat.timestamp);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      let groupName: string;
      if (diffInDays === 0) groupName = "Today";
      else if (diffInDays === 1) groupName = "Yesterday";
      else if (diffInDays < 30) groupName = "Previous 30 Days";
      else groupName = "Older";
      
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      
      groups[groupName].push(chat);
    });
    
    return groups;
  };

  const chatGroups = groupChatsByDate();

  const handleMenuToggle = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === chatId ? null : chatId);
  };

  const handleRenameClick = (e: React.MouseEvent, chatId: string, currentTitle: string) => {
    e.stopPropagation();
    setIsRenaming(chatId);
    setNewTitle(currentTitle);
    setOpenMenuId(null);
  };

  const handleRenameSubmit = (chatId: string) => {
    if (newTitle.trim()) {
      onRenameChat(chatId, newTitle);
    }
    setIsRenaming(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    onDeleteChat(chatId);
    setOpenMenuId(null);
  };

  const handleShareClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    alert("Share functionality coming soon!");
    setOpenMenuId(null);
  };

  return (
    <div 
      className={`bg-[#111827] border-r border-gray-800 h-full flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16 sm:w-20' : 'w-64 sm:w-72 md:w-80'
      }`}
    >
      {/* Toggle sidebar collapse button */}
      <button 
        className="absolute -right-3 top-16 bg-gray-800 border border-gray-700 rounded-full p-1 z-10 shadow-md hover:bg-gray-700 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
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
      <div className="p-3 sm:p-4">
        <button
          onClick={onNewChat}
          className="bg-[#2563eb] hover:bg-blue-700 text-white w-full rounded-lg py-2 sm:py-3 font-medium flex items-center justify-center transition-colors"
          aria-label="Start new chat"
        >
          {collapsed ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 sm:w-6 sm:h-6"
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
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-sm sm:text-base">New Chat</span>
            </>
          )}
        </button>
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-2">
          {chatHistory.length === 0 && !collapsed && (
            <div className="text-xs sm:text-sm text-gray-500 px-3 py-4 text-center">
              No conversation history yet.
              <br />
              Start a new chat to begin!
            </div>
          )}
          
          {Object.entries(chatGroups).map(([groupName, chats]) => (
            <div key={groupName} className="mb-4">
              {!collapsed && (
                <h2 className="text-sm font-medium text-gray-400 px-2 mb-2">{groupName}</h2>
              )}
              
              <ul className="space-y-1">
                {chats.map((chat) => (
                  <li key={chat.id} className="relative">
                    {isRenaming === chat.id ? (
                      <div className="flex items-center px-2 sm:px-3 py-2 rounded-lg w-full bg-[#1e293b] text-white">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleRenameSubmit(chat.id);
                            if (e.key === 'Escape') setIsRenaming(null);
                          }}
                          className="flex-1 bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 text-xs sm:text-sm"
                          autoFocus
                        />
                        <button 
                          onClick={() => handleRenameSubmit(chat.id)}
                          className="ml-2 text-primary-400 hover:text-primary-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setIsRenaming(null)}
                          className="ml-1 text-gray-400 hover:text-gray-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <button 
                          onClick={() => onSwitchChat(chat.id)}
                          className={`flex flex-1 items-center px-2 sm:px-3 py-2 rounded-lg text-left ${
                            activeChatId === chat.id 
                              ? 'bg-[#1e293b] text-white'  
                              : 'text-gray-300 hover:bg-[#1e293b]/70'
                          }`}
                          aria-label={`Open chat: ${chat.title}`}
                        >
                          <div className="flex-shrink-0">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              strokeWidth={1.5} 
                              stroke="currentColor" 
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" 
                              />
                            </svg>
                          </div>
                          
                          {!collapsed && (
                            <div className="ml-3 flex-1 overflow-hidden max-w-[calc(100%-40px)]">
                              <p className="text-xs font-medium truncate pr-2">{chat.title}</p>
                              <p className="text-xs text-gray-500">{formatDate(chat.timestamp)}</p>
                            </div>
                          )}
                        </button>
                        
                        {!collapsed && (
                          <button 
                            onClick={(e) => handleMenuToggle(e, chat.id)}
                            className={`flex-shrink-0 p-1 rounded-full hover:bg-gray-700 ${
                              activeChatId === chat.id ? 'text-gray-300' : 'text-gray-500'
                            }`}
                            style={{ marginRight: '4px' }}
                            aria-label="Chat options"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              strokeWidth={1.5} 
                              stroke="currentColor" 
                              className="w-4 h-4"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" 
                              />
                            </svg>
                          </button>
                        )}
                        
                        {openMenuId === chat.id && (
                          <div 
                            ref={menuRef}
                            className="absolute right-0 top-8 z-10 w-40 rounded-lg shadow-lg bg-gray-800 border border-gray-700"
                          >
                            <div className="py-1">
                              <button
                                onClick={(e) => handleShareClick(e, chat.id)}
                                className="flex items-center w-full px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="currentColor" 
                                  className="w-4 h-4 mr-2"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0 2.25 2.25 0 00-3.935 0z" 
                                  />
                                </svg>
                                Share
                              </button>
                              
                              <button
                                onClick={(e) => handleRenameClick(e, chat.id, chat.title)}
                                className="flex items-center w-full px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="currentColor" 
                                  className="w-4 h-4 mr-2"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                                  />
                                </svg>
                                Rename
                              </button>
                              
                              <button
                                onClick={(e) => handleDeleteClick(e, chat.id)}
                                className="flex items-center w-full px-4 py-2 text-xs sm:text-sm text-red-400 hover:bg-gray-700"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  strokeWidth={1.5} 
                                  stroke="currentColor" 
                                  className="w-4 h-4 mr-2"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar; 