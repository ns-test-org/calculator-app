'use client';

import { useState, useCallback } from 'react';
import LudoBoard from '@/components/LudoBoard';
import GameControls from '@/components/GameControls';
import PlayerInfo from '@/components/PlayerInfo';
import { GameState } from '@/types/ludo';

const INITIAL_GAME_STATE: GameState = {
  currentPlayer: 0,
  players: [
    { id: 0, name: 'Player 1', color: 'red', pieces: [] },
    { id: 1, name: 'Player 2', color: 'blue', pieces: [] },
    { id: 2, name: 'Player 3', color: 'green', pieces: [] },
    { id: 3, name: 'Player 4', color: 'yellow', pieces: [] }
  ],
  diceValue: 0,
  gameStatus: 'waiting',
  winner: null
};

// Initialize pieces for each player
INITIAL_GAME_STATE.players.forEach((player, playerIndex) => {
  for (let i = 0; i < 4; i++) {
    player.pieces.push({
      id: `${playerIndex}-${i}`,
      playerId: playerIndex,
      position: -1, // -1 means in home base
      isInHome: true,
      isFinished: false
    });
  }
});

export default function LudoGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

  const rollDice = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setGameState(prev => ({
      ...prev,
      diceValue
    }));
  }, [gameState.gameStatus]);

  const movePiece = useCallback((pieceId: string) => {
    const piece = gameState.players
      .flatMap(p => p.pieces)
      .find(p => p.id === pieceId);
    
    if (!piece || gameState.diceValue === 0) return;

    setGameState(prev => {
      const newState = { ...prev };
      const player = newState.players[piece.playerId];
      const pieceIndex = player.pieces.findIndex(p => p.id === pieceId);
      
      if (pieceIndex === -1) return prev;

      const currentPiece = player.pieces[pieceIndex];
      
      // If piece is in home and dice is 6, move to start position
      if (currentPiece.isInHome && prev.diceValue === 6) {
        currentPiece.position = piece.playerId * 13; // Start position for each player
        currentPiece.isInHome = false;
      } else if (!currentPiece.isInHome && !currentPiece.isFinished) {
        // Move piece forward
        const newPosition = (currentPiece.position + prev.diceValue) % 52;
        currentPiece.position = newPosition;
        
        // Check if piece reached home column
        if (newPosition >= 51) {
          currentPiece.isFinished = true;
        }
      }

      // Switch to next player (unless rolled a 6)
      if (prev.diceValue !== 6) {
        newState.currentPlayer = (newState.currentPlayer + 1) % 4;
      }
      
      newState.diceValue = 0;
      
      // Check for winner
      const finishedPieces = player.pieces.filter(p => p.isFinished).length;
      if (finishedPieces === 4) {
        newState.gameStatus = 'finished';
        newState.winner = piece.playerId;
      }
      
      return newState;
    });
    
    setSelectedPiece(null);
  }, [gameState.players, gameState.diceValue]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing'
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
    setSelectedPiece(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🎲 Ludo Game 🎲
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <LudoBoard
              gameState={gameState}
              selectedPiece={selectedPiece}
              onPieceSelect={setSelectedPiece}
              onPieceMove={movePiece}
            />
          </div>
          
          {/* Game Controls and Info */}
          <div className="space-y-6">
            <GameControls
              gameState={gameState}
              onRollDice={rollDice}
              onStartGame={startGame}
              onResetGame={resetGame}
            />
            
            <PlayerInfo
              players={gameState.players}
              currentPlayer={gameState.currentPlayer}
              winner={gameState.winner}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

