const { knotHash } = require('./day10_part2.js')

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Enter password:', answer => {

  if (knotHash(answer) === '94bd4f7c8ca80bb6a451c19bc0135fa0') {
    console.log('Password correct, in the vault you find: "Puss is the best"')
  } else {
    console.log('Password incorrect')
  }

  rl.close()
})
