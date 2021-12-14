require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

	const polymerTemplate = data.split('\n\n')[0]

	const pairInsertionRules = data.split('\n\n')[1].split('\n').map(row => {
		const [pair, insertion] = row.split(' -> ')
		return { pair, insertion }
	})

	/*
	const pairInsertionRules = [
		{ pair: 'CH', insertion: 'B' }, 
		{ pair: 'HH', insertion: 'N' }, 
		{ pair: 'CB', insertion: 'H' }, 
		{ pair: 'NH', insertion: 'C' }, 
		{ pair: 'HB', insertion: 'C' }, 
		{ pair: 'HC', insertion: 'B' }, 
		{ pair: 'HN', insertion: 'C' }, 
		{ pair: 'NN', insertion: 'C' }, 
		{ pair: 'BH', insertion: 'H' }, 
		{ pair: 'NC', insertion: 'B' }, 
		{ pair: 'NB', insertion: 'B' }, 
		{ pair: 'BN', insertion: 'B' }, 
		{ pair: 'BB', insertion: 'N' }, 
		{ pair: 'BC', insertion: 'B' }, 
		{ pair: 'CC', insertion: 'N' }, 
		{ pair: 'CN', insertion: 'C' }, 
	]
	*/

	function findInsertList(template) {
		const insertList = []

		template.split('').forEach((char, index, list) => {
			const comparer = char + list[index+1]
			if (comparer.length === 2) {
				const match = pairInsertionRules.find(({ pair }) => pair === comparer)
				if (match) {
					insertList.push({ insertion: match.insertion, index: index + 1})
				}			
			}
		})

		return insertList
	}

	function append(polymer) {

		const spread = hydrate(polymer)
		const insertList = findInsertList(polymer)

		return spread.map(item => {
			if (typeof item === 'number') {
				const hasMapping = insertList.find(({ index }) => item === index)
				if (hasMapping) {
					return hasMapping.insertion
				}
			}
			return item
		}).filter(noNumbers).join('')
	}

	function noNumbers(item) {
		return typeof item !== 'number'
	}

	function hydrate(arr) {
		const hydrated = []
		arr.split('').forEach((char, index) => {
			hydrated.push(char)
			hydrated.push(index+1)
		})
		return hydrated
	}

	function common(str) {
		let countObj = {}
		str.split('').forEach(char => {
			if (countObj[char] === undefined) {
				countObj[char] = 1
			} else {
				countObj[char] += 1
			}
		})
		return Object.entries(countObj).sort((a, b) => a[1] < b[1] ? 1 : -1)
	}

	function mostCommon(str) {
		return common(str)[0]
	}

	function leastCommon(str) {
		return common(str).reverse()[0]
	}

	console.log('Polymer before algorithm', polymerTemplate)
	let str = polymerTemplate
	for (let i = 0; i < 10; i++) {
		str = append(str)
		console.log(`after ${i+1} iterations: ${str} - length ${str.length}`)

		if (i === 9) {
			const [, mostCommonQuantity] = mostCommon(str)
			const [, leastCommonQuantity] = leastCommon(str)
			console.log('Subtraction polymer result', mostCommonQuantity - leastCommonQuantity)
		}
	}
})