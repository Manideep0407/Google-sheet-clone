import { Bird, Pipe, GameState } from '../types/game';
import { GAME_CONFIG } from './gameConfig';

export const updateBird = (bird: Bird): Bird => {
  const newVelocity = bird.velocity + GAME_CONFIG.GRAVITY;
  const newY = bird.y + newVelocity;

  return {
    y: Math.max(0, Math.min(newY, GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.BIRD_SIZE)),
    velocity: newVelocity,
  };
};

export const createPipe = (): Pipe => {
  const minHeight = GAME_CONFIG.MIN_PIPE_HEIGHT;
  const maxHeight = GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.PIPE_GAP - minHeight;
  const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

  return {
    x: GAME_CONFIG.GAME_WIDTH,
    topHeight,
    passed: false,
  };
};

export const updatePipes = (pipes: Pipe[]): Pipe[] => {
  return pipes
    .map(pipe => ({
      ...pipe,
      x: pipe.x - GAME_CONFIG.PIPE_SPEED,
    }))
    .filter(pipe => pipe.x > -GAME_CONFIG.PIPE_WIDTH);
};

export const checkCollision = (state: GameState): boolean => {
  const { bird, pipes } = state;
  const birdBox = {
    top: bird.y,
    bottom: bird.y + GAME_CONFIG.BIRD_SIZE,
    left: 50,
    right: 50 + GAME_CONFIG.BIRD_SIZE,
  };

  return pipes.some(pipe => {
    const topPipeBox = {
      top: 0,
      bottom: pipe.topHeight,
      left: pipe.x,
      right: pipe.x + GAME_CONFIG.PIPE_WIDTH,
    };

    const bottomPipeBox = {
      top: pipe.topHeight + GAME_CONFIG.PIPE_GAP,
      bottom: GAME_CONFIG.GAME_HEIGHT,
      left: pipe.x,
      right: pipe.x + GAME_CONFIG.PIPE_WIDTH,
    };

    return (
      intersects(birdBox, topPipeBox) || 
      intersects(birdBox, bottomPipeBox)
    );
  });
};

const intersects = (box1: any, box2: any): boolean => {
  return !(
    box1.right < box2.left ||
    box1.left > box2.right ||
    box1.bottom < box2.top ||
    box1.top > box2.bottom
  );
};