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

const validPhrases = R.filter( list => {
    let copy = clone(list)
    uniq(copy)
    const same = list.length === copy.length
    if (!same)
        console.log(list + " : " + copy + " - " + same)
    return same
}, words )

console.log("validPhrases", validPhrases.length)
//console.log("validPhrases", validPhrases)

