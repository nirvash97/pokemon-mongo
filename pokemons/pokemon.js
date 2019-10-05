const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

class Pokemon{
    constructor(name,type){
        this.id=null
        this.name=name
        this.type=type
        this.type2=null
    }
}

let pokemons = []
mockPokemon()

async function savePokemon(name,type){
    let p = createPokemon(name,type)
    const DB_URL = 'mongodb+srv://59160273:Chariot97@cluster0-otxxa.gcp.mongodb.net/admin?retryWrites=true&w=majority' //URL
    const DB_NAME = 'example'
    const option = {useNewUrlParser: true , useUnifiedTopology : true}
    var collection , database
    var client = await MongoClient.connect(DB_URL , option)
        
        .catch( err => console.error(err))
        database =  client.db(DB_NAME)
        collection = database.collection('pokemon')
        try {
            var result = await collection.insert(p)
            return true
        } catch(err){
            return false
        } finally {
            client.close()
        }        
}

async function GetPokemons(){
    const DB_URL = 'mongodb+srv://59160273:Chariot97@cluster0-otxxa.gcp.mongodb.net/admin?retryWrites=true&w=majority' //URL
    const DB_NAME = 'example'
    const option = {useNewUrlParser: true , useUnifiedTopology : true}
    var collection , database
    var client = await MongoClient.connect(DB_URL , option)
        
        .catch( err => console.error(err))
        database =  client.db(DB_NAME)
        collection = database.collection('pokemon')
        try {
            var result = await collection.find({}).toArray()
            return result
        } catch(err){
            return false
        } finally {
            client.close()
        }        

}

function mockPokemon(){
    pokemons.push(createPokemon('Pikachu','Electhic'))
    pokemons.push(createPokemon('Goduk','Water'))
}

function createId(num){
    return num + 1
}

function createPokemon(name,type){
    let pokemon = new Pokemon(name,type)
    pokemon.id = createId(pokemons.length)
    return pokemon
}

function isPokemonExisted(id){
    return pokemons[id] !== undefined && pokemons[id] !== null
}

function getPokemonById(id){
    return pokemons[id]
}

function updatePokemon(pokemon){
    pokemons[pokemon.id] = pokemon
    return true
}

function deletePokemon(id){
    delete pokemons[id]
}

module.exports.isPokemonExisted = isPokemonExisted

module.exports.createPokemon = createPokemon

module.exports.savePokemon = savePokemon

module.exports.getPokemonById = getPokemonById

module.exports.updatePokemon = updatePokemon

module.exports.deletePokemon = deletePokemon
module.exports.GetPokemons= GetPokemons