const BASE_URL = "http://localhost:3000/pokemon/"
const DELETE_POKEMON_BUTTON_TEXT = "Delete"
class Pokemon {
    constructor(data) {
        const {
            id,
            name,
            weight,
            sprites,
            height,
            base_experience,
            types
        } = data;

        this.id = id
        this.name = name
        this.weight = weight
        this.height = height
        this.baseExperience = base_experience
        this.types = types.map(type => type.type.name)
        this.imageUrl = Object.keys(sprites).length != 0 ? sprites.front_default : ""

    }
}

// Document Node -> Pokemon Object
let pokemons = {

}

let totalWeight = 0

const onAddPokemonButtonClicked = (event) => {
    event.preventDefault()
    const pokemonNameInputText = document.getElementById("pokemon-name-input")
    const pokemonName = pokemonNameInputText.value;
    fetchPokemon(pokemonName)
}

const fetchPokemon = (pokemonName) => {
    const url = BASE_URL

    axios.get(url, {
        params: {
            pokemonName
        }
    })
        .then((response) => {
            removeErrorBanner()
            console.log({response})
            pokemon = new Pokemon(response.data)
            pokemonCard = createPokemonCard(pokemon)
            pokemons[pokemon.name] = pokemon
            addPokemonCard(pokemonCard)
            addWeight(pokemon)
        })
        .catch((error) => {

            console.log({error})
            showErrorBanner()
        })
        .then(() => {
            console.log("Finished")
        })
}

const showErrorBanner = () => {
    const errorContainer = document.getElementById("pokemon-not-found-container")
    const errorBanner = createErrorBanner()
    errorContainer.appendChild(errorBanner)
}

const removeErrorBanner = () => {
    const errorContainer = document.getElementById("pokemon-not-found-container")
    errorContainer.innerHTML = ""
}

const createPokemonCard = (pokemon) => {
    const container = document.createElement("div")
    const pokemonIdText = document.createElement("p")
    const pokemonImage = document.createElement("img")
    const pokemonBaseExperienceText = document.createElement("p")
    const pokemonNameText = document.createElement("p")
    const pokemonWeightText = document.createElement("p")
    const pokemonHeightText = document.createElement("p")
    const deletePokemonButton = document.createElement("button")

    container.id = pokemon.name
    container.classList.add("pokemon-card")

    pokemonIdText.innerHTML = "ID: " + pokemon.id
    pokemonImage.setAttribute("src", pokemon.imageUrl)
    pokemonNameText.innerHTML = pokemon.name
    pokemonBaseExperienceText.innerHTML = "Base Experience: " + pokemon.baseExperience
    pokemonWeightText.innerHTML = "Weight: " + pokemon.weight
    pokemonHeightText.innerHTML = "Height: " + pokemon.height
    deletePokemonButton.innerHTML = DELETE_POKEMON_BUTTON_TEXT

    deletePokemonButton.addEventListener("click", deletePokemon)

    container.appendChild(pokemonImage)
    container.appendChild(pokemonNameText)
    container.appendChild(pokemonIdText)
    container.appendChild(pokemonBaseExperienceText)
    container.appendChild(pokemonWeightText)
    container.appendChild(pokemonHeightText)

    container.appendChild(createPokemonTypesList(pokemon))
    container.appendChild(deletePokemonButton)

    return container
}

const createPokemonTypesList = (pokemon) => {
    const container = document.createElement("div")
    const title = document.createElement("p")
    title.innerHTML = "Types: "
    container.appendChild(title)

    const typesList = document.createElement("ul")
    pokemon.types.forEach(type => {
        const typeItem = document.createElement("li")
        typeItem.innerHTML = type
        typesList.appendChild(typeItem)
    })

    container.appendChild(typesList)
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

const createErrorBanner = () => {
    const container = document.createElement("div")
    container.id = "error-container"
    const message = document.createElement("p")
    message.innerHTML = "That pokemon does not exist!"
    container.appendChild(message)
    return container
}