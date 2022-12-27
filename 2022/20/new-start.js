
function forward(idx, arr) {
  if (idx === arr.length-1) {
    const item = arr.splice(arr.length-1, 1)
    arr = item.concat(arr)
    return swap(0, 1, arr)
  } else {
    const from = idx
    const to = (idx + 1) % arr.length
    if (to < 0 || to > arr.length || from < 0 || from > arr.length) {
      throw new Error('This should not happen')
    }
    return swap(from, to, arr)
    /*
    let afterSwap = swap(from, to, arr)
    if (to === arr.length-1) {
      const stump = afterSwap.splice(arr.length-1, 1)
      afterSwap = stump.concat(afterSwap)
    }
    return afterSwap  
    */
  }
}

function backward(idx, arr) {
  if (idx === 0) {
    const item = arr.splice(0, 1)
    arr = arr.concat(item)
    return swap(arr.length-2, arr.length-1, arr)
  } else {
    const from = idx
    let to = idx - 1 % arr.length
    
    if (to < 0 || to > arr.length || from < 0 || from > arr.length) {
      throw new Error('This should not happen')
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
  const allNumbers = data.trim().split('\n').map(x=>x.trim()).map(x=>parseInt(x))
  //const allNumbers = [1,2,-3,3,-2,0,4]
  let mixer = [...allNumbers]

  const instructions = [...allNumbers]
  /*
  allNumbers.forEach(value => {
    if (instructions.find(x => x === value) === undefined) {
      instructions.push(value)
    }
  })
  */

  instructions.forEach(instruction => {
    if (instruction === 0) return
    for (let i = 0; i < Math.abs(instruction); i++) {
      
      let indexes = []
      mixer.forEach((value, index) => {
        if (value === instruction) {
          indexes.push(index)
        }
      })

      Math.random() < 0.0001 && console.log('indexes', indexes)
      
      for (let j = 0; j < indexes.length; j++) {
        /*let indexesPrime = []
        mixer.forEach((value, index) => {
          if (value === instruction) {
            indexesPrime.push(index)
          }
        })*/
        /*if (JSON.stringify(indexes) !== JSON.stringify(indexesPrime)) {
          console.log(indexes,'is different to', indexesPrime)
          throw new Error('panic')
        }*/
        const applier = instruction > 0 ? forward : backward;
        mixer = applier(indexes[j], mixer)
      }
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

//const input = [1,2,3,4,5,1337]
//console.log('testing input', [...input], 'result', forward(5, input))
