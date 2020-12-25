const fs = require('fs')
const R = require('ramda')
const uniq = require('uniq')
const clone = require('clone')
const BigNumber = require('bignumber.js')

const contentStr = fs.readFileSync('day4.txt', 'utf-8')

const phrases = contentStr.split(/\n/)

//phrases.forEach( (item, idx) => console.log(idx + ": " + item) )

const nonEmptyPhrases = R.filter( str => !!str, phrases )

const words = R.map( str => str.split(" "), nonEmptyPhrases )

function sortAnagrams(list) {
    return R.map( str => str.split("").sort(), list )
}

const anagrams = R.map( sortAnagrams, words )

const validPhrases = R.filter( list => {
    const joined = R.map( wordList => wordList.join(""), list )
    let copy = clone(joined)
    uniq(copy)
    return joined.length === copy.length
}, anagrams )

console.log("validPhrases", validPhrases.length)

