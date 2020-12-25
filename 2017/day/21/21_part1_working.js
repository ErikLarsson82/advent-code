const data = require("./day_21.json")

const initPattern = ".#./..#/###"

const noDash = x => x !== "/"

function mirror(grid, dir) {
    if (dir === 'horizontal') {
        if (grid.length === 5) {
            const newGrid = new Array(5)
            newGrid[0] = grid[1]
            newGrid[1] = grid[0]
            newGrid[2] = grid[2]
            newGrid[3] = grid[4]
            newGrid[4] = grid[3]
            return newGrid.join("")
        } else {
            const newArr = new Array(11)
            newArr[0] = grid[2]
            newArr[1] = grid[1]
            newArr[2] = grid[0]
            newArr[3] = grid[3]
            newArr[4] = grid[6]
            newArr[5] = grid[5]
            newArr[6] = grid[4]
            newArr[7] = grid[7]
            newArr[8] = grid[10]
            newArr[9] = grid[9]
            newArr[10] = grid[8]
        return newArr.join("")
        }
    } else {
        //Vertical
        if (grid.length === 5) {
            const newGrid = new Array(5)
            newGrid[0] = grid[3]
            newGrid[1] = grid[4]
            newGrid[2] = grid[2]
            newGrid[3] = grid[0]
            newGrid[4] = grid[1]
            return newGrid.join("")
        } else {
            const newArr = new Array(11)
            newArr[0] = grid[8]
            newArr[1] = grid[9]
            newArr[2] = grid[10]
            newArr[3] = grid[3]
            newArr[4] = grid[4]
            newArr[5] = grid[5]
            newArr[6] = grid[6]
            newArr[7] = grid[7]
            newArr[8] = grid[0]
            newArr[9] = grid[1]
            newArr[10] = grid[2]
        return newArr.join("")
        }
    }
}

function rotateCore(grid) {
    if (grid.length === 5) {
        const newArr = new Array(5)
        newArr[0] = grid[3]
        newArr[1] = grid[0]
        newArr[2] = grid[2]
        newArr[3] = grid[4]
        newArr[4] = grid[1]
        return newArr.join("")
    }
    if (grid.length === 11) {
        const newArr = new Array(11)
        newArr[0] = grid[8]
        newArr[1] = grid[4]
        newArr[2] = grid[0]
        newArr[3] = grid[3]
        newArr[4] = grid[9]
        newArr[5] = grid[5]
        newArr[6] = grid[1]
        newArr[7] = grid[7]
        newArr[8] = grid[10]
        newArr[9] = grid[6]
        newArr[10] = grid[2]
        return newArr.join("")
    }
}

function rotate(grid, amount) {
    let newGrid = rotateCore(grid)
    if (amount > 1)
        newGrid = rotateCore(newGrid)
    if (amount > 2)
        newGrid = rotateCore(newGrid)
    return newGrid
}

const hydratedData = data.reduce((acc, curr) => {
    const mirrH = mirror(curr.input, 'horizontal')
    const mirrV = mirror(curr.input, 'vertical')
    return acc.concat([
        { input: curr.input, output: curr.output },
        { input: rotate(curr.input, 1), output: curr.output },
        { input: rotate(curr.input, 2), output: curr.output },
        { input: rotate(curr.input, 3), output: curr.output },
        { input: mirrH, output: curr.output },
        { input: rotate(mirrH, 1), output: curr.output },
        { input: rotate(mirrH, 2), output: curr.output },
        { input: rotate(mirrH, 3), output: curr.output },
        { input: mirrV, output: curr.output },
        { input: rotate(mirrV, 1), output: curr.output },
        { input: rotate(mirrV, 2), output: curr.output },
        { input: rotate(mirrV, 3), output: curr.output }
    ])
}, [])

function split(pattern) {
    if (pattern.split("/").length % 2 === 0) {
        const patternStr = pattern.split("").filter(noDash).join("")
        

        const size = pattern.split("/").length
        const arraySize = size / 2 * size / 2

        const conversionMap = new Array(arraySize).fill(true).reduce((acc, _, idx) => {
            const foo = 2
            const row = Math.floor(idx / (size/2))
            const column = idx % (size/2)
            
            const entry = [
                (row * size*2) + (column * foo),
                (row * size*2) + (column * foo) + 1,
                false,
                (row * size*2) + (column * foo) + size,
                (row * size*2) + (column * foo) + size + 1,
            ]
            .map(x => x === false ? "/" : patternStr[x]).join("")
            return acc.concat(entry)
        }, [])
        return conversionMap
    }

    //First iteration
    if (pattern.split("/").length === 3) {
        return [pattern]
    }

    if (pattern.split("/").length % 3 === 0) {
        const patternStr = pattern.split("").filter(noDash).join("")

        const size = pattern.split("/").length
        const arraySize = size / 3 * size / 3

        const conversionMap = new Array(arraySize).fill(true).reduce((acc, _, idx) => {
            const foo = 3
            const row = Math.floor(idx / (size/3))
            const column = idx % (size/3)

            const entry = [
                (row * size*3) + (column * foo),
                (row * size*3) + (column * foo) + 1,
                (row * size*3) + (column * foo) + 2,
                false,
                (row * size*3) + (column * foo) + size,
                (row * size*3) + (column * foo) + size + 1,
                (row * size*3) + (column * foo) + size + 2,
                false,
                (row * size*3) + (column * foo) + (size*2),
                (row * size*3) + (column * foo) + (size*2) + 1,
                (row * size*3) + (column * foo) + (size*2) + 2,
            ]
            .map(x => x === false ? "/" : patternStr[x]).join("") //y => { console.log(y); return y }).map
            return acc.concat(entry)
        }, [])
        return conversionMap
    }
    
}

function divide(arr) {
    const len = Math.sqrt(arr.length)
    return new Array(len).fill(true).map((_, idx) => {
        return arr.slice(idx * len, (idx*len)+len) 
    })
} 

function flat(nestedArr) {
    return nestedArr.reduce((acc, curr) => acc.concat(curr), [])
}

function glue(pieces) {
    if (pieces.length === 1)
        return pieces[0]

    const threes = pieces[0].split("/")[0].length === 3
    const divided = divide(pieces)

    const startArr = () => threes ? [[], [], []] : [[], [], [], []]
    
    const readyForGlue = divided.map((x, i) => {
        const reduced = x.reduce((acc, curr) => {
            const o = curr.split("/")
            if (threes === true) {
                acc[0] = acc[0].concat(o[0])
                acc[1] = acc[1].concat(o[1])
                acc[2] = acc[2].concat(o[2])
            }
            if (threes === false) {
                acc[0] = acc[0].concat(o[0])
                acc[1] = acc[1].concat(o[1])
                acc[2] = acc[2].concat(o[2])    
                acc[3] = acc[3].concat(o[3])    
            }
            return acc
        }, startArr())

        return reduced
    }).map(x => x.map(y => y.join("")))

    return flat(readyForGlue).join("/")
}

function growStep(acc) {
    
    acc = split(acc)

    const convertedPieces = acc.map(x => {
        const result = hydratedData.find(y => y.input === x)
        if (!result) {
            console.error('Pattern ', x, ' not found')
            return undefined
        }
        return result.output
    })
    
    const o = glue(convertedPieces)

    console.log('\n\nIteration:')
    console.log(o.split("").map(x => x === "/" ? "\n" : x).join(""))
    console.log('Amount of hashes: ', o.split("").filter(x => x === "#").length)

    return o
}


function grow(pattern, amount) {

    const range = new Array(amount).fill(true)

    return range.reduce(growStep, pattern)
}

console.log('Tests:')

console.log(rotate("ab/cd", 3))
console.log(mirror("ab/cd", 'horizontal'))
console.log(mirror("ab/cd", 'vertical'))

console.log(rotate("abc/def/ghi", 1))
console.log(mirror("abc/def/ghi", 'horizontal'))
console.log(mirror("abc/def/ghi", 'vertical'))

console.log('test split 1: ',
    JSON.stringify(split(".#./..#/###")) === JSON.stringify([".#./..#/###"]))

console.log('test split 2: ',
    JSON.stringify(split("#..#/..../..../#..#")) === JSON.stringify(["#./..", ".#/..", "../#.", "../.#"]))

console.log('test grow 1: ',
    JSON.stringify(growStep(".#./..#/###")) === JSON.stringify("#..#/..../..../#..#"))

console.log('test grow 2: ',
    JSON.stringify(growStep("#..#/..../..../#..#")) === JSON.stringify("##.##./#..#../....../##.##./#..#../......"))

console.log('test grow 3: ',
    JSON.stringify(growStep("##..../##..../....../....../....../......")) === JSON.stringify("........./.#..#..#./........./........./.#..#..#./........./........./.#..#..#./........."))

console.log('test glue 1:',
        glue([ '##./#../...', '##./#../...', '##./#../...', '##./#../...' ]) === "##.##./#..#../....../##.##./#..#../......")

console.log('test flat 1:',
        JSON.stringify(flat([[1,2], [3,4]])) === JSON.stringify([1,2,3,4]))

console.log('divide 1:',
        JSON.stringify(divide([ 1,2,3,4,5,6,7,8,9 ], 3)) === JSON.stringify([[1,2,3], [4,5,6], [7,8,9]]))

console.log('divide 2:',
        JSON.stringify(divide([ 1,2,3,4 ], 2)) === JSON.stringify([[1,2], [3,4]]))

console.log('Running simulation:')
grow(initPattern, 5)

