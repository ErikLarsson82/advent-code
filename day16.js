const { curry, times } = require('ramda')
const fs = require('fs')
const contentStr = fs.readFileSync('day16_input.txt', 'utf-8')

let idx0 = "a"
let idx1 = "b"
let idx2 = "c"
let idx3 = "d"
let idx4 = "e"
let idx5 = "f"
let idx6 = "g"
let idx7 = "h"
let idx8 = "i"
let idx9 = "j"
let idx10 = "k"
let idx11 = "l"
let idx12 = "m"
let idx13 = "n"
let idx14 = "o"
let idx15 = "p"

function dance(str, amount = 1) {
  
  const instr = str.trim()
    .split(",")
    .map( x => x.trim() )
    .map( x => ({
      move: x[0],
      options: x.substring(1, x.length).split("/").map( y => x[0] === "p" ? y : parseInt(y) )
    }) )

  do {


    if (amount % 10000 === 0)
      console.log('Iteration ', amount)

    let len = 0
    let total = instr.length

    do {
      
      const move = instr[len].move
      const options = instr[len].options
      if (move === "s") {
        let size = options[0]
        do {
          let tmp = idx15
          idx15 = idx14
          idx14 = idx13
          idx13 = idx12
          idx12 = idx11
          idx11 = idx10
          idx10 = idx9
          idx9 = idx8
          idx8 = idx7
          idx7 = idx6
          idx6 = idx5
          idx5 = idx4
          idx4 = idx3
          idx3 = idx2
          idx2 = idx1
          idx1 = idx0
          idx0 = tmp
        } while(--size > 0)
      }
      if (move === "x") {
        const arr = [idx0,idx1,idx2,idx3,idx4,idx5,idx6,idx7,idx8,idx9,idx10,idx11,idx12,idx13,idx14,idx15]

        let arrTmp = arr[options[0]]
        arr[options[0]] = arr[options[1]]
        arr[options[1]] = arrTmp

        idx15 = arr[15]
        idx14 = arr[14]
        idx13 = arr[13]
        idx12 = arr[12]
        idx11 = arr[11]
        idx10 = arr[10]
        idx9 = arr[9]
        idx8 = arr[8]
        idx7 = arr[7]
        idx6 = arr[6]
        idx5 = arr[5]
        idx4 = arr[4]
        idx3 = arr[3]
        idx2 = arr[2]
        idx1 = arr[1]
        idx0 = arr[0]
      }
      if (move === "p") {

        const arr = [idx0,idx1,idx2,idx3,idx4,idx5,idx6,idx7,idx8,idx9,idx10,idx11,idx12,idx13,idx14,idx15]

        const aIdx = arr.indexOf(options[0])
        const bIdx = arr.indexOf(options[1])
        
        let arrTmp = arr[aIdx]
        arr[aIdx] = arr[bIdx]
        arr[bIdx] = arrTmp

        idx15 = arr[15]
        idx14 = arr[14]
        idx13 = arr[13]
        idx12 = arr[12]
        idx11 = arr[11]
        idx10 = arr[10]
        idx9 = arr[9]
        idx8 = arr[8]
        idx7 = arr[7]
        idx6 = arr[6]
        idx5 = arr[5]
        idx4 = arr[4]
        idx3 = arr[3]
        idx2 = arr[2]
        idx1 = arr[1]
        idx0 = arr[0]
      }
    } while (++len < total)
  } while (--amount > 0)
}

console.time('dance')

dance(contentStr, 1)

console.log([
  idx0,
  idx1,
  idx2,
  idx3,
  idx4,
  idx5,
  idx6,
  idx7,
  idx8,
  idx9,
  idx10,
  idx11,
  idx12,
  idx13,
  idx14,
  idx15
].join(""))

console.timeEnd('dance')

module.exports = { dance }