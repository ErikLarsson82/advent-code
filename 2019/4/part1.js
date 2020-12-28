
function testDigits(digitsInt) {
	const adjacent = traverse((a,b) => a === b, digitsInt)
	const decreasing = traverse((a,b) => a > b, digitsInt)

	return adjacent && !decreasing
}

function traverse(compareFunction, digitsInt) {
	const digitsString = digitsInt.toString()
	let found = false
	for (var i = 0; i < digitsString.length; i++) {
		if (compareFunction(digitsString[i], digitsString[i+1])) {
			found = true
		}
	}
	return found
}

//console.log( testDigits(123) )
//console.log( adjacent(123456) )
//console.log( adjacent(113456) )
//console.log( adjacent(163556) )
//console.log( adjacent(163577) )
//console.log( adjacent(166677) )
//console.log( decrease(123456) )
//console.log( decrease(111222) )
//console.log( decrease(123454) )
//
//console.log('111111', testDigits(111111))
//console.log('223450', testDigits(223450))
//console.log('123789', testDigits(123789))

const numbersThatMeetCriteria = []
for (var j = 147981; j < 691423; j++) {
	if (testDigits(j)) {
		numbersThatMeetCriteria.push(j)
	}
}
console.log(numbersThatMeetCriteria)
console.log(numbersThatMeetCriteria.length)