const spriteContainer = document.getElementById('sprite-container');
const guessResult = document.getElementById('guess-result');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const newGameButton = document.getElementById('new-game-button');
const genCheckboxes = document.querySelectorAll('.gen-checkbox');
const typeComparison = document.getElementById('type-comparison');

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
  const guessResult = document.getElementById('guess-result');
  const newGameButton = document.getElementById('new-game-button');
  guessResult.innerHTML = '';

  if (guess.toLowerCase() === pokemonName.toLowerCase()) {
    guessResult.textContent = 'Correct! Play again? Click "New Game"';
    newGameButton.disabled = false;
    
    // Get type effectiveness
    const effectiveness = getTypeEffectiveness(pokemonTypes);

    // Display type information
    updateTypeInformation(effectiveness);
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
  typeComparison.textContent = '';

  if (selectedGenerations.length === 0) {
    guessResult.textContent = 'Please select at least one generation.';
    return;
  }

  fetchRandomPokemon()
    .then((pokemon) => {
      displayPokemonSprite(pokemon.sprites.front_default);
      generateTypeComparison(pokemon);
    })
    .catch((error) => {
      console.log('Error fetching Pokémon:', error);
    });
}

// Function to generate type comparison
function generateTypeComparison(pokemon) {
  const types = pokemon.types.map(type => type.type.name);
  const effectiveness = calculateTypeEffectiveness(types);

  if (effectiveness.strong.length > 0 || effectiveness.weak.length > 0) {
    let comparisonText = 'This Pokémon is ';
    if (effectiveness.strong.length > 0) {
      comparisonText += `strong against ${effectiveness.strong.join(', ')}`;
    }
    if (effectiveness.weak.length > 0) {
      if (effectiveness.strong.length > 0) {
        comparisonText += ' and ';
      }
      comparisonText += `weak against ${effectiveness.weak.join(', ')}`;
    }
    comparisonText += '.';
    typeComparison.textContent = comparisonText;
  } else {
    typeComparison.textContent = 'This Pokémon does not have any known type advantages or weaknesses.';
  }
}
// Function to update type information
function updateTypeInformation(effectiveness) {
  const typeAdvantagesElement = document.getElementById('type-advantages');
  const typeWeaknessesElement = document.getElementById('type-weaknesses');

  // Display type advantages
  if (effectiveness.strong.length > 0) {
    const advantagesText = `Advantages: ${effectiveness.strong.join(', ')}`;
    typeAdvantagesElement.textContent = advantagesText;
  } else {
    typeAdvantagesElement.textContent = 'No type advantages';
  }

  // Display type weaknesses
  if (effectiveness.weak.length > 0) {
    const weaknessesText = `Weaknesses: ${effectiveness.weak.join(', ')}`;
    typeWeaknessesElement.textContent = weaknessesText;
  } else {
    typeWeaknessesElement.textContent = 'No type weaknesses';
  }
}

// Function to calculate type effectiveness
function calculateTypeEffectiveness(types) {
  const typeEffectiveness = {
    normal: {
      strong: [],
      weak: ['rock', 'steel'],
    },
    fire: {
      strong: ['grass', 'ice', 'bug', 'steel'],
      weak: ['fire', 'water', 'rock', 'dragon'],
    },
    water: {
      strong: ['fire', 'ground', 'rock'],
      weak: ['water', 'grass', 'dragon'],
    },
    electric: {
      strong: ['water', 'flying'],
      weak: ['electric', 'grass', 'dragon'],
    },
    grass: {
      strong: ['water', 'ground', 'rock'],
      weak: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    },
    ice: {
      strong: ['grass', 'ground', 'flying', 'dragon'],
      weak: ['fire', 'water', 'ice', 'steel'],
    },
    fighting: {
      strong: ['normal', 'ice', 'rock', 'dark', 'steel'],
      weak: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    },
    poison: {
      strong: ['grass', 'fairy'],
      weak: ['poison', 'ground', 'rock', 'ghost'],
    },
    ground: {
      strong: ['fire', 'electric', 'poison', 'rock', 'steel'],
      weak: ['grass', 'bug'],
    },
    flying: {
      strong: ['grass', 'fighting', 'bug'],
      weak: ['electric', 'rock', 'steel'],
    },
    psychic: {
      strong: ['fighting', 'poison'],
      weak: ['psychic', 'steel'],
    },
    bug: {
      strong: ['grass', 'psychic', 'dark'],
      weak: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
    },
    rock: {
      strong: ['fire', 'ice', 'flying', 'bug'],
      weak: ['fighting', 'ground', 'steel'],
    },
    ghost: {
      strong: ['psychic', 'ghost'],
      weak: ['dark'],
    },
    dragon: {
      strong: ['dragon'],
      weak: ['steel'],
    },
    dark: {
      strong: ['psychic', 'ghost'],
      weak: ['fighting', 'dark', 'fairy'],
    },
    steel: {
      strong: ['ice', 'rock', 'fairy'],
      weak: ['fire', 'water', 'electric', 'steel'],
    },
    fairy: {
      strong: ['fighting', 'dragon', 'dark'],
      weak: ['fire', 'poison', 'steel'],
    },
  };

  const effectiveness = {
    strong: [],
    weak: [],
  };

  for (const targetType of types) {
    for (const pokemonType in typeEffectiveness) {
      if (typeEffectiveness[pokemonType].strong.includes(targetType)) {
        effectiveness.strong.push(pokemonType);
      } else if (typeEffectiveness[pokemonType].weak.includes(targetType)) {
        effectiveness.weak.push(pokemonType);
      }
    }
  }

  return effectiveness;
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
