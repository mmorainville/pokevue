
const axios = require('axios')
const fs = require('fs')

const pokemonArray = []

const writeInFile = () => {
  fs.writeFile('pokemon.json', JSON.stringify(pokemonArray), (err) => {
    if (err) throw err
    console.log('complete')
  })
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const getAllPokemon = async () => {
  await axios
    .get('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(async response => {
      const pokemon = response.data.results
      await asyncForEach(pokemon, async element => {
        const pokemonSpect = {}
        pokemonSpect.name = element.name
        await axios.get(element.url).then(res => {
          res = res.data
          pokemonSpect.id = res.id
          pokemonSpect.sprite = res.sprites.front_default
          pokemonSpect.types = res.types
          pokemonArray.push(pokemonSpect)
        })
      })
      writeInFile(pokemonArray)
    })
    .catch(error => {
      console.log(error)
    })
}

getAllPokemon()
