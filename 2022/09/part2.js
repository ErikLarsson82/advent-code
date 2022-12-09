const rope = [
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 },
	{ x: 11, y: 15 }
]
let visits = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const commands = data.trim().split('\n').map(x => x.trim()).forEach((x, idx) => {
		setTimeout(() => {
			command(x)
		}, idx * 100)
	})
	console.log('Tail visits: ', visits.length)
})

function command(str) {
	const [direction, amount] = str.split(' ')
	const f = {
		U: () => rope[0].y -= 1,
		D: () => rope[0].y += 1,
		L: () => rope[0].x -= 1,
		R: () => rope[0].x += 1,
	}

	for (let i = 0; i < parseInt(amount); i++) {
		f[direction]()
		rope.forEach((ropeSegment, idx, list) => {
			if (idx === list.length-1) return
			const { x, y } = calculateTail(ropeSegment, list[idx+1])
			rope[idx+1].x = x
			rope[idx+1].y = y
			addNonDuplicate()
		})		
	}
	print()
}

function addNonDuplicate() {
	const tail = rope[rope.length-1]
	const { x, y } = tail
	const findResult = visits.find(({ x: xP, y: yP }) => x === xP && y === yP)
	if (!findResult) {
		visits.push({ ...tail })
	}
}

function calculateTail(a, b) {
	let output = { x: b.x, y: b.y }
	if (a.x === b.x && a.y === b.y) return output
	if (Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1) return output

	if (a.x > b.x) {
		output.x++
	} else if (a.x < b.x) {
		output.x--
	}
	if (a.y > b.y) {
		output.y++
	} else if (a.y < b.y) {
		output.y--
	}
	return output
}

function print() {
	let str = ''
	for (let y = 0; y < 80; y++) {
		for (let x = 0; x < 80; x++) {
			let char = '.'
			for (let ropeIdx = rope.length-1; ropeIdx >= 0; ropeIdx--) {
				if (visits.find(({ x: xP, y: yP }) => x === xP && y === yP)) {
					char = '#'
				} else if (rope[ropeIdx].x === x && rope[ropeIdx].y === y) {
					char = ropeIdx
				}
			}
			str += char
		}
		str += '\n'
	}
	console.clear()
	console.log(str)
}
