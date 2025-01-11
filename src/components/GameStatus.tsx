import React from 'react';
import { Player, GameStatus as GameStatusType } from '../types/game';

interface GameStatusProps {
  status: GameStatusType;
  winner: Player | null;
  currentPlayer: Player;
}

const GameStatus: React.FC<GameStatusProps> = ({ status, winner, currentPlayer }) => {
  const getMessage = () => {
    if (status === 'won') return `Player ${winner} wins!`;
    if (status === 'draw') return "It's a draw!";
    return `Player ${currentPlayer}'s turn`;
  };

  const getStatusColor = () => {
    if (status === 'won') return 'text-green-600';
    if (status === 'draw') return 'text-blue-600';
    return 'text-gray-700';
  };

  return (
    <div className={`text-2xl font-bold mb-8 ${getStatusColor()}`}>
      {getMessage()}
    </div>
  );
};

export default GameStatus;