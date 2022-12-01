require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  const sortedCalories = 
    prepare(data)
      .map(prepareLine)
      .map(
        x => x.reduce(sum, 0)
      )
      .sort((a, b) => a > b ? -1 : 1)
      .slice(0, 3)
      .reduce(sum, 0)

	console.log(sortedCalories)
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