
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const split = data.indexOf('\n')
	const lottoNumbers = data.substring(0, split).split(',').map(x => parseInt(x))
	const boards = data.substring(split+1).split('\n\n').map(parseBoard)

	// let done = false
	lottoNumbers.forEach(number => {
		// if (done) return
		boards.forEach((board, boardIdx) => {
			//if (done) return

			if (hasBingo(board)) return

			mark(board, number)
			if (hasBingo(board)) {
				console.log(`Bingo at board ${boardIdx} when number ${number} was drawn - sum ${sum(board)} and total score ${sum(board) * number}`)
			}
		})
	})
})

function parseBoard(str) {
	return str.trim()
		.split('\n')
		.map(rowStr => 
			rowStr.split(' ')
				.filter(x=>x!=='')
				.map(x=> ({ number: parseInt(x), marked: false }))
			)
}

function sum(board) {
	let amount = 0
	board.forEach(row => {
		row.forEach(item => {
			if (!item.marked) {
				amount += item.number
			}
		})
	})
	return amount
}

function mark(board, number) {
	board.forEach(row => {
		row.forEach(item => {
			if (item.number === number) {
				item.marked = true
			}
		})
	})
}

function hasBingo(board) {
	let found = false
	board.forEach(row => {
		if (row.filter(item=>item.marked).length === 5) {
			found = true
		}
	})
	for (let i = 0; i < 5; i++) {
		let countMarked = 0
		board.forEach(row => {
			if (row[i].marked) {
				countMarked++
			}
		})
		if (countMarked === 5) {
			found = true
		}
	}
	return found
}

const board = () => 
	new Array(5).fill().map(() => 
		new Array(5).fill().map(() => ({ number: 1337, marked: false }))
	)

const printRow = obj => {
	let str = obj.number
	if (obj.found) {
		str += '!'
	} else {
		str += ' '
	}
	return str
}

const print = board => {
	let str = ''
	board.forEach(row => { str += row.map(printRow).join(''); str += '\n' })
	return str
}

/*
console.log(board())
const b1 = board()
b1[0][0].found = true
console.log(print(b1))
*/