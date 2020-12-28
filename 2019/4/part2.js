
function testDigits(digitsInt) {
	const digitsIntTripletsRemoved = removeTripletsOrMore(digitsInt)
	const adjacent = traverse((a,b) => a === b, digitsIntTripletsRemoved)
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

function removeTripletsOrMore(digitsInt) {
	let str = digitsInt.toString()
	
	for (var i = 0; i < 10; i++) {
		for (var j = 6; j >= 3; j--) {
			const comparee = new Array(j).fill(i.toString()).join("")
			str = str.replace(comparee, "")
		}
	}
	return str
}

console.log('112233', testDigits(112233) === true)
console.log('123455', testDigits(123455) === true)
console.log('123444', testDigits(123444) === false)
console.log('124444', testDigits(124444) === false)
console.log('144444', testDigits(144444) === false)
console.log('111122', testDigits(111122) === true)

console.log("", removeTripletsOrMore(111111) === "")
console.log("123", removeTripletsOrMore(123444) === "123")
console.log("12", removeTripletsOrMore(124444) === "12")
console.log("1", removeTripletsOrMore(144444) === "1")

const numbersThatMeetCriteria = []
for (var j = 147981; j < 691423; j++) {
	if (testDigits(j)) {
		numbersThatMeetCriteria.push(j)
	}
}
console.log(numbersThatMeetCriteria)
console.log(numbersThatMeetCriteria.length)