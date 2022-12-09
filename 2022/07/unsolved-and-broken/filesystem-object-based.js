
const exampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const filesystem = {}
let path = '/'

/*
const filesystem = {
	'/': {
		'b.txt': 123,
		'a': {
			'c.txt': 456,
		}
	}
}
*/

function process(str) {
	console.log('process', str)
	const [command, ...rest] = str.trim().split('\n')
	if (command === 'ls') {
		rest.forEach(x => {
			const [dir, directoryName] = x.split(' ')
			if (dir === 'dir') {
				filesystem[directoryName] = {}
				return
			}
			const [fileSize, fileName] = x.split(' ')
			filesystem[fileName] = parseInt(fileSize)
		})
	}
	const [commandPrime, directoryName] = str.trim().split(' ')
	if (commandPrime === 'cd') {
		
	}
}

const isFile = x => typeof x === 'number'
const isFolder = x => !isFile(x)
const pad = d => new Array(d).fill().map(() => '-').join('')
const something = x => !!x

function printAll(filesystem, depth) {
	for (let file in filesystem) {		
		const value = filesystem[file]
		if (isFolder(value)) {
			console.log(pad(depth) + ' ' + file)
			printAll(value, depth+2)
		}
		if (isFile(value)) {
			console.log(pad(depth) + ' ' + file + ' - ' + value)
		}		
	}
}

exampleInput.trim().split('$ ').filter(something).map(process)

printAll(filesystem, 0)