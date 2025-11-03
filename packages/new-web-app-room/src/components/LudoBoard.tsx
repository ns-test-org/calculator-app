'use client';

import { GameState, SAFE_POSITIONS } from '@/types/ludo';

interface LudoBoardProps {
  gameState: GameState;
  selectedPiece: string | null;
  onPieceSelect: (pieceId: string) => void;
  onPieceMove: (pieceId: string) => void;
}

const BOARD_SIZE = 15;


export default function LudoBoard({ 
  gameState, 
  selectedPiece, 
  onPieceSelect, 
  onPieceMove 
}: LudoBoardProps) {
  
  const getBoardPosition = (position: number) => {
    // Convert linear position (0-51) to x,y coordinates on 15x15 grid
    const positions = [
      // Bottom row (positions 0-5)
      [6, 14], [5, 14], [4, 14], [3, 14], [2, 14], [1, 14],
      // Left column going up (positions 6-11)
      [0, 13], [0, 12], [0, 11], [0, 10], [0, 9], [0, 8],
      // Left column continued (positions 12-17)
      [0, 7], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
      // Top row (positions 18-23)
      [6, 6], [7, 6], [8, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1],
      // Right column going down (positions 24-29)
      [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0],
      // Right column continued (positions 30-35)
      [14, 1], [14, 2], [14, 3], [14, 4], [14, 5], [14, 6],
      // Right side down (positions 36-41)
      [13, 8], [12, 8], [11, 8], [10, 8], [9, 8], [8, 8],
      // Bottom section (positions 42-47)
      [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [7, 14],
      // Final positions (positions 48-51)
      [7, 13], [7, 12], [7, 11], [7, 10]
    ];
    
    return positions[position] || [0, 0];
  };

  const getHomeBasePositions = (playerId: number) => {
    const bases = {
      0: [[1, 1], [2, 1], [1, 2], [2, 2]], // Red - top-left
      1: [[12, 1], [13, 1], [12, 2], [13, 2]], // Blue - top-right
      2: [[12, 12], [13, 12], [12, 13], [13, 13]], // Green - bottom-right
      3: [[1, 12], [2, 12], [1, 13], [2, 13]] // Yellow - bottom-left
    };
    return bases[playerId as keyof typeof bases] || [];
  };

  const renderCell = (x: number, y: number) => {
    const cellKey = `${x}-${y}`;
    let cellClass = 'w-8 h-8 border border-gray-300 flex items-center justify-center text-xs font-bold relative';
    
    // Color the home bases
    if ((x >= 0 && x <= 5 && y >= 0 && y <= 5)) cellClass += ' bg-red-100';
    else if ((x >= 9 && x <= 14 && y >= 0 && y <= 5)) cellClass += ' bg-blue-100';
    else if ((x >= 9 && x <= 14 && y >= 9 && y <= 14)) cellClass += ' bg-green-100';
    else if ((x >= 0 && x <= 5 && y >= 9 && y <= 14)) cellClass += ' bg-yellow-100';
    else if (x === 6 || x === 8 || y === 6 || y === 8) cellClass += ' bg-white';
    else cellClass += ' bg-gray-100';

    // Highlight safe positions
    const linearPos = findLinearPosition(x, y);
    if (linearPos !== -1 && SAFE_POSITIONS.includes(linearPos)) {
      cellClass += ' ring-2 ring-purple-400';
    }

    // Find pieces at this position
    const piecesHere = gameState.players.flatMap(player => 
      player.pieces.filter(piece => {
        if (piece.isInHome) {
          const homePositions = getHomeBasePositions(piece.playerId);
          return homePositions.some(([hx, hy]) => hx === x && hy === y);
        } else if (!piece.isFinished) {
          const [px, py] = getBoardPosition(piece.position);
          return px === x && py === y;
        }
        return false;
      })
    );

    return (
      <div key={cellKey} className={cellClass}>
        {piecesHere.map((piece, index) => (
          <div
            key={piece.id}
            className={`
              w-6 h-6 rounded-full cursor-pointer border-2 border-white shadow-md
              ${piece.playerId === 0 ? 'bg-red-500' : ''}
              ${piece.playerId === 1 ? 'bg-blue-500' : ''}
              ${piece.playerId === 2 ? 'bg-green-500' : ''}
              ${piece.playerId === 3 ? 'bg-yellow-500' : ''}
              ${selectedPiece === piece.id ? 'ring-2 ring-black' : ''}
              ${gameState.currentPlayer === piece.playerId && gameState.diceValue > 0 ? 'animate-pulse' : ''}
            `}
            style={{
              position: 'absolute',
              zIndex: 10 + index,
              transform: `translate(${index * 2}px, ${index * 2}px)`
            }}
            onClick={() => {
              if (gameState.currentPlayer === piece.playerId && gameState.diceValue > 0) {
                if (selectedPiece === piece.id) {
                  onPieceMove(piece.id);
                } else {
                  onPieceSelect(piece.id);
                }
              }
            }}
          />
        ))}
      </div>
    );
  };

  const findLinearPosition = (x: number, y: number): number => {
    // This is a simplified version - in a real game you'd have a proper mapping
    const positions = [
      [6, 14], [5, 14], [4, 14], [3, 14], [2, 14], [1, 14],
      [0, 13], [0, 12], [0, 11], [0, 10], [0, 9], [0, 8],
      [0, 7], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
    ];
    
    return positions.findIndex(([px, py]) => px === x && py === y);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-15 gap-0 border-2 border-gray-400 inline-block">
        {Array.from({ length: BOARD_SIZE }, (_, y) =>
          Array.from({ length: BOARD_SIZE }, (_, x) => renderCell(x, y))
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>🔴 Red  🔵 Blue  🟢 Green  🟡 Yellow</p>
        <p>Click on your pieces when it&apos;s your turn to move them!</p>
      </div>
    </div>
  );
}

