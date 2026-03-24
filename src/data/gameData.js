// Gamingopoly - Custom Monopoly Game Data
// Theme: Gaming Industry (Game Studios, Esports, Gaming Platforms)

export const GAME_CONFIG = {
  STARTING_MONEY: 1500,
  PASS_GO_BONUS: 200,
  JAIL_FINE: 50,
  INITIAL_HOUSES: 32,
  INITIAL_HOTELS: 12,
};

export const PLAYER_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#FF8C00', // Orange
  '#8B4513', // Brown
];

export const PLAYER_TOKENS = [
  '🎮', // Controller
  '🖱️', // Mouse
  '🎯', // Target
  '🏆', // Trophy
  '🎪', // Arcade
  '🎲', // Dice
  '👾', // Alien
  '⚡', // Lightning
];

// Board positions: 0-39 (40 spaces total)
// Standard Monopoly board layout
export const BOARD_SPACES = [
  // Corner spaces
  { id: 0, name: 'START', type: 'corner', action: 'collect', value: 200 },
  
  // Brown properties (2)
  { id: 1, name: 'Indie Arcade', type: 'property', group: 'brown', price: 60, rent: 2, houseCost: 50, color: '#8B4513' },
  { id: 2, name: 'Community Chest', type: 'card', cardType: 'community' },
  { id: 3, name: 'Pixel Studio', type: 'property', group: 'brown', price: 60, rent: 4, houseCost: 50, color: '#8B4513' },
  
  // Light Blue properties (3)
  { id: 4, name: 'Income Tax', type: 'tax', value: 200 },
  { id: 5, name: 'Rail Hub', type: 'railroad', name: 'Central Station', price: 200, rent: 25 },
  { id: 6, name: 'Mobile Games Co', type: 'property', group: 'lightBlue', price: 100, rent: 6, houseCost: 50, color: '#ADD8E6' },
  { id: 7, name: 'Chance', type: 'card', cardType: 'chance' },
  { id: 8, name: 'Browser Games', type: 'property', group: 'lightBlue', price: 100, rent: 6, houseCost: 50, color: '#ADD8E6' },
  { id: 9, name: 'Free to Play Inc', type: 'property', group: 'lightBlue', price: 120, rent: 8, houseCost: 50, color: '#ADD8E6' },
  
  // Corner - Jail
  { id: 10, name: 'JAIL', type: 'corner', action: 'jail' },
  
  // Pink properties (3)
  { id: 11, name: 'Esports Arena', type: 'property', group: 'pink', price: 140, rent: 10, houseCost: 100, color: '#FF69B4' },
  { id: 12, name: 'Utility - Power', type: 'utility', name: 'Cloud Servers', price: 150, rent: 'variable' },
  { id: 13, name: 'Gaming Cafe', type: 'property', group: 'pink', price: 140, rent: 10, houseCost: 100, color: '#FF69B4' },
  { id: 14, name: 'Stream Network', type: 'property', group: 'pink', price: 160, rent: 12, houseCost: 100, color: '#FF69B4' },
  
  // Orange properties (3)
  { id: 15, name: 'Rail Hub', type: 'railroad', name: 'North Station', price: 200, rent: 25 },
  { id: 16, name: 'VR Development', type: 'property', group: 'orange', price: 180, rent: 14, houseCost: 100, color: '#FFA500' },
  { id: 17, name: 'Community Chest', type: 'card', cardType: 'community' },
  { id: 18, name: 'AR Gaming Lab', type: 'property', group: 'orange', price: 180, rent: 14, houseCost: 100, color: '#FFA500' },
  { id: 19, name: 'Metaverse Corp', type: 'property', group: 'orange', price: 200, rent: 16, houseCost: 100, color: '#FFA500' },
  
  // Corner - Free Parking
  { id: 20, name: 'FREE PARKING', type: 'corner', action: 'parking' },
  
  // Red properties (3)
  { id: 21, name: 'Triple A Studio', type: 'property', group: 'red', price: 220, rent: 18, houseCost: 150, color: '#FF0000' },
  { id: 22, name: 'Chance', type: 'card', cardType: 'chance' },
  { id: 23, name: 'Game Publisher', type: 'property', group: 'red', price: 220, rent: 18, houseCost: 150, color: '#FF0000' },
  { id: 24, name: 'Digital Distributor', type: 'property', group: 'red', price: 240, rent: 20, houseCost: 150, color: '#FF0000' },
  
  // Yellow properties (3)
  { id: 25, name: 'Rail Hub', type: 'railroad', name: 'East Station', price: 200, rent: 25 },
  { id: 26, name: 'Gaming Hardware', type: 'property', group: 'yellow', price: 260, rent: 22, houseCost: 150, color: '#FFD700' },
  { id: 27, name: 'Utility - Water', type: 'utility', name: 'Data Center', price: 150, rent: 'variable' },
  { id: 28, name: 'Gaming Peripherals', type: 'property', group: 'yellow', price: 260, rent: 22, houseCost: 150, color: '#FFD700' },
  { id: 29, name: 'Console Maker', type: 'property', group: 'yellow', price: 280, rent: 24, houseCost: 150, color: '#FFD700' },
  
  // Corner - Go to Jail
  { id: 30, name: 'GO TO JAIL', type: 'corner', action: 'gotojail' },
  
  // Green properties (3)
  { id: 31, name: 'Gaming University', type: 'property', group: 'green', price: 300, rent: 26, houseCost: 200, color: '#008000' },
  { id: 32, name: 'Esports League', type: 'property', group: 'green', price: 300, rent: 26, houseCost: 200, color: '#008000' },
  { id: 33, name: 'Community Chest', type: 'card', cardType: 'community' },
  { id: 34, name: 'Gaming Convention', type: 'property', group: 'green', price: 320, rent: 28, houseCost: 200, color: '#008000' },
  
  // Blue properties (2)
  { id: 35, name: 'Rail Hub', type: 'railroad', name: 'West Station', price: 200, rent: 25 },
  { id: 36, name: 'Chance', type: 'card', cardType: 'chance' },
  { id: 37, name: 'Gaming Empire HQ', type: 'property', group: 'blue', price: 350, rent: 35, houseCost: 200, color: '#0000FF' },
  { id: 38, name: 'Luxury Tax', type: 'tax', value: 100 },
  { id: 39, name: 'Ultimate Game Co', type: 'property', group: 'blue', price: 400, rent: 50, houseCost: 200, color: '#0000FF' },
];

