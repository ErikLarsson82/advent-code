const { curry, times } = require('ramda')

const pad = curry((int, str) => {
  const blueprint = new Array(int).fill("0").join("")
  return blueprint.substr(0, int - str.length) + str
})

const pad32 = pad(32)
const last16 = str => str.substring(16, 32)

function generator(factor, start) {
  let previous = start
  return () => {
    const result = previous * factor % 2147483647
    previous = result
    return result
  }
}

function binaryCompare(a, b) {
  const binaryA = a.toString('2')
  const binaryB = b.toString('2')
  const result = last16(pad32(binaryA)) === last16(pad32(binaryB))
  //console.log('Compare\n' + pad32(binaryA) + "\n" + pad32(binaryB) + "\n" + result + "\n")
  return result
}


function compareGenerators(startA, startB, amount) {
  const generatorA = generator(16807, 516)
  const generatorB = generator(48271, 190)
  
  let judgeTotal = 0
  let counter = 0

  function judgeIteration() {
    counter++
    judgeTotal += binaryCompare( generatorA(), generatorB() ) ? 1 : 0

    if (counter % 100000 === 0)
      console.log('Simulation at iteration ' + counter)
  }

  times( judgeIteration , 40000000)

  console.log('Simulation finishied; Total judge count: ' + judgeTotal)
}

if (process.argv[2])
  console.log(process.argv[2] + ": " + compareGenerators(process.argv[2], process.argv[3], process.argv[4]))

compareGenerators()

module.exports = { compareGenerators, pad, binaryCompare }