import React from 'react';
import { Send, Paperclip, Image, Mic } from 'lucide-react';

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export function MessageInput({ message, onMessageChange, onSendMessage }: MessageInputProps) {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Image className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Mic className="w-5 h-5" />
        </button>
        <button 
          onClick={onSendMessage}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}