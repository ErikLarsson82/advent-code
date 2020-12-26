
const { data, parse, pipe } = require('../common')

require('fs').readFile('./puzzle-input.txt', 'utf-8', pipe(data, parse('\n'), totalFuelRequirement, print))

function print(x) {
  console.log('2020 / 1 / Part 2\nTotal recursive fuel requirement:', x)
}

function totalFuelRequirement(modules) {
  const fuel = modules.map(module => recursiveFuelRequirement(module) - module)
  return fuel.reduce(sum, 0)
}

const recursiveFuelRequirement = mass => {
  return fuelRequirement(mass) <= 0
    ? mass
    : recursiveFuelRequirement(fuelRequirement(mass)) + mass
}

const fuelRequirement = mass => Math.floor(mass / 3) - 2
const sum = (acc, curr) => acc + curr
