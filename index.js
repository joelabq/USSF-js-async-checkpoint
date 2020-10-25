var fs = require('fs')

async function readFileAsync() {
     let string = await fs.readFile('input.txt', (err, data) => {
          if (err) { 
              console.error(err)
            } 
           return data.toString()
        }) 
        
} 

var pokemon = fs.readFileSync('input.txt' ,'utf8') 

console.log(pokemon)