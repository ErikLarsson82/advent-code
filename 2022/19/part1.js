const DEBUG_SIM = true

function nextTier(mineral) {
  if (mineral === 'ore') return 'clay'
  if (mineral === 'clay') return 'obsidian'
  if (mineral === 'obsidian') return 'geode'
  console.log('nextTier called with', mineral)  
  throw new Error('Unknown mineral')
}

const isOre = x=>x.type==='ore'
const isClay = x=>x.type==='clay'
const isObsidian = x=>x.type==='obsidian'
const isGeode = x=>x.type==='geode'

const notOre = x=>x.type!=='ore'

const defaults = {
  bank: {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
  },
  robots: {
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0
  }
}

function simulate(blueprint, _policy, _bank, _robots, _iteration) {
  DEBUG_SIM && console.log('\n\n\nRunning simulation')
  
  if (_iteration === 0)
    throw new Error('not allowed to set iteration to 0')

  let iteration = (_iteration === undefined || _iteration === null) ? 1 : _iteration

  const bank = !_bank ? {...defaults.bank} : {..._bank}
  
  const robots = !_robots ? {...defaults.robots} : {..._robots}

  do {
    DEBUG_SIM && console.log(`\n== Minute ${iteration} ==`)
    
    const purchases = {
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0
    }

    const orderOfPurchase = ['geode', 'obsidian', 'clay', 'ore']

    DEBUG_SIM && console.log('Spending phase')
    
    orderOfPurchase.forEach(name => {
      const cost = blueprint[name]

      /*
      const shouldBuy = 
        _policy === null
        ? true
        : _policy[name] === undefined
          ? true
          : iteration < _policy[name]
      */

      const shouldBuy = policy(name, bank, cost, robots, purchases, iteration)
      
      while(shouldBuy && canAfford(bank, cost) === true) {
        DEBUG_SIM && console.log('im spending to buy a', name,'robot')
        spend(bank, cost)
        purchases[name] += 1
      }
    })
    
    DEBUG_SIM && console.log('Mining phase')
    forEach(robots, (mineral, robotAmount) => {
      bank[mineral] += robotAmount
    })

    DEBUG_SIM && console.log('Activate robot phase')
    forEach(purchases, (name, amount) => {
      robots[name] += amount
    })
    
    forEach(bank, (name, amount) => {
      amount > 0 && DEBUG_SIM && console.log(name, amount)  
    })
    forEach(robots, (name, amount) => {
      amount > 0 && DEBUG_SIM && console.log(name + ' collecting robot', amount)  
    })
    iteration++
  } while(iteration <= 24)

  return {
    bank,
    robots
  }
}

function forEach(obj, func) {
  for (let i in obj) {
    func(i, obj[i])
  }
}

function canAfford(bank, cost) {
  return cost.filter(({ amount, type }) => {
    return bank[type] >= amount
  }).length === cost.length
}

function spend(bank, cost) {
  cost.forEach(({ amount, type }) => {
    return bank[type] -= amount // by reference
  })
}

const sum = (acc, curr) => acc + curr
const trim = x=>x.trim()

function mix(a, b) {
  let c = {}
  for (e in a) {
    c[e] = a[e] + b[e]
  }
  return c
}

