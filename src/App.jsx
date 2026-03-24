import { useState } from 'react';
import { useGame } from './context/GameContext';
import './App.css';

function App() {
  const { 
    user, 
    loading, 
    gameId, 
    gamePhase, 
    createGame, 
    joinGame, 
    startGame,
    leaveGame,
    players,
    isHost,
    updatePlayerName,
    message,
    setMessage,
  } = useGame();
  
  const [joinGameId, setJoinGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [localName, setLocalName] = useState('');
  
  const handleCreateGame = async () => {
    const gameId = await createGame();
    if (localName) {
      await updatePlayerName(localName);
    }
    setShowCreateModal(false);
    setLocalName('');
  };
  
  const handleJoinGame = async () => {
    const success = await joinGame(joinGameId);
    if (success) {
      if (localName) {
        await updatePlayerName(localName);
      }
      setShowJoinModal(false);
      setJoinGameId('');
      setLocalName('');
    }
  };
  
  const handleLeaveGame = async () => {
    await leaveGame();
  };
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h1>🎮 Gamingopoly</h1>
          <div className="loading-spinner"></div>
          <p>Loading game...</p>
        </div>
      </div>
    );
  }
  
  // If in game, show game board
  if (gameId && gamePhase !== 'lobby') {
    return <GameBoard />;
  }
  
  return (
    <div className="app">
      <div className="hero-section">
        <h1 className="game-title">🎮 Gamingopoly</h1>
        <p className="game-subtitle">Dominate the Gaming World!</p>
        
        <div className="action-cards">
          <div className="action-card create-card" onClick={() => setShowCreateModal(true)}>
            <div className="card-icon">➕</div>
            <h3>Create Game</h3>
            <p>Start a new game and invite friends</p>
          </div>
          
          <div className="action-card join-card" onClick={() => setShowJoinModal(true)}>
            <div className="card-icon">🎮</div>
            <h3>Join Game</h3>
            <p>Enter a game code to join</p>
          </div>
        </div>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🌐</span>
            <span>Real-time Multiplayer</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎲</span>
            <span>Custom Gaming Theme</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <span>Compete to Win</span>
          </div>
        </div>
      </div>
      
      {/* Create Game Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Create New Game</h2>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                value={localName}
                onChange={e => setLocalName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleCreateGame}>
                Create Game
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Join Game Modal */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Join Game</h2>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                value={localName}
                onChange={e => setLocalName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>
            <div className="form-group">
              <label>Game Code</label>
              <input 
                type="text" 
                value={joinGameId}
                onChange={e => setJoinGameId(e.target.value.toUpperCase())}
                placeholder="Enter game code"
                maxLength={8}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowJoinModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleJoinGame}>
                Join Game
              </button>
            </div>
          </div>
        </div>
      )}
      
      {message && (
        <div className="message-toast" onClick={() => setMessage('')}>
          {message}
        </div>
      )}
    </div>
  );
}

// Game Board Component
import { GameBoard } from './components/GameBoard';

export default App;
