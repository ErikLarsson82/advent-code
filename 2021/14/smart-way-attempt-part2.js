
const totalAmount = {
	H: 3,
	B: 3,
	V: 3,
	N: 2,
	F: 1,
	P: 4,
	S: 1,
	K: 1,
	C: 2,
}

const template = [
	{ pair: 'HV', newChar: 'B' },
	{ pair: 'KS', newChar: 'F' },
	{ pair: 'NH', newChar: 'P' },
	{ pair: 'OP', newChar: 'K' },
	{ pair: 'OV', newChar: 'C' },
	{ pair: 'HN', newChar: 'O' },
	{ pair: 'FF', newChar: 'K' },
	{ pair: 'CP', newChar: 'O' },
	{ pair: 'NV', newChar: 'F' },
	{ pair: 'VB', newChar: 'C' },
	{ pair: 'KC', newChar: 'F' },
	{ pair: 'CS', newChar: 'H' },
	{ pair: 'VC', newChar: 'F' },
	{ pair: 'HF', newChar: 'V' },
	{ pair: 'NK', newChar: 'H' },
	{ pair: 'CF', newChar: 'O' },
	{ pair: 'HH', newChar: 'P' },
	{ pair: 'FP', newChar: 'O' },
	{ pair: 'OH', newChar: 'K' },
	{ pair: 'NN', newChar: 'C' },
	{ pair: 'VK', newChar: 'V' },
	{ pair: 'FB', newChar: 'F' },
	{ pair: 'VP', newChar: 'N' },
	{ pair: 'FC', newChar: 'P' },
	{ pair: 'SV', newChar: 'F' },
	{ pair: 'NO', newChar: 'C' },
	{ pair: 'VN', newChar: 'S' },
	{ pair: 'CH', newChar: 'N' },
	{ pair: 'FN', newChar: 'N' },
	{ pair: 'FV', newChar: 'P' },
	{ pair: 'CN', newChar: 'H' },
	{ pair: 'PS', newChar: 'S' },
	{ pair: 'VF', newChar: 'K' },
	{ pair: 'BN', newChar: 'S' },
	{ pair: 'FK', newChar: 'C' },
	{ pair: 'BB', newChar: 'H' },
	{ pair: 'VO', newChar: 'P' },
	{ pair: 'KN', newChar: 'N' },
	{ pair: 'ON', newChar: 'C' },
	{ pair: 'BO', newChar: 'S' },
	{ pair: 'VS', newChar: 'O' },
	{ pair: 'PK', newChar: 'C' },
	{ pair: 'SK', newChar: 'P' },
	{ pair: 'KF', newChar: 'K' },
	{ pair: 'CK', newChar: 'O' },
	{ pair: 'PB', newChar: 'H' },
	{ pair: 'PF', newChar: 'O' },
	{ pair: 'KB', newChar: 'V' },
	{ pair: 'CC', newChar: 'K' },
	{ pair: 'OK', newChar: 'B' },
	{ pair: 'CV', newChar: 'P' },
	{ pair: 'PO', newChar: 'O' },
	{ pair: 'SH', newChar: 'O' },
	{ pair: 'NP', newChar: 'F' },
	{ pair: 'CO', newChar: 'F' },
	{ pair: 'SS', newChar: 'P' },
	{ pair: 'FO', newChar: 'K' },
	{ pair: 'NS', newChar: 'O' },
	{ pair: 'PN', newChar: 'H' },
	{ pair: 'PV', newChar: 'V' },
	{ pair: 'KP', newChar: 'C' },
	{ pair: 'BK', newChar: 'B' },
	{ pair: 'BP', newChar: 'F' },
	{ pair: 'NB', newChar: 'C' },
	{ pair: 'OF', newChar: 'O' },
	{ pair: 'OC', newChar: 'O' },
	{ pair: 'HO', newChar: 'C' },
	{ pair: 'SC', newChar: 'K' },
	{ pair: 'HC', newChar: 'C' },
	{ pair: 'HS', newChar: 'B' },
	{ pair: 'KH', newChar: 'N' },
	{ pair: 'FS', newChar: 'N' },
	{ pair: 'PH', newChar: 'O' },
	{ pair: 'PC', newChar: 'V' },
	{ pair: 'BS', newChar: 'O' },
	{ pair: 'KO', newChar: 'F' },
	{ pair: 'SP', newChar: 'K' },
	{ pair: 'OB', newChar: 'O' },
	{ pair: 'SF', newChar: 'K' },
	{ pair: 'KV', newChar: 'F' },
	{ pair: 'NC', newChar: 'B' },
	{ pair: 'SO', newChar: 'C' },
	{ pair: 'CB', newChar: 'S' },
	{ pair: 'VH', newChar: 'V' },
	{ pair: 'FH', newChar: 'F' },
	{ pair: 'SN', newChar: 'V' },
	{ pair: 'SB', newChar: 'P' },
	{ pair: 'PP', newChar: 'B' },
	{ pair: 'BF', newChar: 'K' },
	{ pair: 'HB', newChar: 'O' },
	{ pair: 'OO', newChar: 'V' },
	{ pair: 'HP', newChar: 'H' },
	{ pair: 'KK', newChar: 'O' },
	{ pair: 'BV', newChar: 'K' },
	{ pair: 'BH', newChar: 'B' },
	{ pair: 'HK', newChar: 'H' },
	{ pair: 'BC', newChar: 'C' },
	{ pair: 'VV', newChar: 'S' },
	{ pair: 'OS', newChar: 'F' },
	{ pair: 'NF', newChar: 'B' },
]

function iterate(data) {
	const acc = []
	for (let _pair in data) {
		const amount = data[_pair]
		// console.log('looking for', _pair)
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
	HB: 1,
	BH: 2,
	HV: 1,
	VV: 1,
	VN: 1,
	NP: 1,
	PC: 2,
	CN: 1,
	NF: 1,
	FP: 1,
	PS: 1,
	SV: 1,
	VK: 1,
	KB: 1,
	BP: 1,
	PP: 1,
	CB: 1,
}
// HBHVVNPCNFPSVKBPPCBH

const before = new Date().getTime()

//console.log('totalAmount before algorithm', totalAmount)
for (var i = 0; i < 40; i++) {
	const accs = iterate(pairs)
	pairs = merge(accs)
	//console.log(`iteration ${i}`, pairs)
	//console.log('totalAmount', totalAmount)
}

console.log('day 14 part 2 total calculation time', new Date().getTime() - before, 'ms')
console.log('totalAmount', totalAmount)

// console.log('amount', amount)
// console.log('pairs', pairs)
