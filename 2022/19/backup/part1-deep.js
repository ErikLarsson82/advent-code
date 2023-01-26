"use strict";
exports.__esModule = true;
var immutable_1 = require("immutable");
var harvestTypes;
(function (harvestTypes) {
    harvestTypes[harvestTypes["ore"] = 0] = "ore";
    harvestTypes[harvestTypes["clay"] = 1] = "clay";
    harvestTypes[harvestTypes["obsidian"] = 2] = "obsidian";
    harvestTypes[harvestTypes["geode"] = 3] = "geode";
})(harvestTypes || (harvestTypes = {}));
var state = (0, immutable_1.Map)({
    robots: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0
    },
    budget: 2
});
var evaluations = [];
var id = 0;
function simulate(state, nextPurchase, purchaseOrder) {
    debugger;
    id++;
    if (nextPurchase === null) {
        simulate(state, 'geode', purchaseOrder);
        simulate(state, 'obsidian', purchaseOrder);
        return;
    }
    if (state.get('budget') === undefined) {
        throw new Error('panic');
    }
    var currentBudget = state.get('budget') || -1;
    if (currentBudget > 0) {
        var newBudget = state.set('budget', currentBudget - 1);
        simulate(newBudget, null, purchaseOrder.concat({ type: nextPurchase, id: id }));
        return;
    }
    console.log('cant afford more, evaluating', id, nextPurchase, purchaseOrder.toArray());
}
simulate(state.budget, null, (0, immutable_1.List)([]));
