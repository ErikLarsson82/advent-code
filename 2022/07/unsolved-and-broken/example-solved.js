const dataA = []

const dataB = [
	{
		name: 'a',
		content: [
			{
				name: 'c',
				fileSize: 456
			},
      {
        name: 'd',
        content: [
          {
            name: 'e',
            fileSize: 1
          },
        ]
      },
		]
	},
	{
		name: 'b',
		fileSize: 123
	},
]

let path = '/'

const instructions = `$ cd /
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
7214296 k`.split('$ ').filter(x => x !== '').map(x=>x.trim())

console.log('instructions', instructions)

instructions.forEach(instruction => {
  console.log('\nprocessing instruction', instruction)
  if (instruction.substring(0, 2) === 'cd') {
    if (instruction === 'cd /') {
      path = '/'
      console.log('path set to', path)  
      return
    }
    if (instruction === 'cd ..') {
      const parts = path.split('/')
      path = parts.slice(0, parts.length-2).join('/')
      console.log('path set to', path)  
      return
    }
    const [, target] = instruction.split(' ')
    path = path === '/' ? path + target : path + '/' + target
    console.log('path set to', path)
    return
  }
  if (instruction.substring(0, 2) === 'ls') {
    const files = instruction.split('\n').slice(1)
    files.forEach(file => {
      const [fileSize, name] = file.split(' ')
      if (file.substring(0, 3) === 'dir') {
        console.log('ignoring', file)
      } else {
        dataA.push({ name, fileSize: parseInt(fileSize), dir: path })
        console.log('adding file', file, 'to path', path)
      }
    })
  }
})

console.log('dataA', dataA)

const dir = x => x.dir
const fileSize = x => x.fileSize
const sum = (acc, curr) => acc + curr

function size(dir) {
  const files = dataA.filter(x => x.dir.substring(0, dir.length) === dir)
  return files.map(fileSize).reduce(sum, 0)
}

function directories(acc, curr, idx, list) {
  if (!acc.find(({ dir }) => dir === curr.dir)) {
    return acc.concat(curr)
  }
  return acc
}

const dirs = dataA.reduce(directories, []).map(dir).forEach(dir => {
  const parts = dir.split('/')
  const name = parts[parts.length-1]

  console.log('\nDirectory: ', name, ' Path: ', dir, ' Size: ', size(dir))
})
