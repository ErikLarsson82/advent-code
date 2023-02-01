
const valves = [
	{ name: 'AA', tunnelConnections: ['BB', 'CC'] },
	{ name: 'BB', tunnelConnections: ['AA'] },
	{ name: 'CC', tunnelConnections: ['DD'] },
	{ name: 'DD', tunnelConnections: ['EE'] },
	{ name: 'EE', tunnelConnections: ['AA'] }
]

function traverse(from, to) {
	let steps = 0
	let found = false
	let finalPath = null
	
	const step = (index, from, path) => {
		console.log('calling step', index, from)
		if (from === to) {
			steps = index
			finalPath = path
			found = true
		}

		if (found) return

		const fromValve = valves.find(x=>x.name===from)	
		
		fromValve.tunnelConnections.forEach(tc => {
			if (path.includes(tc)) {
				console.log('loop detected')
				return
			}
			step(index+1, tc, path.concat(tc))
		})
	}

	step(0, from, [from])

	console.log('calling traverse with', from, to, 'result', steps, finalPath)

	return {
		steps,
		path: finalPath
	}
}

function walk(from, to) {
	const result = traverse(from, to)
	if (result.path[1] === undefined) {
		return null
	}
	return result.path[1]
}

// console.log(traverse('AA', 'DD'))

console.log(walk('EE', 'EE'))

