export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  id: string;
  playerId: number;
  position: number; // -1 for home base, 0-51 for board positions, 52+ for home column
  isInHome: boolean;
  isFinished: boolean;
}

export interface Player {
  id: number;
  name: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
  pieces: Piece[];
}

export interface GameState {
  currentPlayer: number;
  players: Player[];
  diceValue: number;
  gameStatus: 'waiting' | 'playing' | 'finished';
  winner: number | null;
}

export interface BoardCell {
  id: number;
  type: 'normal' | 'safe' | 'start' | 'home';
  color?: 'red' | 'blue' | 'green' | 'yellow';
  position: Position;
}

export const PLAYER_COLORS = {
  0: 'red',
  1: 'blue', 
  2: 'green',
  3: 'yellow'
} as const;

export const SAFE_POSITIONS = [0, 8, 13, 21, 26, 34, 39, 47];

export const START_POSITIONS = {
  0: 0,   // Red
  1: 13,  // Blue
  2: 26,  // Green
  3: 39   // Yellow
} as const;
