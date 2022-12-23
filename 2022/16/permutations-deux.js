
const valves = {}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  const __data = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

  const _data = `Valve AA has flow rate=0; tunnels lead to valves BB, EE
Valve BB has flow rate=0; tunnels lead to valves CC
Valve CC has flow rate=1; tunnels lead to valves AA
Valve EE has flow rate=1; tunnels lead to valves AA`

  console.log('reading data')
  data.trim().split('\n').map(x=>x.trim()).forEach(row => {
    const [a, b] = row.split(';').map(x=>x.trim())
    const [_, c] = a.split(' ')
    const [__, d] = a.split('=')
    const delimiter = b.substring(0, 22) === 'tunnels lead to valves' ? 23 : 22
    valves[c] = {
      flowRate: parseInt(d),
      open: false,
      tunnelConnections: b.substring(delimiter).trim().split(', ')
    }
  })

  console.log('gathering flow rate valves')
  let valvesWithFlowRate = []
  mapAllValves((name, valve) => {
    if (valve.flowRate > 0) {
      valvesWithFlowRate.push(name)
    }
  })
  console.log('creating permutations')
  const permutations = findPermutations(valvesWithFlowRate)
  let maximumPressureFound = 0

  console.log('running simulation')
  permutations.forEach((permutation, idx) => {
    console.log('running simulation for', permutation)
    const pressure = simulate(permutation)
    if (pressure > maximumPressureFound) {
      maximumPressureFound = pressure
    }
  })
  console.log('maximumPressureFound', maximumPressureFound)



})

function findPermutations(arr) {
  if (arr.length === 2) {
    return [
      [arr[0], arr[1]],
      [arr[1], arr[0]]
    ]
  }
  const result = arr.flatMap((item, idx, list) => {
    const others = list.filter((_, idxPrime) => idx !== idxPrime)
    return findPermutations(others).map(x => [item].concat(x))
  })
  return result
}

function mapAllValves(func) {
  let arr = []
  for (let i in valves) {
    arr.push(func(i, valves[i]))
  }
  return arr
}

function simulate(guideline) {
  reset()
  let minute = 1
  let protagonistPosition = 'AA'
  let totalPressure = 0
  
  while(minute <= 30) {
    const nothingLeftToDo = guideline.length === 0
    if (nothingLeftToDo) {
      totalPressure += valvesPPM()
      minute++
      continue;
    }

    let hasMoved = false
    const destination = head(guideline)
    if (protagonistPosition !== destination) {
      const howDoIGetTo = traverse(protagonistPosition, destination, [])
      protagonistPosition = head(chopHead(howDoIGetTo))
      hasMoved = true
      //console.log('walking towards', destination,'by walking to', protagonistPosition)
    }

    totalPressure += valvesPPM()

    if (!hasMoved) {
      guideline = guideline.slice(1)
      valves[protagonistPosition].open = true
      //console.log('opening', protagonistPosition,'at iteration', minute)
    }
    
    minute++
  }

  return totalPressure
}

function getPath(fromNode, destinationNode, visits) {
  visits = visits.concat(fromNode)
  
  const hasVisited = x => !visits.includes(x)

  if (fromNode === destinationNode) return null
    
  if (valves[fromNode].tunnelConnections.filter(hasVisited).length === 0) return null
  if (valves[fromNode].tunnelConnections.filter(hasVisited).includes(destinationNode)) return visits.concat(destinationNode)
  
  //let target = null

  const distances = valves[fromNode].tunnelConnections.filter(x => x !== destinationNode)
    .filter(hasVisited)
    .map(node => {
      
      const result = getPath(node, destinationNode, visits)
      console.log('im running getPath', node, destinationNode, visits, result)

      //console.log(result)
      //target = result
      /*
      return {
        distance: result ? visits.concat(node).length
      }
      */
      //console.log(result, visits, node, destinationNode)

      //console.log('debug', fromNode, node, destinationNode, visits.concat(node), result)

      /*
      if (result !== null && result.steps !== undefined) {
        target = result.steps
        console.log('setting visits to', result)
        visits = visits.concat(fromNode)
      }
      */
    })

  //distances

  //if (target === null) return null

  //return target
  //console.log('target', target)
  /*  
  return {
    steps: target + steps + 1,
    visits: visits
  }*/
}

function head(arr) {
  return arr[0]
}

function chopHead(arr) {
  const copy = [...arr]
  copy.shift(1)
  return copy
}

function tail(arr) {
  return arr[arr.length-1]
}

function traverse(position, destination, path) {
  path = path.concat(position)
  if (position === destination) return path
  const hasVisited = x => path.includes(x)
  const hasYetToVisit = x => !path.includes(x)

  const output = valves[position].tunnelConnections.filter(hasYetToVisit)
    .map(tc => traverse(tc, destination, path))
  
  output.sort((a, b) => a.length > b.length ? 1 : -1)
  
  const isEnd = output.find(x => x !== undefined && tail(x) === destination)
  if (isEnd) return isEnd
  return []  
}


function reset()  {
  mapAllValves(x => valves[x].open = false)
}

function valvesPPM() {
  let ppm = 0
  for (let i in valves) {
    if (valves[i].open) {
      ppm += valves[i].flowRate
    }
  }
  return ppm
}
