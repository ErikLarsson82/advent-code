let head = { x: 3, y: 6 }
let tail = { x: 3, y: 6 }
let visits = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const commands = data.trim().split('\n').map(x => x.trim()).forEach(command)
	console.log('Tail visits: ', visits.length)
})

function command(str) {
	const [direction, amount] = str.split(' ')

	const f = {
		U: () => head.y -= 1,
		D: () => head.y += 1,
		L: () => head.x -= 1,
		R: () => head.x += 1,
	}

	for (let i = 0; i < parseInt(amount); i++) {
		f[direction]()
		calculateTail()
		addNonDuplicate()
		print()
	}
}

function addNonDuplicate() {
	const { x, y } = tail
	const findResult = visits.find(({ x: xP, y: yP }) => x === xP && y === yP)
	if (!findResult) {
		visits.push({ ...tail })
	}
}

function calculateTail() {
	if (head.x === tail.x && head.y === tail.y) return
	if (Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1) return

	if (head.x > tail.x) {
		tail.x++
	} else if (head.x < tail.x) {
		tail.x--
	}
	if (head.y > tail.y) {
		tail.y++
	} else if (head.y < tail.y) {
		tail.y--
	}
}

function print() {
	return
	let str = ''
	for (let y = 0; y < 10; y++) {
		for (let x = 0; x < 10; x++) {
			if (head.x === x && tail.x === x && head.y === y && tail.y === y) {
				str += 'B'
			} else if (head.x === x && head.y === y) {
				str += 'H'
			} else if (tail.x === x && tail.y === y) {
				str += 'T'
			} else {
				str += '.'
			}
		}
		str += '\n'
	}
	console.log(str)
}
