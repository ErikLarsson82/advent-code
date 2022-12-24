
function forward(idx, arr) {
	const from = idx
  const to = (idx + 1) % arr.length
  let afterSwap = swap(from, to, arr)
  if (to === arr.length-1) {
    const stump = afterSwap.splice(afterSwap.length-1, 1)
    afterSwap = stump.concat(afterSwap)
  } else if (to === 0) {
    afterSwap = swap(0, 1, afterSwap)
  }
  return afterSwap
}

function backward(idx, arr) {
  if (idx === 0) {
    const item = arr.splice(0, 1)
    arr = arr.concat(item)
    return swap(arr.length-2, arr.length-1, arr)
  } else {
    const from = idx
    let to = idx - 1 % arr.length
    
    if (to === -1) {
      throw new Error('this should not happen')
    }
    let afterSwap = swap(from, to, arr)
    if (to === 0) {
      const stump = afterSwap.splice(0, 1)
      afterSwap = afterSwap.concat(stump)
    }
    return afterSwap  
  }
}

function swap(from, to, arr) {
  if (arr[from] === undefined || arr[to] === undefined) {
    console.log(from, to, arr)
    throw new Error('damn you')  
  }
  const temporary = arr[from]
  arr[from] = arr[to]
  arr[to] = temporary
  return arr
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  const instructions = data.trim().split('\n').map(x=>x.trim()).map(x=>parseInt(x))
  //const instructions = [1,2,-3,3,-2,0,4]
  let mixer = [...instructions]
  
  instructions.forEach(instruction => {
    if (instruction === 0) return
    for (let i = 0; i < Math.abs(instruction); i++) {
      const index = mixer.findIndex(x=>x===instruction)
      const applier = instruction > 0 ? forward : backward;
      mixer = applier(index, mixer)
    }
  })

  const findZero = mixer.findIndex(x=>x===0)
  const oneThousanth = mixer[(1000 + findZero) % mixer.length]
  const twoThousanth = mixer[(2000 + findZero) % mixer.length]
  const threeThousanth = mixer[(3000 + findZero) % mixer.length]

  const sum = oneThousanth + twoThousanth + threeThousanth

  console.log('final', mixer)
  console.log('oneThousanth', oneThousanth)
  console.log('twoThousanth', twoThousanth)
  console.log('threeThousanth', threeThousanth)
  console.log('sum', sum)
})

//const input = [-1,-2,-3]
//console.log('testing input', [...input], 'with instruction', 4, 'result', backward(1, input))