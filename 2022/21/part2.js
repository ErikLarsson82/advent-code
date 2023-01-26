
const trim = x=>x.trim()

function solve(monkey, theNumberImTesting) {
  const { value, partners, operation, name } = monkey
  if (value === null) {
    if (partners === null) {
      monkey.value = operation(theNumberImTesting)
    } else {
      const mA = findMonkey(partners[0])
      const mB = findMonkey(partners[1])
      if (mA && mA.value !== null && mB && mB.value !== null) {
        monkey.value = operation(mA.value, mB.value)
      }
    }
  }
}

function findMonkey(name) {
  return monkeys.find(x=>x.name === name)
}

let monkeys = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  
  _monkeys = [
    { name: 'root', partners: ['pppw', 'sjmn'], operation: (a,b) => a === b, value: null },
    { name: 'dbpl', partners: null, operation: () => 5, value: null },
    { name: 'cczh', partners: ['sllz', 'lgvd'], operation: (a,b) => a + b, value: null },
    { name: 'zczc', partners: null, operation: () => 2, value: null },
    { name: 'ptdq', partners: ['humn', 'dvpt'], operation: (a,b) => a - b, value: null },
    { name: 'dvpt', partners: null, operation: () => 3, value: null },
    { name: 'lfqf', partners: null, operation: () => 4, value: null },
    { name: 'humn', partners: null, operation: (x) => x, value: null },
    { name: 'ljgn', partners: null, operation: () => 2, value: null },
    { name: 'sjmn', partners: ['drzm', 'dbpl'], operation: (a,b) => a * b, value: null },
    { name: 'sllz', partners: null, operation: () => 4, value: null },
    { name: 'pppw', partners: ['cczh', 'lfqf'], operation: (a,b) => a / b, value: null },
    { name: 'lgvd', partners: ['ljgn', 'ptdq'], operation: (a,b) => a * b, value: null },
    { name: 'drzm', partners: ['hmdt', 'zczc'], operation: (a,b) => a - b, value: null },
    { name: 'hmdt', partners: null, operation: () => 32, value: null }
  ]

  data.trim().split('\n').map(trim).map(parseRow)

  findMonkey('root').operation = (a,b) => a === b
  findMonkey('humn').operation = (x) => x

  for (let i = 1985000; i < 1985000 + 500000; i++) {
    (i % 1000 === 0) && console.log('iteration', i)
    reset()
    while(true) {
      monkeys.forEach(x => solve(x, i))
      const root = findMonkey('root')
      if (root.value !== null) {
        if (root.value === true) {
          console.log('Root value found during iteration', i, 'value', root.value)
          throw new Error('done')
        }
        break;
      }
    }
  }  
})

function reset() {
  monkeys.forEach(monkey => monkey.value = null)
}

function parseRow(row) {
  const [a, b] = row.split(':').map(trim)

  let operation
  let partners = null
  if (hasSign(b)) {
    const [c,d,e,f,g] = b.split(' ')
    partners = [c,e]
    const blueprints = {
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    }
    operation = blueprints[d]
  } else {
    operation = () => parseInt(b)
  }

  monkeys.push({
    name: a,
    value: null,
    operation,
    partners
  })
}

function hasSign(str) {
  let has = false
  const signs = ['+', '*', '/', '-']
  signs.forEach(sign => {
    if (str.includes(sign)) {
      has = true
    }
  })
  return has
}
