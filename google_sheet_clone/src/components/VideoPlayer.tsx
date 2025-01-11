import React from 'react';
import { ThumbsUp, ThumbsDown, Share, Flag } from 'lucide-react';
import { Video, Comment } from '../types';

interface VideoPlayerProps {
  video: Video;
  comments: Comment[];
}

const VideoPlayer = ({ video, comments }: VideoPlayerProps) => {
  return (
    <div className="max-w-[1280px] mx-auto pt-20 px-4">
      <div className="aspect-w-16 aspect-h-9">
        <div className="w-full h-[600px] bg-black rounded-lg"></div>
      </div>
      
      <div className="mt-4">
        <h1 className="text-xl font-bold">{video.title}</h1>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <h3 className="font-semibold">{video.channel.name}</h3>
              <p className="text-sm text-gray-600">
                {video.views.toLocaleString()} subscribers
              </p>
            </div>
            <button className="ml-6 bg-black text-white px-4 py-2 rounded-full">
              Subscribe
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
              <ThumbsUp className="w-5 h-5" />
              <span>23K</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
              <ThumbsDown className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
              <Share className="w-5 h-5" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="flex mb-4">
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <div className="flex items-center">
                <h4 className="font-semibold">{comment.user.name}</h4>
                <span className="ml-2 text-sm text-gray-600">{comment.timestamp}</span>
              </div>
              <p className="mt-1">{comment.text}</p>
              <div className="flex items-center mt-2 space-x-4">
                <button className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button className="text-sm font-semibold">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;