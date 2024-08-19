import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaperClipIcon } from '@heroicons/react/outline'; // Example icon for the attach button
import { TEST_ATTACHMENT_ALLOWED } from '../../const';

// Initialize the array with allowed types
const TYPE_ALLOWED_ATTACHMENT: string[] = TEST_ATTACHMENT_ALLOWED; // Example values

const ChatInput: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const type = queryParams.get('type');

  const sendMessage = () => {
    if (userInput.trim() !== '' || attachedFiles.length > 0) {
      console.log('User input:', userInput);
      console.log('Attached files:', attachedFiles);
      setUserInput('');
      setAttachedFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border-t flex flex-col">
      <div className="flex items-center mb-2">
        <button className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors duration-200">
          {TYPE_ALLOWED_ATTACHMENT.includes(type || '') ? (
            <label htmlFor="file-upload" className="cursor-pointer">
              <PaperClipIcon className="h-6 w-6 text-gray-600" />
            </label>
          ) : null}
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </button>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full p-2 border rounded-r-lg"
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#f96304] text-white p-2 rounded-lg ml-2 hover:bg-[#e55204] transition-colors duration-200"
        >
          Send
        </button>
      </div>

      {/* File Preview Section */}
      {attachedFiles.length > 0 && (
        <div className="flex space-x-4 overflow-x-auto">
          {attachedFiles.map((file, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                {file.type.startsWith('image/') ? (
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
              <span className="text-xs text-gray-500 mt-1 truncate max-w-[4rem]">{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;