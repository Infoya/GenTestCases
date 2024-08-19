import React, { useState } from 'react';

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

const ChatMessageList: React.FC = () => {
  const [messages] = useState<Message[]>([
    { text: 'Hello, how can I help you?', sender: 'bot' },
    { text: 'User Creates the Reservation and Purchase Order Succesfully in SAP', sender: 'user' },
  ]);

  return (
    <div className="p-4 space-y-4 flex-1 overflow-y-auto bg-gray-100">
      {messages.map((message, index) => (
        <div key={index} className={message.sender === 'user' ? 'text-right' : ''}>
          <div className={`inline-block p-2 rounded-lg max-w-4xl ${message.sender === 'user' ? 'bg-[#f96304] text-white' : 'bg-gray-300 text-black'}`}>
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessageList;