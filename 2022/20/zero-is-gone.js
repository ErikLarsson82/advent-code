// dont even remeber the thinking about this one

//1,2,-3,3,-2,0,4 // example input

/*
function move(idx, arr) {
  const copy = [...arr]
  const targetIndex = (idx + 1) % (arr.length)
  const value = copy[idx]
  copy[idx] = copy[targetIndex]
  copy[targetIndex] = value

  return copy
}
*/

function move(idx, arr) {
  const copy = [...arr]
  const targetIndex = (idx + 1)
  const value = copy[idx]
  copy[idx] = copy[targetIndex]
  copy[targetIndex] = value

  return copy
}

function prepare(idx, arr) {
  const newIndex = (idx + 1)
  if (newIndex > arr.length-1) {
    const copy = [...arr]
    return copy.slice(1).concat(copy[0])
    //return [copy[arr.length-1]].concat(copy.slice(0, arr.length-1))
  }
  return arr
}

false && console.log(
  prepare(3, [0,1,2,3])
)

let arr = [1,2,3,4,0,5,6,1,8]

console.log('array at start', arr.join(','))

for (let i = 0; i < 12; i++) {
  let indexes = []
  arr.forEach((x, idx) => {
    if (x===1) {
      indexes.push(idx)
    }
  })

  console.log('indexes', indexes)
  return
  arr = prepare(indexA, arr)
  const indexB = arr.findIndex(x=>x===1)
  arr = move(indexB, arr)
  const zeroIndex = arr.findIndex(x=>x===0)
  const answer = arr[zeroIndex+1] // +1%arr.length-1
  console.log('array after', i, 'moving index', indexA, indexB, arr.join(','), answer)
}