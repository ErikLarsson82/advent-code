function data(err, data) {
  if (err) {
    console.log('error', err)
  }
  return data
}

function parse(char) {
  return function(data) {
    return data.trim()
      .split(char)
      .map(x => x.trim())
      .map(x => parseInt(x))
  }
}

function pipe(a,b,c,d) {
  return function() {
    return d(c(b(a(...arguments))))
  }
}

module.exports = { data, parse, pipe }