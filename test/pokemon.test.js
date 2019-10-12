import test from 'ava'
const chai = require('chai')
chai.should()
const pokemon = require('../pokemons/pokemon')

test('GetPokemons()' ,async t => {
    let result = await pokemon.GetPokemons().catch((err) => {
        console.log(err)
    }) 
    t.true(Array.isArray(result))
    console.log('cccccc: ' + result)
    let p = result[0]
    p.should.have.property('name')
})

