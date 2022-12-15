const EQUAL = 0
const CORRECT_ORDER = 1
const INCORRECT_ORDER = -1

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  let _data = `[1,1,3,1,1]
  [1,1,5,1,1]

  [[1],[2,3,4]]
  [[1],4]

  [9]
  [[8,7,6]]

  [[4,4],4,4]
  [[4,4],4,4,4]

  [7,7,7,7]
  [7,7,7]

  []
  [3]

  [[[]]]
  [[]]

  [1,[2,[3,[4,[5,6,7]]]],8,9]
  [1,[2,[3,[4,[5,6,0]]]],8,9]`

  data = `${data}

  [[2]]
  [[6]]`

  const entries = []
  
  data.trim().split('\n\n').map(x => x.trim()).forEach(str => {
    const [aStr, bStr] = str.trim().split('\n').map(x => x.trim())
    entries.push(JSON.parse(aStr))
    entries.push(JSON.parse(bStr))
  })


  console.log('before sort', entries)
  entries.sort(compare)
  const sorted = entries.reverse()

  const aIndex = sorted.findIndex(x => JSON.stringify(x) === '[[2]]') + 1
  const bIndex = sorted.findIndex(x => JSON.stringify(x) === '[[6]]') + 1
  console.log('after sort', sorted)
  console.log('index a', aIndex)
  console.log('index b', bIndex)
  console.log('decoder key', aIndex * bIndex)
})

function sum(acc, curr) {
  return acc + curr
}

function parsePair(str) {
  const [aStr, bStr] = str.trim().split('\n').map(x => x.trim())

  return [
    JSON.parse(aStr),
    JSON.parse(bStr)
  ]
}

function onlySame(x) {
  return x === EQUAL
}

function notSame(x) {
  return !onlySame(x)
}

function rightOrder(x) {
  return x === CORRECT_ORDER
}

function notRightOrder(x) {
  return x === INCORRECT_ORDER
}

function compare(a, b) {
  if (a === undefined) return CORRECT_ORDER
  if (b === undefined) return INCORRECT_ORDER
	if (typeof a === 'number' && typeof b === 'number') {
    if (a === b) return EQUAL
    if (a < b) return CORRECT_ORDER
    if (a > b) return INCORRECT_ORDER
    throw new Error('panic')
	}
  if (typeof a === 'number') {
    a = [a]
  }
  if (typeof b === 'number') {
    b = [b]
  }
  const tries = Math.max(a.length, b.length)

  let resultArray = []
  for (let i = 0; i < tries; i++) {
    resultArray.push(compare(a[i], b[i]))
  }

  if (resultArray.find(notSame)) {
    return resultArray.find(notSame)
  }
  if (resultArray.filter(onlySame).length === resultArray.length) {
    return EQUAL
  }
}

/*
console.log(compare([1,[2,[3,[4,[5,6,7]]]],8,9], [1,[2,[3,[4,[5,6,0]]]],8,9])) // INCORRECT_ORDER
console.log(compare([[[]]], [[]])) // INCORRECT_ORDER
console.log(compare([], [3])) // CORRECT_ORDER
console.log(compare([7,7,7,7], [7,7,7])) // INCORRECT_ORDER
console.log(compare([[1],[2,3,4]], [[1],4])) // CORRECT_ORDER
console.log(compare([9], [[8,7,6]])) // INCORRECT_ORDER
console.log(compare(9, [8,7,6])) // INCORRECT_ORDER
console.log(compare([8,7,6], 9)) // CORRECT_ORDER
console.log(compare([1,1,3,1,1], [1,1,5,1,1])) // CORRECT_ORDER
console.log(compare([[4,4],4,4],[[4,4],4,4,4])) // CORRECT_ORDER
console.log(compare([[4,4],4,4],[[4,4],4,4,4])) // CORRECT_ORDER
console.log(compare([[4,4],4,4,4],[[4,4],4,4])) // INCORRECT_ORDER
console.log(compare([4,4],[4,4])) // EQUAL
console.log(compare(4,4)) // EQUAL
*/