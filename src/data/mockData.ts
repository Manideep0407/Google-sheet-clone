import { Video, Comment } from '../types';

export const videos: Video[] = [
  {
    id: '1',
    title: 'Building a Modern Web Application',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    channel: {
      name: 'TechChannel',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
    views: 250000,
    timestamp: '2 days ago',
    duration: '12:34'
  },
  {
    id: '2',
    title: 'Learn React in 30 Minutes',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    channel: {
      name: 'CodeMaster',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
    views: 180000,
    timestamp: '5 days ago',
    duration: '8:22'
  },
  // Add more mock videos as needed
];

export const comments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    text: 'Great video! Very informative content.',
    likes: 124,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    text: 'This helped me understand the concept better!',
    likes: 89,
    timestamp: '5 hours ago'
  },
];