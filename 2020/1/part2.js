
require('fs').readFile('./puzzle-input.txt', 'utf-8', pipe(data, parse, totalFuelRequirement, print))

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
  const fuel = modules.map(module => recursiveFuelRequirement(module) - module)
  return fuel.reduce(sum, 0)
}

function print(x) {
  console.log('2020 / 1 / Part 2\nTotal recursive fuel requirement:', x)
}

const recursiveFuelRequirement = mass => {
  return fuelRequirement(mass) <= 0
    ? mass
    : recursiveFuelRequirement(fuelRequirement(mass)) + mass
}

const fuelRequirement = mass => Math.floor(mass / 3) - 2
const sum = (acc, curr) => acc + curr

function pipe(a,b,c,d) {
  return function() {
    return d(c(b(a(...arguments))))
  }
}

/*
// Tests
console.log( recursiveFuelRequirement(14) - 14 === 2)
console.log( recursiveFuelRequirement(1969) - 1969 === 966 )
console.log( recursiveFuelRequirement(100756) - 100756 === 50346 )
*/