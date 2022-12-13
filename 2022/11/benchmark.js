const BigNumber = require('./big-number')

function isDivisibleBy(num) {
  return bn => BigNumber(bn).mod(num).toString() === '0'
}

function measure({ f, name }) {
	let timestamp = new Date()
	f()
	console.log('Operation', name, 'took', new Date().getTime() - timestamp.getTime(), 'ms')
}

measure({
	name: 'Add x10k',
	f: () => {
		for (let i = 0; i < 10000; i++) {
			const bn = BigNumber(1000).add(1000)
		}
	}
})

measure({
	name: 'multiply itself x12',
	f: () => {
		const bn = BigNumber(1000)
		for (let i = 0; i < 12; i++) {
			bn.multiply(bn)
		}
	}
})

measure({
	name: 'multiply itself x13',
	f: () => {
		const bn = BigNumber(1000)
		for (let i = 0; i < 13; i++) {
			bn.multiply(bn)
		}
	}
})

measure({
	name: 'multiply itself x14',
	f: () => {
		const bn = BigNumber(1000)
		for (let i = 0; i < 14; i++) {
			bn.multiply(bn)
		}
	}
})

const abstraction = {
	5: 0,
	11: 0,
	2: 0,
	13: 0,
	7: 0,
	3: 0,
	17: 0,
	19: 0,
	rest: 0
}