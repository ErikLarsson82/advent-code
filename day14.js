const { curry } = require('ramda')
const { knotHash } = require('./day10_part2.js')

function discDefrag(str) {
  const disc = []

  while(disc.length < 128) {
    const hash = str + '-' + disc.length
    disc.push( knotHash(hash) )
  }

  const binaryDisc = disc.map( makeBinary )
  
  return discUsed( binaryDisc, "1" )
}

function makeBinary(str) {
  return str.split("").map(hexToBinary).join("")
}

function discUsed(disc, char) {
  return disc.reduce( (acc, curr) => countChar(curr, char) + acc , 0 )
}

function countChar(str, char) {
  return str.split("").reduce( (acc, curr) => {
    const mod = (curr === char) ? 1 : 0;
    return acc = acc + mod
  }, 0 )
}

function hexToBinary(strHex) {
  const hex = parseInt(strHex, 16)
  return pad(hex.toString(2))
}

function pad(str) {
  const blueprint = "0000"
  return blueprint.substr(0, 4 - str.length) + str
}

function sectionMarker(matrix, blacklist = [], x, y) {
  const value = valueAt(matrix, blacklist)
  if (!valueAt(matrix, [], x, y))
    return []
  const north = value(x, y-1)
  const east = value(x+1, y)
  const south = value(x, y+1)
  const west = value(x-1, y)

  blacklist = blacklist.concat(value(x,y), north, east, south, west)
    .filter(x => x)

  const lists = blacklist.map( pos => sectionMarker(matrix, blacklist, pos.x, pos.y) ) 
  console.log(lists)
  return blacklist
}

const valueAt = curry((matrix, blacklist, x, y) => {
  if ( blacklist.find(d => d.x === x && d.y === y) )
    return null
  if (!matrix[x] || !matrix[x][y])
    return null
  return { x, y }
})



if (process.argv[2])
  console.log(process.argv[2] + ": " + discDefrag(process.argv[2]))


module.exports = { discDefrag, hexToBinary, pad, sectionMarker }
