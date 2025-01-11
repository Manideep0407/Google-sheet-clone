import React from 'react';
import { Home, Compass, Clock, ThumbsUp, Film, Folder } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Compass, label: 'Explore' },
    { icon: Clock, label: 'History' },
    { icon: ThumbsUp, label: 'Liked' },
    { icon: Film, label: 'Your videos' },
    { icon: Folder, label: 'Library' },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-16 p-4">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer mb-1"
        >
          <item.icon className="w-5 h-5 mr-4" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;