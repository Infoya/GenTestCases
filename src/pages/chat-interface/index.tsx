import React, { useState } from "react";
import {
  ChatHeader,
  ChatInput,
  ChatMessageList,
  Sidebar,
} from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageList } from "../../components/message-list";

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(
    new URLSearchParams(location.search).get("tab") || "scenario"
  );

  const msgsScenario: MessageList[] = [
    { text: "Hello, how can I help you?", sender: "bot" },
    {
      text: "Please generate test scenario of an user creating purchase order successfully",
      sender: "user",
    },
  ];

  const msgsTest: MessageList[] = [
    { text: "Hello, how can I help you?", sender: "bot" },
    {
      text: "Please generate test case of an user creating purchase order successfully",
      sender: "user",
    },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", tab);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex flex-col flex-1">
        <ChatHeader
          title={
            activeTab === "scenario"
              ? "Automation Test Scenario"
              : "Automation Test Cases"
          }
        />
        <ChatMessageList
          messages={activeTab === "scenario" ? msgsScenario : msgsTest}
        />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatInterface;
