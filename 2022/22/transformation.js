const data = ` br
 w 
og
y`

const map = []

data.split('\n').forEach((row, y) => {
  row.split('').forEach((column, x) => {
    map.push({ x, y, char: column })
  })
})

let str = ''
for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 3; x++) {
    const target = map.find(({ x: xP, y: yP }) => x === xP && y === yP)
    if (target) {
      str += target.char
    } else {
      str += ' '
    }
  }
  str += '\n'
}
console.log(str)
console.log(map)