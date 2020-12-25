
const fs = require('fs')

fs.readFile('./puzzle-input.txt', 'utf-8', pipe(data, parse, totalFuelRequirement, print))

function data(err, data) {
  if (err) {
    console.log('error', err)
  }
  return data
}

function parse(data) {
  return data.trim()
    .split('\n')
    .map(x => x.trim())
    .map(x => parseInt(x))
}

function totalFuelRequirement(modules) {
  const fuel = modules.map(fuelRequirement)

  return fuel.reduce(sum, 0)
}

function print(x) {
  console.log('Total fuel requirement:', x)
}

function sum(acc, curr) {
  return acc + curr
}

function pipe(a,b,c,d) {
  return function() {
    return d(c(b(a(...arguments))))
  }
}

const fuelRequirement = mass => {
  const divided = mass / 3
  const rounded = Math.floor(divided)
  return rounded - 2
}


const roundDown = x => {
  if (x % 1 === 0) {
    return x
  }
  if (x % 0.5 === 0) {
    return Math.round(x) - 1
  }
  return Math.round(x)
}

/*
console.log( roundDown(2) === 2 )
console.log( roundDown(0.2) === 0 )
console.log( roundDown(0.5) === 0 )
console.log( roundDown(0.6) === 1 )
console.log( roundDown(5) === 5 )
console.log( roundDown(5.5) === 5 )
*/

/*
console.log( fuelRequirement(1969) )
console.log( fuelRequirement(100756) )
*/
