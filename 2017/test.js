const { times } = require('ramda')

function grow(matrix) {
    //if (matrix.length % 3 === 0)
    //    return large
    if (matrix.length % 2 === 0) {
        const amounts = matrix.length / 2
        times(x => {
            times(y => {
                console.log("")
                console.log(x * 2, y * 2);       console.log((x * 2) + 1, y * 2);
                console.log(x * 2, (y * 2)+1);   console.log((x * 2) + 1, (y * 2) + 1)

            }, amounts)
        }, amounts)
        //split and enlarge
    }
    return []
}

const four = [
    [1,3],
    [2,4]
]

const three = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]

const large = [
    ["1", "5", "9", "c"],
    ["2", "6", "0", "d"],
    ["3", "7", "a", "e"],
    ["4", "8", "b", "f"]
]

/*
0,0 1,0    2,0 3,0
0,1 1,1    2,1 3,1

0,2 1,2    2,2 3,2
0,3 1,3    2,3 3,3
*/

// 0,0 1
// 2,0 3

let test = grow(three)
grow([[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]])

console.log(test)