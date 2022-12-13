
/*
let number = {
	base: 64,
	multipliedByItSelf: 1,
	rest: 15
}

function isDivisibleByTwo({ base, multipliedByItSelf, rest }) {

}

function multipyByItself({ base, multipliedByItSelf, rest }) {
	const mRest = rest * rest
	const spillover = mRest % base
	return {
		base,
		multipliedByItSelf: multipliedByItSelf + 1,
		rest: spillover
	}
}
*/

/*
const number = {
	2: 2,
	3: 0,
	5: 0,
	7: 0,
	11: 0,
	13: 0,
	17: 0,
	19: 0,
	rest: 0,
}
*/

let abst = {
	2: {
		value: { isEven: false, rest: 1 },
		funcs: {
			addOne: addOneDiv2,
			multiplyByTwo: multiplyByTwoDiv2,
			multiplyByItself: multiplyByItselfDiv2,
		},
		print: ({ isEven, rest }) => `isEven=${isEven} rest=${rest}`,
		checkA: isEven,
		checkB: isEvenPrimeDiv2
	},
	3: {
		value: { isDivisibleByThree: false, rest: 1 },
		funcs: {
			addOne: addOneDiv3,
			multiplyByTwo: multiplyByTwoDiv3,
			multiplyByItself: multiplyByItselfDiv3,			
		},
		print: ({ isDivisibleByThree, rest }) => `isDivisibleByThree=${isDivisibleByThree} rest=${rest}`,
		checkA: isDivisibleByThree,
		checkB: isEvenPrimeDiv3,
	},
}

function addOneDiv2({ isEven, rest }) {
	if (rest === 0 && isEven) {
		return {
			isEven: false,
			rest: 1
		}
	}
	return {
		isEven: true,
		rest: 0
	}
}

function addOneDiv3({ isDivisibleByThree, rest }) {
	if (rest < 2) {
		return {
			isDivisibleByThree: false,
			rest: rest + 1
		}
	}
	if (rest === 3) {
		return {
			isDivisibleByThree: true,
			rest: 0
		}
	}
	return {
		isDivisibleByThree: true,
		rest: 0
	}
}

let blaj = { isDivisibleByThree: false, rest: 1}

for (let j = 1; j < 10; j++) {
	console.log('log', j, blaj)
	blaj = addOneDiv3(blaj)
}

function multiplyByTwoDiv3({ isDivisibleByThree, rest }) {
	if (rest === 0) {
		return { isDivisibleByThree, rest }
	}
	if (rest === 1) {
		return {
			isDivisibleByThree: true,
			rest: 2
		}
	}
	return {
			isDivisibleByThree: true,
			rest: 1
		}
}

function multiplyByTwoDiv2({ isEven, rest }) {
	if (rest === 1) {
		return {
			isEven: true,
			rest: 0
		}
	}
	return { isEven, rest }
}

function multiplyByItselfDiv3({ isDivisibleByThree, rest }) {
	return { isDivisibleByThree, rest }
}

function multiplyByItselfDiv2({ isEven, rest }) {
	return { isEven, rest }
}

function isEven(n) {
	return (n / 2).toFixed(0) === (n / 2).toString()
}

function isEvenPrimeDiv2({ isEven, rest }) {
	return isEven && rest === 0
}

function isDivisibleByThree(n) {
	return (n / 3).toFixed(0) === (n / 3).toString()
}

function isEvenPrimeDiv3({ isDivisibleByThree, rest }) {
	return isDivisibleByThree && rest === 0
}

let facit = 1

for (let i = 0; i < 100; i++) {
	if (facit * facit > 11802262734080) {
		console.log('Stopping because', facit, 'is too large')
		break;
	}
	let same = []
	if (Math.random() < 0.3) {
		facit += 1
		for (let d in abst) {
			abst[d].value = abst[d].funcs.addOne(abst[d].value)
			same.push((abst[d].checkA(facit) === true && abst[d].checkB(abst[d].value) === true) || (abst[d].checkA(facit) === false && abst[d].checkB(abst[d].value) === false))
		}
		console.log('added one                ',same[0] ? 'correct' : 'incorrect',same[1] ? 'correct' : 'incorrect','facit is', facit, 'and abst is', abst[2].print(abst[2].value), abst[3].print(abst[3].value))
	} else if (Math.random() < 0.6) {
		facit = facit * 2
		for (let d in abst) {
			abst[d].value = abst[d].funcs.multiplyByTwo(abst[d].value)			
			same.push((abst[d].checkA(facit) === true && abst[d].checkB(abst[d].value) === true) || (abst[d].checkA(facit) === false && abst[d].checkB(abst[d].value) === false))
		}
		console.log('multiplied by 2          ',same[0] ? 'correct' : 'incorrect',same[1] ? 'correct' : 'incorrect','facit is', facit, 'and abst is', abst[2].print(abst[2].value), abst[3].print(abst[3].value))
	} else {
		facit = facit * facit
		for (let d in abst) {
			abst[d].value = abst[d].funcs.multiplyByItself(abst[d].value)			
			same.push((abst[d].checkA(facit) === true && abst[d].checkB(abst[d].value) === true) || (abst[d].checkA(facit) === false && abst[d].checkB(abst[d].value) === false))
		}
		console.log('multiplied by itself     ',same[0] ? 'correct' : 'incorrect',same[1] ? 'correct' : 'incorrect','facit is', facit, 'and abst is', abst[2].print(abst[2].value), abst[3].print(abst[3].value))
	}
}