
function archive() {
  const list = []
  return x => {
    if (typeof x === "undefined")
      return list

    if (list.indexOf(x) === -1) {
      list.push(x)
      return -1
    }
    return list
  }
}



function traverse(hashTable, pipe, pipeArchive) {
  if (pipeArchive(pipe) === -1) {
    hashTable[pipe].forEach( x => {
      traverse( hashTable, x, pipeArchive )
    })
  }
}


function foundInList(list, pipe) {
  let ret = -1
  list.forEach(x => {
    const arch = x()
    const result = arch.indexOf(parseInt(pipe))
    if (result !== -1)
      ret = result
  })
  return ret
}


function pipeCounter(str) {

  const pipeArchives = []
  const hashTable = createPipeHashTable(str)

  for (pipe in hashTable) {
    const search = foundInList(pipeArchives, pipe)
     if (search === -1) {
        const freshArchive = archive()
        traverse(hashTable, parseInt(pipe), freshArchive)
        pipeArchives.push(freshArchive)
     }
  }
  
  return pipeArchives
}



function createPipeHashTable(str) {
  const rows = str.trim().split("\n")

  const allowed = ["0","1","2","3","4","5","6","7","8","9",",","<"]
  const filteredRows = rows.map( x => x.split("").filter( x => allowed.indexOf(x) !== -1 ).join("").trim() )
  
  const hashTable = {}

  filteredRows.forEach( x => {
    const result = x.split("<")
    const key = parseInt(result[0])
    const pipes = result[1].split(",").map(x => parseInt(x))
    hashTable[key] = pipes
  })
  
  return hashTable
}



module.exports = { pipeCounter, foundInList, archive }
