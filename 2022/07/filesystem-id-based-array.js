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

const filesystem = []

let pathId = null

const pad = d => new Array(d).fill().map(() => '-').join('')

function traverse(fs, id) {
  if (id === null) return filesystem
  let result
  fs.forEach(item => {
    if (item.id === id) {
      result = item
    } else if (item.content) {
      const resultPrime = traverse(item.content, id)      
      if (resultPrime) {
        result = resultPrime
      }
    }
  })
  return result
}

function printAll(fs, depth) {
  let printStr = ''
  fs.forEach((item, idx) => {
    if (item.content) {
      console.log(pad(depth) + ' ' + item.name)
      printAll(item.content, depth+2)
    } else {
      const isLast = !(idx < fs.length - 1)
      printStr += pad(depth) + ' ' + item.name + ' - ' + item.fileSize + (isLast ? '' : '\n')
    }
  })
  if (printStr === '') {
    printStr = '[empty]'
  }
  console.log(printStr)
}

function addFolder(name) {
  const path = traverse(filesystem, pathId)
  path.content.push({
    name,
    id: generateUUID(),
    content: []
  })
}

function addFile(str) {
  const path = traverse(filesystem, pathId)
  const [fileSize, name] = str.split(' ')
  path.content.push({
    name,
    id: generateUUID(),
    fileSize
  })
}

function handleLs(str) {
  const [a, b] = str.split(' ')
	if (a === 'dir') {
    addFolder(b)
    return
  }
  addFile(str)
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// printAll(filesystem, 0)

handleLs('dir a')
handleLs('14848514 b.txt')
handleLs('8504156 c.dat')
handleLs('dir b')
handleLs('123 c.txt')
handleLs('567 d.dat')

printAll(filesystem, 0)