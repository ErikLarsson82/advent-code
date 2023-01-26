
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

function limitPrime(num) {
  let sum = 0
  for (let i = 0; i < num; i++) {
    sum += Math.pow(5, i) * 2
  }
  return sum
}

function prime(input) {
  console.log('prime called with input', input)
  if (input === 1) return '1'
  if (input === 2) return '2'
  if (input === 0) return '0'
  if (input === -1) return '-'
  if (input === -2) return '='

  let str = ''
  for (let i = 3; i >= 0; i--) {
    const large = Math.pow(5, i) * 2
    const small = Math.pow(5, i) * 1
    const imWayTooBig = small - limitPrime(i) > input

    console.log(i, large, small, limitPrime(i), imWayTooBig)
    
    if (imWayTooBig) continue;

    const a = Math.abs(input - large)
    const b = Math.abs(input - small)
    
    if (a > b) {
      if (large > input) {
        str += '2' + prime(large - input)
      } else {
        str += '2' + prime(input - large)
      }
    } else {
      if (small > input) {
        str += '1' + prime(small - input)
      } else {
        str += '1' + prime(input - small)
      }
    }
  }
  return str
}

console.log(prime(5))

function base10ToSnafu(target) {
  if (target === 1) return '1'
  if (target === 2) return '2'
  if (target === 0) return '0'
  if (target === -1) return '-'
  if (target === -2) return '='

  if ((Math.pow(5, 2) * 2) - target === 0) {
    return '2' + base10ToSnafu(0) + base10ToSnafu(0)
  }

  if ((Math.pow(5, 1) * 2) - target === 0) {
    return '2' + base10ToSnafu(0)
  }

  return '1' + base10ToSnafu(target - 5)
  // 3 = 5 - 2
}

const sum = (acc, curr) => acc + curr

/*
console.log('1', base10ToSnafu(1))
console.log('2', base10ToSnafu(2))
console.log('3', base10ToSnafu(3))
console.log('4', base10ToSnafu(4))
console.log('5', base10ToSnafu(5))
console.log('6', base10ToSnafu(6))
console.log('7', base10ToSnafu(7))
*/
//console.log('10', base10ToSnafu(10))
//console.log('11', base10ToSnafu(10))
//console.log('50', base10ToSnafu(50))


/*function base10ToSnafu(target) {
  let str = ''
  let accumulator = 0
  const limit = new Array(5).fill().map((_, idx) => Math.pow(5, idx) * 2)

  console.log('limits', limit)

  //for (let i = 3; i >= 0; i--) {
    const base = Math.pow(5, i)

    //const withinLimit = (base*2) - limit[i-1]
    //const canReduce2 = (base * 2) - (limit[i-1]*2) <= target
    //const canReduce1 = (base * 1) - (limit[i-1]*2) <= target
    //console.log('testing acc', accumulator,'against target', target,'with i=', i, 'base=', base,'canReduce1=',canReduce1)

    //if (accumulator < target) {

    //}
    /*
    console.log(i, base)
    if (accumulator < target) {
      if (accumulator + (base * 1) > target) {
        console.log('accumulator + (base * 1) is TOO BIG', accumulator + (base * 1))
      } else {
        //console.log(i, 'is applicable', base * 2, base * 1)

        if (accumulator + (base * 2) > target) {
          accumulator += (base * 1)
          //console.log('adding 1', (base * 1))
          str += '1'          
        } else {
          accumulator += (base * 2)
          //console.log('adding 2', (base * 2))
          str += '2'
        }
      }
    }
    */

    /*
    console.log('try', i, num, base, base * 2, (base) - num)
    console.log('compare with', newNum, newNum + (base * -1))
    if (base - num > num) {
      str += ''
    } else if (base * 1 > newNum) {
      str += '1'
      newNum = newNum + (base * 1)
    } else if (base * 2 > newNum) {
      str += '2'
      newNum = newNum + (base * 2)
    } else if (0 < newNum + (base * -1)) {
      str += '-'
      newNum = newNum + (base * -1)
    } else if (0 < newNum + (base * -2)) {
      str += '='
      newNum = newNum + (base * -2)
    } else {
      str += '0'
      newNum = newNum + 0
    }
    */
  //}
  //console.log('str', str)
  //console.log('accumulator', accumulator)
//}

/*
const result = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`.split('\n').map(snafuToBase10).reduce(sum, 0)
*/

//console.log(result)
/*
console.log(snafuToBase10('2=-01'), '976')
console.log(snafuToBase10('1'), '1')
console.log(snafuToBase10('2'), '2')
console.log(snafuToBase10('1='), '3')
console.log(snafuToBase10('1-'), '4')
console.log(snafuToBase10('10'), '5')
console.log(snafuToBase10('11'), '6')
console.log(snafuToBase10('12'), '7')
console.log(snafuToBase10('2='), '8')
console.log(snafuToBase10('2-'), '9')
console.log(snafuToBase10('20'), '10')
console.log(snafuToBase10('1=0'), '15')
console.log(snafuToBase10('1-0'), '20')
console.log(snafuToBase10('1=11-2'), '2022')
*/
//console.log(snafuToBase10('1-0---0'), '12345')
//console.log(snafuToBase10('1121-1110-1=0'), '0314159265')