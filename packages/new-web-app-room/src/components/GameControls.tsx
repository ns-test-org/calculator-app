'use client';

import { GameState } from '@/types/ludo';

interface GameControlsProps {
  gameState: GameState;
  onRollDice: () => void;
  onStartGame: () => void;
  onResetGame: () => void;
}

export default function GameControls({
  gameState,
  onRollDice,
  onStartGame,
  onResetGame
}: GameControlsProps) {
  const currentPlayer = gameState.players[gameState.currentPlayer];
  
  const getDiceEmoji = (value: number) => {
    const diceEmojis = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceEmojis[value] || '🎲';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Game Controls</h2>
      
      {gameState.gameStatus === 'waiting' && (
        <div className="text-center">
          <p className="mb-4 text-gray-600">Ready to play Ludo?</p>
          <button
            onClick={onStartGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🎮 Start Game
          </button>
        </div>
      )}

      {gameState.gameStatus === 'playing' && (
        <div className="space-y-4">
          <div className="text-center">
            <div className={`
              inline-block p-4 rounded-lg font-bold text-white mb-4
              ${currentPlayer.color === 'red' ? 'bg-red-500' : ''}
              ${currentPlayer.color === 'blue' ? 'bg-blue-500' : ''}
              ${currentPlayer.color === 'green' ? 'bg-green-500' : ''}
              ${currentPlayer.color === 'yellow' ? 'bg-yellow-500' : ''}
            `}>
              {currentPlayer.name}&apos;s Turn
            </div>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-4">
              {gameState.diceValue > 0 ? getDiceEmoji(gameState.diceValue) : '🎲'}
            </div>
            
            {gameState.diceValue === 0 ? (
              <button
                onClick={onRollDice}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors animate-pulse"
              >
                🎲 Roll Dice
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-bold">You rolled: {gameState.diceValue}</p>
                <p className="text-sm text-gray-600">Click on a piece to move it!</p>
                {gameState.diceValue === 6 && (
                  <p className="text-sm text-green-600 font-bold">🎉 You get another turn!</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {gameState.gameStatus === 'finished' && gameState.winner !== null && (
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-4">
            {gameState.players[gameState.winner].name} Wins!
          </h3>
          <div className={`
            inline-block p-4 rounded-lg font-bold text-white mb-4
            ${gameState.players[gameState.winner].color === 'red' ? 'bg-red-500' : ''}
            ${gameState.players[gameState.winner].color === 'blue' ? 'bg-blue-500' : ''}
            ${gameState.players[gameState.winner].color === 'green' ? 'bg-green-500' : ''}
            ${gameState.players[gameState.winner].color === 'yellow' ? 'bg-yellow-500' : ''}
          `}>
            Congratulations! 🎉
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onResetGame}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          🔄 Reset Game
        </button>
      </div>
    </div>
  );
}

