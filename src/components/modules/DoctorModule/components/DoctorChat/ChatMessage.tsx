import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isDoctor = message.sender === 'doctor';

  return (
    <div className={`flex ${isDoctor ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isDoctor
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p>{message.content}</p>
        <div className={`flex items-center justify-end mt-1 text-xs ${
          isDoctor ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span className="mr-1">{message.timestamp}</span>
          {message.status === 'delivered' && <Check className="w-4 h-4" />}
          {message.status === 'read' && <CheckCheck className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}