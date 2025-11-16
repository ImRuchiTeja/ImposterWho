// Inline cards data so no fetch/server is needed
const cardsData = {
  "animals": [
    { "id": 1, "word": "Tiger", "hint": "Striped predator" },
    { "id": 2, "word": "Elephant", "hint": "Large and gray" }
  ],
  "food": [
    { "id": 1, "word": "Pizza", "hint": "Round and cheesy" },
    { "id": 2, "word": "Sushi", "hint": "Raw fish delicacy" }
  ],
  "characters": [
    { "id": 1, "word": "Sherlock", "hint": "Famous detective" }
  ],
  "actors": [
    { "id": 1, "word": "Tom Hanks", "hint": "Star of Forrest Gump" }
  ],
  "objects": [
    { "id": 1, "word": "Laptop", "hint": "Portable computer" }
  ]
};

let players = [];
let currentPlayerIndex = 0;
let selectedWord = null;

document.getElementById('start-game').addEventListener('click', () => {
  const numPlayers = parseInt(document.getElementById('num-players').value);
  const numImposters = parseInt(document.getElementById('num-imposters').value);
  const topic = document.getElementById('topic-select').value;
  const hintsEnabled = document.getElementById('hints-toggle').checked;

  if (numImposters >= numPlayers) {
    alert("Number of imposters must be less than number of players.");
    return;
  }

  // Initialize players
  players = Array(numPlayers).fill().map(() => ({ isImposter: false }));
  let imposterIndices = [];
  while (imposterIndices.length < numImposters) {
    let index = Math.floor(Math.random() * numPlayers);
    if (!imposterIndices.includes(index)) {
      imposterIndices.push(index);
      players[index].isImposter = true;
    }
  }

  // Pick a random word from the topic
  const topicCards = cardsData[topic];
  selectedWord = topicCards[Math.floor(Math.random() * topicCards.length)];

  // Hide setup, show first player
  document.getElementById('setup-screen').style.display = 'none';
  currentPlayerIndex = 0;
  showPlayerScreen(hintsEnabled);
});

document.getElementById('next-player').addEventListener('click', () => {
  const hintsEnabled = document.getElementById('hints-toggle').checked;
  currentPlayerIndex++;
  if (currentPlayerIndex >= players.length) {
    // End game, show discussion screen
    document.getElementById('player-screen').style.display = 'none';
    document.getElementById('discussion-screen').style.display = 'block';
  } else {
    showPlayerScreen(hintsEnabled);
  }
});

function showPlayerScreen(hintsEnabled) {
  const player = players[currentPlayerIndex];
  document.getElementById('player-screen').style.display = 'block';
  document.getElementById('player-title').innerText = `Player ${currentPlayerIndex + 1}`;

  if (player.isImposter) {
    document.getElementById('word-display').innerText = "You are the Imposter" + (hintsEnabled ? `\nHint: ${selectedWord.hint}` : '');
  } else {
    document.getElementById('word-display').innerText = selectedWord.word;
  }
}

document.getElementById('play-again').addEventListener('click', () => {
  // Reset everything
  players = [];
  currentPlayerIndex = 0;
  selectedWord = null;

  // Hide discussion screen, show setup screen
  document.getElementById('discussion-screen').style.display = 'none';
  document.getElementById('setup-screen').style.display = 'block';
  
  // Reset inputs to default values
  document.getElementById('num-players').value = 3;
  document.getElementById('num-imposters').value = 1;
  document.getElementById('topic-select').value = 'animals';
  document.getElementById('hints-toggle').checked = false;
});