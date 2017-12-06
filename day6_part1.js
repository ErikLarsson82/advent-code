const stateArchive = () => {
 const archive = []

 return memoryState => {
 const result = archive.find( list => list.toString() === memoryState.toString() )
    if (!result)
      archive.push(memoryState.concat())

    return !!result
  }
}

const forEach = (number, func) => new Array(number).fill(1).forEach(func)

function selectBlockForDistribution(list) {
  const max = Math.max.apply(null, list)
  return list.indexOf(max)
}

function memoryReallocationDebugger(initialMemoryState) {

  const archive = stateArchive()

  archive(initialMemoryState)

  let duplicateDetected = false
  let iterations = 0
  let state = initialMemoryState.concat()

  while(!duplicateDetected) {
    const idxToDistribute = selectBlockForDistribution(state)
    const valueToDistribute = state[idxToDistribute]
    state[idxToDistribute] = 0

    forEach(valueToDistribute, (value, idx) => state[(idxToDistribute + idx + 1) % state.length]++ )
    
    duplicateDetected = archive(state)
    iterations++
  }
  return { iterations, state }
}

function infiniteLoopDebugger(initialMemoryState) {
  const loopStartList = memoryReallocationDebugger(initialMemoryState).state

  console.log('loopStartList detected', loopStartList)
  console.log('memoryReallocationDebugger started')
  
  return memoryReallocationDebugger(loopStartList.concat())
}

console.log( "Result 1: " + memoryReallocationDebugger([0, 2, 7, 0]).iterations ) // 5
console.log( "Result 2: " + infiniteLoopDebugger([0, 2, 7, 0]).iterations ) // 4

//console.log( "Result 3: " + memoryReallocationDebugger( [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6]).iterations ) // 14029
//console.log( "Result 4: " + infiniteLoopDebugger( [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6]).iterations ) // 2765
