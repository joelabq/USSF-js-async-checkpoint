var fs = require('fs')
var fetch = require('node-fetch')
var pokeAPI = "https://pokeapi.co/api/v2/pokemon"
let pokePromises = []
var thisPokemon = {}

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
                        thisPokemon[individualPokemon] =  currentPokeTypes.join(", ") 
                    }))
        })
}

pokeAPIFetcher();

 Promise.all(pokePromises)
     .then(() => {
        
            for (const [poke, pokeType] of Object.entries(thisPokemon)) {
                console.log(`${poke}: ${pokeType}`)
            }
        
        
        
    })