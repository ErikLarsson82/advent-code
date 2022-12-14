
const attempts = 20

const divisions = [2,3,5] //,7,11,13,17,19]

const operations = [
	{
		name: 'identity       ',
		base10: num => num,
		func: identity,
	},
	{
		name: 'add one        ',
		base10: num => num + 1,
		func: addOne,
	},
	{
		name: 'add 8          ',
		base10: num => num + 8,
		func: addEight
	},
	{
		name: 'multiply by 2  ',
		base10: num => num * 2,
		func: multiply(2)
	},
	{
		name: 'multiply by 3  ',
		base10: num => num * 3,
		func: multiply(3)
	},
	/*{
		name: 'multiply by 19 ',
		base10: num => num * 19,
		func: multiply(19)
	},
	{
		name: 'multiply self  ',
		base10: num => num * num,
		func: multiply()
	}*/
]

let ALL_OUTPUT = true

for (let i = 3; i < attempts; i++) {
	if (ALL_OUTPUT) {
		console.log()
	}
	divisions.forEach(division => {
		if (ALL_OUTPUT) {
			console.log()
		}
		operations.forEach(operation => {

			const base10result = operation.base10(i)
			const expectedResult = identity(division)(base10result)

			const attemptInputConvertedToCurrentDivision = identity(division)(i)
			const result = operation.func(division)(attemptInputConvertedToCurrentDivision)
			const correct = expectedResult === result

			if (ALL_OUTPUT) {
				console.log(`${i} ${operation.name} -> ${base10result} using division ${division} result= ${result} expected= ${expectedResult} ${correct ? 'correct' : 'incorrect'}`)
			}

			if (!correct) {
				//console.log(`${i} ${operation.name} -> ${base10result} using division ${division} result= ${result} expected= ${expectedResult} ${correct ? 'correct' : 'incorrect'}`)
				throw new Error('panic')
			}
			
		})
	})
}

function identity(div) {
	return num => num % div 
}

function addOne(div) {
	return num => identity(div)(num + 1)
}

function addEight(div) {
	return num => {
		let o 
		for (var i = 0; i < 8; i++) {
			num = num + 1
			o = identity(div)(num) 
		}
		return o
	}
}

function multiply(amount) {
	return div => {
		if (div === 2) {
			return num => {
				if (amount === undefined) {
					return num
				}
				if (amount === 2) {
					return 0
				}
				if (amount === 3) {
					return num
				}
				if (amount === 19) {
					return num // ???
				}
				console.log('div', div, 'amount', amount)
				throw new Error('Unsupported amount')
			}
		}
		if (div === 3) {
			return num => {
				if (amount === undefined) {
					if (num === 0) return 0
					if (num === 1) return 1
					if (num === 2) return 1
				}
				if (amount === 2) {
					if (num === 0) return 0
					if (num === 1) return 2
					if (num === 2) return 1
				}
				if (amount === 3) {
					return 0
				}
				if (amount === 19) {
					return num // ???
				}
				console.log('div', div, 'amount', amount)
				throw new Error('Unsupported amount')
			}
		}
		if (div === 5) {
			return num => {
				if (amount === 2) {
					if (num === 0) return 0
					if (num === 1) return 2
					if (num === 2) return 4
					if (num === 3) return 1
					if (num === 4) return 3
				}
				if (amount === 3) {
					if (num === 3) return 4
					if (num === 4) return 2
					return num
				}
				console.log('div', div, 'amount', amount)
				throw new Error('Unsupported amount')
			}
		}
		console.log('amount', amount, 'div', div)	
		throw new Error('Unsupported multiply division')
	}
}