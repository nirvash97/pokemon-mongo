import test from 'ava'
const MongoDBServer = require('mongomem').MongoDBServer
const chai = require('chai')
chai.should()
const pokemon = require('../pokemons/pokemon')

// test.before('Start MongoMem' , async t=> {
//     await MongoDBServer.start()
//     const dburi = await MongoDBServer.getConnectionString()
//     pokemon.dburi(dburi)
//     await pokemon.savePokemon('Trodon' , 'Earth')
// })

test('GetPokemons()' ,async t => {
    let result = await pokemon.GetPokemons().catch((err) => {
        console.log(err)
    }) 
    t.true(Array.isArray(result))
    console.log('cccccc: ' + result)
    let p = result[0]
    p.should.have.property('name')
})

test('SavePokemons', async t => {
    let result = await pokemon.savePokemon('Fire Wyvern','Fire')
    t.true(result)
})

test('GetPokemonById()' , async t => {
    let result = await pokemon.getPokemonById('5da18bc37f97ee2fa8c74bf2').catch((err) => {
        console.log(err)
    }) 
    t.true(Array.isArray(result))
    let p = result[0]
    p.should.have.property('_id')
})


