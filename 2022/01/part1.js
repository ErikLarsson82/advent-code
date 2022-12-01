require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  const largestCalorieSum = 
    prepare(data)
      .map(prepareLine)
      .map(
        x => x.reduce(sum, 0)
      )
      .reduce(max, 0)
      
	console.log(largestCalorieSum)
})

function prepare(rawString) {
	return rawString.trim().split('\n\n')
}

function prepareLine(str) {
  return str.trim().split('\n').map(x => parseInt(x))
}

function sum(acc, curr) {
  return acc + curr
}

function max(acc, curr) {
  return curr > acc ? curr : acc
}