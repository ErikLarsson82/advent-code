import { Record, List } from 'immutable';

const trim = x=>x.trim()
const sum = (acc, curr) => acc + curr

enum harvestTypes {
    ore = 'ore',
    clay = 'clay',
    obsidian = 'obsidian',
    geode = 'geode'
}

interface IOrder {
    type: harvestTypes,
    id: number,
    iteration: number
}

interface IRobots {
    ore: number,
    clay: number,
    obsidian: number,
    geode: number,
}

interface IMinerals {
    ore: number,
    clay: number,
    obsidian: number,
    geode: number,
}

interface IPurchases {
    ore: number,
    clay: number,
    obsidian: number,
    geode: number,
}

interface IBlueprint {
    ore: {
        ore: number
    },
    clay: {
        ore: number
    },
    obsidian: {
        ore: number,
        clay: number
    },
    geode: {
        ore: number,
        obsidian: number
    }
}

let topScore: number = 0
let topOrderList: any = null

let id: number = 0

const presetOrderList = [
    { type: 'ore', id: 4267124, iteration: 3, bought: false },
    { type: 'ore', id: 4449656, iteration: 5, bought: false },
    { type: 'clay', id: 4449699, iteration: 6, bought: false },
    { type: 'clay', id: 5004092, iteration: 7, bought: false },
    { type: 'clay', id: 9816433, iteration: 8, bought: false },
    { type: 'clay', id: 17065594, iteration: 9, bought: false },
    { type: 'clay', id: 21626125, iteration: 10, bought: false },
    { type: 'obsidian', id: 21626143, iteration: 11, bought: false },
    { type: 'clay', id: 22873674, iteration: 12, bought: false },
    { type: 'obsidian', id: 22890018, iteration: 13, bought: false },
    { type: 'obsidian', id: 22941559, iteration: 14, bought: false },
    { type: 'obsidian', id: 22988531, iteration: 15, bought: false },
    { type: 'obsidian', id: 23015641, iteration: 17, bought: false },
    { type: 'geode', id: 23015644, iteration: 18, bought: false },
    { type: 'obsidian', id: 23018547, iteration: 18, bought: false },
    { type: 'obsidian', id: 23020009, iteration: 19, bought: false },
    { type: 'geode', id: 23020012, iteration: 20, bought: false },
    { type: 'obsidian', id: 23020168, iteration: 21, bought: false },
    { type: 'geode', id: 23020171, iteration: 22, bought: false },
    { type: 'geode', id: 23020174, iteration: 23, bought: false }
]

const EXPLORATORY = true
const DEBUG = false

function simulate(robots: Record<IRobots>, minerals: Record<IMinerals>, purchases: Record<IPurchases>, orderList: List<IOrder>, iteration: number, nextPurchase: string | null, blueprint: IBlueprint) {
    id++
    
    if (id % 100000 === 0) console.log('id', id)
    
    if (EXPLORATORY) {
        if (nextPurchase === null) {
            simulate(robots, minerals, purchases, orderList, iteration, 'geode', blueprint)
            simulate(robots, minerals, purchases, orderList, iteration, 'obsidian', blueprint)
            simulate(robots, minerals, purchases, orderList, iteration, 'clay', blueprint)
            robots.get('ore') < 7 && simulate(robots, minerals, purchases, orderList, iteration, 'ore', blueprint)
            return
        }
        
        if (canAfford(nextPurchase, minerals, blueprint)) {
            minerals = pay(nextPurchase, minerals, blueprint)
            purchases = purchases.set(nextPurchase as keyof IPurchases, purchases.get(nextPurchase as keyof IPurchases) + 1)
            orderList = orderList.push({ type: nextPurchase as harvestTypes, id, iteration })
            nextPurchase = null
            // simulate(robots, minerals, purchases, orderList, iteration, null, blueprint)
            // return
        }
    } else {
        console.log('===== start iteration', iteration)
        console.log('minerals at start of round', minerals.toObject())
        console.log('robots at start of round', robots.toObject())
        console.log('purchases at start of round', purchases.toObject())
        let presetPurchase = presetOrderList.find(x => x.iteration === iteration && x.bought === false)
        while(iteration !== 24 && presetPurchase !== undefined && canAfford(presetPurchase.type, minerals, blueprint)) {
            console.log('bought', presetPurchase.type)
            minerals = pay(presetPurchase.type, minerals, blueprint)
            purchases = purchases.set(presetPurchase.type as keyof IPurchases, purchases.get(presetPurchase.type as keyof IPurchases) + 1)
            orderList = orderList.push({ type: presetPurchase.type as harvestTypes, id, iteration })
            
            presetPurchase.bought = true
            
            presetPurchase = presetOrderList.find(x => x.iteration === iteration && x.bought === false)
        }
        console.log('minerals after purchase', minerals.toObject())
    }
    
    minerals = collectMinerals(robots, minerals)
    DEBUG && console.log('collect minerals', minerals.toObject())

    if (iteration === 24) {
        if (minerals.get('geode') > topScore) {
            topScore = minerals.get('geode')
            topOrderList = orderList.toArray()
        }        
        return
    }
    
    robots = activateRobots(robots, purchases)
    DEBUG && console.log('purchases', purchases.toObject())
    DEBUG && console.log('activate robots', robots.toObject())
    purchases = purchasesRecordFactory()
    
    DEBUG && console.log('===== end of iteration ', iteration, '\n')
    simulate(robots, minerals, purchases, orderList, +iteration + 1, nextPurchase, blueprint)
}

