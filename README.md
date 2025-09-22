# Rock, Paper, Scissors Simulation

## 1. Project Introduction

This project implements an automated simulation of the classic Rock, Paper, Scissors game. Unlike the traditional game played between two human players, here the elements are generated automatically and move randomly within the simulation arena, competing against each other until only one type remains.  

Additionally, the system includes a betting module that allows the user to place virtual bets on which element will be the final winner. Points are managed using the browser’s localStorage, providing persistence across sessions.  

The main objective of this project is to demonstrate basic concepts of animation in JavaScript, collision detection, simulation logic, DOM manipulation, and persistence with localStorage.

---

## 2. Key Features

- Automatic generation of 20 entities for each type (rock, paper, scissors).  
- Random movement of entities within a bounded arena.  
- Resolution of fights according to the classic rules:  
  - Rock defeats Scissors.  
  - Scissors defeat Paper.  
  - Paper defeats Rock.  
- Betting system: users can place bets on which element will be the final winner.  
- Persistence of points using localStorage.  
- Dynamic counters showing the number of remaining entities of each type.  
- Simulation speed control with increase/decrease buttons.  
- End-of-simulation modal showing the winner and betting result.  
- Automatic activation/deactivation of buttons and controls depending on the simulation state.  

---

## 3. Architecture and Code Organization

The project is structured into three main files:

- **index.html**:  
  Provides the base structure of the application, including the simulation arena, controls, betting section, and result modal.

- **style.css**:  
  Defines the visual layout of the application. Includes button styles, three-column layout (controls, simulation, betting), arena styling, entity animations, and modal design.

- **script.js**:  
  Contains the full logic of the simulation. Handles entity creation, movement, collision detection, betting logic, localStorage integration, button state control, and counter updates.

---

## 4. Detailed Code Explanation

### Core Structures
- **ENTITY_TYPES**: Array with the possible entity types (`rock`, `paper`, `scissors`).  
- **ICONS**: Dictionary mapping entity types to their visual representation.  
- **entities**: Array containing all active entities in the simulation.  
- **SPEED_MULTIPLIER**: Controls the global movement speed of the entities.  
- **currentBet**: Object representing the current bet (chosen type and amount).

### Key Functions
- **loadMoney()**: Initializes the user’s balance in localStorage. If it does not exist or is zero, sets it to 20000 points.  
- **setBetControls(enabled)**: Enables or disables all betting inputs and buttons.  
- **createEntity(type)**: Creates a new entity of a given type at a random position within the arena.  
- **updateCounters()**: Updates the displayed counters for each entity type.  
- **checkCollision(a, b)**: Detects collisions between two entities.  
- **resolveFight(a, b)**: Applies the game rules when two entities collide and updates their type accordingly.  
- **moveEntities()**: Updates the position of entities, resolves collisions, and checks if a single type remains.  
- **startSimulation()**: Starts the simulation, generates entities, and runs the update loop. Disables the start button until the simulation finishes.  
- **applySpeed() and reduceSpeed()**: Increase or decrease the global movement speed.  
- **showWinnerModal(message)**: Displays a modal with the simulation’s result.  

### Event Handling
- Simulation control buttons (`startBtn`, `speedBtn`, `slowBtn`).  
- Betting button (`placeBet`).  
- Modal close events (clicking the X or outside the modal).

---

## 5. Application Flow

1. The user opens the application in the browser.  
2. The system initializes the user’s balance from localStorage.  
3. The user may place a bet by selecting an entity type and entering an amount.  
4. When the simulation starts, 20 entities of each type are generated and move inside the arena.  
5. Collisions are resolved following Rock-Paper-Scissors rules.  
6. Entity counters are updated dynamically during the simulation.  
7. The simulation ends when only one type remains.  
8. A modal displays the final result:  
   - If a bet was placed, it shows whether the user won or lost and updates the balance accordingly.  
   - If no bet was placed, it simply shows the winning entity.  
9. After the simulation, all controls are re-enabled, and the speed resets to 1.  

---

## 6. Installation and Usage Instructions

1. Clone or download the repository.  
2. Ensure the three files (`index.html`, `style.css`, `script.js`) are in the same directory.  
3. Open `index.html` in any modern web browser.  
4. Use the controls to start a simulation, adjust the speed, and place bets.

No installation or external dependencies are required.

---

## 7. System Limitations

- No simulation or betting history is recorded.  
- Speed adjustments are fixed increments and not fine-grained.  
- Entities follow simple linear trajectories with basic collision handling.  
- The betting system supports only one user and one active bet at a time.  
- No advanced graphics or sound effects are included.  

---

## 8. Recommendations for Future Improvements

- Add a history of previous simulations and bets.  
- Allow dynamic adjustment of the initial number of entities.  
- Include visual and audio effects for entity fights.  
- Create a multiplayer system for competitive betting.  
- Improve entity movement with more advanced physics.  
- Implement difficulty levels or variations of the rules.  
- Integrate a backend to persist simulation data and user profiles.  

---

