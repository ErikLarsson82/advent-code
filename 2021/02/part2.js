
let horizontalPosition = 0
let depth = 0
let aim = 0

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const commandList = data.trim().split('\n')
	commandList.forEach(runCommandFromStr)
	statusReport()
	console.log(`Final multiplyer: ${horizontalPosition * depth }`)
})

const commands = {
	forward: amount => { 
		horizontalPosition = horizontalPosition + amount
		depth = depth + (aim * amount) 
	},
	down: amount => {
		aim = aim + amount
	},
	up: amount => {
		aim = aim - amount
	},
}

const example = [
	"forward 5",
	"down 5",
	"forward 8",
	"up 3",
	"down 8",
	"forward 2"
]

function runCommandFromStr(str) {
	const parts = str.split(' ')
	const command = parts[0]
	const amount = parseInt(parts[1])
	return commands[command](amount)
}

function statusReport() {
	console.log('Status', `Horizontal Position: ${ horizontalPosition }`, `Depth: ${depth}`, `Aim: ${aim}`)
}

/*
statusReport()
console.log('')

example.forEach(x => {
	runCommandFromStr(x)
	console.log('Command', x)
	statusReport()
	console.log('')
})
console.log(`Final multiplyer: ${horizontalPosition * depth }`)
*/