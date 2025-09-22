const arena = document.getElementById("arena");
const rockCountEl = document.getElementById("rockCount");
const paperCountEl = document.getElementById("paperCount");
const scissorsCountEl = document.getElementById("scissorsCount");

const ENTITY_TYPES = ["rock", "paper", "scissors"];
const ICONS = { rock: "🪨", paper: "📄", scissors: "✂️" };

let entities = [];
let intervalId = null;
let SPEED_MULTIPLIER = 1;
const MAX_SPEED = 25;
const MIN_SPEED = 1;
let currentBet = null;

// Inicializar dinero
function loadMoney() {
  let money = localStorage.getItem("money");
  if (!money || money <= 0) {
    money = 20000;
    localStorage.setItem("money", money);
  }
  document.getElementById("moneyDisplay").textContent = money;
}
loadMoney();

// Desactivar/activar controles de apuestas
function setBetControls(enabled) {
  document.getElementById("betChoice").disabled = !enabled;
  document.getElementById("betAmount").disabled = !enabled;
  document.getElementById("placeBet").disabled = !enabled;
}

// Colocar apuesta
document.getElementById("placeBet").addEventListener("click", () => {
  const choice = document.getElementById("betChoice").value;
  const amount = parseInt(document.getElementById("betAmount").value);
  let money = parseInt(localStorage.getItem("money"));

  if (amount > money) {
    document.getElementById("betInfo").textContent = "Not enough money!";
    return;
  }

  currentBet = { choice, amount };
  document.getElementById("betInfo").textContent =
    "Bet placed: " + amount + " on " + choice.toUpperCase();

  setBetControls(false);
});

// Indicador de velocidad
function updateSpeedIndicator() {
  document.getElementById("speedIndicator").textContent =
    "⚡ Speed: " + SPEED_MULTIPLIER + "x";
}

// Aumentar velocidad
function applySpeed() {
  if (SPEED_MULTIPLIER >= MAX_SPEED) return;
  SPEED_MULTIPLIER += 4;
  if (SPEED_MULTIPLIER > MAX_SPEED) SPEED_MULTIPLIER = MAX_SPEED;

  entities.forEach(e => {
    e.dx += 4;
    e.dy += 4;
  });

  updateButtons();
  updateSpeedIndicator();
}

// Disminuir velocidad
function reduceSpeed() {
  if (SPEED_MULTIPLIER <= MIN_SPEED) return;
  SPEED_MULTIPLIER -= 4;
  if (SPEED_MULTIPLIER < MIN_SPEED) SPEED_MULTIPLIER = MIN_SPEED;

  entities.forEach(e => {
    e.dx = Math.sign(e.dx) * Math.max(Math.abs(e.dx) - 4, 1);
    e.dy = Math.sign(e.dy) * Math.max(Math.abs(e.dy) - 4, 1);
  });

  updateButtons();
  updateSpeedIndicator();
}

// Actualizar estado de botones
function updateButtons() {
  const incBtn = document.getElementById("speedBtn");
  const decBtn = document.getElementById("slowBtn");
  incBtn.disabled = SPEED_MULTIPLIER >= MAX_SPEED;
  decBtn.disabled = SPEED_MULTIPLIER < 5;
}

// Crear entidad
function createEntity(type) {
  const el = document.createElement("div");
  el.classList.add("entity", type);
  el.innerText = ICONS[type];
  el.style.left = Math.random() * (arena.clientWidth - 30) + "px";
  el.style.top = Math.random() * (arena.clientHeight - 30) + "px";

  return {
    type,
    x: parseFloat(el.style.left),
    y: parseFloat(el.style.top),
    dx: (Math.random() - 0.5) * 4 * SPEED_MULTIPLIER,
    dy: (Math.random() - 0.5) * 4 * SPEED_MULTIPLIER,
    el
  };
}

