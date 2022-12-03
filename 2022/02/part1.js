require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  const totalScore = prepare(data).map(getScore).reduce(sum, 0)
  console.log(`Total score: ${totalScore}`)
})

function prepare(str) {
	return str.trim().split('\n').map(pair => {
		const [opponent, you] = pair.split(' ')
		return { opponent, you }
	})
}

function getScore({ opponent, you }) {
	const outcomeScore = outcomeScoreOfRound({ opponent, you })
	const basePoints = {
		X: 1,
		Y: 2,
		Z: 3
	}
	return outcomeScore + basePoints[you]
}

function outcomeScoreOfRound({ opponent, you }) {
	const bothRock = opponent === 'A' && you === 'X'
	const bothPaper = opponent === 'B' && you === 'Y'
	const bothScissor = opponent === 'C' && you === 'Z'

	if (bothRock || bothPaper || bothScissor) return 3
	
	const rockBeatsScissor = opponent === 'A' && you === 'Z'
	const paperBeatsRock = opponent === 'B' && you === 'X'
	const scissorBeatsPaper = opponent === 'C' && you === 'Y'

	if (rockBeatsScissor || paperBeatsRock || scissorBeatsPaper) return 0

	return 6
}

function sum(acc, curr) {
  return acc + curr
}
