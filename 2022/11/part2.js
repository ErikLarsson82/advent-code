const BigNumber = require('./big-number')

// example start
const monkey0 = {
  id: 0,
	items: [79, 98].map(makeBN),
	operation: old => old.multiply(19),
  test: isDivisibleBy(23),
  trueTarget: 2,
  falseTarget: 3,
  inspections: 0
}

const monkey1 = {
  id: 1,
  items: [54, 65, 75, 74].map(makeBN),
  operation: old => old.add(6),
  test: isDivisibleBy(19),
  trueTarget: 2,
  falseTarget: 0,
  inspections: 0
}

const monkey2 = {
  id: 2,
  items: [79, 60, 97].map(makeBN),
  operation: old => old.multiply(old),
  test: isDivisibleBy(13),
  trueTarget: 1,
  falseTarget: 3,
  inspections: 0
}

const monkey3 = {
  id: 3,
  items: [74].map(makeBN),
  operation: old => old.add(3),
  test: isDivisibleBy(17),
  trueTarget: 0,
  falseTarget: 1,
  inspections: 0
}

const monkeys = [monkey0, monkey1, monkey2, monkey3]

function makeBN(item) {
  return BigNumber(item)
}

function isDivisibleBy(num) {
  return bn => BigNumber(bn).mod(num).toString() === '0'
}

function round() {
  monkeys.forEach(monkey => {
    while (monkey.items.length > 0) {
      let currentItem = monkey.items.shift(1)
      currentItem = monkey.operation(currentItem)
      const throwTarget = monkey.test(currentItem) ? monkey.trueTarget : monkey.falseTarget
      monkeys[throwTarget].items.push(currentItem)
      monkey.inspections++
    } 
  })
}

function printStatus() {
  const output = monkeys.map(m => m.items.length === 0 ? 'empty' : m.items.map(x=>x.toString()).join('\n')).join('\n\n')
  console.log('items:')
  console.log(output)
  const insp = monkeys.map(m => m.inspections).join(' - ')
  console.log('\ninspections: ', insp)
}

new Array(1000).fill().forEach((_, idx) => {
  if (idx % 100 === 0) {
    console.log('Running iteration', idx)
  }
  round()
})
printStatus()