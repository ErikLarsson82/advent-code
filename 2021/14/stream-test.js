const fs = require('fs')

const name = i => `./i-${i}.txt`

const pairInsertionRules = [
  { pair: 'HV', insertion: 'B' },
  { pair: 'KS', insertion: 'F' },
  { pair: 'NH', insertion: 'P' },
  { pair: 'OP', insertion: 'K' },
  { pair: 'OV', insertion: 'C' },
  { pair: 'HN', insertion: 'O' },
  { pair: 'FF', insertion: 'K' },
  { pair: 'CP', insertion: 'O' },
  { pair: 'NV', insertion: 'F' },
  { pair: 'VB', insertion: 'C' },
  { pair: 'KC', insertion: 'F' },
  { pair: 'CS', insertion: 'H' },
  { pair: 'VC', insertion: 'F' },
  { pair: 'HF', insertion: 'V' },
  { pair: 'NK', insertion: 'H' },
  { pair: 'CF', insertion: 'O' },
  { pair: 'HH', insertion: 'P' },
  { pair: 'FP', insertion: 'O' },
  { pair: 'OH', insertion: 'K' },
  { pair: 'NN', insertion: 'C' },
  { pair: 'VK', insertion: 'V' },
  { pair: 'FB', insertion: 'F' },
  { pair: 'VP', insertion: 'N' },
  { pair: 'FC', insertion: 'P' },
  { pair: 'SV', insertion: 'F' },
  { pair: 'NO', insertion: 'C' },
  { pair: 'VN', insertion: 'S' },
  { pair: 'CH', insertion: 'N' },
  { pair: 'FN', insertion: 'N' },
  { pair: 'FV', insertion: 'P' },
  { pair: 'CN', insertion: 'H' },
  { pair: 'PS', insertion: 'S' },
  { pair: 'VF', insertion: 'K' },
  { pair: 'BN', insertion: 'S' },
  { pair: 'FK', insertion: 'C' },
  { pair: 'BB', insertion: 'H' },
  { pair: 'VO', insertion: 'P' },
  { pair: 'KN', insertion: 'N' },
  { pair: 'ON', insertion: 'C' },
  { pair: 'BO', insertion: 'S' },
  { pair: 'VS', insertion: 'O' },
  { pair: 'PK', insertion: 'C' },
  { pair: 'SK', insertion: 'P' },
  { pair: 'KF', insertion: 'K' },
  { pair: 'CK', insertion: 'O' },
  { pair: 'PB', insertion: 'H' },
  { pair: 'PF', insertion: 'O' },
  { pair: 'KB', insertion: 'V' },
  { pair: 'CC', insertion: 'K' },
  { pair: 'OK', insertion: 'B' },
  { pair: 'CV', insertion: 'P' },
  { pair: 'PO', insertion: 'O' },
  { pair: 'SH', insertion: 'O' },
  { pair: 'NP', insertion: 'F' },
  { pair: 'CO', insertion: 'F' },
  { pair: 'SS', insertion: 'P' },
  { pair: 'FO', insertion: 'K' },
  { pair: 'NS', insertion: 'O' },
  { pair: 'PN', insertion: 'H' },
  { pair: 'PV', insertion: 'V' },
  { pair: 'KP', insertion: 'C' },
  { pair: 'BK', insertion: 'B' },
  { pair: 'BP', insertion: 'F' },
  { pair: 'NB', insertion: 'C' },
  { pair: 'OF', insertion: 'O' },
  { pair: 'OC', insertion: 'O' },
  { pair: 'HO', insertion: 'C' },
  { pair: 'SC', insertion: 'K' },
  { pair: 'HC', insertion: 'C' },
  { pair: 'HS', insertion: 'B' },
  { pair: 'KH', insertion: 'N' },
  { pair: 'FS', insertion: 'N' },
  { pair: 'PH', insertion: 'O' },
  { pair: 'PC', insertion: 'V' },
  { pair: 'BS', insertion: 'O' },
  { pair: 'KO', insertion: 'F' },
  { pair: 'SP', insertion: 'K' },
  { pair: 'OB', insertion: 'O' },
  { pair: 'SF', insertion: 'K' },
  { pair: 'KV', insertion: 'F' },
  { pair: 'NC', insertion: 'B' },
  { pair: 'SO', insertion: 'C' },
  { pair: 'CB', insertion: 'S' },
  { pair: 'VH', insertion: 'V' },
  { pair: 'FH', insertion: 'F' },
  { pair: 'SN', insertion: 'V' },
  { pair: 'SB', insertion: 'P' },
  { pair: 'PP', insertion: 'B' },
  { pair: 'BF', insertion: 'K' },
  { pair: 'HB', insertion: 'O' },
  { pair: 'OO', insertion: 'V' },
  { pair: 'HP', insertion: 'H' },
  { pair: 'KK', insertion: 'O' },
  { pair: 'BV', insertion: 'K' },
  { pair: 'BH', insertion: 'B' },
  { pair: 'HK', insertion: 'H' },
  { pair: 'BC', insertion: 'C' },
  { pair: 'VV', insertion: 'S' },
  { pair: 'OS', insertion: 'F' },
  { pair: 'NF', insertion: 'B' },
]

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

function run(iteration) {
	const readStream = fs.createReadStream(name(iteration))
	const writeStream = fs.createWriteStream(name(iteration+1))

	let lastChar = null

	readStream.on('data', data => {
		const convertedData = data.toString()		

		const polymer = lastChar !== null ? lastChar + convertedData : convertedData
		let largerPolymer = append(polymer)
		if (lastChar) {
			largerPolymer = largerPolymer.slice(1)
		}
		writeStream.write(largerPolymer)

		lastChar = largerPolymer[largerPolymer.length-1]
	})

	readStream.on('end', () => {
		writeStream.end()
		console.log('iteration', iteration, 'done')
		
		if (iteration < 40) {
			iteration++

			setTimeout(() => {
				run(iteration)
			}, 1000)
		}
	})
}

run(0)