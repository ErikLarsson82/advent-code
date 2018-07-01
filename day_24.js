
const ports = [
  "0/2",
  "2/2",
  "2/3",/*
  "3/4",
  "3/5",
  "0/1",
  "10/1",
  "9/10"*/
]

//const possibleBridges = []

const findConnection = strength => ports.find(x => (split(x)[0] === strength || split(x)[1] === strength))

const isPortBridgable = (portA, portB) => split(portA)[0] === split(portB)[0] || 
                                      split(portA)[0] === split(portB)[1] ||
                                      split(portA)[1] === split(portB)[0] ||
                                      split(portA)[1] === split(portB)[1]

const isConnectionBridgable = (portA, side) => {
    const o = split(portA)[0] === side || split(portA)[1] === side
    console.log('is port ', portA, ' connectable to side ', side, ' :', o)
    return o
  }



const split = x => x.split("/") //.map(y => parseInt(y))

/*const exhaust = (port, connection) => {
  let found = false
  return split(port).filter(x => {
    if (!found && x !== connection) {
      found = true
      return true
    }
    return false
  }).join("/")
}*/
const exhaust = (port, connection) => {
  const s = port.split("/")
  if (s[0] === connection) {
    return s[1] || ""
  }
  if (s[1] && s[1] === connection) {
    return s[0] || "" 
  }
  return s.join("/")
}

const stringifyPath = path => path.join("--")

const hasPort = (port, path) => path.find(x => x === port) !== undefined

const samePath = (pathA, pathB) => stringifyPath(pathA) === stringifyPath(pathB)
const compare = (setA, setB) => JSON.stringify(setA) === JSON.stringify(setB)

//const addBridge = bridge => possibleBridges.find(x => x.join("--") === bridge.join("--")) === undefined && possibleBridges.push(bridge)

/*const findAllBridges = path => {
  //const connection = findConnection(0)
  //path.push(connection)
  addBridge(path[path.length-1])

  //path.push(findConnection(connection[1])

  const connection = split(path[path.length-1])
  const filtered = ports.filter(x => split(x)[0] === connection[1] || split(x)[1] === connection[1])
  
  console.log('i found ', filtered)

  return filtered.map(x => path.concat(findAllBridges(x)))
  /*let counter = 0
  while (counter < 20) {
    counter++

  }
}*/

//findAllBridges([0])

/*let counter = 0

const completeBridge = (paths, currentNode) => {
  counter++
  if (counter > 10) return
  console.log('completeBridge called with', paths, currentNode)
  const filtered = ports.filter(x => {
    return (split(x)[0] === split(currentNode)[0] || split(x)[1] === split(currentNode)[1]) &&
      paths.find(y => y.find(z => z === x)) === undefined
  })
  console.log('filtered', filtered)
  const pathsIncludingMe = paths.concat([filtered])
  console.log('pathsIncludingMe', pathsIncludingMe)

  const additions = filtered.map(x => {
    const s = split(x)
    return [completeBridge(pathsIncludingMe, parseInt(x[0])), completeBridge(pathsIncludingMe, parseInt(x[1]))] 
  })
  console.log('additions', additions)

  return pathsIncludingMe.concat(additions)

}

console.log(completeBridge([["0/2"]], "0/2"))*/

/*
const buildBridge = (paths, target) => {
  const splitTarget = split(target)
  console.log('splitTarget', splitTarget)
  //const one = ports.filter(x => isPortBridgable(target, x))
  const two = ports.filter(x => isConnectionBridgable(target, split(x)[0]))
  
  const morePaths = two.map(x => {
    return buildBridge
  })

  const three = ports.filter(x => isConnectionBridgable(target, split(x)[1]))
  
  console.log(one, two, three)
}*/

//buildBridge([], "0/2")

