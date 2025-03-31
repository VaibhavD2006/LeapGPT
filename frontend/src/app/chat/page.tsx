"use client";

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Message from '@/components/Message';
import ChatInput from '@/components/ChatInput';
import LoadingDots from '@/components/LoadingDots';
import ChatSidebar from '@/components/ChatSidebar';
import ActionButtons from '@/components/ActionButtons';
import axios from 'axios';
import Image from 'next/image';

interface Message {
  content: string;
  isUser: boolean;
  title?: string;
  isLoading?: boolean;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

// Function to generate a random ID (replacement for uuid)
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Welcome message template
const WELCOME_MESSAGE = {
  content: `# Welcome to LeapGPT

I'm your visionary tech and business assistant, trained on insights from leading consulting firms.

## How I Can Help You:

* Identify **emerging market trends** across industries
* Discover **billion-dollar business opportunities**
* Analyze **technology disruptions** and their market impact
* Find **product-market fit** for innovative ideas

### Ready to explore the future of business and technology?

Ask me about any industry, market trend, or business opportunity you're curious about!`,
  isUser: false,
};

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [chatId, setChatId] = useState<string>(generateId());
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatTitle, setChatTitle] = useState<string>('New Chat');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  
  // Load chat history from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && status === "authenticated" && session?.user?.email) {
      const savedHistory = localStorage.getItem(`chat_history_${session.user.email}`);
      if (savedHistory) {
        try {
          setChatHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error('Error parsing chat history:', e);
          localStorage.removeItem(`chat_history_${session.user.email}`);
        }
      }
    }
  }, [status, session]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Helper function to create a title from user query
  const createTitleFromQuery = (query: string): string => {
    // Trim the query
    const trimmedQuery = query.trim();
    
    // Split into words and take only first 2-3 words
    const words = trimmedQuery.split(/\s+/);
    // Take 3 words if they are short, or just 2 for longer words
    const wordLimit = words.some(word => word.length > 6) ? 2 : 3;
    const shortened = words.length > wordLimit;
    
    // Join the first few words
    const titleWords = words.slice(0, wordLimit).join(' ');
    const title = shortened ? `${titleWords}...` : titleWords;
    
    // Capitalize the first letter
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  // Save current chat to history
  const saveCurrentChat = (msgs: Message[]) => {
    if (msgs.length <= 1 || !session?.user?.email) return; // Don't save if only welcome message or not authenticated
    
    // Get first user message to use as title
    const firstUserMessage = msgs.find(m => m.isUser);
    const title = firstUserMessage ? createTitleFromQuery(firstUserMessage.content) : 'New Chat';
    
    const currentChat: ChatHistory = {
      id: chatId,
      title,
      timestamp: new Date().toISOString(),
      messages: msgs
    };
    
    // Update chat history
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
    const newHistory = [currentChat, ...updatedHistory];
    
    setChatHistory(newHistory);
    setChatTitle(title);
    
    // Save to localStorage
    localStorage.setItem(`chat_history_${session.user.email}`, JSON.stringify(newHistory));
  };

  // Delete chat from history
  const handleDeleteChat = (id: string) => {
    if (!session?.user?.email) return;
    
    // Filter out the deleted chat
    const updatedHistory = chatHistory.filter(chat => chat.id !== id);
    setChatHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem(`chat_history_${session.user.email}`, JSON.stringify(updatedHistory));
    
    // If the active chat was deleted, create a new one
    if (id === chatId) {
      handleNewChat();
    }
  };
  
  // Rename chat in history
  const handleRenameChat = (id: string, newTitle: string) => {
    if (!session?.user?.email || !newTitle.trim()) return;
    
    // Find and update the chat title
    const updatedHistory = chatHistory.map(chat => 
      chat.id === id ? { ...chat, title: newTitle.trim() } : chat
    );
    
    setChatHistory(updatedHistory);
    
    // Update current chat title if active
    if (id === chatId) {
      setChatTitle(newTitle.trim());
    }
    
    // Save to localStorage
    localStorage.setItem(`chat_history_${session.user.email}`, JSON.stringify(updatedHistory));
  };

  // Handle switching to a specific chat
  const handleSwitchChat = (id: string) => {
    // Save current chat first if it has messages
    if (messages.length > 1) {
      saveCurrentChat(messages);
    }
    
    // Find the selected chat
    const selectedChat = chatHistory.find(chat => chat.id === id);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setChatId(id);
      setChatTitle(selectedChat.title);
    }
  };

  const handleNewChat = () => {
    // Save current chat if it has more than just the welcome message
    if (messages.length > 1) {
      saveCurrentChat(messages);
    }
    
    // Create a new chat
    const newId = generateId();
    setChatId(newId);
    setMessages([WELCOME_MESSAGE]);
    setChatTitle('New Chat');
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      content,
      isUser: true,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/chat', {
        query: content
      });

      // Create a title from the user's query
      const responseTitle = createTitleFromQuery(content);

      // Format the bot response with the title
      const formattedResponse = `# ${responseTitle}\n\n${response.data.response}`;

      const botMessage: Message = {
        content: formattedResponse,
        isUser: false,
        title: responseTitle
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      
      // Save chat after getting response
      saveCurrentChat(finalMessages);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        content: "# Error Processing Request\n\nI'm sorry, I encountered an error while processing your request. Please try again later.",
        isUser: false,
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveCurrentChat(finalMessages);
      
    } finally {
      setIsLoading(false);
    }
  };

  // Handle action button click
  const handleActionButtonClick = (buttonName: string) => {
    // Toggle the active state
    setActiveButton(prevButton => prevButton === buttonName ? null : buttonName);
  };

  // Add a function to add bot messages to the chat
  const addBotMessage = (message: any) => {
    // If message has a loading property and it's true, create a loading message
    if (message.loading) {
      const loadingMessage = {
        content: message.content,
        isUser: false,
        isLoading: true
      };
      setMessages(prev => [...prev, loadingMessage]);
      return;
    }
    
    // Replace the last message if it was a loading message
    if (messages.length > 0 && messages[messages.length - 1].isLoading) {
      const updatedMessages = [...messages.slice(0, -1), {
        content: message.content,
        isUser: false
      }];
      setMessages(updatedMessages);
      
      // Save chat after getting response
      saveCurrentChat(updatedMessages);
    } else {
      // Otherwise, add a new message
      const updatedMessages = [...messages, {
        content: message.content,
        isUser: false
      }];
      setMessages(updatedMessages);
      
      // Save chat after getting response
      saveCurrentChat(updatedMessages);
    }
  };

  // Show loading if checking authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white">
      <Header userData={session?.user} />
      
      <div className="flex-1 overflow-hidden flex">
        {/* Chat sidebar */}
        <ChatSidebar 
          activeChatId={chatId} 
          onNewChat={handleNewChat}
          onSwitchChat={handleSwitchChat}
          onDeleteChat={handleDeleteChat}
          onRenameChat={handleRenameChat}
          chatHistory={chatHistory}
        />
        
        {/* Main chat area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="message-container py-6 px-4 sm:px-6 md:px-8 max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  content={message.content}
                  isUser={message.isUser}
                  user={message.isUser ? session?.user : undefined}
                  isLoading={message.isLoading}
                />
              ))}
              {isLoading && !messages[messages.length - 1]?.isLoading && <LoadingDots />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="sticky bottom-0 z-10 bg-gray-900 backdrop-blur-sm border-t border-gray-800/50 w-full">
            <div className="max-w-5xl mx-auto px-4">
              <div className="pt-3 pb-3 relative">
                {/* Input field (search bar) */}
                <div className="mb-3 flex w-full bg-gray-800/60 rounded-lg border border-gray-700/50 focus-within:border-gray-500/60 transition-all px-3 pt-3 pb-3">
                  <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                </div>

                {/* Action buttons below search bar */}
                <ActionButtons 
                  activeButton={activeButton}
                  onButtonClick={handleActionButtonClick}
                  userInput={messages.find(m => m.isUser)?.content || ''}
                  addBotMessage={addBotMessage}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  conversationHistory={messages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 