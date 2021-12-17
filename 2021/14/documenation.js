/*
HBHVVNPCNFPSVKBPPCBH
HOBBHBVSVSNFPVCHNBFOPSSFVVKVBFPBPVCSBBH

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
*/

/*
'NCN'
{
	NC: 1, -> NBC -> 'NB', 'BC'
	CN: 1, -> CCN -> 'CC', 'CN'
}
'NBCCN'
{
	NB: 1, -> NBB -> 'NB', 'BB'
	BC: 1, -> BBC -> 'BB', 'BC'
	CC: 1, -> CNC -> 'CN', 'NC'
	CN: 1  -> CCN -> 'CC', 'CN'
}
''
{
	NB: 1,
	BB: 2,
	BC: 1,
	CN: 2,
	NC: 1,
	CC: 1
}

NNCB

NN 1 -> NCN -> NC, CN
NC 1 -> NBC -> NB, BC
CB 1 -> CHB -> CH, HB

NCNBCHB
NC 1
CN 1
NB 1
BC 1
CH 1
HB 1
*/

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

/*
const ex = {
	NB: 1,
	BB: 2,
	BC: 1,
	CN: 2,
	NC: 1,
	CC: 1
}
*/

const amount = {
	N: 2,
	C: 1,
	B: 1,
	H: 0,
}

// NNCB
const pairs = {
	NN: 1,
	NC: 1,
	CB: 1,
	CN: 0
}

const template = [
	{ pair: 'CH', newChar: 'B' },
	{ pair: 'HH', newChar: 'N' },
	{ pair: 'CB', newChar: 'H' },
	{ pair: 'NH', newChar: 'C' },
	{ pair: 'HB', newChar: 'C' },
	{ pair: 'HC', newChar: 'B' },
	{ pair: 'HN', newChar: 'C' },
	{ pair: 'NN', newChar: 'C' },
	{ pair: 'BH', newChar: 'H' },
	{ pair: 'NC', newChar: 'B' },
	{ pair: 'NB', newChar: 'B' },
	{ pair: 'BN', newChar: 'B' },
	{ pair: 'BB', newChar: 'N' },
	{ pair: 'BC', newChar: 'B' },
	{ pair: 'CC', newChar: 'N' },
	{ pair: 'CN', newChar: 'C' },
]

function iterate() {
	
}

iterate()

console.log('amount', amount)
console.log('pairs', pairs)

/*
function countFromPairs(obj) {
	let count = {}
	for (let pair in obj) {
		if (count[pair[0]] === undefined) {
			count[pair[0]] = obj[pair]
		} else {
			count[pair[0]] = count[pair[0]] + obj[pair]
		}		
	}
	return count
}

console.log('count', countFromPairs(ex))
console.log(common('HBHVVNPCNFPSVKBPPCBH'))
console.log(common('HOBBHBVSVSNFPVCHNBFOPSSFVVKVBFPBPVCSBBH'))
*/