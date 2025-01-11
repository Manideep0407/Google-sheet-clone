import React from 'react';
import { Cell } from '../types/game';
import Square from './Square';

interface BoardProps {
  squares: Cell[];
  onClick: (index: number) => void;
  winningCombo?: number[];
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningCombo = [] }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-72">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          isWinning={winningCombo.includes(i)}
        />
      ))}
    </div>
  );
};

export default Board;