import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMessageAttachmentsToApi, sendMessageToApi } from "../../api/api";
import {
  ChatHeader,
  ChatInput,
  ChatMessageList,
  Sidebar,
} from "../../components";
import { jsPDF } from "jspdf";
import { handleDownloadHistory, handleDownloadPDF } from "../../utils";

interface Message {
  sender: "user" | "bot";
  text: string;
  isLoading?: boolean; // Optional property to indicate loading
  attachments?: File[]; // Optional property to store attachments
}

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messagesScenario, setMessagesScenario] = useState<Message[]>([]);
  const [messagesCases, setMessagesCases] = useState<Message[]>([]);

  const [isLoadingScenario, setIsLoadingScenario] = useState<boolean>(false);
  const [isLoadingCase, setIsLoadingCase] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<string>(
    new URLSearchParams(location.search).get("tab") || "scenario"
  );

  const isScenarioSelected = () => activeTab === "scenario";

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", tab);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleDownload = () => {
    const messages = isScenarioSelected() ? messagesScenario : messagesCases;
    const chatName = isScenarioSelected() ? "scenario" : "cases";
    handleDownloadHistory(messages, chatName);
  };

  const handleDownloadPdf = () => {
    handleDownloadPDF();
  };

  const updateLoading = (loader: boolean) => {
    if (isScenarioSelected()) setIsLoadingScenario(loader);
    else setIsLoadingCase(loader);
  }

  const getLoader = () => isScenarioSelected() ? isLoadingScenario : isLoadingCase;

  const handleSendMessage = async (messageText: string, images?: File[]) => {
    updateLoading(true);

    const userMessage: Message = {
      sender: "user",
      text: messageText,
      attachments: images,
    };

    if (isScenarioSelected()) {
      setMessagesScenario((prevMessages) => [...prevMessages, userMessage]);
      setMessagesScenario((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "generating..." },
      ]);
    } else {
      setMessagesCases((prevMessages) => [...prevMessages, userMessage]);
      setMessagesCases((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "generating..." },
      ]);
    }

    try {
      const botResponse = isScenarioSelected()
        ? await sendMessageAttachmentsToApi(messageText, images)
        : await sendMessageToApi(messageText);

      const botMessage: Message = { sender: "bot", text: botResponse };

      if (isScenarioSelected()) {
        setMessagesScenario((prevMessages) =>
          prevMessages.slice(0, -1).concat(botMessage)
        );
      } else {
        setMessagesCases((prevMessages) =>
          prevMessages.slice(0, -1).concat(botMessage)
        );
      }
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: "Error: Unable to reach the server. Please try again later.",
      };
      if (isScenarioSelected()) {
        setMessagesScenario((prevMessages) =>
          prevMessages.slice(0, -1).concat(errorMessage)
        );
      } else {
        setMessagesCases((prevMessages) =>
          prevMessages.slice(0, -1).concat(errorMessage)
        );
      }
    } finally {
      updateLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex flex-col flex-1" id="capture">
        <ChatHeader
          title={
            isScenarioSelected()
              ? "Automation Test Scenario"
              : "Automation Test Cases"
          }
        />
        <ChatMessageList
          messages={isScenarioSelected() ? messagesScenario : messagesCases}
          handleDownloadPDF={handleDownloadPdf}
          handleDownloadJSON={handleDownload}
          isLoading={getLoader()}
        />
        <ChatInput
          onSendMessage={handleSendMessage}
          downloadHistory={handleDownload}
          isSendEnable={true}
          isLoading={getLoader()}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
