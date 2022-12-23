
function mix(mixArray, instruction) {
  
  const targetValue = mixArray.find(x => x === instruction)
  const targetIndex = mixArray.findIndex(x => x === instruction)
  const targetValueAbs = Math.abs(targetValue)
  
  let counter = 1
	while (counter <= targetValueAbs) {
    //console.log('targetValue', targetValue)
		mixArray = mixPrime(targetValue, targetIndex, counter, mixArray)
		counter++
		/*
		const start = arr.slice(0, index)
		const end = arr.slice(index+1)
		const item = arr.slice(index, index+1)

		console.log('start', start)
		console.log('end', end)
		console.log('item', item)
		arr = [...start, ...end]
		*/
	}
  return mixArray
}

function mixPrime(targetValue, targetIndex, counter, mixArray) {
  //console.log('mixPrime', targetValue, targetIndex, counter, mixArray)
  if (targetValue > 0) {
    const idxA = idxAForward(targetIndex, counter, mixArray)
    const idxB = idxBForward(targetIndex, counter, mixArray)
    
    const storedValue = mixArray[idxA]
    mixArray[idxA] = mixArray[idxB]
    mixArray[idxB] = storedValue
  } else {
    const idxA = idxABackward(targetIndex, counter)
    const idxB = idxBBackward(targetIndex, counter, mixArray)
    
    console.log('im moving negative', idxA, idxB)

    const storedValue = mixArray[idxA]
    mixArray[idxA] = mixArray[idxB]
    mixArray[idxB] = storedValue
  }
  //console.log(mixArray)
  return mixArray
}

function idxAForward(targetIndex, counter, mixArray) {
  return (targetIndex+counter-1) % (mixArray.length)
}

function idxBForward(targetIndex, counter, mixArray) {
  return (targetIndex+1+counter-1) % (mixArray.length)
}

function idxABackward(targetIndex, counter) {
  console.log('idxABackward', targetIndex, counter)
  return (targetIndex+(counter*-1)+1)
}

function idxBBackward(targetIndex, counter, mixArray) {
  console.log('idxBBackward', targetIndex, counter, mixArray)
  return (targetIndex+(counter*-1)) === -1 ? mixArray.length-1 : (targetIndex+(counter*-1))
}

/*const instructions = [1, 2, -3, 3, -2, 0, 4]
//console.log('initial arrangement\n', instructions.join(', '))
let mixerArray = [...instructions]

instructions.forEach((instruction) => {
  mixerArray = mix(mixerArray, instruction)
})*/

const same = (a,b)=>JSON.stringify(a) === JSON.stringify(b)

const testA = mixPrime(1, 0, 1, [1, 2, -3, 3, -2, 0, 4])
console.log('test1: ', same(testA, [2, 1, -3, 3,-2, 0, 4]))

const testB = mixPrime(2, 0, 1, [2, 1, -3, 3,-2, 0, 4])
console.log('test2: ', same(testB, [1, 2, -3, 3, -2, 0, 4]))

const testC = mixPrime(-1, 1, 1, [1,2,-1,3,4])
console.log('test3: ', testC, same(testC, [1,-1,2,3,4]))

const testD = mixPrime(5, 0, 1, [5,2,3,4])
console.log('test4: ', same(testD, [2,5,3,4]))

const testE = mixPrime(-5, 0, 1, [-5,2,3,4])
console.log('test5: ', same(testE, [2,3,4,-5]))

const testF = mixPrime(-3, 1, 3, [4, 1,  2, 3, -2, 0, -3])
console.log('test6: ', same(testF, [1, 2, -3, 3, -2, 0, 4]))
