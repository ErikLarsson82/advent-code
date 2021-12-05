
//  '46,601 -> 714,601'
// { x1: 46, y1: 601, x2: 714, y2: 601 }
const parseLine = str => {
	const [x1, y1, x2, y2] = str.split(' -> ').flatMap(x=>x.split(',')).map(x=>parseInt(x))
	return { x1, y1, x2, y2 }
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	const ventLines = data.trim().split('\n').map(parseLine)
	
	const cardinalLines = ventLines.filter(({ x1, y1, x2, y2 }) => x1 === x2 || y1 === y2)

	const points = []

	cardinalLines.forEach(({ x1, y1, x2, y2 }) => {
		if (x1 === x2) {
			const from = y1 < y2 ? y1 : y2
			const to = y1 > y2 ? y1 : y2
			for (let i = from; i <= to; i++) {
				points.push({ x: x1, y: i })
			}
		} else {
			const from = x1 < x2 ? x1 : x2
			const to = x1 > x2 ? x1 : x2
			for (let i = from; i <= to; i++) {
				points.push({ x: i, y: y1 })
			}
		}
	})

	const x1Max = cardinalLines.map(({ x1 }) => x1)
	const x2Max = cardinalLines.map(({ x2 }) => x2)
	const y1Max = cardinalLines.map(({ y1 }) => y1)
	const y2Max = cardinalLines.map(({ y2 }) => y2)
	const xMax = Math.max(...x1Max.concat(x2Max))
	const yMax = Math.max(...y1Max.concat(y2Max))

	function diagramString() {
		let count = 0
		let diagramStr = ''
		for (let i = 0; i <= xMax; i++) {
			for (let j = 0; j <= yMax; j++) {
				const amount = points.filter(({ x, y }) => x === j && y === i).length
				diagramStr += amount === 0 ? '-' : amount
				if (amount >= 2) {
					count++
				}
			}
			diagramStr += '\n'
		}
		console.log('count', count)
		return diagramStr
	}


	console.log(diagramString())

})