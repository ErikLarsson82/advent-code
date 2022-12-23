
const valves = {}

let permutations = []
let hydratedPermutations = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, ____data) => {

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

const _data = `Valve AA has flow rate=0; tunnels lead to valves BB, CC
Valve BB has flow rate=13; tunnels lead to valves CC
Valve CC has flow rate=13; tunnels lead to valves AA`

const data = `Valve AA has flow rate=0; tunnels lead to valves BB
Valve BB has flow rate=13; tunnels lead to valves CC
Valve CC has flow rate=13; tunnels lead to valves AA, BB`

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

  findPermutations('AA', ['AA'])

  hydrateAllWithPotentialStop()

  console.log('hydratedPermutations', hydratedPermutations.length, hydratedPermutations)

  return
  let record = 0

  for (let i = 0; i < hydratedPermutations.length; i++) {
    const score = simulate('AA', hydratedPermutations[i])
    if (score > record) {
      record = score
      console.log('I found record', record, 'by traversing', hydratedPermutations[i].join(','))
    }
  }
})

function simulate(protagonistPosition, attempt) {
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
    }
    
    totalPressure += valvesPPM()

    if (movement === 'open') {
      valves[protagonistPosition].open = true
    }
    
    minute++
  }

  return totalPressure
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

function mapAllValves(func) {
  let arr = []
  for (let i in valves) {
    arr.push(func(i, valves[i]))
  }
  return arr
}

function findPermutations(location, path) {
  const hasYetToVisit = x => !path.includes(x)

  const availablePaths = valves[location].tunnelConnections.filter(hasYetToVisit)
  
  if (availablePaths.length === 0) {
    permutations.push(path)
  }
  
  availablePaths.forEach(tc => findPermutations(tc, path.concat(tc)))
}

function hydrateAllWithPotentialStop() {
  permutations.forEach(p => {
    console.log('primary permutation', p)
    p.forEach((_, idx, list) => {
      return
      console.log('secondary permutation', p)
      for (let i = 0; i < list.length; i++) {
        const before = list.slice(0, i)
        const after = list.slice(i)
        console.log('imma add', list.length, 'secondary permutations', before, after, 'result', before.concat('open').concat(after))
      }
      hydratedPermutations.push(list.slice(idx+1).concat('open'))
    })
  })
}

function mapAllValves(func) {
  let arr = []
  for (let i in valves) {
    arr.push(func(i, valves[i]))
  }
  return arr
}