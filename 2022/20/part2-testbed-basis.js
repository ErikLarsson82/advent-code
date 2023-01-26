// this is the one that finally solves the part 2, and extremely fast

let mixer
let len

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
  if (newArray.length < array.length) {
    newArray.push(target)
  }
  
  return newArray
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  const _data = `1
  2
  -3
  3
  -2
  0
  4`

  const blueprint = data.trim().split('\n').map((x, id) => ({ instructionValue: parseInt(x) * 811589153, id }))

  mixer = blueprint.map(({id, instructionValue}) => ({id, instructionValue}))

  len = mixer.length

  for (let i = 0; i < 10; i++) {
    blueprint.forEach(({ instructionValue }, id) => {
      const fromIdx = mixer.findIndex(({id: idPrime}) => id === idPrime)
      const safeFrom = mod(fromIdx, len)
      const safeTo = mod(fromIdx + instructionValue, len-1)
      mixer = modify(safeFrom, safeTo, mixer)
    })
  }

  const zeroIndex = mixer.findIndex(({ instructionValue }) => instructionValue === 0)

  const a = mixer[(zeroIndex + 1000) % mixer.length].instructionValue
  const b = mixer[(zeroIndex + 2000) % mixer.length].instructionValue
  const c = mixer[(zeroIndex + 3000) % mixer.length].instructionValue

  console.log('a', a, 'b', b, 'c', c,'sum', a + b + c)
})
