
let horizontalPosition = 0
let depth = 0

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const commandList = data.trim().split('\n')
	commandList.forEach(runCommandFromStr)
	statusReport()
	console.log(`Final multiplyer: ${horizontalPosition * depth }`)
})

const commands = {
	forward: amount => { horizontalPosition = horizontalPosition + amount },
	down: amount => { depth = depth + amount },
	up: amount => { depth = depth - amount },
}

function runCommandFromStr(str) {
	const parts = str.split(' ')
	const command = parts[0]
	const amount = parseInt(parts[1])
	return commands[command](amount)
}

function statusReport() {
	console.log('Status', `Horizontal Position: ${ horizontalPosition }`, `Depth: ${depth}`)
}
