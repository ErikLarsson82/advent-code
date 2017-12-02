const R = require('ramda')
const d3 = require('d3')
const fs = require('fs')
 
function toInt() {
    return R.map(x => parseInt(x))
}

function divisableAndNotSame(val, comparee) {
    return (val !== comparee) && (val % comparee === 0)
}


function subChecksum(list) {
    const predicate = val => R.find( comparee => divisableAndNotSame(val, comparee), list )
    const bigInt = R.filter( predicate, list )[0]
    const divisor = R.find( val => divisableAndNotSame(bigInt, val), list)
    return bigInt / divisor
}

function checksum(input) {
  const rows = R.split('\r\n', input)

  const compacted = rows.map( item => R.split( / +/, item ) )
  const ints = R.map( toInt(), compacted )
  return R.reduce( (acc, curr) => subChecksum(curr) + acc, 0, ints )
}

const content = fs.readFileSync("day2.txt", 'utf-8' )

console.log(checksum(content))

