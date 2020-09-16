const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
const DELETE_POKEMON_BUTTON_TEXT = "Delete"
class Pokemon {
    constructor(data) {
        const {
            name,
            weight,
            sprites
        } = data;

        this.name = name
        this.weight = weight
        this.imageUrl = Object.keys(sprites).length != 0 ? sprites.front_default : ""
    }
}

// Document Node -> Pokemon Object
let pokemons = {

}

let totalWeight = 0

const onAddPokemonButtonClicked = () => {
    const pokemonNameInputText = document.getElementById("pokemon-name-input")
    const pokemonName = pokemonNameInputText.value;
    console.log(`Pokemon ${pokemonName} added!`)
    fetchPokemon(pokemonName)
}

const fetchPokemon = (pokemonName) => {
    const url = BASE_URL + pokemonName

    axios.get(url)
        .then((response) => {
            console.log({response})
            pokemon = new Pokemon(response.data)
            pokemonCard = createPokemonCard(pokemon)
            pokemons[pokemon.name] = pokemon
            addPokemonCard(pokemonCard)
            addWeight(pokemon)
        })
        .catch((error) => {
            console.log({error})
        })
        .then(() => {
            console.log("Finished")
        })
}

const createPokemonCard = (pokemon) => {
    const container = document.createElement("div")
    const pokemonNameText = document.createElement("p")
    const pokemonWeightText = document.createElement("p")
    const deletePokemonButton = document.createElement("button")

    container.id = pokemon.name
    pokemonNameText.innerHTML = pokemon.name
    pokemonWeightText.innerHTML = pokemon.weight
    deletePokemonButton.innerHTML = DELETE_POKEMON_BUTTON_TEXT

    deletePokemonButton.addEventListener("click", deletePokemon)

    container.appendChild(pokemonNameText)
    container.appendChild(pokemonWeightText)
    container.appendChild(deletePokemonButton)

    return container
}

const deletePokemon = (event) => {
    const deleteButton = event.target
    const pokemonCard = deleteButton.parentElement
    const pokemonCardsContainer = document.getElementById("pokemon-cards")
    const pokemonId = pokemonCard.id
    
    removeWeight(pokemons[pokemonId])
    removePokemonCard(pokemonCard)
}

const addPokemonCard = (pokemonCard) => {
    const container = document.getElementById("pokemon-cards")
    container.appendChild(pokemonCard)
}

const removePokemonCard = (pokemonCard) => {
    const container = document.getElementById("pokemon-cards")
    container.removeChild(pokemonCard)
}

const addWeight = (pokemon) => {
    const weightTextNode = document.getElementById("total-weight-text")
    totalWeight += pokemon.weight
    weightTextNode.innerHTML = totalWeight.toString()
}

const removeWeight = (pokemon) => {
    const weightTextNode = document.getElementById("total-weight-text")
    totalWeight -= pokemon.weight
    weightTextNode.innerHTML = totalWeight.toString()
}