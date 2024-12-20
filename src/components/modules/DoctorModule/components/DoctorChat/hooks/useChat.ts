import { useState } from 'react';
import { Message } from '../types';

export function useChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: 'doctor',
      content,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'text',
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return {
    message,
    messages,
    setMessage,
    setMessages,
    sendMessage
  };
}