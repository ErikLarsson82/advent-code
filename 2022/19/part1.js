const DEBUG_SIM = false

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

function simulate(blueprint) {
  DEBUG_SIM && console.log('\n\n\nRunning simulation')
  
  let iteration = 0
  
  const bank = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
  }
  
  const robots = {
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0
  }

  const ITERATIONS = 24
  while(iteration < ITERATIONS) {
    DEBUG_SIM && console.log(`\n== Minute ${iteration + 1} ==`)
    iteration++

    const purchases = {
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0
    }

    const orderOfPurchase = ['geode', 'obsidian', 'clay', 'ore']

    orderOfPurchase.forEach(name => {
      const cost = blueprint[name]
      /*
      const oreCost = getCostForMineral('ore', cost)
      const roi = name === 'ore' && (oreCost / 1 * (ITERATIONS - iteration))
      const geodeCost = getGeodeCost(blueprint)
      DEBUG_SIM && console.log('roi to buy a', name,'now would be', roi, oreCost)
      */
      // if i have the high tier quality, hold off a purchase for all else
      /*const saveOreForGeode = canAffordHighTier('geode', bank, cost) && name !== 'geode'
      console.log('saveOreForGeode', saveOreForGeode)
      const saveOreForObsidian = canAffordHighTier('obsidian', bank, cost) && name !== 'obsidian'
      console.log('saveOreForObsidian', saveOreForObsidian)
      */
      //if (iteration === 9) {
      console.log('Check status', iteration)
      const roi = name === 'clay' && (1 / 28)* (ITERATIONS - iteration)
      console.log('ROI of clay is', roi)

        //if (bank.clay + robots.clay >= blueprint.obsidian.find(isClay).amount) {
        //  console.log('I SHOULD HOLD OFF')
        //}
        //console.log('saving ore to buy obsidian (later) would yield, should be true=', policy(iteration, name, bank, blueprint))
        //console.log('spending ore to buy clay robot would yield, should be false=', policy(iteration, name, bank, blueprint))
      //}
      //console.log(bank.clay, robots.clay, blueprint.obsidian.find(isClay).amount)

      let saveOreForObsidian = false
      if (iteration === 9 || iteration === 10 || iteration === 14 || iteration === 17 || iteration === 19 || iteration === 20) {
        console.log('-----------------INSPECT THIS ^ -------------------')
        saveOreForObsidian = true
        DEBUG_SIM && console.log('im saving my ore to buy a obsidian robot')
      }
      while(canAfford(bank, cost) === true && !saveOreForObsidian) {
        DEBUG_SIM && console.log('im spending to buy a', name,'robot')
        spend(bank, cost)
        purchases[name] += 1
      }
    })
    
    forEach(robots, (mineral, robotAmount) => {
      bank[mineral] += robotAmount
    })

    forEach(purchases, (name, amount) => {
      robots[name] += amount
    })
    
    forEach(bank, (name, amount) => {
      amount > 0 && DEBUG_SIM && console.log(name, amount)  
    })
    forEach(robots, (name, amount) => {
      amount > 0 && DEBUG_SIM && console.log(name + ' collecting robot', amount)  
    })    
  }
  return {
    bank,
    robots
  }
}

function policy(iteration, name, bank, blueprint) {
  if (name !== 'clay') return
  console.log('policy called with', iteration, name, bank, blueprint)
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

function canAffordHighTier(name, bank, cost) {
  const c = cost.find(x=>x.type==='obsidian')
  if (!c) return false
  if (name === 'geode' && bank.obsidian > c.amount) return true
  return false
}

function spend(bank, cost) {
  cost.forEach(({ amount, type }) => {
    return bank[type] -= amount // by reference
  })
}

function getCostForMineral(name, cost) {
  const result = cost.find(x=>x.type === name)
  return result ? result.amount : null
}

function getGeodeCost(blueprint) {
  // ore + obsidian för geode robot, ore + clay för alla obsidian robotar, ore för clayrobotar
  
  const clayRobotBaseCost = getCostForMineral('ore', blueprint.clay)
  const obsidianRobotBaseCost = getCostForMineral('ore', blueprint.obsidian) + (getCostForMineral('clay', blueprint.obsidian) * clayRobotBaseCost)
  const geodeRobotCost = getCostForMineral('ore', blueprint.geode) + (getCostForMineral('obsidian', blueprint.geode) * obsidianRobotBaseCost)
  //console.log('pretend obsidian robot costs 10 ore in total, now geode cost', geodeRobotCost)
  console.log('a clay robot costs', clayRobotBaseCost)
  console.log('a obsidian robot costs', obsidianRobotBaseCost)
  console.log('a geodeRobotCost robot costs', geodeRobotCost)
  //console.log('totalClayRobotCost', totalClayRobotCost)
  //getCostForMineral('ore', blueprint[name])
}

const sum = (acc, curr) => acc + curr
const trim = x=>x.trim()

const _blueprints = [
  {
    geode: [{ amount: 2, type: 'ore'}, { amount: 7, type: 'obsidian'}],
    obsidian: [{ amount: 3, type: 'ore'}, { amount: 14, type: 'clay'}],
    clay: [{ amount: 2, type: 'ore'}],
    ore: [{ amount: 4, type: 'ore'}]
  },
  {
    geode: [{ amount: 3, type: 'ore'}, { amount: 12, type: 'obsidian'}],
    obsidian: [{ amount: 3, type: 'ore'}, { amount: 8, type: 'clay'}],
    clay: [{ amount: 3, type: 'ore'}],
    ore: [{ amount: 2, type: 'ore'}]
  }
]


const _data = `Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 17 obsidian.
Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 3: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 2 ore and 11 obsidian.
Blueprint 4: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 5: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 6: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 7 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 7: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 4 ore and 12 obsidian.
Blueprint 8: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 9: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 10: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 3 ore and 20 obsidian.
Blueprint 11: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 12: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 6 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 13: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 14: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 15: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 13 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 16: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 17: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 18: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 15 clay. Each geode robot costs 2 ore and 15 obsidian.
Blueprint 19: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 20: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 5 clay. Each geode robot costs 3 ore and 18 obsidian.
Blueprint 21: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 22: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 23: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 24: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 25: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 17 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 26: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 20 obsidian.
Blueprint 27: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 10 clay. Each geode robot costs 3 ore and 10 obsidian.
Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 4 ore and 10 obsidian.
Blueprint 29: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 30: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 4 ore and 8 obsidian.`

const __data = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`

const ____data = `Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 17 obsidian.`

const data = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.`

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

let results = []

blueprints.forEach((blueprint, bIdx) => {
  let best = null

  //for (let i = 0; i < 1000000; i++) {
    const { bank, robots } = simulate(blueprints[bIdx])

    const result = {
      score: bank.geode * (bIdx + 1),
      bank,
      robots
    }

    if (best === null || best.score < result.score) {
      best = result
    }
  //}
  console.log('Blueprint', (bIdx+1),'yielded',best)
  results.push(best)
})

const qualityLevels = results.map(x=>x.score)
console.log('Sum of quality levels', qualityLevels.reduce(sum, 0))