/*
console.log(exhaust("2", "2") === "")
console.log(exhaust("2", "3") === "2")
console.log(exhaust("2/3", "2") === "3")
console.log(exhaust("2/3", "3") === "2")
console.log(exhaust("2/2", "2") === "2")
console.log(exhaust("4/5", "2") === "4/5")
*/
/*
let counter = 0

const newBridge = (paths, currentPath, currentNode, currentPort) => {
  counter++
  if (counter > 5) return
  console.log('newBridge called with', paths, currentPath, currentNode, currentPort)
  //if (currentPort === "2") return

  const remainingConnection = exhaust(currentNode, currentPort)
  if (!paths.find(x => samePath(currentPath, x))) {
    currentPath = currentPath.concat(currentNode)
    paths.push(currentPath)
    console.log('new currentPath', currentPath)
  }
  
  const filtered = ports.filter(x => split(x)[0] === remainingConnection || split(x)[1] === remainingConnection)
    .filter(x => {
      const o = currentPath.find(y => x === y)
      console.log('looking for ', x, ' in ', currentPath, ' o is ', o)
      return o === undefined
    })
    
  console.log('currentPath', currentPath)
  console.log('filtered', filtered)

  paths = paths.concat(filtered.map(x => currentPath.concat(x)))

  console.log('paths here is ', paths)

  const filteredExhausted = filtered.map(x => exhaust(x, remainingConnection))
  console.log('filteredExhausted', filteredExhausted)

  return filteredExhausted.map((x, idx) => {
    console.log('imma call newBridge', x, idx)
    return newBridge(paths, currentPath.concat(filtered[idx]), filtered[idx], x)
  })

  //
}

newBridge([], [], "0/2", "0")*/
/*
const leafBridger = (foundPaths, currentSide) => {

  const testPaths = foundPaths.map(path => {
    console.log('try my luck with', path)
    //Can i find something that is not already included?
    const findings = ports.filter(port => {
      const a = isConnectionBridgable(port, currentSide)
      const b = hasPort(port, path)
      const c = foundPaths.find(x => samePath(x, path.concat(port)))
      console.log('is port', port, ' a: ', a, ' b:', b, ' c:', c)
      return a && !b && c === undefined
    })
    console.log('i found these', findings)
  })
  console.log('testPaths', testPaths)
}*/

/*
const traverser = (paths, side) => {
  console.log('traverser called with', paths, side)
  const filtered = ports.filter(port => {
    console.log('\nfilter check against', port)
    const findIt = paths.find(path => path.find(_port => _port === port))
    console.log('findIt', findIt)
    const bridgable = isConnectionBridgable(port, side)
    console.log('bridgable', bridgable)
    return !findIt && bridgable
  })

  console.log('filtered', filtered)
  return filtered
}

const input = [
  ["0/2"],
  ["0/2", "2/2"],
  ["0/2", "2/3"],
]
const expected = [
  ["0/2"],
  ["0/2", "2/2"],
  ["0/2", "2/2", "2/3"],
  ["0/2", "2/3"],
]
//console.log('0: ', traverser([["0/2"]], "0")) 
//console.log('2: ', traverser([["0/2"]], "2")) 
console.log(traverser(input, "2")) */

/*
//This works
const data = {
  a: ["b", "d"],
  b: ["c"],
  c: [],
  d: [],
}

const traverse = (paths, connection) => {
  if (data[connection].length === 0)
    return connection
  return data[connection].map(x => connection + "-" + traverse(paths.concat(x), x))
}

console.log(traverse([], "a"))
*/

/*
//This works too
const data = [
  "ab",
  "bc",
  "bd",
  "dx"
]

let count = 0
const traverse = (paths, connection) => {
  console.log('\n\ntraverse -->')
  console.log('connection', connection)
  console.log('paths', paths)
  const tail = paths[paths.length -1 ]
  count++
  if (count > 15) return []
  
  let nPaths = paths
  data.filter(port => port.split("")[0] === connection || port.split("")[1] === connection)
    .filter(port => !paths.find(x => x.find(y => y === port)))
    .forEach(port => {
      const nTail = tail.concat(port)
      nPaths = nPaths.concat([nTail])
      console.log('\nPort: ', port)
      console.log('nPaths', nPaths)
      console.log('branch status 0: ', connection !== port.split("")[0])
      console.log('branch status 1: ', connection !== port.split("")[1])
      const branchA = connection !== port.split("")[0] && traverse(nPaths, port.split("")[0])
      const branchB = connection !== port.split("")[1] && traverse(nPaths, port.split("")[1])
      console.log('branchA', branchA)
      console.log('branchB', branchB)
      //return branchA && paths.concat(branchA) || branchB && paths.concat(branchB) || []//paths.concat(nPaths)
    })

  //console.log('after branch search', o, '\n<---')
  //if (o.length === 0) return nPaths

  return nPaths
}

console.log(traverse([["ab"]], "b"))
*/


//Converting to new scheme
/*const data = [
  "0/2",
  "2/2",
  "2/3"
]*/

