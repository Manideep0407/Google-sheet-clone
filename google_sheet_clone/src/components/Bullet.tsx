import React, { memo } from 'react';
import { Bullet as BulletType } from '../types/game';

interface BulletProps {
  bullet: BulletType;
}

const Bullet: React.FC<BulletProps> = ({ bullet }) => {
  return (
    <div
      className="absolute w-2 h-2 rounded-full shadow-lg will-change-transform"
      style={{
        left: bullet.x,
        top: bullet.y,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle at 30% 30%, #fbbf24, #d97706)',
        boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
      }}
    />
  );
};

export default memo(Bullet);