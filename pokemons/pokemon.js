const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
let DB_URL = 'mongodb+srv://59160273:Chariot97@pokemon-cluster-otxxa.gcp.mongodb.net/test?retryWrites=true&w=majority' //URL
const DB_NAME = 'Pokemondb'
const option = {useNewUrlParser: true , useUnifiedTopology : true}
var client
class Pokemon{
    constructor(name,type){
        this.id=null
        this.name=name
        this.type=type
        this.type2=null
    }
}

let pokemons = []

async function GetConnection(){
    if(client !== undefined && client.isConnect && client !== null){
        return client
    }
    else
    {
        var client = await MongoClient.connect(DB_URL , option)
        
        .catch( err => console.error(err))
        return client
    }
}


async function GetCollection(name){
    client = await GetConnection().catch(err => console.log(err))
    database = client.db(DB_NAME)
    collection = database.collection(name)
    return collection
}

async function savePokemon(name,type){
    let p = await createPokemon(name,type)
    var client = await GetConnection('pokemons')
        database = client.db(DB_NAME)
        collection = await GetCollection('pokemons')
        try {
            var result = await collection.insertOne(p)
            return true
        } catch(err){
            return false
        } finally {
            client.close()
        }        
}

async function GetPokemons(){
    var collection , database
        collection = await GetCollection('pokemons')
        try {
            var result = await collection.find({}).toArray()
            return result
        } catch(err){
            return false
        } finally {
            client.close()
        }        

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

async function getPokemonById(id){
        collection = await GetCollection('pokemons')
        try {
            var result = await collection.find({"_id" : ObjectID(id)}).toArray()
            return result
        } catch(err){
            return false
        } finally {
            client.close()
        }        
}

async function updatePokemon(id,type2){
        collection = await GetCollection('pokemons')
        try {
            var result = await collection.update({"_id" : ObjectID(id)} , {$set : {"type2" : type2}})
            return result
        } catch(err){
            return false
        } finally {
            client.close()
        }        
}

function deletePokemon(id){
    delete pokemons[id]
}

function setDBUri(uri){
    DB_URL = uri
}

module.exports.isPokemonExisted = isPokemonExisted
module.exports.createPokemon = createPokemon
module.exports.savePokemon = savePokemon
module.exports.getPokemonById = getPokemonById
module.exports.updatePokemon = updatePokemon
module.exports.deletePokemon = deletePokemon
module.exports.GetPokemons= GetPokemons
module.exports.dburi = setDBUri
module.exports.GetConnection = GetConnection