export interface Player {
  id: string;
  x: number;
  y: number;
  angle: number;
  health: number;
  name: string;
}

export interface Bullet {
  id: string;
  x: number;
  y: number;
  angle: number;
  playerId: string;
}

export interface GameState {
  players: Record<string, Player>;
  bullets: Bullet[];
  currentPlayerId: string | null;
}