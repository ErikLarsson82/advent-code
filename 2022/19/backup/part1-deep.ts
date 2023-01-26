import { Map, List } from 'immutable';

enum harvestTypes {
    ore,
    clay,
    obsidian,
    geode
}

interface IRobots {
    ore: 
}

interface ISimulationState {
    robots: IRobots,
    minerals: IMinerals,
    purchases: IPurchases,
    iteration: number
}

const state = Map({
    robots: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0
    },
    budget: 2
})

let evaluations = []

let id = 0

interface IOrder {
    type: string,
    id: number
}

function simulate(state: Map<string, number>, nextPurchase: string | null, purchaseOrder: List<IOrder>) {
    debugger;
    id++
    
    if (nextPurchase === null) {
        simulate(state, 'geode', purchaseOrder)
        simulate(state, 'obsidian', purchaseOrder)
        return
    }
    if (state.get('budget') === undefined) {
        throw new Error('panic')
    }
    const currentBudget: number = state.get('budget') || -1
    if (currentBudget > 0) {
        const newBudget = state.set('budget', currentBudget - 1)
        simulate(newBudget, null, purchaseOrder.concat({ type: nextPurchase, id }))
        return
    }
    console.log('cant afford more, evaluating', id, nextPurchase, purchaseOrder.toArray())
}

simulate(state.budget, null, List([]))