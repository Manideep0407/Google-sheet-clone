import { create } from 'zustand';
import { GameState, Player, Bullet } from '../types/game';

interface GameStore extends GameState {
  addPlayer: (player: Player) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  removePlayer: (playerId: string) => void;
  addBullet: (bullet: Bullet) => void;
  updateBullets: () => void;
  setCurrentPlayer: (playerId: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  players: {},
  bullets: [],
  currentPlayerId: null,

  addPlayer: (player) =>
    set((state) => ({
      players: { ...state.players, [player.id]: player },
    })),

  updatePlayer: (playerId, updates) =>
    set((state) => ({
      players: {
        ...state.players,
        [playerId]: { ...state.players[playerId], ...updates },
      },
    })),

  removePlayer: (playerId) =>
    set((state) => {
      const { [playerId]: _, ...remainingPlayers } = state.players;
      return { players: remainingPlayers };
    }),

  addBullet: (bullet) =>
    set((state) => ({
      bullets: [...state.bullets, bullet],
    })),

  updateBullets: () =>
    set((state) => {
      const speed = 10;
      return {
        bullets: state.bullets
          .map((bullet) => ({
            ...bullet,
            x: bullet.x + Math.cos(bullet.angle) * speed,
            y: bullet.y + Math.sin(bullet.angle) * speed,
          }))
          .filter((bullet) => {
            return (
              bullet.x >= 0 &&
              bullet.x <= window.innerWidth &&
              bullet.y >= 0 &&
              bullet.y <= window.innerHeight
            );
          }),
      };
    }),

  setCurrentPlayer: (playerId) =>
    set({ currentPlayerId: playerId }),
}));