function count() {
	let counter = 0
	while (counter++ < 10000) {}
}

function reverse() {
	let list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	let counter = 0
	while (counter++ < 1000000)
		list.reverse()
}


function bitwise() {
	let start = 5678
	const other = 123
	let counter = 0
	while (counter++ < 100000001)
		start = ~start

	console.log(start)
}

console.time('count')

count()

console.timeEnd('count')


console.time('reverse')

reverse()

console.timeEnd('reverse')


console.time('bitwise')

bitwise()

console.timeEnd('bitwise')