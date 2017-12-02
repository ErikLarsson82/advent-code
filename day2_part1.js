const R = require('ramda')
const d3 = require('d3')
const fs = require('fs')
 
function toInt() {
    return R.map(x => parseInt(x))
}

function minMaxDiff(list) {
    return d3.max(list) - d3.min(list)
}

function checksum(input) {
  const rows = R.split('\r\n', input)

  const compacted = rows.map( item => R.split( / +/, item ) )
  const ints = R.map( toInt(), compacted )
  return R.reduce( (acc, curr) => minMaxDiff(curr) + acc, 0, ints )
}

const content = fs.readFileSync("day2.txt", 'utf-8' )

console.log(checksum(content))

