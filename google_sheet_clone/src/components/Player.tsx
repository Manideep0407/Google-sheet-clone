import React from 'react';
import { Player as PlayerType } from '../types/game';
import { Target } from 'lucide-react';

interface PlayerProps {
  player: PlayerType;
  isCurrentPlayer: boolean;
}

const Player: React.FC<PlayerProps> = ({ player, isCurrentPlayer }) => {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
        isCurrentPlayer ? 'border-2 border-blue-500' : ''
      }`}
      style={{
        left: player.x,
        top: player.y,
        transform: `translate(-50%, -50%) rotate(${player.angle}rad)`,
      }}
    >
      <div className="relative">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center
            ${isCurrentPlayer ? 'bg-blue-500' : 'bg-red-500'}
            transition-colors duration-200 shadow-lg`}
        >
          <Target className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="px-2 py-1 bg-gray-800 text-white rounded-full text-sm shadow-md">
            {player.name} ({player.health}HP)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Player;