function collectMinerals(robots: Record<IRobots>, minerals: Record<IMinerals>) {
    for (let k in robots.toObject()) {
        const key = k as keyof IMinerals
        const value = minerals.get(key) + robots.get(key)
        minerals = minerals.set(key, value)
    }    
    return minerals
}

function activateRobots(robots: Record<IRobots>, purchases: Record<IPurchases>) {
    for (let k in robots.toObject()) {
        const key = k as keyof IRobots
        const value = robots.get(key) + purchases.get(key)
        robots = robots.set(key, value)
    }    
    return robots
}

function canAfford(nextPurchase: string, minerals: Record<IMinerals>, blueprint: IBlueprint) {
    if (nextPurchase === 'geode') {
        return minerals.get('obsidian') >= blueprint.geode.obsidian && minerals.get('ore') >= blueprint.geode.ore
    }
    if (nextPurchase === 'obsidian') {
        return minerals.get('clay') >= blueprint.obsidian.clay && minerals.get('ore') >= blueprint.obsidian.ore
    }
    if (nextPurchase === 'clay') {
        return minerals.get('ore') >= blueprint.clay.ore
    }
    if (nextPurchase === 'ore') {
        return minerals.get('ore') >= blueprint.ore.ore
    }
    throw new Error('panic')
}

function pay(nextPurchase: string, minerals: Record<IMinerals>, blueprint: IBlueprint) {
    if (nextPurchase === 'geode') {
        minerals = minerals.set('obsidian', minerals.get('obsidian') - blueprint.geode.obsidian)
        return minerals.set('ore', minerals.get('ore') - blueprint.geode.ore)
    }
    if (nextPurchase === 'obsidian') {
        minerals = minerals.set('clay', minerals.get('clay') - blueprint.obsidian.clay)
        return minerals.set('ore', minerals.get('ore') - blueprint.obsidian.ore)
    }
    if (nextPurchase === 'clay') {
        return minerals.set('ore', minerals.get('ore') - blueprint.clay.ore)
    }
    if (nextPurchase === 'ore') {
        return minerals.set('ore', minerals.get('ore') - blueprint.ore.ore)
    }
    throw new Error('panic')
}

const robotRecordFactory = Record({
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0
})
const mineralsRecordFactory = Record({
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
})
const purchasesRecordFactory = Record({
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
})
const initialRobots: Record<IRobots> = robotRecordFactory()
const initialMinerals: Record<IMinerals> = mineralsRecordFactory()
const initialPurchases: Record<IPurchases> = purchasesRecordFactory()
const initialOrderList = List([])
const initialIteration: number = 1
const initialNextPurchase = null

const data = `Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 17 obsidian.
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

const blueprints: IBlueprint[] = data.trim().split('\n').map(trim).map(parse)

const _blueprints = [
    {
        ore: { ore: 4 },
        clay: { ore: 2 },
        obsidian: { ore: 3, clay: 14 },
        geode: { ore: 2, obsidian: 7 }
    },
    {
        ore: { ore: 2 },
        clay: { ore: 3 },
        obsidian: { ore: 3, clay: 8 },
        geode: { ore: 3, obsidian: 12 }
    }
]

function parse(str) {
    const [name, rest] = str.split(':').map(trim)
    const [ore, clay, obsidian, geode] = rest.split('.').map(trim)

    return {
        ore: parseCost(ore),
        clay: parseCost(clay),
        obsidian: parseCost(obsidian),
        geode: parseCost(geode)
    } as IBlueprint
}

function parseCost(str) {
    const [,,,,...rest] = str.split(' ')
    if (rest.includes('and')) {
        const [a, b] = rest.join(' ').split('and').map(trim)
        return { ... parseMaterialCost(a), ... parseMaterialCost(b) }
    } else {
        return parseMaterialCost(rest.join(' '))
    }
}

function parseMaterialCost(str) {
    const [amount, name] = str.split(' ')
    return { [name]: parseInt(amount) }
}
  
const results = blueprints.map((blueprint, idx) => {
    topScore = 0
    simulate(initialRobots, initialMinerals, initialPurchases, initialOrderList, initialIteration, initialNextPurchase, blueprint)
    console.log('Blueprint', idx + 1, 'Most geodes found', topScore)
    return {
        geodes: topScore,
        score: (idx + 1) * topScore
    }
})

console.log(results, results.map(x=>x.score).reduce(sum, 0))