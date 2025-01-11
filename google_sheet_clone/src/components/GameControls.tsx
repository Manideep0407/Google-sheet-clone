import React from 'react';
import { GameMode } from '../types/game';

interface GameControlsProps {
  onModeSelect: (mode: GameMode) => void;
  onReset: () => void;
  gameMode: GameMode;
}

const GameControls: React.FC<GameControlsProps> = ({ onModeSelect, onReset, gameMode }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors
            ${gameMode === 'computer' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => onModeSelect('computer')}
        >
          vs Computer
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors
            ${gameMode === 'friend' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => onModeSelect('friend')}
        >
          vs Friend
        </button>
      </div>
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium
          hover:bg-gray-300 transition-colors"
        onClick={onReset}
      >
        Reset Game
      </button>
    </div>
  );
};

export default GameControls;