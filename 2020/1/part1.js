
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
  const fuel = modules.map(fuelRequirement)
  return fuel.reduce(sum, 0)
}

function print(x) {
  console.log('Total fuel requirement:', x)
}

const fuelRequirement = mass => Math.floor(mass / 3) - 2
const sum = (acc, curr) => acc + curr

function pipe(a,b,c,d) {
  return function() {
    return d(c(b(a(...arguments))))
  }
}