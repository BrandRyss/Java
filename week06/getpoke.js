// Function to fetch a random Pokémon
async function fetchRandomPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const pokemon = data.results[randomIndex];
    return pokemon;
  }
  
  // Function to fetch Pokémon details by name
  async function fetchPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }
  
  // Function to display the Pokémon sprite
  function displayPokemonSprite(spriteUrl) {
    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = `<img src="${spriteUrl}" alt="Pokemon Sprite">`;
  }
  
  // Function to check the user's guess
  function checkGuess(pokemonName, userGuess) {
    const guessResult = document.getElementById('guess-result');
    const guessAgain = confirm("Would you like to guess again?");
  
    if (userGuess.toLowerCase() === pokemonName.toLowerCase()) {
      guessResult.textContent = 'Correct! You identified the Pokémon.';
    } else {
      guessResult.textContent = `Incorrect. The Pokémon's name is ${pokemonName}.`;
    }
  
    if (guessAgain) {
      guessResult.textContent = '';
      startNewGame();
    }
  }
  
  // Function to start a new game
  async function startNewGame() {
    const pokemon = await fetchRandomPokemon();
    const pokemonDetails = await fetchPokemonDetails(pokemon.name);
    const spriteUrl = pokemonDetails.sprites.front_default;
  
    displayPokemonSprite(spriteUrl);
  
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', () => {
      const guessInput = document.getElementById('guess-input');
      const userGuess = guessInput.value;
      checkGuess(pokemon.name, userGuess);
    });
  }
  
  // Main function to execute the program
  function main() {
    startNewGame();
  }
  
  // Run the main function
  main();
  
  