const { curry } = require('ramda')
const { knotHash } = require('./day10_part2.js')
const { times } = require('ramda')
const uniq = require('uniq')
const clone = require('clone')


function discDefrag(str) {
  const disc = []

  while(disc.length < 128) {
    const hash = str + '-' + disc.length
    disc.push( knotHash(hash) )
  }

  return disc.map( makeBinary )  
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



function is(x) {
  return x && x.length !== 0
}



function isPresent(list, x, y) {
  return !!list.find( pos => pos.x === x && pos.y === y ) 
}



function sectionMarker(matrix, blacklist = [], x, y) {
  const value = valueAt(matrix, blacklist)
  if (!valueAt(matrix, [], x, y) || isPresent(blacklist, x, y))
    return []

  blacklist = blacklist.concat(value(x,y))  
  blacklist = blacklist.concat(sectionMarker(matrix, blacklist, x, y-1))
  blacklist = blacklist.concat(sectionMarker(matrix, blacklist, x+1, y))
  blacklist = blacklist.concat(sectionMarker(matrix, blacklist, x, y+1))
  blacklist = blacklist.concat(sectionMarker(matrix, blacklist, x-1, y))
  
  return uniq(blacklist, (a, b) => (a.x === b.x && a.y === b.y) ? 0 : 1)
}



function matrixReplacer(matrix, value) {
  const region = sectionMarker(matrix, blacklist = [], 0,0)

  let clearedMatrix = matrix.map( list => list.map( y => 0 ) )

  return regionReplacer(clearedMatrix, region, value)
}


function regionReplacer(matrix, region, value) {
  let matrixCopy = clone(matrix)
  region.forEach( pos => matrixCopy[pos.x][pos.y] = value )
  return matrixCopy
}



const valueAt = curry((matrix, blacklist, x, y) => {
  if ( blacklist.find(d => d.x === x && d.y === y) )
    return null
  if (!matrix[x] || !matrix[x][y])
    return null
  return { x, y }
})


function createMatrix(disc) {
  return disc.map( x => x.split("").map(x => parseInt(x)) )
}

function regionCounter(inputStr) {
  const disc = discDefrag(inputStr)
  let matrix = createMatrix(disc)
  let counter = 0
  times( x => {
    times( y => {
        const region = sectionMarker(matrix, [], x, y)
        if (region.length > 0) {
          matrix = regionReplacer(matrix, region, 0)
          counter++
        }
    }, matrix.length)
  }, matrix.length)

  return counter
}



module.exports = { discDefrag, discUsed, hexToBinary, pad, sectionMarker, matrixReplacer, regionCounter }
