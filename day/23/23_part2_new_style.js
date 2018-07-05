var a = 1, b, c, d, e, f, g, h = 0

b = 79
c = b
b = b * 100
b = b + 100000
c = b
c = c + 17000

while (true) {

  f = 1
  d = 2
  do {
    e = 2
    do {
      g = d
      g = g * e
      g = g - b
      if (g === 0) {
        f = 0
        e = e + 1
      }
      g = e
      g = g - b
    } while(g !== 0)

    d = d + 1
    g = b
  } while(g !== 0)

  if (f === 0) {
    h = h + 1
  }
  g = b
  g = g - c
  if (g === 0) {
    console.log('h', h)
    return
  }
  b = b + 17

}
