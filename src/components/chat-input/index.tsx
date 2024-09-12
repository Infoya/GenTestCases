import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/outline";
import CircularProgress from "@mui/material/CircularProgress";
import { TEST_ATTACHMENT_ALLOWED, TYPES_PAGES } from "../../const";
import useDetectEnterKey from "../../hooks/useDetectEnterKey";

const TYPE_ALLOWED_ATTACHMENT: string[] = TEST_ATTACHMENT_ALLOWED;

interface ChatInputProps {
  onSendMessage: (messageText: string, attachments: File[]) => void; // Prop to handle sending messages
  downloadHistory: () => void;
  isSendEnable?: boolean;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  downloadHistory,
  isSendEnable,
  isLoading,
}) => {
  const [userInput, setUserInput] = useState<string>("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("tab");

  // Resize the textarea dynamically as the user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto to measure scrollHeight properly
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > 90 ? "scroll" : "hidden"; // Show scroll if text exceeds 3 lines (90px)
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        90 // Max height for 3 lines
      )}px`;
    }
  }, [userInput]); // Trigger the resize effect whenever the input changes

  const handleSendMessage = () => {
    if (userInput.trim() !== "" || attachedFiles.length > 0) {
      onSendMessage(userInput, attachedFiles); // Call the onSendMessage prop with the user's input
      setUserInput(""); // Clear input after sending the message
      setAttachedFiles([]); // Clear attached files after sending the message
      if (inputRef.current) {
        inputRef.current.value = ""; // Reset the file input value to allow re-selection of files
      }
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (e.type === "drop") {
      const droppedFiles = (e as React.DragEvent<HTMLDivElement>).dataTransfer
        .files;
      setAttachedFiles([...attachedFiles, ...Array.from(droppedFiles)]);
    } else if (e.target && (e.target as HTMLInputElement).files) {
      const selectedFiles = (e.target as HTMLInputElement).files;
      if (selectedFiles) {
        setAttachedFiles([...attachedFiles, ...Array.from(selectedFiles)]);
      }
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = Array.from(e.clipboardData.items);
    const files: File[] = items
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null); // This ensures TypeScript knows the file is not null

    if (files.length > 0) {
      setAttachedFiles([...attachedFiles, ...files]);
    }
  };

  // Custom hooks
  useDetectEnterKey(handleSendMessage);

  return (
    <div
      className="p-4 border-t flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileChange}
      onPaste={handlePaste}
    >
      <div className="flex items-center mb-2">
        {TYPE_ALLOWED_ATTACHMENT.includes(type || TYPES_PAGES.EMPTY) && (
          <button
            className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors duration-200"
            onClick={() => inputRef.current?.click()}
          >
            <PaperClipIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}
        <input
          id="file-upload"
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <textarea
          ref={textareaRef}
          disabled={!isSendEnable || isLoading}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyUp={(e) =>
            e.key === "Enter" && !e.shiftKey && handleSendMessage()
          }
          rows={1} // Start with 1 row
          className="w-full p-2 border rounded-lg resize-none overflow-hidden" // Disable manual resizing
          placeholder="Type your message here..."
          style={{ maxHeight: "90px" }} // Max height for 3 lines
        />
        {isSendEnable && !isLoading ? (
          <>
            <button
              onClick={handleSendMessage}
              className="bg-[#f96304] text-white p-2 rounded-lg ml-2 hover:bg-[#e55204] transition-colors duration-200"
            >
              Send
            </button>
          </>
        ) : null}

        {isLoading ? <CircularProgress className="p-2" /> : null}
      </div>

      {/* File Preview Section */}
      {attachedFiles.length > 0 && (
        <div className="flex space-x-4 overflow-x-auto">
          {attachedFiles.map((file, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 flex items-center justify-center rounded-lg">
                    <PaperClipIcon className="h-8 w-8 text-gray-600" />
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
              <span className="text-xs text-gray-500 mt-1 truncate max-w-[4rem]">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
