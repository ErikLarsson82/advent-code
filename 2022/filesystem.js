
const filesystem = [
	{
		name: 'a',
		content: [
			{
				name: 'b',
				fileSize: '123'
			},
			{
				name: 'c',
				content: []
			}
		]
	}
]
let marker = '/'
let targetDirectory = filesystem

function addFolder(name) {

}

function notLast(acc, curr, list, idx) {
	if (idx < list.length) {
		return acc.concat(curr)
	}
	return acc
}

function findSubArrayFromMarker(mark) {
	let target = filesystem
	mark.split('/').forEach(m => {
		if (!m) return
		console.log('m', m)
		const folder = target.find(x => x.name === m)
		if (!folder) {
			throw new Error('Missing folder in', target, 'searching for', mark)
		}
		target = folder.content
	})
	marker = mark
	targetDirectory = target
}

function gotoParent() {
	const newTarget = marker.split('/').filter(x => !!x).reduce(notLast) // .join('/')
	console.log('up one', marker, newTarget, typeof newTarget)
	findSubArrayFromMarker()	
}

findSubArrayFromMarker('/a/c')

console.log('after command', marker, targetDirectory)

gotoParent()

console.log('after command', marker, targetDirectory)
