const fs = require('fs')
const contentStr = fs.readFileSync('day18_example.txt', 'utf-8')

function duet(str) {
  const instructionStrings = str.trim().split("\n").map( x => x.trim() )

  let acc = {
    counter: 0,
    register: {},
    played: null,
    recover: null
  }

  while(acc.counter < instructionStrings.length && acc.recover === null) {
    acc = excecute(acc, instructionStrings[acc.counter])
  }

  return acc
}

function excecute(acc, curr) {
  console.log(acc, curr)
  const parts = curr.split(" ").map( x => x.trim() )
  const operation = parts[0]
  const register = parts[1]
  const target = parts[2]

  function registryOrValue(target) {
    return isNaN(parseInt(target)) ? acc.register[target] : parseInt(target)
  }
  
  const mutations = {
    "snd": reg => acc.played = acc.register[reg],
    "set": (reg, tar) => acc.register[reg] = registryOrValue(tar),
    "add": (reg, tar) => acc.register[reg] = acc.register[reg] + registryOrValue(tar),
    "mul": (reg, tar) => acc.register[reg] = acc.register[reg] * registryOrValue(tar),
    "mod": (reg, tar) => acc.register[reg] = acc.register[reg] % registryOrValue(tar),
    "rcv": reg => {
      if (acc.register[reg] !== 0)
        acc.recover = acc.played
    },
    "jgz": (reg, tar) => {
      if (acc.register[reg] > 0) {
        console.log(registryOrValue(tar))
        acc.counter = acc.counter + registryOrValue(tar)
      } else {
        acc.counter++
      }
    }
  }

  mutations[operation](register, target)

  if (operation !== "jgz")
    acc.counter++

  return acc
}

console.log(duet(contentStr))

module.exports = { duet }