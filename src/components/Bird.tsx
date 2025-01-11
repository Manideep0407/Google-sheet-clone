import React, { memo } from 'react';
import { Bird as BirdType } from '../types/game';
import { GAME_CONFIG } from '../utils/gameConfig';

interface BirdProps {
  bird: BirdType;
}

const Bird: React.FC<BirdProps> = ({ bird }) => {
  return (
    <div
      className="absolute transition-transform will-change-transform"
      style={{
        width: GAME_CONFIG.BIRD_SIZE,
        height: GAME_CONFIG.BIRD_SIZE,
        left: 50,
        top: bird.y,
        transform: `rotate(${Math.min(30, bird.velocity * 5)}deg)`,
        backgroundImage: "url('https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=50&h=50&fit=crop')",
        backgroundSize: 'cover',
        borderRadius: '50%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    />
  );
};

export default memo(Bird);