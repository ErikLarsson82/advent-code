const BigNumber = require('./big-number')

let found = false

// let special = () => {}

for (let primeTest = 5; primeTest < 9; primeTest++) {
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
    monkeys.forEach((monkey, idx) => {
      while (monkey.items.length > 0) {
        let currentItem = monkey.items.shift(1)
        currentItem = monkey.operation(currentItem)
        const testOutput = monkey.test(currentItem)
        const throwTarget = testOutput ? monkey.trueTarget : monkey.falseTarget 
        monkeys[throwTarget].items.push(currentItem)
        monkey.inspections++
      } 
    })
    // console.log('before', monkeys[0].items)
    monkeys.forEach((monkey, idx) => {
      monkey.items = monkey.items.map(item => {
        return item.divide(primeTest)
      })
    })
    // console.log('after', monkeys[0].items)
  }

  function printStatus() {
    const output = monkeys.map(m => m.items.length === 0 ? 'empty' : m.items.map(x=>x.toString()).join('\n')).join('\n\n')
    // console.log('items:')
    // console.log(output)
    const insp = monkeys.map(m => m.inspections).join(' - ')
    console.log('\ninspections: ', insp)
  }

  /*
  special = old => {
    if (parseInt(old.toString()) > 96577) {
      return BigNumber(primeTest)
    }
    return old.multiply(old) //divide(primeTest)
  }
  */

  new Array(1000).fill().forEach((_, idx) => {
    if (idx % 100 === 0) {
      console.log('Running iteration', idx)
    }
    round()
    
  })
  printStatus()

  if (monkeys[0].inspections === 5204) {
    found = primeTest
  }
  console.log('result of primeTest ^', primeTest)
}

console.log('found', found)

/*
inspections:  5203 - 4793 - 267 - 5189
result of primeTest ^ 4

answer        5204 - 4792 - 199 - 5192
*/