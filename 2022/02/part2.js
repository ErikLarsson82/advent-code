require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  const totalScore = prepare(data).map(getScore).reduce(sum, 0)
  console.log(`Total score: ${totalScore}`)
})

function prepare(str) {
	return str.trim().split('\n').map(pair => {
		const [opponent, need] = pair.split(' ')
		return { opponent, need }
	})
}

// A for Rock, B for Paper, and C for Scissors
function getScore({ opponent, need }) {
	let yourMove
	let point
	if (need === 'X') {
		point = 0
		// Need to lose
		if (opponent === 'A') {
			yourMove = 'scissor'
		}
		if (opponent === 'B') {
			yourMove = 'rock'
		}
		if (opponent === 'C') {
			yourMove = 'paper'
		}
	}
	if (need === 'Y') {
		point = 3
		// Need to draw
		if (opponent === 'A') {
			yourMove = 'rock'
		}
		if (opponent === 'B') {
			yourMove = 'paper'
		}
		if (opponent === 'C') {
			yourMove = 'scissor'
		}
	}
	if (need === 'Z') {
		point = 6
		// Need to win
		if (opponent === 'A') {
			yourMove = 'paper'
		}
		if (opponent === 'B') {
			yourMove = 'scissor'
		}
		if (opponent === 'C') {
			yourMove = 'rock'
		}
	}
	const basePoints = {
		rock: 1,
		paper: 2,
		scissor: 3
	}
	return point + basePoints[yourMove]
}

function sum(acc, curr) {
  return acc + curr
}
