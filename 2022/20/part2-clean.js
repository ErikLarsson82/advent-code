// this was the like third attempted solution, but it got overly complicated fast
const DEBUG = true  

let mixer

const _instructionValue = x => x.instructionValue
const _id = x => x.id
const same = (a,b)=>JSON.stringify(a) === JSON.stringify(b)

const mod = (a, b) => {
  const r = a % b;
  return r < 0 ? r + b : r
}

// This assumes that the previous entry STAYS
function insertionIndexWithoutRemoval(targetIndex, movement, arrayLength) {
  if (targetIndex + movement < 0) {
    const toMakeItPositive = Math.ceil(Math.abs((movement) / arrayLength))
    console.log('to make it positive', toMakeItPositive * arrayLength)
    console.log('test', targetIndex + movement + toMakeItPositive)
  }
  return (targetIndex + movement) % arrayLength
}

/*
console.log('assert', insertionIndexWithoutRemoval(3,1,6) === 4)
console.log('assert', insertionIndexWithoutRemoval(3,6,6) === 3)
console.log('assert', insertionIndexWithoutRemoval(3,2,6) === 5)
console.log('assert', insertionIndexWithoutRemoval(3,3,6) === 0)
console.log('assert', insertionIndexWithoutRemoval(3,12,6) === 3)
console.log('assert', insertionIndexWithoutRemoval(3,-1,6) === 2)
console.log('assert', insertionIndexWithoutRemoval(3,-2,6) === 1)
console.log('assert', insertionIndexWithoutRemoval(3,-3,6) === 0)
console.log('assert', insertionIndexWithoutRemoval(3,-4,6) === 5)
console.log('assert', insertionIndexWithoutRemoval(3,-6,6) === 3)
console.log('assert', insertionIndexWithoutRemoval(3,-18,6) === 3)
console.log('assert', insertionIndexWithoutRemoval(3,-19,6) === 3)
*/

/*
// This assumes that the previous entry is REMOVED
function insertionIndexUsingRemoval(targetIndex, movement, arrayLength) {
  return (targetIndex + movement) % arrayLength
}

console.log('assert', insertionIndexUsingRemoval(3,1,6) === 4)
console.log('assert', insertionIndexUsingRemoval(3,6,6) === 3)
console.log('assert', insertionIndexUsingRemoval(3,2,6) === 5)
console.log('assert', insertionIndexUsingRemoval(3,3,6) === 0)
*/

/*
function findBaseline(index, len) {
  return (index + len % len
}

console.log('assert', findBaseline(3, 6) === 2)
console.log('assert', findBaseline(0, 6) === 6)
console.log('assert', findBaseline(6, 6) === 5)
*/



