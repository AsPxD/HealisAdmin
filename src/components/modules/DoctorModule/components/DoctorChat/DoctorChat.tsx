import React, { useState } from 'react';
import { ChatList } from './ChatList';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { MessageInput } from './MessageInput';
import { useChat } from './hooks/useChat';
import { mockChats, mockMessages } from './data';

export function DoctorChat() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const { 
    message, 
    messages, 
    setMessage, 
    setMessages, 
    sendMessage 
  } = useChat();

  // Initialize messages with mock data
  React.useEffect(() => {
    setMessages(mockMessages);
  }, []);

  return (
    <div className="flex h-[calc(100vh-16rem)] bg-white rounded-lg overflow-hidden">
      <ChatList
        chats={mockChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader chat={selectedChat} />

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>

        <MessageInput
          message={message}
          onMessageChange={setMessage}
          onSendMessage={() => sendMessage(message)}
        />
      </div>
    </div>
  );
}