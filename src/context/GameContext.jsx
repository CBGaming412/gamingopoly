import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { database } from '../firebase/config';
import { ref, set, onValue, push, update, remove, get } from 'firebase/database';
import { auth } from '../firebase/config';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { 
  BOARD_SPACES, 
  GAME_CONFIG, 
  CHANCE_CARDS, 
  COMMUNITY_CHEST_CARDS,
  PLAYER_COLORS,
  PLAYER_TOKENS
} from '../data/gameData';

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  // Auth state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Game state
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [gamePhase, setGamePhase] = useState('lobby');
  
  // Dice state
  const [diceValues, setDiceValues] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [diceAnimation, setDiceAnimation] = useState(false);
  
  // Player action state
  const [canBuyProperty, setCanBuyProperty] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [showCard, setShowCard] = useState(null);
  const [message, setMessage] = useState('');
  const [jailOptions, setJailOptions] = useState(false);
  
  // Initialize auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        try {
          const result = await signInAnonymously(auth);
          setUser(result.user);
        } catch (error) {
          console.error('Auth error:', error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  // Subscribe to game state changes
  useEffect(() => {
    if (!gameId) return;
    
    const gameRef = ref(database, `games/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGameState(data);
        setPlayers(data.players ? Object.values(data.players) : []);
        setCurrentPlayer(data.currentPlayer);
        setGamePhase(data.phase || 'lobby');
        
        // Check if current player can buy property
        if (data.currentPlayer === user?.uid && data.phase === 'playing') {
          const currentPos = data.players?.[user?.uid]?.position;
          if (currentPos !== undefined) {
            const space = BOARD_SPACES[currentPos];
            if (space?.type === 'property' && !data.properties?.[currentPos]?.owner) {
              setCanBuyProperty(true);
              setCurrentProperty(space);
            } else {
              setCanBuyProperty(false);
              setCurrentProperty(null);
            }
          }
        }
      }
    });
    return () => unsubscribe();
  }, [gameId, user?.uid]);
  
  // Create a new game
  const createGame = useCallback(async () => {
    if (!user) return;
    
    const newGameId = uuidv4().slice(0, 8).toUpperCase();
    const gameRef = ref(database, `games/${newGameId}`);
    
    const player = {
      id: user.uid,
      name: `Player ${PLAYER_TOKENS[0]}`,
      token: PLAYER_TOKENS[0],
      color: PLAYER_COLORS[0],
      money: GAME_CONFIG.STARTING_MONEY,
      position: 0,
      inJail: false,
      jailTurns: 0,
      properties: [],
      isHost: true,
    };
    
    await set(gameRef, {
      id: newGameId,
      phase: 'lobby',
      currentPlayer: user.uid,
      turnNumber: 0,
      players: { [user.uid]: player },
      properties: {},
      chanceDeck: shuffleArray([...CHANCE_CARDS]),
      communityDeck: shuffleArray([...COMMUNITY_CHEST_CARDS]),
      chanceIndex: 0,
      communityIndex: 0,
      createdAt: Date.now(),
    });
    
    setGameId(newGameId);
    setIsHost(true);
    setGamePhase('lobby');
    
    return newGameId;
  }, [user]);
  
  // Join an existing game
  const joinGame = useCallback(async (joinGameId) => {
    if (!user) return;
    
    const gameRef = ref(database, `games/${joinGameId}`);
    const snapshot = await get(gameRef);
    
    if (!snapshot.exists()) {
      setMessage('Game not found!');
      return false;
    }
    
    const data = snapshot.val();
    const playerCount = Object.keys(data.players || {}).length;
    
    if (playerCount >= 8) {
      setMessage('Game is full!');
      return false;
    }
    
    const player = {
      id: user.uid,
      name: `Player ${PLAYER_TOKENS[playerCount]}`,
      token: PLAYER_TOKENS[playerCount],
      color: PLAYER_COLORS[playerCount],
      money: GAME_CONFIG.STARTING_MONEY,
      position: 0,
      inJail: false,
      jailTurns: 0,
      properties: [],
      isHost: false,
    };
    
    await update(ref(database, `games/${joinGameId}/players/${user.uid}`), player);
    
    setGameId(joinGameId);
    setIsHost(false);
    setGamePhase('waiting');
    
    return true;
  }, [user]);
  
  // Start the game (host only)
  const startGame = useCallback(async () => {
    if (!gameId || !isHost) return;
    
    await update(ref(database, `games/${gameId}`), {
      phase: 'playing',
    });
  }, [gameId, isHost]);
  
  // Leave game
  const leaveGame = useCallback(async () => {
    if (!gameId || !user) return;
    
    const playerRef = ref(database, `games/${gameId}/players/${user.uid}`);
    await remove(playerRef);
    
    if (isHost) {
      await remove(ref(database, `games/${gameId}`));
    }
    
    setGameId(null);
    setGameState(null);
    setPlayers([]);
    setGamePhase('lobby');
    setIsHost(false);
  }, [gameId, user, isHost]);
  
  // Roll dice
  const rollDice = useCallback(async () => {
    if (!gameId || !user || currentPlayer !== user.uid || isRolling) return;
    
    setIsRolling(true);
    setDiceAnimation(true);
    
    const animationInterval = setInterval(() => {
      setDiceValues([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
    }, 100);
    
    setTimeout(async () => {
      clearInterval(animationInterval);
      setDiceAnimation(false);
      
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      const total = die1 + die2;
      
      setDiceValues([die1, die2]);
      setIsRolling(false);
      
      const currentPlayers = gameState?.players ? Object.values(gameState.players) : [];
      const player = currentPlayers.find(p => p.id === user.uid);
      if (!player) return;
      
      let newPosition = player.position + total;
      let passedGo = false;
      
      if (newPosition >= 40) {
        newPosition = newPosition % 40;
        passedGo = true;
      }
      
      const isDoubles = die1 === die2;
      
      if (player.inJail) {
        if (isDoubles) {
          await updatePlayerPosition(user.uid, newPosition, false, 0);
          setMessage('You rolled doubles and are released from jail!');
        } else {
          const newJailTurns = player.jailTurns + 1;
          if (newJailTurns >= 3) {
            await updatePlayerPosition(user.uid, newPosition, false, 0);
            await updatePlayerMoney(user.uid, -GAME_CONFIG.JAIL_FINE);
            setMessage('You spent 3 turns in jail. Pay $50 to get out!');
          } else {
            await update(ref(database, `games/${gameId}/players/${user.uid}`), {
              jailTurns: newJailTurns,
            });
            setMessage(`You remain in jail. Turn ${newJailTurns}/3`);
          }
        }
      } else {
        if (newPosition === 30) {
          await updatePlayerPosition(user.uid, 10, true, 0);
          setMessage('Go to Jail! 🎮');
        } else {
          await updatePlayerPosition(user.uid, newPosition, false, 0);
          
          if (passedGo) {
            await updatePlayerMoney(user.uid, GAME_CONFIG.PASS_GO_BONUS);
            setMessage(`You passed START! Collect $${GAME_CONFIG.PASS_GO_BONUS}`);
          }
        }
      }
      
      if (isDoubles && !player.inJail) {
        setMessage('Doubles! Roll again!');
        return;
      }
      
      await passTurn();
      
    }, 1000);
  }, [gameId, user, currentPlayer, isRolling, gameState]);
  
  const updatePlayerPosition = async (playerId, position, inJail, jailTurns) => {
    await update(ref(database, `games/${gameId}/players/${playerId}`), {
      position, inJail, jailTurns,
    });
  };
  
  const updatePlayerMoney = async (playerId, amount) => {
    const currentPlayers = gameState?.players ? Object.values(gameState.players) : [];
    const player = currentPlayers.find(p => p.id === playerId);
    if (!player) return;
    
    const newMoney = player.money + amount;
    
    if (newMoney < 0) {
      await update(ref(database, `games/${gameId}/players/${playerId}`), {
        money: 0, bankrupt: true,
      });
      setMessage(`${player.name} is bankrupt!`);
    } else {
      await update(ref(database, `games/${gameId}/players/${playerId}`), {
        money: newMoney,
      });
    }
  };
  
  const passTurn = async () => {
    if (!gameId || !currentPlayer) return;
    
    const currentPlayers = gameState?.players ? Object.values(gameState.players) : [];
    const activePlayers = currentPlayers.filter(p => !p.bankrupt);
    const currentIndex = activePlayers.findIndex(p => p.id === currentPlayer);
    const nextIndex = (currentIndex + 1) % activePlayers.length;
    const nextPlayer = activePlayers[nextIndex];
    
    await update(ref(database, `games/${gameId}`), {
      currentPlayer: nextPlayer.id,
      turnNumber: (gameState?.turnNumber || 0) + 1,
    });
  };
  
  const buyProperty = useCallback(async () => {
    if (!gameId || !user || !canBuyProperty || !currentProperty) return;
    
    const currentPlayers = gameState?.players ? Object.values(gameState.players) : [];
    const player = currentPlayers.find(p => p.id === user.uid);
    if (!player || player.money < currentProperty.price) {
      setMessage("Not enough money!");
      return;
    }
    
    await updatePlayerMoney(user.uid, -currentProperty.price);
    
    const playerProperties = [...(player.properties || []), currentProperty.id];
    await update(ref(database, `games/${gameId}/players/${user.uid}`), {
      properties: playerProperties,
    });
    
    await update(ref(database, `games/${gameId}/properties/${currentProperty.id}`), {
      owner: user.uid,
      price: currentProperty.price,
    });
    
    setMessage(`You bought ${currentProperty.name}!`);
    setCanBuyProperty(false);
    setCurrentProperty(null);
    
    await passTurn();
  }, [gameId, user, canBuyProperty, currentProperty, gameState]);
  
  const dontBuyProperty = useCallback(async () => {
    setCanBuyProperty(false);
    setCurrentProperty(null);
    await passTurn();
  }, []);
  
  const payJailFine = useCallback(async () => {
    if (!gameId || !user) return;
    
    await updatePlayerMoney(user.uid, -GAME_CONFIG.JAIL_FINE);
    await update(ref(database, `games/${gameId}/players/${user.uid}`), {
      inJail: false, jailTurns: 0,
    });
    
    setJailOptions(false);
    setMessage('You paid $50 to get out of jail!');
  }, [gameId, user]);
  
  const useJailCard = useCallback(async () => {
    await payJailFine();
  }, [payJailFine]);
  
  const updatePlayerName = useCallback(async (name) => {
    if (!gameId || !user) return;
    
    await update(ref(database, `games/${gameId}/players/${user.uid}`), { name });
  }, [gameId, user]);
  
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const value = {
    user, loading, gameId, gameState, players, currentPlayer, isHost, gamePhase,
    diceValues, isRolling, diceAnimation, canBuyProperty, currentProperty,
    showCard, message, jailOptions, createGame, joinGame, startGame, leaveGame,
    rollDice, buyProperty, dontBuyProperty, payJailFine, useJailCard,
    updatePlayerName, setMessage, setShowCard, setJailOptions,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
