import React, { memo } from 'react';
import { Pipe as PipeType } from '../types/game';
import { GAME_CONFIG } from '../utils/gameConfig';

interface PipeProps {
  pipe: PipeType;
}

const Pipe: React.FC<PipeProps> = ({ pipe }) => {
  return (
    <>
      <div
        className="absolute will-change-transform"
        style={{
          width: GAME_CONFIG.PIPE_WIDTH,
          height: pipe.topHeight,
          left: pipe.x,
          top: 0,
          background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      />
      <div
        className="absolute will-change-transform"
        style={{
          width: GAME_CONFIG.PIPE_WIDTH,
          height: GAME_CONFIG.GAME_HEIGHT - pipe.topHeight - GAME_CONFIG.PIPE_GAP,
          left: pipe.x,
          bottom: 0,
          background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      />
    </>
  );
};

export default memo(Pipe);