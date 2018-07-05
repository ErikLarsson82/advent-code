var a = 1, b, c, d, e, f, h = 0

b = 107900
c = 124900

let count = 0
for (var x = 107900; x < 124900; x = x + 17) {
  let prime = true
  for (var y = 2; y < x; y++) {
    if (x % y === 0) {
      prime = false
    }
  }
  if (prime)
    count++
}
console.log(count)
return

while (true) {

  f = true
  d = 2
  do {
    e = 2
    do {
      if ((d * e) - b === 0) {
        f = false
      }
      e = e + 1
    } while(e - b !== 0)

    d = d + 1

  } while(d - b !== 0)

  if (f === true) {
    h = h + 1
  }
  if (b - c === 0) {
    console.log('h', h)
    return
  }
  b = b + 17
}
