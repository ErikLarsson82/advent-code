var a = 1, b, c, d, e, f, h = 0

b = 107900
c = 124900

do {

  f = true
  for (d = 2; d < b; d += 1) {
    if (b % d === 0) {
      f = false
      break;
    }
  }

  if (!f) {
    h++
  }
  if (b - c === 0) { break }

  b = b + 17

} while (true)

console.log('h', h)
