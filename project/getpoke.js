const spriteContainer = document.getElementById('sprite-container');
const guessResult = document.getElementById('guess-result');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const newGameButton = document.getElementById('new-game-button');
const genCheckboxes = document.querySelectorAll('.gen-checkbox');

let selectedGenerations = [];

// Event listeners for generation checkboxes
genCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const generation = parseInt(checkbox.value);
    if (checkbox.checked) {
      selectedGenerations.push(generation);
    } else {
      selectedGenerations = selectedGenerations.filter(gen => gen !== generation);
    }
  });
});

// Function to fetch Pokémon details by ID
async function fetchPokemonDetails(pokemonID) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  const data = await response.json();
  return data;
}

// Function to fetch a random Pokémon based on selected generations
async function fetchRandomPokemon() {
  const generationIDs = {
    1: [1, 151],   // Generation 1: IDs 1 to 151
    2: [152, 251], // Generation 2: IDs 152 to 251
    3: [252, 386], // Generation 3: IDs 252 to 386
    4: [387, 493], // Generation 4: IDs 387 to 493
    5: [494, 649]  // Generation 5: IDs 494 to 649
  };

  const availableIDs = selectedGenerations.flatMap((generation) => {
    const [startID, endID] = generationIDs[generation];
    const range = endID - startID + 1;
    return Array.from({ length: range }, (_, index) => startID + index);
  });

  const randomID = availableIDs[Math.floor(Math.random() * availableIDs.length)];
  const pokemon = await fetchPokemonDetails(randomID);

  return pokemon;
}

// Function to display Pokémon sprite
function displayPokemonSprite(spriteURL) {
  spriteContainer.innerHTML = `<img src="${spriteURL}" alt="Pokemon Sprite">`;
}

// Function to check the guess
function checkGuess(pokemonName, guess) {
  guessResult.innerHTML = '';

  if (guess.toLowerCase() === pokemonName.toLowerCase()) {
    guessResult.textContent = 'Correct! Play again? Click "New Game"';
    newGameButton.disabled = false;
  } else {
    guessResult.textContent = `Incorrect! The Pokémon was ${pokemonName}. Try again.`;
  }
}

// Function to start a new game
function newGame() {
  guessResult.textContent = '';
  guessInput.value = '';
  submitButton.disabled = false;
  spriteContainer.innerHTML = '';

  if (selectedGenerations.length === 0) {
    guessResult.textContent = 'Please select at least one generation.';
    return;
  }

  fetchRandomPokemon()
    .then((pokemon) => {
      spriteContainer.dataset.pokemonName = pokemon.name;
      displayPokemonSprite(pokemon.sprites.front_default);
    })
    .catch((error) => {
      console.log('Error fetching Pokémon:', error);
    });
}

// Event listener for guess submission
submitButton.addEventListener('click', () => {
  const guess = guessInput.value.trim();
  if (guess !== '') {
    const pokemonName = spriteContainer.dataset.pokemonName;
    checkGuess(pokemonName, guess);
  }
});

// Event listener for new game button
newGameButton.addEventListener('click', newGame);

// Start a new game when the page loads
newGame();
