import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="cursor-pointer">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
          {video.duration}
        </span>
      </div>
      <div className="mt-3 flex">
        <img
          src={video.channel.avatar}
          alt={video.channel.name}
          className="w-9 h-9 rounded-full"
        />
        <div className="ml-3">
          <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{video.channel.name}</p>
          <p className="text-sm text-gray-600">
            {video.views.toLocaleString()} views • {video.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;