// Rent multipliers for railroads
export const RAILROAD_RENTS = [25, 50, 100, 200];

// Chance Cards
export const CHANCE_CARDS = [
  { id: 1, text: "Advance to START. Collect $200", action: 'goto', position: 0 },
  { id: 2, text: "Advance to Esports Arena", action: 'goto', position: 11 },
  { id: 3, text: "Advance to Gaming Empire HQ", action: 'goto', position: 37 },
  { id: 4, text: "Advance to North Station", action: 'goto', position: 15 },
  { id: 5, text: "Bank error in your favor. Collect $200", action: 'collect', amount: 200 },
  { id: 6, text: "Doctor's fee. Pay $50", action: 'pay', amount: 50 },
  { id: 7, text: "Go to Jail. Go directly to jail", action: 'jail' },
  { id: 8, text: "Advance to Free Parking", action: 'goto', position: 20 },
  { id: 9, text: "Speeding fine. Pay $15", action: 'pay', amount: 15 },
  { id: 10, text: "It is your birthday. Collect $10 from each player", action: 'collectfromeach', amount: 10 },
  { id: 11, text: "Advance to Triple A Studio", action: 'goto', position: 21 },
  { id: 12, text: "Loan matured. Collect $150", action: 'collect', amount: 150 },
  { id: 13, text: "Pay school fees of $150", action: 'pay', amount: 150 },
  { id: 14, text: "Advance to START", action: 'goto', position: 0 },
];

// Community Chest Cards
export const COMMUNITY_CHEST_CARDS = [
  { id: 1, text: "Advance to START. Collect $200", action: 'goto', position: 0 },
  { id: 2, text: "Bank error in your favor. Collect $200", action: 'collect', amount: 200 },
  { id: 3, text: "Doctor's fee. Pay $50", action: 'pay', amount: 50 },
  { id: 4, text: "Go to Jail. Go directly to jail", action: 'jail' },
  { id: 5, text: "Advance to Free Parking", action: 'goto', position: 20 },
  { id: 6, text: "It is your birthday. Collect $10 from each player", action: 'collectfromeach', amount: 10 },
  { id: 7, text: "Hospital fees. Pay $100", action: 'pay', amount: 100 },
  { id: 8, text: "Income tax refund. Collect $20", action: 'collect', amount: 20 },
  { id: 9, text: "Holiday fund matures. Collect $100", action: 'collect', amount: 100 },
  { id: 10, text: "Tax refund. Collect $50", action: 'collect', amount: 50 },
  { id: 11, text: "Pay school fees of $150", action: 'pay', amount: 150 },
  { id: 12, text: "Receive $25 consultancy fee", action: 'collect', amount: 25 },
  { id: 13, text: "Advance to Gaming University", action: 'goto', position: 31 },
  { id: 14, text: "Pay $40 per house. (Total $180)", action: 'payhouses', amount: 40 },
];

// Property groups with their rent rules
export const PROPERTY_GROUPS = {
  brown: { properties: [1, 3], color: '#8B4513', monopolyRent: 2 },
  lightBlue: { properties: [6, 8, 9], color: '#ADD8E6', monopolyRent: 3 },
  pink: { properties: [11, 13, 14], color: '#FF69B4', monopolyRent: 4 },
  orange: { properties: [16, 18, 19], color: '#FFA500', monopolyRent: 5 },
  red: { properties: [21, 23, 24], color: '#FF0000', monopolyRent: 6 },
  yellow: { properties: [26, 28, 29], color: '#FFD700', monopolyRent: 7 },
  green: { properties: [31, 32, 34], color: '#008000', monopolyRent: 8 },
  blue: { properties: [37, 39], color: '#0000FF', monopolyRent: 10 },
};

// Helper function to get property by ID
export const getPropertyById = (id) => BOARD_SPACES.find(space => space.id === id);

// Helper function to get properties by group
export const getPropertiesByGroup = (group) => 
  BOARD_SPACES.filter(space => space.group === group);

// Helper function to calculate rent
export const calculateRent = (property, owner, allProperties) => {
  if (!owner) return 0;
  
  const group = PROPERTY_GROUPS[property.group];
  if (!group) return property.rent;
  
  // Check if owner has monopoly (all properties in group)
  const ownedInGroup = group.properties.every(id => 
    allProperties[id]?.owner === owner.id
  );
  
  if (ownedInGroup) {
    return property.rent * 2;
  }
  
  return property.rent;
};
