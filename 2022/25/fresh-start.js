const sum = (acc, curr) => acc + curr

function calc(num, baseIndex) {
  if (baseIndex === 0) {
    if (num === 1) return '1'
    if (num === 2) return '2'
    if (num === 0) return '0'
    if (num === -1) return '-'
    if (num === -2) return '='
    throw new Error('panic')
    return 'panic' + num
  }
  if (num === 0) {
    return '0' + calc(0, baseIndex - 1)
  }

  if (limit(Math.abs(num)) < baseIndex) {
    return '0' + calc(num, baseIndex - 1) 
  }

  if (num > 0) {
    if (num - Math.pow(5, baseIndex) === 0) {
      return '1' + calc(0, baseIndex - 1)
    }
    if (num - Math.pow(5, baseIndex) * 2 === 0) {
      return '2' + calc(0, baseIndex - 1)
    }

    if (Math.abs(num - Math.pow(5, baseIndex)) < Math.abs(num - Math.pow(5, baseIndex) * 2)) {
      return '1' + calc(num - Math.pow(5, baseIndex), baseIndex - 1)
    } else {
      return '2' + calc(num - Math.pow(5, baseIndex) * 2, baseIndex - 1)
    }
  } else {
    if (num + Math.pow(5, baseIndex) === 0) {
      return '-' + calc(0, baseIndex - 1)
    }
    if (num + Math.pow(5, baseIndex) * 2 === 0) {
      return '=' + calc(0, baseIndex - 1)
    }

    if (Math.abs(num + Math.pow(5, baseIndex)) < Math.abs(num + Math.pow(5, baseIndex) * 2)) {
      return '-' + calc(num + Math.pow(5, baseIndex), baseIndex - 1)
    } else {
      return '=' + calc(num + Math.pow(5, baseIndex) * 2, baseIndex - 1)
    }
  }
}

function base10ToSnafu(num) {
  return calc(num, limit(num))
}

function limitPrime(num) {
  let sum = 0
  for (let i = 0; i < num; i++) {
    sum += Math.pow(5, i) * 2
  }
  return sum
}

function limit(num) {
  for (let i = 0; i < 45; i++) {
    if (num <= limitPrime(i)) return i - 1
  }
  return 0
}

function snafuToBase10(str) {
  let acc = 0
  str.split('').reverse().forEach((snafuChar, index) => {
    const base = Math.pow(5, index)

    if (snafuChar === '2') {
      acc = acc + (base * 2)
    }
    if (snafuChar === '1') {
      acc = acc + (base * 1)
    }
    if (snafuChar === '=') {
      acc = acc + (base * -2)
    }
    if (snafuChar === '-') {
      acc = acc + (base * -1)
    }
    if (snafuChar === '0') {
      acc = acc + (0) 
    }
  })

  return acc
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  const base10sum = data.split('\n').map(snafuToBase10).reduce(sum, 0)

  const snafuSum = base10ToSnafu(base10sum)

  console.log('Sum of snafu numbers (displayed in decimal)', base10sum)
  console.log('Sum of snafu numbers (displayed in snafu)', snafuSum)
})