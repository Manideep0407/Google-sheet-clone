import React from 'react';
import { Cell } from '../types/game';

interface SquareProps {
  value: Cell;
  onClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  return (
    <button
      className={`w-24 h-24 text-4xl font-bold border-2 rounded-lg
        ${isWinning ? 'bg-green-200 border-green-500' : 'bg-white border-gray-300'}
        ${value ? 'text-gray-800' : 'text-transparent'}
        hover:bg-gray-100 transition-colors duration-200`}
      onClick={onClick}
      disabled={!!value}
    >
      {value || '.'}
    </button>
  );
};

export default Square;