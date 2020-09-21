const express = require('express')
const axios = require('axios');
const cors = require('cors')
const app = express()
const port = 3000

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

app.use(cors())

let pokemonDictionary = {

}

app.get('/pokemon', (request, response) => {
    const pokemonName = request.query.pokemonName
    const pokemonApiUrl = BASE_URL + pokemonName


    axios.get(pokemonApiUrl)
    .then((res) => {

        const pokemonData = res.data

        if (pokemonDictionary[pokemonData.id]) {
            response.send(pokemonDictionary[pokemonData.id])
        } else {
            pokemonDictionary[pokemonData.id] = pokemonData
            response.send(pokemonData)
        }
    })
    .catch((error) => {
        response.status = 400
        response.send(error)
    })
})

app.listen(port, () => {
    console.log(`Pokemon API listening at port ${port}`)
    
})