const attempts = 100

const facit = [
	new Array(attempts).fill().map((_, idx) => (idx + 1) % 2),
	new Array(attempts).fill().map((_, idx) => (idx + 1) % 3),
	new Array(attempts).fill().map((_, idx) => (idx + 1) % 5),
]

// console.log(facit.map(f => f.join('')).join('\n'))
facit.forEach((div, iPrime) => {
	console.log('Division facit', [2,3,5][iPrime])
	div.forEach((fac, index) => {
		console.log(`${index+1} translates to ${fac}`)
	})
})
