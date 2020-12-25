const data = require('fs').readFileSync('puzzle_input.txt', 'utf-8').split("\n")

const size = 1000
const grid = new Array(size).fill(new Array(size).fill(0))

/*const data = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`.split("\n")*/

let untouched = null

function increaseSquare(id, top, left, height, width) {
    let dirty = false
    grid.forEach((row, y) => 
        grid[y] = row.map((target, x) => {
            if (
                x >= left &&
                x < left + width &&
                y >= top &&
                y < top + height
            ) {
                if (target !== 0) {
                    dirty = true
                }
                return target + 1
            }
            return target
        })
    )
    if (!dirty) {
        untouched = id
    }
}

function removeZeroes() {
    grid.forEach((row, y) => 
        grid[y] = row.map(target => {
            return target === 0 ? '.' : target.toString()
        })
    )
}

//increaseSquare(1,3,4,4)
//increaseSquare(3,1,4,4)
//increaseSquare(5,5,2,2)

data.forEach((str, idx) => {
    const coordsStr = str.split("@")[1].trim()
    const id = str.split("@")[0].trim()
    const placement = coordsStr.split(":")[0].trim().split(",")
    const size = coordsStr.split(":")[1].trim().split("x")
    const top = parseInt(placement[0])
    const left = parseInt(placement[1])
    const width = parseInt(size[0])
    const height = parseInt(size[1])
    console.log('#', idx, top, left, width, height)
    increaseSquare(id, top, left, width, height)
})

function countTwos() {
    let counter = 0
    grid.forEach(row => 
        row.forEach(target => {
            if (target >= 2) {
                counter++
            }
        })
    )
    return counter
}

function printGrid() {
    let output = ""
    grid.forEach((row, y) => {
        row.forEach((target, x) => output+=target)
        output+="\n"
    })
    console.log(output)
}
//removeZeroes()
printGrid()
console.log(countTwos())
console.log(untouched)