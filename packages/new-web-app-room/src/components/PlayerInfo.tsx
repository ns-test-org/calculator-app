'use client';

import { Player } from '@/types/ludo';

interface PlayerInfoProps {
  players: Player[];
  currentPlayer: number;
  winner: number | null;
}

export default function PlayerInfo({ players, currentPlayer, winner }: PlayerInfoProps) {
  const getPlayerEmoji = (color: string) => {
    const emojis = {
      red: '🔴',
      blue: '🔵', 
      green: '🟢',
      yellow: '🟡'
    };
    return emojis[color as keyof typeof emojis] || '⚪';
  };

  const getPieceStatus = (player: Player) => {
    const inHome = player.pieces.filter(p => p.isInHome).length;
    const onBoard = player.pieces.filter(p => !p.isInHome && !p.isFinished).length;
    const finished = player.pieces.filter(p => p.isFinished).length;
    
    return { inHome, onBoard, finished };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Players</h2>
      
      <div className="space-y-4">
        {players.map((player, index) => {
          const status = getPieceStatus(player);
          const isCurrentPlayer = currentPlayer === index;
          const isWinner = winner === index;
          
          return (
            <div
              key={player.id}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${isCurrentPlayer ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${isWinner ? 'border-gold bg-yellow-50 ring-2 ring-yellow-400' : ''}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getPlayerEmoji(player.color)}</span>
                  <span className="font-bold">{player.name}</span>
                  {isCurrentPlayer && !isWinner && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      Current Turn
                    </span>
                  )}
                  {isWinner && (
                    <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                      🏆 Winner!
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <div className="font-bold text-gray-600">{status.inHome}</div>
                  <div className="text-xs text-gray-500">In Base</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{status.onBoard}</div>
                  <div className="text-xs text-gray-500">On Board</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">{status.finished}</div>
                  <div className="text-xs text-gray-500">Finished</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${player.color === 'red' ? 'bg-red-500' : ''}
                      ${player.color === 'blue' ? 'bg-blue-500' : ''}
                      ${player.color === 'green' ? 'bg-green-500' : ''}
                      ${player.color === 'yellow' ? 'bg-yellow-500' : ''}
                    `}
                    style={{ width: `${(status.finished / 4) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {status.finished}/4 pieces home
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <ul className="space-y-1 text-xs">
          <li>• Roll 6 to get pieces out of base</li>
          <li>• Move pieces clockwise around the board</li>
          <li>• Get all 4 pieces to the center to win</li>
          <li>• Rolling 6 gives you another turn</li>
          <li>• Land on opponents to send them back</li>
        </ul>
      </div>
    </div>
  );
}
