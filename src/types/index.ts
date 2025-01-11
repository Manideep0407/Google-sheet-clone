export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: {
    name: string;
    avatar: string;
  };
  views: number;
  timestamp: string;
  duration: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  likes: number;
  timestamp: string;
}