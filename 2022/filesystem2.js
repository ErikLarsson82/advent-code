const dataA = []

let path = '/'


const dir = x => x.dir
const fileSize = x => x.fileSize
const sum = (acc, curr) => acc + curr
const slashes = x => x.split('').filter(x => x === '/').length

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

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  
  const d2 = `$ cd /
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

  data.split('$ ').filter(x => x !== '').map(x=>x.trim()).forEach(processInstruction)

  dataA.forEach(x => console.log(x))

  const totalSum = dataA.reduce(directories, []).map(dir).map(size).filter(x => x <= 100000).reduce(sum, 0)
  console.log(totalSum)
})

function processInstruction(instruction) {
  console.log('\nprocessing instruction', instruction)
  if (instruction.substring(0, 2) === 'cd') {
    if (instruction === 'cd /') {
      path = '/'
      console.log('path set to', path)  
      return
    }
    if (instruction === 'cd ..') {
      if (slashes(path) === 1) {
        path = '/'
        console.log('path set to', path)  
        return   
      }
      const parts = path.split('/')
      path = parts.slice(0, parts.length-1).join('/')
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
    console.log('instruction', instruction)
    console.log('files', files)
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
}

