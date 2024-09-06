import React from 'react';
import Avatar from '@mui/material/Avatar';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className="bg-[#f96304] text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">{title}</h1>
      <Avatar alt="Remy Sharp" src="user.jpg" />
    </div>
  );
};

export default ChatHeader;