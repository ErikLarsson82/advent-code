const _monkeys = [
  { name: 'root', partners: ['pppw', 'sjmn'], operation: (a,b) => a + b, value: null },
  { name: 'dbpl', partners: null, operation: () => 5, value: null },
  { name: 'cczh', partners: ['sllz', 'lgvd'], operation: (a,b) => a + b, value: null },
  { name: 'zczc', partners: null, operation: () => 2, value: null },
  { name: 'ptdq', partners: ['humn', 'dvpt'], operation: (a,b) => a - b, value: null },
  { name: 'dvpt', partners: null, operation: () => 3, value: null },
  { name: 'lfqf', partners: null, operation: () => 4, value: null },
  { name: 'humn', partners: null, operation: () => 5, value: null },
  { name: 'ljgn', partners: null, operation: () => 2, value: null },
  { name: 'sjmn', partners: ['drzm', 'dbpl'], operation: (a,b) => a * b, value: null },
  { name: 'sllz', partners: null, operation: () => 4, value: null },
  { name: 'pppw', partners: ['cczh', 'lfqf'], operation: (a,b) => a / b, value: null },
  { name: 'lgvd', partners: ['ljgn', 'ptdq'], operation: (a,b) => a * b, value: null },
  { name: 'drzm', partners: ['hmdt', 'zczc'], operation: (a,b) => a - b, value: null },
  { name: 'hmdt', partners: null, operation: () => 32, value: null }
]

const trim = x=>x.trim()

function solve(monkey) {
  const { value, partners, operation } = monkey
  if (value === null) {
    if (partners === null) {
      monkey.value = operation()
    } else {
      const mA = findMonkey(partners[0])
      const mB = findMonkey(partners[1])
      if (mA && mA.value !== null && mB && mB.value) {
        monkey.value = operation(mA.value, mB.value)
      }
    }
  }
}

function findMonkey(name) {
  return monkeys.find(x=>x.name === name)
}

const monkeys = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  
  data.trim().split('\n').map(trim).map(parseRow)

  let counter = 0
  while(true && counter < 300) {
    counter++
    monkeys.forEach(solve)
    const root = findMonkey('root')
    if (root.value !== null) {
      console.log('Root value found', root.value)
      break;
    }  
  }
  
})

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
