
const open = '([{<'
const close = ')]}>'

match('(', ')') === true
match('[', ')') === false

function match(a, b) {
	return open.split('').findIndex(x => x === a) === close.split('').findIndex(x => x === b)
}

function hasCloser(str) {
	const indexes = close.split('').map(x => {
		if (str.includes(x)) {
			return str.indexOf(x)
		}
		return Infinity
	})
	return indexes.length === 0 ? -1 : Math.min(...indexes)
}

function findCorrupt(str) {
	const removed = removeChunks(str)
	const closerIdx = hasCloser(removed)
	if (closerIdx !== -1 && match(removed[hasCloser], removed[hasCloser-1])) {
		return removed[closerIdx]
	}
	return 'VALID'
}

const removeFromIdx = (idx, str) => str.substring(0, idx) + str.substring(idx + 2)
const removePair = (pair, str) => str.indexOf(pair) !== -1 ? removeFromIdx(str.indexOf(pair), str) : str

function removeChunks(str) {
	let length
	do {
		length = str.length	
		str = removePair('()', str)
		str = removePair('{}', str)
		str = removePair('[]', str)
		str = removePair('<>', str)
	} while (length !== str.length)

	return str
}

const score = idx => {
	return {
		')': 3,
		']': 57,
		'}': 1197,
		'>': 25137,
	}[idx]
}

const minorScore = idx => {
	return {
		')': 1,
		']': 2,
		'}': 3,
		'>': 4,
	}[idx]
}

const sum = (acc, curr) => acc + curr

const solve = (inputStr) => {
	return inputStr.split('').map(mirror).reverse().join('')
}

const mirror = char => {
	return {
		'(': ')',
		'[': ']',
		'{': '}',
		'<': '>',
	}[char]
}

const superScore = str => {
	let score = 0
	str.split('').forEach(x => {
		score = score * 5
		score += minorScore(x)
	})
	return score
}

/*
console.log('superscore', superScore('}}]])})]'))
console.log('superscore', superScore(')}>]})'))
console.log('superscore', superScore('}}>}>))))'))
console.log('superscore', superScore(']]}}]}]}>'))
console.log('superscore', superScore('])}>'))
*/

/*
console.log(findCorrupt('()'))
console.log(findCorrupt('({})'))
console.log(findCorrupt('({])'))
console.log(findCorrupt('({}>'))

console.log(findCorrupt('{([(<{}[<>[]}>{[]{[(<()>'))
console.log(findCorrupt('[[<[([]))<([[{}[[()]]]'))
console.log(findCorrupt('[{[{({}]{}}([{[{{{}}([]'))
console.log(findCorrupt('[<(<(<(<{}))><([]([]()'))
*/
//console.log(findCorrupt('<{({(([[<<([[([][])]{([]<>)([]<>)}]<[[[]{}]{()[]}]>)(<<[[]()][[]()]><[<>[]]<[]()>>>{<<<><>><<>[]>>[<[]<>><'))
//console.log(findCorrupt('[[([[{[[(([{[[<>()]{<>()}]({(){}}({}{}))}[<[<><>]([]())>(<[]()><{}[]>)]]{(<<<><>>[[]{}]>(<[][]>((){}))'))
// console.log(findCorrupt('[((<{((([[([[[>]])]]<{[<['))

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const lines = data.trim().split('\n')
	
	/*
	const lines = [
		'[({(<(())[]>[[{[]{<()<>>',
		'[(()[<>])]({[<{<<[]>>(',
		'{([(<{}[<>[]}>{[]{[(<()>',
		'(((({<>}<{<{<>}{[]{[]{}',
		'[[<[([]))<([[{}[[()]]]',
		'[{[{({}]{}}([{[{{{}}([]',
		'{<[[]]>}<{[{[{[]{()[[[]',
		'[<(<(<(<{}))><([]([]()',
		'<{([([[(<>()){}]>(<<{{',
		'<{([{{}}[<[[[<>{}]]]>[]]',
	]
	*/
	
	const validated = lines.map(findCorrupt)
	const incomplete = lines.filter(x => !findCorrupt(x)).map(removeChunks).map(solve).map(superScore).sort((a, b) => a < b ? 1 : -1)

	console.log(incomplete, incomplete.length, incomplete[Math.floor(incomplete.length/2)])
	
	/*
	const scored = validated.filter(x => x !== 'VALID').map(score)
	const sumAll = scored.filter(x=>x!==undefined).reduce(sum, 0)

	console.log('Lines', lines)
	console.log('Validated', validated)
	console.log('Score', scored)
	console.log('Sum', sumAll)
	*/
})