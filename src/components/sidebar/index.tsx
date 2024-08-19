import React from 'react';
import { ChatIcon } from '@heroicons/react/outline';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 w-80 h-full p-4 shadow-lg flex flex-col justify-between">
      <div className="mb-6">
        <img src="homedepot.jpg" alt="Home Depot" className="h-28 w-auto mb-4 m-auto" />
        <h2 className="text-2xl font-bold text-[#f96304]">History</h2>
        <ul className="space-y-4 mt-4">
          <li>
            <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 truncate">
              <ChatIcon className="h-6 w-6 mr-2 text-[#f96304] flex-shrink-0" />
              User Creates the Reserva
            </a>
          </li>
          {/* Additional items can be added here */}
        </ul>
      </div>
      <div className="text-center text-gray-400 text-sm mt-6">
        © 2024 Infoya
      </div>
    </div>
  );
};

export default Sidebar;