import React from 'react';
import { Search, Menu, Video, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-4 shadow-sm z-50">
      <div className="flex items-center">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center ml-4">
          <Video className="w-8 h-8 text-red-600" />
          <span className="ml-1 text-xl font-semibold">YouTube</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Video className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;