// Actualizar contadores
function updateCounters() {
  const counts = { rock: 0, paper: 0, scissors: 0 };
  entities.forEach(e => counts[e.type]++);
  rockCountEl.textContent = counts.rock;
  paperCountEl.textContent = counts.paper;
  scissorsCountEl.textContent = counts.scissors;
}

// Colisiones
function checkCollision(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy) < 30;
}

// Resolver pelea
function resolveFight(a, b) {
  if (a.type === b.type) return;

  if (a.type === "rock" && b.type === "scissors") b.type = "rock";
  else if (a.type === "scissors" && b.type === "paper") b.type = "scissors";
  else if (a.type === "paper" && b.type === "rock") b.type = "paper";
  else if (b.type === "rock" && a.type === "scissors") a.type = "rock";
  else if (b.type === "scissors" && a.type === "paper") a.type = "scissors";
  else if (b.type === "paper" && a.type === "rock") a.type = "paper";

  a.el.className = "entity " + a.type;
  b.el.className = "entity " + b.type;
  a.el.innerText = ICONS[a.type];
  b.el.innerText = ICONS[b.type];
}

// Mover entidades
function moveEntities() {
  entities.forEach(e => {
    e.x += e.dx;
    e.y += e.dy;
    if (e.x <= 0 || e.x >= arena.clientWidth - 30) e.dx *= -1;
    if (e.y <= 0 || e.y >= arena.clientHeight - 30) e.dy *= -1;
    e.el.style.left = e.x + "px";
    e.el.style.top = e.y + "px";
  });

  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      if (checkCollision(entities[i], entities[j])) {
        resolveFight(entities[i], entities[j]);
      }
    }
  }

  updateCounters();

  const uniqueTypes = new Set(entities.map(e => e.type));
  if (uniqueTypes.size === 1) {
    clearInterval(intervalId);
    const winner = [...uniqueTypes][0];
    let modalMessage = "🏆 Winner: " + winner.toUpperCase();

    if (currentBet) {
      let money = parseInt(localStorage.getItem("money"));
      if (currentBet.choice === winner) {
        money += currentBet.amount;
        modalMessage += "\n🎉 You WON! +" + currentBet.amount + " points";
      } else {
        money -= currentBet.amount;
        modalMessage += "\n😢 You LOST! -" + currentBet.amount + " points";
      }
      localStorage.setItem("money", money);
      document.getElementById("moneyDisplay").textContent = money;
      currentBet = null;
      document.getElementById("betInfo").textContent = "";
    } else {
      modalMessage += "\n(No bets placed)";
    }

    setBetControls(true);
    document.getElementById("startBtn").disabled = false;

    SPEED_MULTIPLIER = 1;
    updateButtons();
    updateSpeedIndicator();

    showWinnerModal(modalMessage);
  }
}

// Iniciar simulación
function startSimulation() {
  arena.innerHTML = "";
  entities = [];

  ENTITY_TYPES.forEach(type => {
    for (let i = 0; i < 20; i++) {
      const entity = createEntity(type);
      entities.push(entity);
      arena.appendChild(entity.el);
    }
  });

  updateCounters();
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(moveEntities, 50);

  updateButtons();
  updateSpeedIndicator();

  document.getElementById("startBtn").disabled = true;
  setBetControls(false);
}

// Modal
function showWinnerModal(message) {
  const modal = document.getElementById("winnerModal");
  const winnerText = document.getElementById("winnerText");
  winnerText.textContent = message;
  modal.style.display = "block";
}
document.getElementById("closeModal").onclick = function() {
  document.getElementById("winnerModal").style.display = "none";
};
window.onclick = function(event) {
  const modal = document.getElementById("winnerModal");
  if (event.target === modal) modal.style.display = "none";
};

// Eventos
document.getElementById("startBtn").addEventListener("click", startSimulation);
document.getElementById("speedBtn").addEventListener("click", applySpeed);
document.getElementById("slowBtn").addEventListener("click", reduceSpeed);
