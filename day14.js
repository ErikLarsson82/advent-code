
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



if (process.argv[2])
  console.log(process.argv[2] + ": " + discDefrag(process.argv[2]))


module.exports = { discDefrag, hexToBinary, pad }
