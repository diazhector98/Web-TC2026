const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

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


pokemonCards = []


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
            addPokemonCard(pokemonCard)

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

    pokemonNameText.innerHTML = pokemon.name
    pokemonWeightText.innerHTML = pokemon.weight

    container.appendChild(pokemonNameText)
    container.appendChild(pokemonWeightText)

    return container
}

const addPokemonCard = (pokemonCard) => {
    const container = document.getElementById("pokemon-cards")
    container.appendChild(pokemonCard)
    pokemonCards.push(pokemonCard)
}