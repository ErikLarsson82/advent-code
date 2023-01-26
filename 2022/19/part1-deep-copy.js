"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var immutable_1 = require("immutable");
var trim = function (x) { return x.trim(); };
var sum = function (acc, curr) { return acc + curr; };
var harvestTypes;
(function (harvestTypes) {
    harvestTypes["ore"] = "ore";
    harvestTypes["clay"] = "clay";
    harvestTypes["obsidian"] = "obsidian";
    harvestTypes["geode"] = "geode";
})(harvestTypes || (harvestTypes = {}));
var topScore = 0;
var topOrderList = null;
var id = 0;
var presetOrderList = [
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
];
var EXPLORATORY = true;
var DEBUG = false;
function simulate(robots, minerals, purchases, orderList, iteration, nextPurchase, blueprint) {
    id++;
    if (id % 100000 === 0)
        console.log('id', id);
    if (EXPLORATORY) {
        if (nextPurchase === null) {
            simulate(robots, minerals, purchases, orderList, iteration, 'geode', blueprint);
            simulate(robots, minerals, purchases, orderList, iteration, 'obsidian', blueprint);
            simulate(robots, minerals, purchases, orderList, iteration, 'clay', blueprint);
            robots.get('ore') < 7 && simulate(robots, minerals, purchases, orderList, iteration, 'ore', blueprint);
            return;
        }
        if (canAfford(nextPurchase, minerals, blueprint)) {
            minerals = pay(nextPurchase, minerals, blueprint);
            purchases = purchases.set(nextPurchase, purchases.get(nextPurchase) + 1);
            orderList = orderList.push({ type: nextPurchase, id: id, iteration: iteration });
            nextPurchase = null;
            // simulate(robots, minerals, purchases, orderList, iteration, null, blueprint)
            // return
        }
    }
    else {
        console.log('===== start iteration', iteration);
        console.log('minerals at start of round', minerals.toObject());
        console.log('robots at start of round', robots.toObject());
        console.log('purchases at start of round', purchases.toObject());
        var presetPurchase = presetOrderList.find(function (x) { return x.iteration === iteration && x.bought === false; });
        while (iteration !== 24 && presetPurchase !== undefined && canAfford(presetPurchase.type, minerals, blueprint)) {
            console.log('bought', presetPurchase.type);
            minerals = pay(presetPurchase.type, minerals, blueprint);
            purchases = purchases.set(presetPurchase.type, purchases.get(presetPurchase.type) + 1);
            orderList = orderList.push({ type: presetPurchase.type, id: id, iteration: iteration });
            presetPurchase.bought = true;
            presetPurchase = presetOrderList.find(function (x) { return x.iteration === iteration && x.bought === false; });
        }
        console.log('minerals after purchase', minerals.toObject());
    }
    minerals = collectMinerals(robots, minerals);
    DEBUG && console.log('collect minerals', minerals.toObject());
    if (iteration === 24) {
        if (minerals.get('geode') > topScore) {
            topScore = minerals.get('geode');
            topOrderList = orderList.toArray();
        }
        return;
    }
    robots = activateRobots(robots, purchases);
    DEBUG && console.log('purchases', purchases.toObject());
    DEBUG && console.log('activate robots', robots.toObject());
    purchases = purchasesRecordFactory();
    DEBUG && console.log('===== end of iteration ', iteration, '\n');
    simulate(robots, minerals, purchases, orderList, +iteration + 1, nextPurchase, blueprint);
}
function collectMinerals(robots, minerals) {
    for (var k in robots.toObject()) {
        var key = k;
        var value = minerals.get(key) + robots.get(key);
        minerals = minerals.set(key, value);
    }
    return minerals;
}
function activateRobots(robots, purchases) {
    for (var k in robots.toObject()) {
        var key = k;
        var value = robots.get(key) + purchases.get(key);
        robots = robots.set(key, value);
    }
    return robots;
}
function canAfford(nextPurchase, minerals, blueprint) {
    if (nextPurchase === 'geode') {
        return minerals.get('obsidian') >= blueprint.geode.obsidian && minerals.get('ore') >= blueprint.geode.ore;
    }
    if (nextPurchase === 'obsidian') {
        return minerals.get('clay') >= blueprint.obsidian.clay && minerals.get('ore') >= blueprint.obsidian.ore;
    }
    if (nextPurchase === 'clay') {
        return minerals.get('ore') >= blueprint.clay.ore;
    }
    if (nextPurchase === 'ore') {
        return minerals.get('ore') >= blueprint.ore.ore;
    }
    throw new Error('panic');
}
function pay(nextPurchase, minerals, blueprint) {
    if (nextPurchase === 'geode') {
        minerals = minerals.set('obsidian', minerals.get('obsidian') - blueprint.geode.obsidian);
        return minerals.set('ore', minerals.get('ore') - blueprint.geode.ore);
    }
    if (nextPurchase === 'obsidian') {
        minerals = minerals.set('clay', minerals.get('clay') - blueprint.obsidian.clay);
        return minerals.set('ore', minerals.get('ore') - blueprint.obsidian.ore);
    }
    if (nextPurchase === 'clay') {
        return minerals.set('ore', minerals.get('ore') - blueprint.clay.ore);
    }
    if (nextPurchase === 'ore') {
        return minerals.set('ore', minerals.get('ore') - blueprint.ore.ore);
    }
    throw new Error('panic');
}
var robotRecordFactory = (0, immutable_1.Record)({
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0
});
var mineralsRecordFactory = (0, immutable_1.Record)({
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
});
var purchasesRecordFactory = (0, immutable_1.Record)({
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0
});
var initialRobots = robotRecordFactory();
var initialMinerals = mineralsRecordFactory();
var initialPurchases = purchasesRecordFactory();
var initialOrderList = (0, immutable_1.List)([]);
var initialIteration = 1;
var initialNextPurchase = null;
var data = "Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 17 obsidian.\nBlueprint 2: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 8 obsidian.\nBlueprint 3: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 2 ore and 11 obsidian.\nBlueprint 4: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 15 obsidian.\nBlueprint 5: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 16 obsidian.\nBlueprint 6: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 7 clay. Each geode robot costs 2 ore and 7 obsidian.\nBlueprint 7: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 4 ore and 12 obsidian.\nBlueprint 8: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 3 ore and 14 obsidian.\nBlueprint 9: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 3 ore and 19 obsidian.\nBlueprint 10: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 3 ore and 20 obsidian.\nBlueprint 11: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 3 ore and 14 obsidian.\nBlueprint 12: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 6 clay. Each geode robot costs 4 ore and 11 obsidian.\nBlueprint 13: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 8 obsidian.\nBlueprint 14: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 8 obsidian.\nBlueprint 15: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 13 clay. Each geode robot costs 3 ore and 11 obsidian.\nBlueprint 16: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 11 obsidian.\nBlueprint 17: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 3 ore and 8 obsidian.\nBlueprint 18: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 15 clay. Each geode robot costs 2 ore and 15 obsidian.\nBlueprint 19: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 4 ore and 16 obsidian.\nBlueprint 20: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 5 clay. Each geode robot costs 3 ore and 18 obsidian.\nBlueprint 21: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 3 ore and 11 obsidian.\nBlueprint 22: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 4 ore and 15 obsidian.\nBlueprint 23: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 19 obsidian.\nBlueprint 24: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 4 ore and 8 obsidian.\nBlueprint 25: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 17 clay. Each geode robot costs 4 ore and 16 obsidian.\nBlueprint 26: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 20 obsidian.\nBlueprint 27: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 10 clay. Each geode robot costs 3 ore and 10 obsidian.\nBlueprint 28: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 4 ore and 10 obsidian.\nBlueprint 29: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 3 ore and 8 obsidian.\nBlueprint 30: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 4 ore and 8 obsidian.";
var blueprints = data.trim().split('\n').map(trim).map(parse);
var _blueprints = [
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
];
function parse(str) {
    var _a = str.split(':').map(trim), name = _a[0], rest = _a[1];
    var _b = rest.split('.').map(trim), ore = _b[0], clay = _b[1], obsidian = _b[2], geode = _b[3];
    return {
        ore: parseCost(ore),
        clay: parseCost(clay),
        obsidian: parseCost(obsidian),
        geode: parseCost(geode)
    };
}
function parseCost(str) {
    var _a = str.split(' '), rest = _a.slice(4);
    if (rest.includes('and')) {
        var _b = rest.join(' ').split('and').map(trim), a = _b[0], b = _b[1];
        return __assign(__assign({}, parseMaterialCost(a)), parseMaterialCost(b));
    }
    else {
        return parseMaterialCost(rest.join(' '));
    }
}
function parseMaterialCost(str) {
    var _a;
    var _b = str.split(' '), amount = _b[0], name = _b[1];
    return _a = {}, _a[name] = parseInt(amount), _a;
}
var results = blueprints.map(function (blueprint, idx) {
    topScore = 0;
    simulate(initialRobots, initialMinerals, initialPurchases, initialOrderList, initialIteration, initialNextPurchase, blueprint);
    console.log('Blueprint', idx + 1, 'Most geodes found', topScore);
    return {
        geodes: topScore,
        score: (idx + 1) * topScore
    };
});
console.log(results, results.map(function (x) { return x.score; }).reduce(sum, 0));
