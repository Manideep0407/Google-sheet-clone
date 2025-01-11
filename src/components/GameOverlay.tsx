import React from 'react';

interface GameOverlayProps {
  score: number;
  gameOver: boolean;
  isPlaying: boolean;
  onStart: () => void;
  onRestart: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({
  score,
  gameOver,
  isPlaying,
  onStart,
  onRestart,
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4 text-2xl font-bold text-white">
        Score: {score}
      </div>
      
      {!isPlaying && !gameOver && (
        <button
          onClick={onStart}
          className="px-6 py-3 bg-green-500 text-white rounded-lg text-xl font-bold
            hover:bg-green-600 transition-colors"
        >
          Start Game
        </button>
      )}
      
      {gameOver && (
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-2xl text-white mb-6">Final Score: {score}</p>
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-green-500 text-white rounded-lg text-xl font-bold
              hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameOverlay;