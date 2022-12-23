
const _valves = {
  'AA': {
    flowRate: 0,
    open: false,
    tunnelConnections: ['BB', 'DD', 'EE'] // 
  },
  'BB': {
    flowRate: 13,
    open: false,
    tunnelConnections: ['CC']
  },
  'CC': {
    flowRate: 2,
    open: false,
    tunnelConnections: []
  },
  'DD': {
    flowRate: 20,
    open: false,
    tunnelConnections: []
  },
  'EE': {
    flowRate: 20,
    open: false,
    tunnelConnections: ['FF'] //
  },
  'FF': {
    flowRate: 20,
    open: false,
    tunnelConnections: ['AA'] //'AA'
  },
}

const valves = {}

const data = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

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

function reset()  {
  mapAllValves(x => valves[x].open = false)
}

function metaSimulation() {
  let attempts = [
    { score: 0, potential: 2235, movements: [] },
  ]

  let counter = 0
  while(++counter < 3) {
    let additions = []

    attempts.forEach(attempt => {
      const filteredMoves = attempt.movements.filter(x => x !== 'open')
      console.log('testing for', attempt)
      mapAllValves((name, valve) => {
        const from = filteredMoves.slice(1).length > 0 ? filteredMoves.slice(1) : 'AA'
        if (from === name) return
        const ambitionPath = filteredMoves.concat(name, 'open')
        const nextStep = nextStepFromAmbition(from, name, [])
        const moves = [nextStep].concat('open')
        const simulationScore = simulate(from, filteredMoves.concat(moves), 30)

        const sP = sumPotential(name)
        
        additions.push({ score: simulationScore, potential: sP, movements: filteredMoves.concat(moves), rank: simulationScore + sP })
      })
    })
    attempts = additions
    console.log('\nAttempts', attempts)
    console.log('Iteration done', counter)
    console.log('highestPotential', additions.reduce(highestPotential))    
  }
}

function highestPotential(acc, curr) {
  return curr.rank > acc.rank ? curr : acc
}

function sumPotential(_name) {
  const summary = mapAllValves((name, obj) => {    
    const result = traverse(_name, name, []) 
    const potential = naive(result.length-1, obj.flowRate, 30)
    return potential
  })
  return summary.reduce(sum, 0)
}

function simulate(protagonistPosition, attempt, _minute) {
  const DEBUG = false
  DEBUG && console.log('Simulating')
  reset()
  let minute = 1
  const movements = [...attempt]
  let totalPressure = 0
  
  while(minute <= 30) {
    let movement
    if (movements.length > 0) {
      movement = movements.shift(1)
    }
    if (movement && movement !== 'open') {
      protagonistPosition = movement
      DEBUG && console.log('moving to', movement)
    }
    
    totalPressure += valvesPPM()

    if (movement === 'open') {
      valves[protagonistPosition].open = true
      DEBUG && console.log('opening', protagonistPosition)
    }
    
    minute++
  }

  DEBUG && console.log('Pressure', totalPressure)
  return totalPressure
}

function printAllOptionsPotential(_name) {
  console.log('--- from ',_name,' in beginning')
  const summary = mapAllValves((name, obj) => {    
    const result = traverse(_name, name, [])
    const potential = naive(result.length-1, obj.flowRate, 30)
    console.log('from ',_name,' to', name, 'using this path', chopHead(result), 'with length', result.length-1,'with potential', potential)
    return potential
  })
  console.log('Sum potential', summary.reduce(sum, 0))
}

function sum(acc, curr) {
  return acc + curr
}

function mapAllValves(func) {
  let arr = []
  for (let i in valves) {
    arr.push(func(i, valves[i]))
  }
  return arr
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

function naive(stepsToReach, flowRate, stepsLeft) {
  if (stepsLeft === undefined) {
    stepsLeft = 30
  }
  if (stepsToReach === null) return 0
  if (stepsToReach > stepsLeft) return 0
  return (stepsLeft - stepsToReach) * flowRate
}

function stepsToAllNodes(fromNode) {
  const targetNodes = Object.keys(valves)

  let sumPotential = 0
  targetNodes.forEach(node => {
    const stepsToReach = stepsToNode(fromNode, node, 0, []).steps
    const potential = naive(stepsToReach, valves[node].flowRate)
    sumPotential += potential
    console.log(`Calculating from ${fromNode} to ${node}: ${stepsToReach} - naive potential ${potential}`)
  })
  console.log('Sum potential:', sumPotential)
}

function stepsToNode(fromNode, destinationNode, steps, visits) {
  console.log('stepsToNode', fromNode, destinationNode, steps, visits)
  const hasVisited = x => !visits.includes(x)

  if (fromNode === destinationNode) return null
  if (valves[fromNode].tunnelConnections.filter(hasVisited).length === 0) return null
  if (valves[fromNode].tunnelConnections.filter(hasVisited).includes(destinationNode)) return {
    steps: 1,
    visits: visits.concat(fromNode)
  }
  
  let target = null
  valves[fromNode].tunnelConnections.filter(x => x !== destinationNode)
    .filter(hasVisited)
    .forEach(node => {
      
      const result = stepsToNode(node, destinationNode, steps, visits.concat(fromNode))
      console.log(result, visits, node, destinationNode)

      if (result !== null && result.steps !== undefined) {
        target = result.steps
        console.log('setting visits to', result)
        visits = visits.concat(fromNode)
      }
    })

  if (target === null) return null

  return {
    steps: target + steps + 1,
    visits: visits
  }
}

function tail(arr) {
  return arr[arr.length-1]
}

function head(arr) {
  return arr[0]
}

function chopHead(arr) {
  const copy = [...arr]
  copy.shift(1)
  return copy
}

function nextStepFromAmbition(position, destination, path) {
  const result = traverse(position, destination, path)
  return head(chopHead(result))
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




metaSimulation()
