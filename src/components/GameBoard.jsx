import { useGame } from '../context/GameContext';
import { BOARD_SPACES, PROPERTY_GROUPS } from '../data/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './GameBoard.css';

export const GameBoard = () => {
  const {
    gameId, gameState, players, currentPlayer, isHost, gamePhase,
    diceValues, isRolling, diceAnimation, canBuyProperty, currentProperty,
    showCard, message, jailOptions, user, rollDice, buyProperty, dontBuyProperty,
    payJailFine, leaveGame, startGame, setMessage, setShowCard, setJailOptions,
  } = useGame();
  
  const [showLobby, setShowLobby] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  useEffect(() => {
    if (gamePhase === 'playing') {
      setShowLobby(false);
    }
  }, [gamePhase]);
  
  const currentPlayerData = players.find(p => p.id === currentPlayer);
  const myPlayer = players.find(p => p.id === user?.uid);
  const isMyTurn = currentPlayer === user?.uid;
  
  const handlePropertyClick = (property) => {
    if (property.type === 'property') {
      setSelectedProperty(property);
    }
  };
  
  const getPropertyOwner = (propertyId) => {
    const ownerId = gameState?.properties?.[propertyId]?.owner;
    if (!ownerId) return null;
    return players.find(p => p.id === ownerId);
  };
  
  return (
    <div className="game-board-container">
      <div className="game-header">
        <div className="game-info">
          <span className="game-code">🎮 Game: {gameId}</span>
          <span className="turn-indicator">
            {isMyTurn ? "🎯 Your Turn!" : `Turn: ${currentPlayerData?.name || 'Player'}`}
          </span>
        </div>
        <button className="leave-btn" onClick={leaveGame}>Leave Game</button>
      </div>
      
      <AnimatePresence>
        {showLobby && gamePhase === 'waiting' && (
          <motion.div 
            className="lobby-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="lobby-content">
              <h2>🎮 Gamingopoly Lobby</h2>
              <p className="lobby-code">Game Code: <strong>{gameId}</strong></p>
              
              <div className="players-list">
                <h3>Players ({players.length}/8)</h3>
                {players.map((player) => (
                  <div key={player.id} className="player-item">
                    <span className="player-token">{player.token}</span>
                    <span className="player-name">{player.name}</span>
                    {player.isHost && <span className="host-badge">HOST</span>}
                  </div>
                ))}
              </div>
              
              {isHost && players.length >= 2 && (
                <button className="start-btn" onClick={startGame}>
                  Start Game 🚀
                </button>
              )}
              
              {players.length < 2 && (
                <p className="waiting-text">Waiting for more players...</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="monopoly-board">
        <div className="board-row top-row">
          {BOARD_SPACES.slice(0, 11).map((space) => (
            <BoardSpace 
              key={space.id} 
              space={space} 
              players={players}
              gameState={gameState}
              onClick={() => handlePropertyClick(space)}
            />
          ))}
        </div>
        
        <div className="board-middle">
          <div className="board-column left-column">
            {BOARD_SPACES.slice(20, 31).reverse().map((space) => (
              <BoardSpace 
                key={space.id} 
                space={space} 
                players={players}
                gameState={gameState}
                onClick={() => handlePropertyClick(space)}
              />
            ))}
          </div>
          
          <div className="board-center">
            <div className="center-content">
              <h1 className="center-title">🎮</h1>
              <h2 className="center-subtitle">GAMINGOPOLY</h2>
              
              <div className="dice-container">
                <div className={`dice dice-${diceValues[0]} ${diceAnimation ? 'rolling' : ''}`}>
                  {getDiceDots(diceValues[0])}
                </div>
                <div className={`dice dice-${diceValues[1]} ${diceAnimation ? 'rolling' : ''}`}>
                  {getDiceDots(diceValues[1])}
                </div>
              </div>
              
              {isMyTurn && gamePhase === 'playing' && !myPlayer?.inJail && (
                <button 
                  className={`roll-btn ${isRolling ? 'rolling' : ''}`}
                  onClick={rollDice}
                  disabled={isRolling}
                >
                  {isRolling ? 'Rolling...' : '🎲 Roll Dice'}
                </button>
              )}
              
              {isMyTurn && myPlayer?.inJail && gamePhase === 'playing' && (
                <div className="jail-actions">
                  <button 
                    className="jail-btn"
                    onClick={() => setJailOptions(true)}
                  >
                    🏠 In Jail
                  </button>
                </div>
              )}
              
              {canBuyProperty && currentProperty && isMyTurn && (
                <motion.div 
                  className="buy-property-card"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <h3>Buy Property?</h3>
                  <p className="property-name">{currentProperty.name}</p>
                  <p className="property-price">${currentProperty.price}</p>
                  <div className="buy-buttons">
                    <button className="buy-btn" onClick={buyProperty}>
                      Buy 🏠
                    </button>
                    <button className="pass-btn" onClick={dontBuyProperty}>
                      Pass 🚫
                    </button>
                  </div>
                </motion.div>
              )}
              
              {message && (
                <div className="game-message" onClick={() => setMessage('')}>
                  {message}
                </div>
              )}
            </div>
          </div>
          
          <div className="board-column right-column">
            {BOARD_SPACES.slice(11, 20).map((space) => (
              <BoardSpace 
                key={space.id} 
                space={space} 
                players={players}
                gameState={gameState}
                onClick={() => handlePropertyClick(space)}
              />
            ))}
          </div>
        </div>
        
        <div className="board-row bottom-row">
          {BOARD_SPACES.slice(31, 40).reverse().map((space) => (
            <BoardSpace 
              key={space.id} 
              space={space} 
              players={players}
              gameState={gameState}
              onClick={() => handlePropertyClick(space)}
            />
          ))}
        </div>
      </div>
      
      <div className="player-panel">
        <h3>Players</h3>
        <div className="player-cards">
          {players.map((player) => (
            <div 
              key={player.id} 
              className={`player-card ${player.id === currentPlayer ? 'active' : ''} ${player.bankrupt ? 'bankrupt' : ''}`}
              style={{ borderColor: player.color }}
            >
              <span className="player-token">{player.token}</span>
              <div className="player-info">
                <span className="player-name">{player.name}</span>
                <span className="player-money">${player.money}</span>
              </div>
              {player.inJail && <span className="jail-icon">🔒</span>}
            </div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {showCard && (
          <motion.div 
            className="card-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={() => setShowCard(null)}
          >
            <div className="card-content">
              <h3>{showCard.text.includes('Chance') ? '🎴 Chance' : '📦 Community Chest'}</h3>
              <p>{showCard.text}</p>
              <button onClick={() => setShowCard(null)}>OK</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {jailOptions && (
          <motion.div 
            className="jail-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="jail-content">
              <h3>🏠 You're in Jail!</h3>
              <p>Choose how to get out:</p>
              <div className="jail-buttons">
                <button onClick={payJailFine}>
                  Pay $50 💰
                </button>
                <button onClick={() => setJailOptions(false)}>
                  Roll for Doubles 🎲
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            className="property-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setSelectedProperty(null)}
          >
            <div className="property-content" onClick={e => e.stopPropagation()}>
              <div 
                className="property-header" 
                style={{ backgroundColor: selectedProperty.color || '#333' }}
              >
                <h3>{selectedProperty.name}</h3>
              </div>
              <div className="property-details">
                <div className="property-stat">
                  <span>Price:</span>
                  <span>${selectedProperty.price}</span>
                </div>
                <div className="property-stat">
                  <span>Rent:</span>
                  <span>${selectedProperty.rent}</span>
                </div>
                {selectedProperty.houseCost && (
                  <div className="property-stat">
                    <span>House Cost:</span>
                    <span>${selectedProperty.houseCost}</span>
                  </div>
                )}
                <div className="property-stat">
                  <span>Type:</span>
                  <span>{selectedProperty.type}</span>
                </div>
                {getPropertyOwner(selectedProperty.id) && (
                  <div className="property-stat">
                    <span>Owner:</span>
                    <span style={{ color: getPropertyOwner(selectedProperty.id)?.color }}>
                      {getPropertyOwner(selectedProperty.id)?.name}
                    </span>
                  </div>
                )}
              </div>
              <button className="close-btn" onClick={() => setSelectedProperty(null)}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BoardSpace = ({ space, players, gameState, onClick }) => {
  const getPlayersOnSpace = (position) => players.filter(p => p.position === position);
  const playersHere = getPlayersOnSpace(space.id);
  const isProperty = space.type === 'property';
  const isCorner = space.type === 'corner';
  const isCard = space.type === 'card';
  const isTax = space.type === 'tax';
  const isRailroad = space.type === 'railroad';
  const isUtility = space.type === 'utility';
  
  const ownerId = gameState?.properties?.[space.id]?.owner;
  const owner = ownerId ? players.find(p => p.id === ownerId) : null;
  
  return (
    <div 
      className={`board-space ${isProperty ? 'property' : ''} ${isCorner ? 'corner' : ''} ${isCard ? 'card' : ''} ${isTax ? 'tax' : ''} ${isRailroad ? 'railroad' : ''} ${isUtility ? 'utility' : ''}`}
      onClick={onClick}
    >
      {isProperty && (
        <div className="property-color-bar" style={{ backgroundColor: space.color }}></div>
      )}
      
      <div className="space-content">
        <span className="space-name">{space.name}</span>
        {isProperty && <span className="space-price">${space.price}</span>}
        {isRailroad && <span className="space-icon">🚂</span>}
        {isUtility && <span className="space-icon">⚡</span>}
        {isCard && <span className="space-icon">{space.cardType === 'chance' ? '🎴' : '📦'}</span>}
        {isTax && <span className="space-icon">💰</span>}
        {isCorner && space.action === 'jail' && <span className="space-icon">🏠</span>}
        {isCorner && space.action === 'parking' && <span className="space-icon">🅿️</span>}
        {isCorner && space.action === 'gotojail' && <span className="space-icon">🔒</span>}
      </div>
      
      {owner && <div className="owner-indicator" style={{ backgroundColor: owner.color }}></div>}
      
      <div className="players-on-space">
        {playersHere.map((player, index) => (
          <motion.div 
            key={player.id}
            className="player-token-small"
            style={{ backgroundColor: player.color, left: `${index * 8}px` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {player.token}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const getDiceDots = (value) => {
  const dots = { 1: [4], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
  
  return (
    <div className="dice-face">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pos) => (
        <div key={pos} className={`dice-dot ${dots[value]?.includes(pos) ? 'filled' : ''}`}></div>
      ))}
    </div>
  );
};

export default GameBoard;
