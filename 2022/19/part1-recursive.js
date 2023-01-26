const DEBUG_SIM = false

const isOre = x=>x.type==='ore'
const isClay = x=>x.type==='clay'
const isObsidian = x=>x.type==='obsidian'
const isGeode = x=>x.type==='geode'

const notOre = x=>x.type!=='ore'

const notTooLateToBuy = (iteration, robots) => ({ name, last, limit }) => iteration <= last && robots[name] < limit

const byGeode = (a, b) => a.bank.geode > b.bank.geode ? -1 : 1

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
  },
  purchases: {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
  }
}

let simulationId = 0
let highscore = null
let breakpoint = 6

function simulate(blueprint, nextPurchase, bank, robots, purchases, robotPurchases, _iteration) {
  simulationId++
  // if (simulationId % 100000 === 0) console.log('simulationId', simulationId, highestGeodes)
  
  const preservedId = simulationId
  DEBUG_SIM && console.log('Running simulation nr', simulationId, nextPurchase, bank, robots, purchases, _iteration)

  if (_iteration === 0)
    throw new Error('not allowed to set iteration to 0')

  let iteration = (_iteration === undefined || _iteration === null) ? 1 : _iteration

  if (nextPurchase === null || nextPurchase === undefined) {
    const next = [
      { name: 'nothing', last: 24, limit: Infinity },
      { name: 'geode', last: 23, limit: Infinity },
      { name: 'obsidian', last: 21, limit: Infinity },
      { name: 'clay', last: 19, limit: Infinity },
      //{ name: 'ore', last: 17, limit: 50 }
    ]

    next.filter(notTooLateToBuy(iteration, robots)).forEach(({ name }) => {
      DEBUG_SIM && console.log('\nNew deeper simulation', name,' of simulation nr', preservedId)
      
      simulate(blueprint, name, {...bank}, {...robots}, {...purchases}, [...robotPurchases], iteration)      
    })

    DEBUG_SIM && console.log('this is a dead end, id: ', preservedId)
    return
  }
  
  let reset = false

  do {
    DEBUG_SIM && console.log(`\n== Minute ${iteration} == (nr ${ preservedId })`)

    DEBUG_SIM && console.log('Spending phase')

    if (reset) {
      purchases = {...defaults.purchases}
    }
    
    const name = nextPurchase
    let cost = blueprint[name]
    
    /*
    const order = [
        { simulationId: 4, name: 'clay', iteration: 3 },
        { simulationId: 680, name: 'clay', iteration: 5 },
        { simulationId: 683, name: 'obsidian', iteration: 12 },
        { simulationId: 895, name: 'clay', iteration: 12 },
        { simulationId: 2305, name: 'clay', iteration: 13 },
        { simulationId: 2307, name: 'geode', iteration: 17 },
        { simulationId: 2393, name: 'clay', iteration: 17 },
        { simulationId: 2478, name: 'clay', iteration: 18 },
        { simulationId: 2509, name: 'clay', iteration: 20 },
        { simulationId: 2511, name: 'geode', iteration: 22 },
        { simulationId: 2513, name: 'geode', iteration: 24 }

    ].forEach(ord => {
      if (iteration === ord.iteration) {
        const { name } = ord
        cost = blueprint[name]
        if (canAfford(bank, cost)) {
          robotPurchases = robotPurchases.concat({ simulationId, name, iteration })
          bank = spend(bank, cost)
          purchases[name] = purchases[name] + 1
        } else {
          console.log('i cant afford', ord, iteration)
        }
      }
    })
    */    

    if (name !== 'nothing' && canAfford(bank, cost) === true) {
      DEBUG_SIM && console.log('im spending to buy a ',name,' robot at iteration', iteration)
      robotPurchases = robotPurchases.concat({ simulationId, name, iteration })
      bank = spend(bank, cost)
      purchases[name] = purchases[name] + 1

      DEBUG_SIM && console.log('New deeper simulation after purchase', name,' of simulation nr', preservedId)
      simulate(blueprint, null, {...bank}, {...robots}, {...purchases}, [...robotPurchases], iteration)
    } else {
      reset = true
    }
     
    DEBUG_SIM && console.log('Mining phase')
    forEach(robots, (mineral, robotAmount) => {
      if (mineral === null || isNaN(robotAmount)) {
        console.log('calling robots with', robots)
        throw new Error('panic')
      }
      bank[mineral] = bank[mineral] + robotAmount
    })

    DEBUG_SIM && console.log('Activate robot phase')
    forEach(purchases, (name, amount) => {
      if (name === null || isNaN(amount)) {
        console.log('calling purchases with', purchases)
        throw new Error('panic')
      }
      robots[name] = robots[name] + amount
    })
    
    forEach(bank, (name, amount) => {
      amount > 0 && DEBUG_SIM && console.log(name, amount)  
    })

    forEach(robots, (name, amount) => {
      amount > 0 && DEBUG_SIM && console.log(name + ' collecting robot', amount)  
    })

    iteration++
  } while(iteration <= 24)

  console.log('terminated', preservedId, 'bank is', bank)
  
  if (highscore === null || bank.geode > highscore.geode) {
    breakpoint--
    highscore = {
      geode: bank.geode,
      simulationId: preservedId,
      robotPurchases
    }
    console.log('new highscore', highscore)
    if (false && breakpoint === 0) throw new Error('panic')
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
  const bankCopy = {...bank}
  cost.forEach(({ amount, type }) => {
    return bankCopy[type] = bankCopy[type] - amount
  })
  return bankCopy
}

const sum = (acc, curr) => acc + curr
const trim = x=>x.trim()

const data = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.`
const __data = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.`

const _data = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
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

function solveAllBlueprints() {
  blueprints.forEach((blueprint, bIdx) => {
    console.log('Testing blueprint', bIdx + 1)
    simulate(blueprints[bIdx], null, defaults.bank, defaults.robots, defaults.purchases, [], 1)
    console.log('id', simulationId)
    console.log('highscore', highscore)
  })
}

solveAllBlueprints()
