import React from 'react';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className="bg-[#f96304] text-white p-4">
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};

export default ChatHeader;