# Gamingopoly

A custom multiplayer Monopoly game with a gaming industry theme. Built with React and Firebase Realtime Database.

## 🎮 Features

- **Custom Gaming Theme** - Own game studios, esports teams, and gaming platforms
- **Real-time Multiplayer** - Play with friends online via Firebase
- **Custom Properties** - 22 unique gaming industry properties + 4 Rail Hubs
- **Lobby System** - Create games and invite friends with unique game codes
- **Full Game Rules** - Buying property, rent, jail, bankruptcy, and more
- **Animated Dice** - Smooth dice rolling with framer-motion animations
- **Modern UI** - Beautiful dark theme with neon gaming aesthetics

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Anonymous Auth
- **Animations**: Framer Motion
- **Styling**: Custom CSS with Gaming Theme

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
4. Enable Realtime Database and Anonymous Authentication
5. Update the Firebase config in `src/firebase/config.js`
6. Run development server:
   ```bash
   npm run dev
   ```

## 🎯 How to Play

1. **Create Game** - Click "Create Game" to start a new game
2. **Share Code** - Share the game code with friends
3. **Join Game** - Friends enter the code to join
4. **Start Game** - Host clicks "Start Game" when ready
5. **Roll Dice** - Take turns rolling and moving your token
6. **Buy Properties** - Purchase properties you land on
7. **Collect Rent** - Collect rent when opponents land on your properties
8. **Win** - Be the last player with money!

## 📝 Custom Properties

### Brown Group
- Indie Arcade - $60
- Pixel Studio - $60

### Light Blue Group
- Mobile Games Co - $100
- Browser Games - $100
- Free to Play Inc - $120

### Pink Group
- Esports Arena - $140
- Gaming Cafe - $140
- Stream Network - $160

### Orange Group
- VR Development - $180
- AR Gaming Lab - $180
- Metaverse Corp - $200

### Red Group
- Triple A Studio - $220
- Game Publisher - $220
- Digital Distributor - $240

### Yellow Group
- Gaming Hardware - $260
- Gaming Peripherals - $260
- Console Maker - $280

### Green Group
- Gaming University - $300
- Esports League - $300
- Gaming Convention - $320

### Blue Group
- Gaming Empire HQ - $350
- Ultimate Game Co - $400

### Rail Hubs (4)
- Central Station - $200
- North Station - $200
- East Station - $200
- West Station - $200

## 🔧 License

MIT
