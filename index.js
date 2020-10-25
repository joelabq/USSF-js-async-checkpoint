var fs = require('fs')
var fetch = require('node-fetch')
var pokeAPI = "https://pokeapi.co/api/v2/pokemon"
let pokePromises = []
var pokeTypes = []

//get the pokemon names from the input file
var pokemon = fs.readFileSync('input.txt').toString().split("\n")

async function pokeAPIFetcher(apiURL) {
    
    pokemon.forEach(
        individualPokemon => {
            pokePromises.push(
                fetch(`${pokeAPI}/${individualPokemon}`)
                    .then(response => response.json())
                    .then(data => {
                            let currentPokeTypes = []  
                            Object.values(data.types).forEach( currentPokeData => {
                                     currentPokeTypes.push(`${currentPokeData.type.name}`)
                            })
                        let thisPokemon = {}
                        thisPokemon[individualPokemon] =  currentPokeTypes.join(", ") 
                        pokeTypes.push(thisPokemon)
                    }))
        })
}

pokeAPIFetcher();

 Promise.all(pokePromises)
     .then(() => {
        pokeTypes.reverse().forEach(thisPoke => {
            for (const [poke, pokeType] of Object.entries(thisPoke)) {
                console.log(`${poke}: ${pokeType}`)
            }
        })
        
        
    })