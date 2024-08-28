import React from "react";
import ReactMarkdown from "react-markdown";

export interface MessageList {
  text: string;
  sender: "bot" | "user";
  attachments?: File[]; // Optional property to store attachments
}

interface Message {
  messages: MessageList[];
  isLoading?: boolean; // Optional property to indicate loading
  handleDownloadPDF: () => void;
  handleDownloadJSON: () => void;
}

const ChatMessageList: React.FC<Message> = ({
  messages,
  isLoading,
  handleDownloadPDF,
  handleDownloadJSON,
}) => {
  return (
    <>
      <div className="p-4 space-y-4 flex-1 overflow-y-auto bg-gray-100" id="message-list-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === "user" ? "text-right" : ""}
          >
            <div
              className={`inline-block p-2 rounded-lg max-w-[900px] ${
                message.sender === "user"
                  ? "bg-[#f96304] text-white"
                  : "bg-gray-300 text-black"
              } ${isLoading ? "loading-text leading-9" : ""}`} // Apply loading-text class if isLoading is true
            >
              {message.sender === "bot" ? (
                <ReactMarkdown
                  className="markdown-body"
                  children={message.text}
                />
              ) : (
                <span>{message.text}</span>
              )}
              {/* Display Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((file, fileIndex) => (
                    <div key={fileIndex} className="flex items-center space-x-2">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-64 w-64 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-200 flex items-center justify-center rounded-lg">
                          {/* Icon for non-image files */}
                          <span className="text-xs text-gray-600">{file.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Button to download the chat history as a PDF or JSON */}
      {!isLoading ? (
        <>
          <div className="m-2">
            <button
              onClick={handleDownloadPDF}
              className="transition-colors duration-200 text-[#f96304]"
            >
              Download PDF
            </button>
            <button 
              onClick={handleDownloadJSON}
              className="ml-2 transition-colors duration-200 text-[#f96304]"
            >
              Download TXT
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ChatMessageList;