function fastMove(id) {
  const targetIndexBeforeInsertion = mixer.findIndex(({id: idPrime}) => id === idPrime)
  const target = mixer.find(({id: idPrime}) => id === idPrime)
  const idToTheLeftOfMe = (targetIndexBeforeInsertion - 1) > 0 ? mixer[targetIndexBeforeInsertion-1].id : mixer[mixer.length-1].id
  //console.log('id to the left of me', idToTheLeftOfMe)
  //console.log('baselineIdx', baselineIdx)

  const partA = mixer.slice(0, targetIndexBeforeInsertion)
  const partB = mixer.slice(targetIndexBeforeInsertion+1)
  const mixerAfterRemoval = partA.concat(partB)

  const baselineIdx = mixer.findIndex(({id: idPrime}) => idToTheLeftOfMe === idPrime) % mixerAfterRemoval.length

  DEBUG && console.log(mixerAfterRemoval.map(_instructionValue).join(', '))
  DEBUG && console.log(mixerAfterRemoval.map(_id).join(', '))

  //let offsetIndex = insertionIndexWithoutRemoval(baselineIdx, target.instructionValue, mixerAfterRemoval.length)
  let offsetIndex = mod(baselineIdx + target.instructionValue, mixerAfterRemoval.length)
  console.log('data', baselineIdx, target.instructionValue)
  console.log('try offset idx', offsetIndex)

  let mixerPrime = []
  for (let i = 0; i < mixerAfterRemoval.length; i++) {
    mixerPrime.push(mixerAfterRemoval[i])

    //if (mixer[i].id === mixer[toIndex].id) {
    if (i === offsetIndex) {
      mixerPrime.push(target)
    }
  }

  return mixerPrime
  /*
  const target = mixer[targetIndexBeforeInsertion]
  const baselineZero = findBaseLine(index, mixer.length)
  //target.deleteMe = true
  if (target.instructionValue === 0) return mixer
  
  const toIndex = insertionIndexUsingRemoval(targetIndexBeforeInsertion, target.instructionValue, mixer.length)

  console.log('target index before removal', toIndex, mixer[toIndex].id)

  

  console.log('partA', partA)
  console.log('partB', partB)

  console.log('target index after removal', toIndex, mixerAfterRemoval[toIndex].id)

  DEBUG && console.log(mixerAfterRemoval.map(_instructionValue).join(', '))
  DEBUG && console.log(mixerAfterRemoval.map(_id).join(', '))
  */

  //console.log('debug', targetIndexBeforeInsertion, target.instructionValue, mixer.length, toIndex)
  
  /*
  let mixerPrime = []
  for (let i = 0; i < mixer.length; i++) {
    mixerPrime.push(mixer[i])

    if (mixer[i].id === mixer[toIndex].id) {
      mixerPrime.push({ id: target.id, instructionValue: target.instructionValue })
    }
  }
  */
  //console.log('mixerPrime', mixerPrime)
  /*
  DEBUG && console.log('after insertion but before removal')
  DEBUG && console.log(mixerPrime.map(_instructionValue).join(', '))
  DEBUG && console.log(mixerPrime.map(_id).join(', '))

  let mixerOptimus = []
  for (let i = 0; i < mixerPrime.length; i++) {
    if (mixerPrime[i].deleteMe === true) {
      // nothing
      //§console.log('do nothing')
    } else {
      mixerOptimus.push(mixerPrime[i])
      //console.log('add', mixerPrime[i])
    }
  }

  //console.log('mixerOptimus', mixerOptimus)
  return mixerOptimus
  */
  /*
  const isPositive = target.instructionValue > 0
  const isNegative = target.instructionValue < 0
  const toIndex = (fromIndex + target.instructionValue) % mixer.length
  console.log(fromIndex, toIndex)
  
  let mixerPrime = []

  for (let i = 0; i < mixer.length; i++) {
    if (isNegative && toIndex === i) {
      mixerPrime.push(target)
    }
    if (fromIndex !== i) {
      mixerPrime.push(mixer[i])      
    }
    if (isPositive && toIndex === i) {
      mixerPrime.push(target)
    }
  }
  
  return mixerPrime
  */
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, _data) => {

  const ___data = `1
  2
  -3
  3
  -2
  0
  4`

  const data = `1
2
2
2
2
0
2`

  const blueprint = data.trim().split('\n').map((x, id) => ({ instructionValue: parseInt(x), id }));

  mixer = blueprint.map(({id, instructionValue}) => ({id, instructionValue}))

  DEBUG && console.log('initial mixer array')
  DEBUG && console.log(mixer.map(_instructionValue).join(', '))
  DEBUG && console.log(mixer.map(_id).join(', '))

  mixer = fastMove(1)
  DEBUG && console.log(mixer.map(_instructionValue).join(', '))
  DEBUG && console.log(mixer.map(_id).join(', '))

  return
  blueprint.forEach((_, id) => {
    DEBUG && console.log('iteration', id)
    mixer = fastMove(id)
    DEBUG && console.log(mixer.map(_instructionValue).join(', '))
    DEBUG && console.log(mixer.map(_id).join(', '))
  })

  const zeroIndex = mixer.findIndex(({ instructionValue }) => instructionValue === 0)

  const a = mixer[(zeroIndex + 1000) % mixer.length].instructionValue
  const b = mixer[(zeroIndex + 2000) % mixer.length].instructionValue
  const c = mixer[(zeroIndex + 3000) % mixer.length].instructionValue

  console.log('a', a, 'b', b, 'c', c,'sum', a + b + c)
})
