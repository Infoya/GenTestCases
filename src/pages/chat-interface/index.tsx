import React from 'react';
import { ChatHeader, ChatInput, ChatMessageList, Sidebar } from '../../components';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <ChatMessageList />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatInterface;