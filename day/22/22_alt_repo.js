const { range } = require('ramda')

const puzzleInput =
    "#.###...#..#..#...##.####/" +
    "##.##.#..##.#..#.#..#####/" +
    ".####..###.#.#####.#.##.#/" +
    "##..#.##.#.#.#...#..##..#/" +
    "..#...####.#.###.###...#./" +
    "#..###.##.###.....#....#./" +
    ".#..#.##.##....##...####./" +
    "###.##....#...#.##....##./" +
    "..#.###..######.#.####.../" +
    ".#.###..#.##.#..##.######/" +
    "###.####.#####.####....#./" +
    "#...####.#.##...##..#.#../" +
    "##.######.#....##.#.####./" +
    ".#.#..#...##....#....#.../" +
    ".####.##.#..##...#..####./" +
    ".#.####.##..###..###..##./" +
    "...#...####...#.#.#.###.#/" +
    "#.##.####.#..##.###.####./" +
    ".#.#...####....##..####.#/" +
    "##.###.##..####..#.######/" +
    "#.#...#.#.##.####......../" +
    ".......#..##..#.#..###.../" +
    ".#..###.###........##.#../" +
    ".######.......#.#.##.#.#./" +
    ".##..#.###.....##.#.#...#/"


// Original example startgrid:
/*const puzzleInput = "..#/" +
 "#../" +
 ".../"*/
/*let infectionGrid = [
    { x: -1, y: 0 },
    { x: 1, y: -1 },
]*/

let infectionGrid = puzzleInput.split("/").reduce((acc, curr, row) => {
    const allInfectedInRow = curr.split("").reduce((_acc, _curr, _col) => {
        if (_curr === "#") {
            return _acc.concat({ x: _col, y: row, status: "infected" })
        } else {
            return _acc
        }
    }, [])

    return acc.concat(allInfectedInRow)
}, [])

let carrier = {
    x: Math.floor((puzzleInput.split("/").length - 1) / 2),
    y: Math.floor((puzzleInput.split("/").length - 1) / 2),
    direction: "up"
}

let freshInfections = 0

function stepCarrier() {
    const currentNode = infectionGrid.find(({ x, y }) => carrier.x === x && carrier.y === y)

    carrier = turn(currentNode && currentNode.status, carrier)

    if (!currentNode) {
        //Logic when node is clean, it becomes weakened
        infectionGrid = infectionGrid.concat({ x: carrier.x, y: carrier.y, status: "weakened" })
    } else if (currentNode.status === "weakened") {
        //Logic when node is weakened, it becomes infected
        infectionGrid = infectionGrid.map(node => (currentNode.x === node.x && currentNode.y === node.y) ? Object.assign({}, node, { status: "infected" }) : node)
        freshInfections++
    } else if (currentNode.status === "infected") {
        //Logic when node is infected, it becomes clean
        infectionGrid = infectionGrid.map(node => (currentNode.x === node.x && currentNode.y === node.y) ? Object.assign({}, node, { status: "flagged" }) : node)
    } else if (currentNode.status === "flagged") {
        //Logic when node is flagged, it becomes clean
        infectionGrid = infectionGrid.filter(({ x, y }) => !(currentNode.x === x && currentNode.y === y))
    }

    carrier = step(carrier)
}

function step(carrier) {
    const { x, y, direction } = carrier

    if (direction === "up")
        return Object.assign({}, carrier, { x: x, y: y - 1 })
    if (direction === "down")
        return Object.assign({}, carrier, { x: x, y: y + 1 })
    if (direction === "left")
        return Object.assign({}, carrier, { x: x - 1, y: y })
    if (direction === "right")
        return Object.assign({}, carrier, { x: x + 1, y: y })
}

function mirror(dir) {
    if (dir === "up")
        return "down"
    if (dir === "right")
        return "left"
    if (dir === "down")
        return "up"
    if (dir === "left")
        return "right"
}

function rightTurn(dir) {
    if (dir === "up")
        return "right"
    if (dir === "right")
        return "down"
    if (dir === "down")
        return "left"
    if (dir === "left")
        return "up"
}

function leftTurn(dir) {
    if (dir === "up")
        return "left"
    if (dir === "left")
        return "down"
    if (dir === "down")
        return "right"
    if (dir === "right")
        return "up"
}

function decideTurnFunc(infectedStatus) {
    if (infectedStatus === undefined)
        return leftTurn
    if (infectedStatus === "infected")
        return rightTurn
    if (infectedStatus === "weakened")
        return function identity(x) { return x }
    if (infectedStatus === "flagged")
        return mirror
    console.error("Unsupported infection status: " + infectedStatus)
}

function turn(infectedStatus, carrier) {
    return Object.assign({}, carrier, {
        direction: decideTurnFunc(infectedStatus)(carrier.direction)
    })
}

function status(idx) {
    console.log(idx === null ? 'Status after final iteration:' : 'Status before iteration '+idx+':')
    console.log('infectionGrid', infectionGrid)
    console.log('carrier', carrier)
}

function printGrid() {
    const str = range(-5, 5).map(y => {
        return range(-5, 5).map(x => {
            const node = infectionGrid.find(item => item.x === x && item.y === y)
            if (!node)
                return "."
            if (node.status === "infected")
                return "#"
            if (node.status === "weakened")
                return "W"
            if (node.status === "flagged")
                return "F"
            console.error("Unsupported status" + node.status)
        }).join("") + "\n"
    }).join("")
    console.log(str)
}

//printGrid()

new Array(10000000).fill().map((_, idx) => {
    if (idx % 10000 === 0)
        console.log('Processing iteration ' + idx + ', percentage complete ' + (idx / 10000000) * 100)
    stepCarrier()
})

printGrid()
status(null)
console.log('Fresh infections: ' + freshInfections)
console.log('\n')

