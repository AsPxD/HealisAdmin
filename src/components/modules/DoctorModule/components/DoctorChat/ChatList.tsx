import React from 'react';
import { Chat } from './types';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat;
  onSelectChat: (chat: Chat) => void;
}

export function ChatList({ chats, selectedChat, onSelectChat }: ChatListProps) {
  return (
    <div className="w-1/3 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="overflow-y-auto h-full">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-4 flex items-start space-x-4 hover:bg-gray-50 ${
              selectedChat.id === chat.id ? 'bg-blue-50' : ''
            }`}
          >
            <img
              src={chat.avatar}
              alt={chat.patient}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">{chat.patient}</h4>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                {chat.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}