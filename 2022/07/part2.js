
const TOTAL_DISK_SPACE_AVAILABLE = 70000000
const UNUSED_SPACE_REQUIREMENT = 30000000

let path = ['/']
const folderSizes = {}
// exampleInput.split('\n').map(process)

function folderCommand(str) {
	const [,,folder] = str.split(' ')
	// console.log('traversing folder', str, folder)
	if (folder === '..') {
		path = path.slice(0, path.length-1)
		// console.log('path after .. is now', path)
		return
	}
	path = path.concat(folder)
	// console.log('path after into is now', path)
}

function addDirectory(str) {
	// console.log('add directory', str)
}

function addFile(str) {
	console.log('add file', str, path)
	const [size, name] = str.split(' ')
	const s = parseInt(size)
	if (isNaN(s) || s === undefined) {
		console.log('str', str, 'yields NaN')
		throw new Error()
	}
	incrementFileSize(s)
}

function format(list, idx) {
	return '/' + list.slice(1, idx+1).join('/')
}

function filter() {
	let newObj = {}
	for (let i in folderSizes) {
		if (folderSizes[i] <= 100000) {
			newObj[i] = folderSizes[i]
		}
	}
	return newObj
}

function largestFolder() {
	let size = 0
	for (let i in folderSizes) {
		if (folderSizes[i] > size) {
			size = folderSizes[i]
		}
	}
	return size
}

function sum(obj) {
	let s = 0
	for (let i in obj) {
		s += obj[i]
	}
	return s
}

function findSmallestButNotLessThan(threshold) {
	let smallest = Infinity
	for (let i in folderSizes) {
		console.log('is this smaller', folderSizes[i])
		if (folderSizes[i] < smallest && folderSizes[i] > threshold) {
			console.log('yes')
			smallest = folderSizes[i]
		}
	}
	return smallest
}

/*
console.log('/', format(['/', 'a'], 0))
console.log('/a', format(['/', 'a'], 1))
console.log('/', format(['/', 'a', 'e'], 0))
console.log('/a', format(['/', 'a', 'e'], 1))
console.log('/a/e', format(['/', 'a', 'e'], 2))
*/

function incrementFileSize(num) {
	if (num === undefined) {
		throw new Error('calling incrementFileSize with undefined', num)
	}
	// console.log('add file size to recursive paths', path, num)
	console.log('file with size', num, 'is added to all paths in', path)
	path.forEach((p, idx, list) => {
		const target = format(list, idx)
		console.log('increment', target)
		if (!folderSizes[target]) {
			folderSizes[target] = num
		} else {
			folderSizes[target] += num
		}	
	})
	
	// console.log('folderSizes after insertion', folderSizes)
}
	

function process(str) {
	if (str === '$ cd /') return;
	if (str === '$ ls') return;
	if (str.substring(0, 4) === '$ cd') {
		folderCommand(str)
		return
	}
	const [a, b] = str.split(' ')
	if (a === 'dir') {
		addDirectory(str)
		return
	} else {
		addFile(str)
		return
	}
	
	throw new Error('unknown command', str)
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	data.trim().split('\n').map(process)

	console.log('folderSizes', folderSizes)
	console.log('disk space available in total', TOTAL_DISK_SPACE_AVAILABLE)
	console.log('unused space requirement', UNUSED_SPACE_REQUIREMENT)

	const largest = largestFolder()
	const unusedSpaceBeforeOperation = TOTAL_DISK_SPACE_AVAILABLE - largest

	console.log('largest folder occupies this much space', largest)
	console.log('unused space before operation', unusedSpaceBeforeOperation)

	const spaceToFree = UNUSED_SPACE_REQUIREMENT - unusedSpaceBeforeOperation

	console.log('therefore this is the amount i need to free up', spaceToFree)

	console.log('part2 ', findSmallestButNotLessThan(spaceToFree))
  
})