/*
// Denna är NÄRA men jag kan inte göra filterlösningen eftersom den inte tar höjd för varje branch
const data = [
  "0/2",
  "2/2",
  "2/3",
  "3/4",
  "3/5",
  "0/1",
  "10/1",
  "9/10"
]

let counter = 0
const traverse = (paths, connection) => {
  counter++
  if (counter > 4) return
  console.log('\n\ntraverse -->')
  console.log('connection', connection)
  console.log('paths', paths)
  const tail = paths[paths.length - 1]
  
  let nPaths = paths
  data.filter(port => port.split("/")[0] === connection || port.split("/")[1] === connection)
    .filter(port => tail[tail.length - 1] !== port)
    .filter(port => {
      const foundIlleagal = nPaths.find(x => {
        if (x.length === 0) return false
        const o2 = x.find(y => y === port)
        const o3 = samePath(tail.concat(port), x)
        console.log('is ', tail.concat(port), ' included in', nPaths, ' o2:', o2, ' o3:', o3)
        return o2 !== undefined && !o3
      })
      console.log('rejection status for port', port, ' :', !foundIlleagal)
      return !foundIlleagal
    })
    .forEach((port, idx, list) => {
      const nTail = tail.concat(port)
      nPaths = nPaths.concat([nTail])
      console.log('\nPort: ', port)
      if (port === "2/3") {
        console.log('----------------------------------- 2/3 is here --------------------', list)
      }
      console.log('nPaths', nPaths)
      const sameInNOut = port.split("/")[0] === port.split("/")[1]
      console.log('branch status 0: ', connection !== port.split("/")[0])
      console.log('branch status 1: ', connection !== port.split("/")[1])
      console.log('sameInNOut: ', sameInNOut)
      if (!sameInNOut) {
        const a = connection !== port.split("/")[0] && traverse(nPaths, port.split("/")[0])
        console.log('a', a)
        nPaths = a || nPaths
        const b = connection !== port.split("/")[1] && traverse(nPaths, port.split("/")[1])
        console.log('b', b)
        nPaths = b || nPaths
      } else {
        nPaths = traverse(nPaths, connection)
      }

    })

  return nPaths
}

console.log(traverse([[]], "0"))
*/

/*const data = [
  "0/2",
  "2/2",
  "2/3",
  "3/4",
  "3/5",
  "0/1",
  "10/1",
  "9/10"
]*/


const data = [
  "24/14",
  "30/24",
  "29/44",
  "47/37",
  "6/14",
  "20/37",
  "14/45",
  "5/5",
  "26/44",
  "2/31",
  "19/40",
  "47/11",
  "0/45",
  "36/31",
  "3/32",
  "30/35",
  "32/41",
  "39/30",
  "46/50",
  "33/33",
  "0/39",
  "44/30",
  "49/4",
  "41/50",
  "50/36",
  "5/31",
  "49/41",
  "20/24",
  "38/23",
  "4/30",
  "40/44",
  "44/5",
  "0/43",
  "38/20",
  "20/16",
  "34/38",
  "5/37",
  "40/24",
  "22/17",
  "17/3",
  "9/11",
  "41/35",
  "42/7",
  "22/48",
  "47/45",
  "6/28",
  "23/40",
  "15/15",
  "29/12",
  "45/11",
  "21/31",
  "27/8",
  "18/44",
  "2/17",
  "46/17",
  "29/29",
  "45/50"
]

let calls = 0
const pad = () => new Array(calls).fill("   ").join("")

const traverse = (paths, connection) => {
  //console.log(pad(), 'traverse call nr', calls, ' paths', paths, ' conn', connection)
  //if (calls > 4) return
  calls++
  const branch = paths[paths.length-1] || []
  data.forEach(port => {
    const eliminationA = !(port.split("/")[0] === connection || port.split("/")[1] === connection)
    const eliminationB = branch.find(x => port === x) !== undefined

    //console.log('\n', pad(), 'port', port)
    //console.log(pad(), 'paths', paths)
    //console.log(pad(), 'branch', branch, branch.find(x => port === x))
    //console.log(pad(), 'eliminationA status:', eliminationA)
    //console.log(pad(), 'eliminationB status:', eliminationB)
    if (eliminationA || eliminationB) {
      //console.log(pad(), 'this leaf is terminated')
    } else {
      //console.log(pad(), 'not eliminated, digging deeper')
      paths = paths.concat([branch.concat(port)])
      //which port is already used?
      const nextPort = port.split("/")[0] === connection ? port.split("/")[1] : port.split("/")[0]
      paths = traverse(paths, nextPort)
      //console.log(pad(), '-------------------------------')
      calls--
    }

    //console.log('paths', paths)
  })
  return paths
}

const sumPath = (acc, curr) => acc + parseInt(curr.split("/")[0]) + parseInt(curr.split("/")[1])

const allPaths = traverse([], "0")
const sortedByLength = allPaths.sort((a, b) => a.length > b.length)

const allOfTheLongest = allPaths.filter(x => x.length === sortedByLength[sortedByLength.length-1].length)
//const scores = allPaths.map(x => x.reduce(sumPath, 0)).sort((a, b) => a > b)
//console.log(scores)
const scores = allOfTheLongest.map(x => x.reduce(sumPath, 0)).sort((a, b) => a > b)
//console.log()
console.log('\n\nAnswer: ', scores[scores.length-1])