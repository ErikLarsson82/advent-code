
function archive() {
  const list = []
  return x => {
    if (typeof x === "undefined")
      return list.length

    if (list.indexOf(x) === -1) {
      list.push(x)
      return -1
    }
    return list.length
  }
}



function traverse(hashTable, pipe, pipeArchive) {
  if (pipeArchive(pipe) === -1) {
    hashTable[pipe].forEach( x => {
      traverse( hashTable, x, pipeArchive )
    })
  }
}



function pipeCounter(str) {

  const pipeArchive = archive()

  const hashTable = createPipeHashTable(str)
  
  traverse(hashTable, 0, pipeArchive)

  return pipeArchive()
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



module.exports = { pipeCounter }
