import React from 'react';
import { Phone, Video } from 'lucide-react';
import { Chat } from './types';

interface ChatHeaderProps {
  chat: Chat;
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={chat.avatar}
          alt={chat.patient}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{chat.patient}</h3>
          <p className="text-sm text-gray-600">Online</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Phone className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Video className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}