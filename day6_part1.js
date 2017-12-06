const stateArchive = () => {
 const archive = []

 return memoryState => {
 const result = archive.find( list => list.toString() === memoryState.toString() )
    if (!result)
      archive.push(memoryState.concat())

    return !!result
  }
}

function selectBlockForDistribution(list) {
  const max = Math.max.apply(null, list)
  return list.indexOf(max)
}

function memoryReallocationDebugger(archive, initialMemoryState) {

  archive(initialMemoryState)

  let duplicateDetected = false
  let iterations = 0
  let state = initialMemoryState.concat()

  while(!duplicateDetected) {
    const idxToDistribute = selectBlockForDistribution(state)
    const valueToDistribute = state[idxToDistribute]
    state[idxToDistribute] = 0

    new Array(valueToDistribute).fill(1).forEach( (value, idx) => state[(idxToDistribute + idx + 1) % state.length]++ )
    duplicateDetected = archive(state)
    iterations++
  }
  return { iterations, state }
}

function infiniteLoopDebugger(initialMemoryState) {
  const loopStartList = memoryReallocationDebugger(stateArchive(), initialMemoryState).state
  console.log('loopStartList detected', loopStartList)
  console.log('memoryReallocationDebugger started')
  return memoryReallocationDebugger(stateArchive(), loopStartList.concat())
}

//console.log( "Result: " + memoryReallocationDebugger( stateArchive(), [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6]).iterations ) // 14029
console.log( "Result: " + infiniteLoopDebugger( [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6]).iterations )

//console.log( "Result: " + memoryReallocationDebugger(stateArchive(), [0, 2, 7, 0]).iterations ) // 5
//console.log( "Result: " + infiniteLoopDebugger([0, 2, 7, 0]).iterations ) // 4

/*
console.log( selectBlockForDistribution([1, 2, 3]) === 2 )
console.log( selectBlockForDistribution([1, 2, 3, 8, 0, 8]) === 3 )
console.log( selectBlockForDistribution([1, 1, 1, 1, 1]) === 0 )
console.log( selectBlockForDistribution([1, 2, 3, 6, 7, 8, 1337]) === 6 )
*/