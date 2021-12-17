/*
const caves = [
	{ from: 'start', to: 'A' },
	{ from: 'start', to: 'b' },
	{ from: 'A', to: 'c' },
	{ from: 'A', to: 'b' },
	{ from: 'b', to: 'd' },
	{ from: 'A', to: 'end' },
	{ from: 'b', to: 'end' },
]
*/
/*
const caves = [
	{ from: 'dc', to: 'end' },
	{ from: 'HN', to: 'start' },
	{ from: 'start', to: 'kj' },
	{ from: 'dc', to: 'start' },
	{ from: 'dc', to: 'HN' },
	{ from: 'LN', to: 'dc' },
	{ from: 'HN', to: 'end' },
	{ from: 'kj', to: 'sa' },
	{ from: 'kj', to: 'HN' },
	{ from: 'kj', to: 'dc' },
]
*/

/*
const caves = [
	{ from: 'fs', to: 'end' },
	{ from: 'he', to: 'DX' },
	{ from: 'fs', to: 'he' },
	{ from: 'start', to: 'DX' },
	{ from: 'pj', to: 'DX' },
	{ from: 'end', to: 'zg' },
	{ from: 'zg', to: 'sl' },
	{ from: 'zg', to: 'pj' },
	{ from: 'pj', to: 'he' },
	{ from: 'RW', to: 'he' },
	{ from: 'fs', to: 'DX' },
	{ from: 'pj', to: 'RW' },
	{ from: 'zg', to: 'RW' },
	{ from: 'start', to: 'pj' },
	{ from: 'he', to: 'WI' },
	{ from: 'zg', to: 'he' },
	{ from: 'pj', to: 'fs' },
	{ from: 'start', to: 'RW' },
]
*/

const caves = [
	{ from: 'yb', to: 'start' },
	{ from: 'de', to: 'vd' },
	{ from: 'rj', to: 'yb' },
	{ from: 'rj', to: 'VP' },
	{ from: 'OC', to: 'de' },
	{ from: 'MU', to: 'de' },
	{ from: 'end', to: 'DN' },
	{ from: 'vd', to: 'end' },
	{ from: 'WK', to: 'vd' },
	{ from: 'rj', to: 'de' },
	{ from: 'DN', to: 'vd' },
	{ from: 'start', to: 'VP' },
	{ from: 'DN', to: 'yb' },
	{ from: 'vd', to: 'MU' },
	{ from: 'DN', to: 'rj' },
	{ from: 'de', to: 'VP' },
	{ from: 'yb', to: 'OC' },
	{ from: 'start', to: 'rj' },
	{ from: 'oa', to: 'MU' },
	{ from: 'yb', to: 'de' },
	{ from: 'oa', to: 'VP' },
	{ from: 'jv', to: 'MU' },
	{ from: 'yb', to: 'MU' },
	{ from: 'end', to: 'OC' },
]

let iteration = 0
const paths = []

const isSmallCave = c => c.toLowerCase() === c
const isLargeCave = c => c.toUpperCase() === c

let hasUpgradedSmall = false

function path(inputPath) {
	iteration++
	if (iteration % 100 === 0) {
		console.log('running iteration', iteration)
	}
	const currentLocation = inputPath[inputPath.length-1]
	const destinations = caves.filter(({ from, to }) => from === currentLocation || to === currentLocation)

	destinations.forEach(({ from, to }) => {

		const target = from === currentLocation ? to : from
				
		if (target === 'start') {
			return
		}

		if (!isAllowed(target, inputPath)) {
			return
		}

		const wouldBePath = inputPath.concat(target)
		if (exists(paths, wouldBePath)) {
			return	
		}

		const novelPath = wouldBePath
		if (target === 'end') {
			paths.push(novelPath)
			return			
		}

		path(novelPath)
	})
}

function isAllowed(destination, path) {
	const amount = path.filter(x => x === destination).filter(isSmallCave).length

	if (amount === 0) {
		return true
	}
	if (!smallCaveSpaceOccupied(path) && amount === 1) {
		return true
	}
	return false
}

function smallCaveSpaceOccupied(path) {
	let found = false
	path.forEach((comparer, i1) => {
		path.forEach((comparee, i2) => {
			if (i1 !== i2 && comparer === comparee && isSmallCave(comparer) && !['start', 'end'].includes(comparer)) {
				found = true
			}
		})
	})
	return found
}
/*
console.log(smallCaveSpaceOccupied(['a','b','c']))
console.log(smallCaveSpaceOccupied(['a','b','b']))
console.log(smallCaveSpaceOccupied(['rt','b','rt']))
console.log(smallCaveSpaceOccupied(['X','YY','YY']))
console.log(smallCaveSpaceOccupied(['end','YY','end']))
*/

function exists(paths, arr) {
	return paths.find(x => arr.join(',') === x.join(','))
}

path('start'.split(','))
console.log('\npaths', paths)
console.log('found paths', paths.length)
