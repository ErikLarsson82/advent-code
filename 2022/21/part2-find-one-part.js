let sideB

const trim = x=>x.trim()
const applicable = x => x.value !== null

function solve(monkey) {
  const { value, partners, operation, name } = monkey

  if (value === null) {
    if (partners === null) {
      monkey.value = operation()
    } else {
      const mA = findMonkey(partners[0])
      const mB = findMonkey(partners[1])

      if (applicable(mA) && applicable(mB)) {
        monkey.argA = mA.value
        monkey.argB = mB.value
                
        monkey.value = operation(mA.value, mB.value)
      }
    }
  }
}

function findMonkey(name) {
  return monkeys.find(x=>x.name === name)
}

function reduce(v1, v2, sideB, blueprint) {
  if (['=', '>', 'x'].includes(blueprint)) return sideB
  
  const targetValue = isNaN(v1) ? v2 : v1
  const rightHandUnknown = isNaN(v2)
  
  return {
    '*': () => sideB / targetValue,
    '/': () => sideB * targetValue, 
    '+': () => sideB - targetValue,
    '-': () => rightHandUnknown ? (sideB - targetValue)*-1 : sideB + targetValue
  }[blueprint]()
}

console.log('\n\nUnit tests')
// for subtraction
console.log('unit test', reduce(NaN, 50, 30, '-') === 80)
console.log('unit test', reduce(50, NaN, 30, '-') === 20)
// for addition
console.log('unit test', reduce(NaN, 50, 30, '+') === -20)
console.log('unit test', reduce(50, NaN, 30, '+') === -20)
// for multi
console.log('unit test', reduce(NaN, 5, 50, '*') === 10)
console.log('unit test', reduce(5, NaN, 50, '*') === 10)
// for div
console.log('unit test', reduce(NaN, 10, 5, '/') === 50)
console.log('unit test', reduce(50, NaN, 5, '/') === 10)
console.log('Unit tests completed\n\n')

function traverse(monkey) {
  const { partners, blueprint } = monkey
  if (partners === null) return
  const mA = findMonkey(partners[0])
  const mB = findMonkey(partners[1])

  const oneIsStillNaN = isNaN(mA.value) || isNaN(mB.value)

  if (!oneIsStillNaN) return
  
  const result = reduce(mA.value, mB.value, sideB, blueprint)

  sideB = result

  if (isNaN(mA.value)) {
    monkey.operation = (a,b) => a
    traverse(mA)
  }
  if (isNaN(mB.value)) {
    monkey.operation = (a,b) => b
    traverse(mB)
  }
}

let monkeys = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  
  _monkeys = [
    { name: 'root', partners: ['pppw', 'sjmn'], operation: (a,b) => a === b, value: null, blueprint: '=' },
    { name: 'dbpl', partners: null, operation: () => 5, value: null, blueprint: '>' },
    { name: 'cczh', partners: ['sllz', 'lgvd'], operation: (a,b) => a + b, value: null, blueprint: '+' },
    { name: 'zczc', partners: null, operation: () => 2, value: null, blueprint: '>' },
    { name: 'ptdq', partners: ['humn', 'dvpt'], operation: (a,b) => a - b, value: null, blueprint: '-' },
    { name: 'dvpt', partners: null, operation: () => 3, value: null, blueprint: '>' },
    { name: 'lfqf', partners: null, operation: () => 4, value: null, blueprint: '>' },
    { name: 'humn', partners: null, operation: () => 'x', value: null, blueprint: 'x' },
    { name: 'ljgn', partners: null, operation: () => 2, value: null, blueprint: '>' },
    { name: 'sjmn', partners: ['drzm', 'dbpl'], operation: (a,b) => a * b, value: null, blueprint: '*' },
    { name: 'sllz', partners: null, operation: () => 4, value: null, blueprint: '>' },
    { name: 'pppw', partners: ['cczh', 'lfqf'], operation: (a,b) => a / b, value: null, blueprint: '/' },
    { name: 'lgvd', partners: ['ljgn', 'ptdq'], operation: (a,b) => a * b, value: null, blueprint: '*' },
    { name: 'drzm', partners: ['hmdt', 'zczc'], operation: (a,b) => a - b, value: null, blueprint: '-' },
    { name: 'hmdt', partners: null, operation: () => 32, value: null, blueprint: '>' }
  ]

  _monkeys = [
    { name: 'root', partners: ['aaa', 'bbb'], operation: (a,b) => a === b, value: null, blueprint: '=' },
    { name: 'aaa', partners: ['humn','ccc'], operation: (a,b) => a / b, value: null, blueprint: '/' },
    { name: 'ccc', partners: null, operation: () => 10, value: null, blueprint: '>' },
    { name: 'humn', partners: null, operation: () => 'x', value: null, blueprint: '>' },
    { name: 'bbb', partners: null, operation: () => 5, value: null, blueprint: '>' }
  ]

  data.trim().split('\n').map(trim).map(parseRow)

  findMonkey('root').blueprint = '='
  findMonkey('root').operation = (a,b) => {
    console.log('root called with a=', a, 'b=',b, 'sideB=',sideB)
    if (!isNaN(a)) {
      sideB = a
      console.log('I have a resolved side, setting sideB to', sideB)      
    }
    if (!isNaN(b)) {
      sideB = b     
      console.log('I have a resolved side, setting sideB to', sideB)
    }
    return a === b
  }

  findMonkey('humn').blueprint = 'x'
  findMonkey('humn').operation = () => NaN

  console.log('Start solve pass')
  reset()
  while(true) {
    monkeys.forEach(solve)
    if (findMonkey('root').value !== null) break
  }
  console.log('root value', findMonkey('root').value)
  console.log('sideB (answer)', sideB)

  console.log('Done')

  console.log('Traversing and moving applicable signs...')
  traverse(findMonkey('root'))
  console.log('Done')
  

  console.log('Feed mock solve data')
  findMonkey('root').blueprint = '='
  findMonkey('root').operation = (a,b) => {
    console.log('root called with a=', a, 'b=',b, 'sideB=',sideB)
    console.log('x is ',sideB)
    return a === b
  }

  findMonkey('humn').blueprint = 'x'
  findMonkey('humn').operation = () => 0
  
  console.log('Start next pass')

  reset()
  while(true) {
    monkeys.forEach(solve)
    if (findMonkey('root').value !== null) break
  }

  console.log('Done')
})

function reset() {
  monkeys.forEach(monkey => monkey.value = null)
}

function parseRow(row) {
  const [a, b] = row.split(':').map(trim)

  let operation
  let blueprint
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
    blueprint = d
  } else {
    operation = () => parseInt(b)
  }

  monkeys.push({
    name: a,
    value: null,
    operation,
    partners,
    blueprint
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
