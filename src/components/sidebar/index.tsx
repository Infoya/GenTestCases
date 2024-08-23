import React from 'react';
import { ChatIcon } from '@heroicons/react/outline';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white text-gray-800 w-80 h-full p-4 shadow-lg flex flex-col justify-between">
      <div className="mb-6">
        <img src="homedepot.jpg" alt="Home Depot Logo" className="h-16 w-auto mb-4" />
        
        {/* Tab-like Options above the History label */}
        <div className="flex space-x-4 mb-2 border-b-2 border-gray-300">
          <button
            onClick={() => onTabChange('scenario')}
            className={`px-4 py-2 ${
              activeTab === 'scenario'
                ? 'border-b-4 border-[#f96304] text-[#f96304]'
                : 'text-gray-600 hover:text-[#f96304]'
            } transition-colors duration-200`}
          >
            Test Scenario
          </button>
          <button
            onClick={() => onTabChange('case')}
            className={`px-4 py-2 ${
              activeTab === 'case'
                ? 'border-b-4 border-[#f96304] text-[#f96304]'
                : 'text-gray-600 hover:text-[#f96304]'
            } transition-colors duration-200`}
          >
            Test Case
          </button>
        </div>

        <h2 className="text-2xl font-bold text-[#f96304] mb-4">History</h2>

        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 truncate">
              <ChatIcon className="h-6 w-6 mr-2 text-[#f96304] flex-shrink-0" />
              User Creates the Reserva
            </a>
          </li>
        </ul>
      </div>
      
      <div className="text-center text-gray-400 text-sm mt-6">
        © 2024 Infoya
      </div>
    </div>
  );
};

export default Sidebar;