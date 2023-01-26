// This is used to verify the solution with keypresses
let from = 0
let distance = 0

const array = ['a', 'b', 'c', 'd','e']
const len = array.length

const mod = (a, b) => {
  const r = a % b;
  return r < 0 ? r + b : r
}

function modify(from, to, array) {
  const target = array[from]

  const partA = array.slice(0, from)
  const partB = array.slice(from+1)
  
  const removed = partA.concat(partB)

  let newArray = []
  for (let i = 0; i < removed.length; i++) {
    if (i === to) {
      newArray.push(target)
    }
    newArray.push(removed[i])  
  }
  /*
  if (newArray.length < array.length) {
    newArray.push(target)
  }
  */
  
  return newArray
}

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    console.clear()
  
    if (key.name === 'up') {
      distance = distance + 1
      console.log('distance changed to',distance)
      console.log('from',from)
    }
    if (key.name === 'down') {
      distance = distance - 1
      console.log('distance changed to',distance)
      console.log('from',from)
    }
    if (key.name === 'left') {
      from = from - 1
      console.log('distance',distance)
      console.log('from changed to',from)
    }
    if (key.name === 'right') {
      from = from + 1
      console.log('distance',distance)
      console.log('from changed to',from)
    }
  }

  printArray()
});

function printArray() {
  const safeFrom = mod(from, len)
  const safeTo = mod(from + distance, len-1)

  let str = ''
  for (let i = 0; i < array.length; i++) {
    if (i === safeFrom && i === safeTo) {
      str += '[(' + array[i] + ')]'
    } else if (i === safeFrom) {
      str += ' (' + array[i] + ') '
    } else if (i === safeTo) {
      str += '[ ' + array[i] + ' ]'
    } else {
      str += '  ' + array[i] + '  '
    }
  }
  console.log(str)

  console.log('  ' + modify(safeFrom, safeTo, array).join('    '))
}

printArray()