const data = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 100 ore. Each clay robot costs 100 ore. Each obsidian robot costs 1 ore and 1 clay. Each geode robot costs 1 ore and 1 obsidian.
Blueprint 3: Each ore robot costs 100 ore. Each clay robot costs 1 ore. Each obsidian robot costs 1 ore and 1 clay. Each geode robot costs 1 ore and 1 obsidian.
Blueprint 3: Each ore robot costs 100 ore. Each clay robot costs 100 ore. Each obsidian robot costs 5 ore and 1 clay. Each geode robot costs 5 ore and 1 obsidian.
Blueprint 4: Each ore robot costs 100 ore. Each clay robot costs 5 ore. Each obsidian robot costs 5 ore and 1 clay. Each geode robot costs 5 ore and 1 obsidian.`

const blueprints = data.trim().split('\n').map(trim).map(parse)

function parse(str) {
  const [name, rest] = str.split(':').map(trim)
  const [ore, clay, obsidian, geode] = rest.split('.').map(trim)
  
  return {
    ore: parseCost(ore),
    clay: parseCost(clay),
    obsidian: parseCost(obsidian),
    geode: parseCost(geode)
  }
}

function parseCost(str) {
  const [,,,,...rest] = str.split(' ')
  if (rest.includes('and')) {
    const [a, b] = rest.join(' ').split('and').map(trim)
    return [parseMaterialCost(a), parseMaterialCost(b)]
  } else {
    return [parseMaterialCost(rest.join(' '))]
  }
}

function parseMaterialCost(str) {
  const [amount, name] = str.split(' ')
  return { type: name, amount: parseInt(amount) }
}

const policyPermutations = []

for (var mineralA = 0; mineralA < 24; mineralA++) {
  for (var mineralB = 0; mineralB < 24; mineralB++) {
    for (var mineralC = 0; mineralC < 24; mineralC++) {
      policyPermutations.push({
        ore: mineralA,
        clay: mineralB,
        obsidian: mineralC
      })
    }
  }
}

function solveAllBlueprints() {
  let results = []

  blueprints.forEach((blueprint, bIdx) => {
    console.log('Testing blueprint', bIdx + 1)
    let best = null

    policyPermutations.forEach((policy, idx) => {
      if (idx % 1000 === 0) console.log('iteration', idx)

      const { bank, robots } = simulate(blueprints[bIdx], policy)

      const result = {
        score: bank.geode * (bIdx + 1),
        policy: { ore: 24, clay: 5, obsidian: 24 },
        bank,
        robots
      }
      if (idx % 1000 === 0) console.log('score', result.score)

      if (best === null || best.score < result.score) {
        best = result
      }
    })

    console.log('Blueprint', (bIdx+1),'yielded',best)
    results.push(best)
  })

  const qualityLevels = results.map(x=>x.score)
  console.log('Sum of quality levels', qualityLevels.reduce(sum, 0))
}

//solveAllBlueprints()

function policy(name, bank, cost, robots, purchases, iteration) {

  // Should i save ore to buy geode or spend on obsidian
  const allRobots = mix(robots, purchases)
  
  if (name === 'clay' && iteration + 2 + 2 < 24 && allRobots.clay >= 1) {
    return false
  }

  if (name === 'obsidian' && iteration + 2 < 24 && allRobots.obsidian >= 1) {
    return false
  }

  if (name === 'ore' && iteration > 5) {
    return false
  }

  if (name === 'clay' && iteration > 19) {
    return false
  }

  if (name === 'obsidian' && iteration > 21) {
    return false
  }

  if (name === 'geode' && iteration === 24) {
    return false
  }
  return true
}






const unitTests = [
  {
    func: () => simulate(blueprints[1], null, { ore: 100, clay: 10, obsidian: 10, geode: 0 }, { ore: 1, clay: 0, obsidian: 0, geode: 0 }, 23),
    expected: { geode: 10 }
  },
  {
    func: () => simulate(blueprints[1], null, { ore: 100, clay: 100, obsidian: 1, geode: 0 }, { ore: 1, clay: 0, obsidian: 0, geode: 0 }, 23),
    expected: { geode: 1 }
  },
  {
    func: () => simulate(blueprints[2], null, { ore: 10, clay: 10, obsidian: 10, geode: 0 }, { ore: 1, clay: 0, obsidian: 0, geode: 0 }, 21),
    expected: { geode: 30 }
  },
  {
    func: () => simulate(blueprints[2], null, { ore: 1, clay: 0, obsidian: 0, geode: 0 }, { ore: 1, clay: 0, obsidian: 0, geode: 0 }, 19),
    expected: { geode: 1 }
  },
  {
    func: () => simulate(blueprints[3], null, { ore: 10, clay: 10, obsidian: 0, geode: 0 }, { ore: 0, clay: 0, obsidian: 0, geode: 0 }, 21),
    expected: { geode: 1 }
  },
  {
    func: () => simulate(blueprints[4], null, { ore: 15, clay: 0, obsidian: 0, geode: 0 }, { ore: 0, clay: 0, obsidian: 0, geode: 0 }, 19),
    expected: { geode: 1 }
  },
  {
    func: () => simulate(blueprints[4], null, { ore: 30, clay: 0, obsidian: 0, geode: 0 }, { ore: 0, clay: 0, obsidian: 0, geode: 0 }, 19),
    expected: { geode: 2 }
  },
  {
    func: () => simulate(blueprints[0], null, { ore: 0, clay: 0, obsidian: 0, geode: 0 }, { ore: 1, clay: 0, obsidian: 0, geode: 0 }, 1),
    expected: { geode: 9 }
  }
]

const _unitTests = [
  
]



const testStatus = unitTests.map(({ func, expected }) => {
  const result = func()
  let allPassed = true
  if (expected.geode && result.bank.geode !== expected.geode) {
    allPassed = false
  }
  if (expected.obsidian && result.bank.obsidian !== expected.obsidian) {
    allPassed = false
  }
  if (expected.clay && result.bank.clay !== expected.clay) {
    allPassed = false
  }
  if (expected.ore && result.bank.ore !== expected.ore) {
    allPassed = false
  }
  return allPassed
})

console.log('\n\nTest result', testStatus.filter(x=>x===true).length + ' / ' + testStatus.length)
