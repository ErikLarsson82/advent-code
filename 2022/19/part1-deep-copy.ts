import { Record, List } from 'immutable';

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

let topScore: number = 0

let id: number = 0

function simulate(robots: Record<IRobots>, minerals: Record<IMinerals>, purchases: Record<IPurchases>, orderList: List<IOrder>, iteration: number, nextPurchase: string | null) {
    id++
    if (nextPurchase === null) {
        simulate(robots, minerals, purchases, orderList, iteration, 'geode')
        simulate(robots, minerals, purchases, orderList, iteration, 'obsidian')
        simulate(robots, minerals, purchases, orderList, iteration, 'clay')
        simulate(robots, minerals, purchases, orderList, iteration, 'ore')
        return
    }
    
    if (nextPurchase === 'geode' && minerals.get('ore') >= 2 && minerals.get('obsidian') >= 7) {
        minerals = minerals.set('ore', minerals.get('ore') - 2)
        minerals = minerals.set('obsidian', minerals.get('obsidian') - 7)
        orderList = orderList.push({ type: harvestTypes.geode, id, iteration })
        purchases = purchases.set('geode', purchases.get('geode') + 1)
        simulate(robots, minerals, purchases, orderList, iteration, null)
        return
    }
    if (nextPurchase === 'obsidian' && minerals.get('ore') >= 3 && minerals.get('clay') >= 14) {
        minerals = minerals.set('ore', minerals.get('ore') - 3)
        minerals = minerals.set('clay', minerals.get('clay') - 14)
        orderList = orderList.push({ type: harvestTypes.obsidian, id, iteration })
        purchases = purchases.set('obsidian', purchases.get('obsidian') + 1)
        simulate(robots, minerals, purchases, orderList, iteration, null)
        return
    }
    if (nextPurchase === 'clay' && minerals.get('ore') >= 2) {
        minerals = minerals.set('ore', minerals.get('ore') - 2)
        orderList = orderList.push({ type: harvestTypes.clay, id, iteration })
        purchases = purchases.set('clay', purchases.get('clay') + 1)
        simulate(robots, minerals, purchases, orderList, iteration, null)
        return
    }
    if (nextPurchase === 'ore' && minerals.get('ore') >= 4) {
        minerals = minerals.set('ore', minerals.get('ore') - 4)
        orderList = orderList.push({ type: harvestTypes.ore, id, iteration })
        purchases = purchases.set('clay', purchases.get('ore') + 1)
        simulate(robots, minerals, purchases, orderList, iteration, null)
        return
    }

    minerals = collectMinerals(robots, minerals)

    if (iteration === 24) {
        /*
        {
            console.log('\nend of simulation', id)
            console.log('would have bought (but didnt afford)', nextPurchase)
            console.log('robots', robots.toObject())
            console.log('minerals', minerals.toObject())
            console.log('order list', orderList.toArray())
        }
        */
        
        if (minerals.get('geode') > topScore) {
            topScore = minerals.get('geode')
        }        
        return
    }
    
    robots = activateRobots(robots, purchases)
    purchases = purchasesRecordFactory()
    
    simulate(robots, minerals, purchases, orderList, +iteration + 1, nextPurchase)
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

simulate(initialRobots, initialMinerals, initialPurchases, initialOrderList, initialIteration, initialNextPurchase)
console.log('Simulations nest id', id)
console.log('Most geodes found', topScore)