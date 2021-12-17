
const totalAmount = {
	N: 2,
	C: 1,
	B: 1,
	H: 0,
}

// NNCB

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

function iterate(data) {
	const acc = []
	for (let _pair in data) {
		const amount = data[_pair]
		console.log('looking for', _pair)
		const { newChar } = template.find(({ pair }) => _pair === pair)
		if (totalAmount[newChar] === undefined) {
			totalAmount[newChar] = amount
		} else {
			totalAmount[newChar] = totalAmount[newChar] + amount
		}
		const mappedData = {
			[_pair[0] + newChar]: amount,
			[newChar + _pair[1]]: amount
		}
		acc.push(mappedData)
		/*
		if (pair === 'NN') {
			acc.push({
				NC: amount,
				CN: amount,
			})
		}*/
		// console.log(_pair, ' with amount ', amount, ' results in ', mappedData)
	}
	return acc
}

function merge(accs) {
	const sum = {}
	accs.forEach((obj) => {
		Object.entries(obj).forEach(entry => {
			const [key, value] = entry
			if (sum[key] === undefined) {
				sum[key] = value
			} else {
				sum[key] = sum[key] + value
			}
		})
	})
	return sum
}
// console.log(merge([ { NC: 1, CN: 1 }, { NC: 1, BC: 1 }, { BC: 1, NC: 1000 } ])) // -> { NC: 1002, BC: 2, CN: 1 }

let pairs = {
	NN: 1,
	NC: 1,
	CB: 1,
}

console.log('totalAmount before algorithm', totalAmount)
for (var i = 0; i < 10; i++) {
	const accs = iterate(pairs)
	pairs = merge(accs)
	console.log(`iteration ${i}`, pairs)
	console.log('totalAmount', totalAmount)
}

// console.log('amount', amount)
// console.log('pairs', pairs)
