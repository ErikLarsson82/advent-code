const BigNumber = require('./big-number')

// example start
/*
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
*/

const monkey0 = {
  id: 0,
  items: [65, 78].map(makeBN),
  operation: old => old.multiply(3), // old => old * 3,
  test: isDivisibleBy(5), // item => item !== 0 ? Math.round(item / 5) === item / 5 : false,
  trueTarget: 2,
  falseTarget: 3,
  inspections: 0
}

const monkey1 = {
  id: 1,
  items: [54, 78, 86, 79, 73, 64, 85, 88].map(makeBN),
  operation: old => old.add(8), // old => old + 8,
  test: isDivisibleBy(11), // item => item !== 0 ? Math.round(item / 11) === item / 11 : false,
  trueTarget: 4,
  falseTarget: 7,
  inspections: 0
}

const monkey2 = {
  id: 2,
  items: [69, 97, 77, 88, 87].map(makeBN),
  operation: old => old.add(2), // old => old + 2,
  test: isDivisibleBy(2), // item => item !== 0 ? Math.round(item / 2) === item / 2 : false,
  trueTarget: 5,
  falseTarget: 3,
  inspections: 0
}

const monkey3 = {
  id: 3,
  items: [99].map(makeBN),
  operation: old => old.add(4), // old => old + 4,
  test: isDivisibleBy(13), // item => item !== 0 ? Math.round(item / 13) === item / 13 : false,
  trueTarget: 1,
  falseTarget: 5,
  inspections: 0
}

const monkey4 = {
  id: 4,
  items: [60, 57, 52].map(makeBN),
  operation: old => old.multiply(19), // old => old * 19,
  test: isDivisibleBy(7), // item => item !== 0 ? Math.round(item / 7) === item / 7 : false,
  trueTarget: 7,
  falseTarget: 6,
  inspections: 0
}

const monkey5 = {
  id: 5,
  items: [91, 82, 85, 73, 84, 53].map(makeBN),
  operation: old => old.add(5), // old => old + 5,
  test: isDivisibleBy(3), // item => item !== 0 ? Math.round(item / 3) === item / 3 : false,
  trueTarget: 4,
  falseTarget: 1,
  inspections: 0
}

const monkey6 = {
  id: 6,
  items: [88, 74, 68, 56].map(makeBN),
  operation: old => old.multiply(old), // old => old * old,
  test: isDivisibleBy(17), // item => item !== 0 ? Math.round(item / 17) === item / 17 : false,
  trueTarget: 0,
  falseTarget: 2,
  inspections: 0
}

const monkey7 = {
  id: 7,
  items: [54, 82, 72, 71, 53, 99, 67].map(makeBN),
  operation: old => old.add(1), // old => old + 1,
  test: isDivisibleBy(19), // item => item !== 0 ? Math.round(item / 19) === item / 19 : false,
  trueTarget: 6,
  falseTarget: 0,
  inspections: 0
}

const monkeys = [monkey0, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7]

function makeBN(item) {
  return BigNumber(item)
}

function isDivisibleBy(num) {
  return bn => BigNumber(bn).mod(num).toString() === '0'
}

const omni = 5 * 11 * 2 * 13 * 7 * 3 * 17 * 19

function round() {
  monkeys.forEach((monkey, idx) => {
    while (monkey.items.length > 0) {
      let currentItem = monkey.items.shift(1)
      currentItem = monkey.operation(currentItem)
      const testOutput = monkey.test(currentItem)
      const comparee = parseInt(currentItem.toString())
      if (comparee > omni) {
        currentItem = BigNumber(comparee % omni)
      }
      const throwTarget = testOutput ? monkey.trueTarget : monkey.falseTarget 
      monkeys[throwTarget].items.push(currentItem)
      monkey.inspections++
    } 
  })
}

function printStatus() {
  const output = monkeys.map(m => m.items.length === 0 ? 'empty' : m.items.map(x=>x.toString()).join('\n')).join('\n\n')
  const insp = monkeys.map(m => m.inspections).join(' - ')
  console.log('\ninspections: ', insp)
}

new Array(10000).fill().forEach((_, idx) => {
  if (idx % 100 === 0) {
    console.log('Running iteration', idx)
  }
  round()
  
})
printStatus()
