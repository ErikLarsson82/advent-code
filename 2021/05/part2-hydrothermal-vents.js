
//  '46,601 -> 714,601'
// { x1: 46, y1: 601, x2: 714, y2: 601 }
const parseLine = str => {
	const [x1, y1, x2, y2] = str.split(' -> ').flatMap(x=>x.split(',')).map(x=>parseInt(x))
	return { x1, y1, x2, y2 }
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	/*
	// Example
	const ventLines = [
		'0,9 -> 5,9',
		'8,0 -> 0,8',
		'9,4 -> 3,4',
		'2,2 -> 2,1',
		'7,0 -> 7,4',
		'6,4 -> 2,0',
		'0,9 -> 2,9',
		'3,4 -> 1,4',
		'0,0 -> 8,8',
		'5,5 -> 8,2'
	].map(parseLine)
	*/

	const ventLines = data.trim().split('\n').map(parseLine)

	const points = []

	ventLines.forEach(({ x1, y1, x2, y2 }) => {
		let x = x1
		let y = y1		
		points.push({ x, y })
		while (!(x === x2 && y === y2)) {
			if (x1 !== x2) x = x + (x1 > x2 ? -1 : 1)
			if (y1 !== y2) y = y + (y1 > y2 ? -1 : 1)			
			points.push({ x, y })
		} 	
	})
	
	const x1Max = ventLines.map(({ x1 }) => x1)
	const x2Max = ventLines.map(({ x2 }) => x2)
	const y1Max = ventLines.map(({ y1 }) => y1)
	const y2Max = ventLines.map(({ y2 }) => y2)
	const xMax = Math.max(...x1Max.concat(x2Max))
	const yMax = Math.max(...y1Max.concat(y2Max))

	function diagramString() {
		let count = 0
		let diagramStr = ''
		for (let i = 0; i <= yMax; i++) {
			for (let j = 0; j <= xMax; j++) {
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

	diagramString()
	//console.log(diagramString())

})