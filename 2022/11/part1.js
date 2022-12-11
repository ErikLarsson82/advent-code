/*
// example start
const monkey0 = {
  id: 0,
	items: [79, 98],
	operation: old => old * 19,
  test: item => item !== 0 ? Math.round(item / 23) === item / 23 : false,
  trueTarget: 2,
  falseTarget: 3,
  inspections: 0
}

const monkey1 = {
  id: 1,
  items: [54, 65, 75, 74],
  operation: old => old + 6,
  test: item => item !== 0 ? Math.round(item / 19) === item / 19 : false,
  trueTarget: 2,
  falseTarget: 0,
  inspections: 0
}

const monkey2 = {
  id: 2,
  items: [79, 60, 97],
  operation: old => old * old,
  test: item => item !== 0 ? Math.round(item / 13) === item / 13 : false,
  trueTarget: 1,
  falseTarget: 3,
  inspections: 0
}

const monkey3 = {
  id: 3,
  items: [74],
  operation: old => old + 3,
  test: item => item !== 0 ? Math.round(item / 17) === item / 17 : false,
  trueTarget: 0,
  falseTarget: 1,
  inspections: 0
}
*/

// Puzzle input start
const monkey0 = {
  id: 0,
  items: [65, 78],
  operation: old => old * 3,
  test: item => item !== 0 ? Math.round(item / 5) === item / 5 : false,
  trueTarget: 2,
  falseTarget: 3,
  inspections: 0
}

const monkey1 = {
  id: 1,
  items: [54, 78, 86, 79, 73, 64, 85, 88],
  operation: old => old + 8,
  test: item => item !== 0 ? Math.round(item / 11) === item / 11 : false,
  trueTarget: 4,
  falseTarget: 7,
  inspections: 0
}

const monkey2 = {
  id: 2,
  items: [69, 97, 77, 88, 87],
  operation: old => old + 2,
  test: item => item !== 0 ? Math.round(item / 2) === item / 2 : false,
  trueTarget: 5,
  falseTarget: 3,
  inspections: 0
}

const monkey3 = {
  id: 3,
  items: [99],
  operation: old => old + 4,
  test: item => item !== 0 ? Math.round(item / 13) === item / 13 : false,
  trueTarget: 1,
  falseTarget: 5,
  inspections: 0
}

const monkey4 = {
  id: 4,
  items: [60, 57, 52],
  operation: old => old * 19,
  test: item => item !== 0 ? Math.round(item / 7) === item / 7 : false,
  trueTarget: 7,
  falseTarget: 6,
  inspections: 0
}

const monkey5 = {
  id: 5,
  items: [91, 82, 85, 73, 84, 53],
  operation: old => old + 5,
  test: item => item !== 0 ? Math.round(item / 3) === item / 3 : false,
  trueTarget: 4,
  falseTarget: 1,
  inspections: 0
}

const monkey6 = {
  id: 6,
  items: [88, 74, 68, 56],
  operation: old => old * old,
  test: item => item !== 0 ? Math.round(item / 17) === item / 17 : false,
  trueTarget: 0,
  falseTarget: 2,
  inspections: 0
}

const monkey7 = {
  id: 7,
  items: [54, 82, 72, 71, 53, 99, 67],
  operation: old => old + 1,
  test: item => item !== 0 ? Math.round(item / 19) === item / 19 : false,
  trueTarget: 6,
  falseTarget: 0,
  inspections: 0
}

const monkeys = [monkey0, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7]

function round() {
  monkeys.forEach(monkey => {
    while (monkey.items.length > 0) {
      let currentItem = monkey.items.shift(1)
      currentItem = monkey.operation(currentItem)
      currentItem = Math.floor(currentItem / 3)
      const throwTarget = monkey.test(currentItem) ? monkey.trueTarget : monkey.falseTarget
      monkeys[throwTarget].items.push(currentItem)
      monkey.inspections++
      console.log(`monkey ${monkey.id} throws item`, currentItem, ' to monkey', throwTarget)
    } 
  })
}

function printStatus() {
  const output = monkeys.map(m => m.items.join(',')).join(' - ')
  console.log('items: ', output)
  const insp = monkeys.map(m => m.inspections).join(' - ')
  console.log('inspections: ', insp)
}

printStatus()
new Array(20).fill().forEach(round)
printStatus()