const fs = require('fs')
const contentStr = fs.readFileSync('day9_input.txt', 'utf-8')

function streamHandler(acc, curr) {

  let { score, depth, garbage, ignore } = acc

  if (ignore) {
    ignore = false
    return { score, depth, garbage, ignore }
  }

  if (curr === "!")
    ignore = true

  if (garbage) {
    if (curr === ">") {
      garbage = false
    }
    return { score, depth, garbage, ignore }
  }

  if (curr === "{")
    depth += 1

  if (curr === "<")
    garbage = true

  if (curr === "}") {
    score += depth
    depth -= 1
  }
    
  return { score, depth, garbage, ignore }
}

function streamProcessor(inputStr) {
  const dataStream = inputStr.split("")

  const initialState = {
    score: 0,
    depth: 0,
    garbage: false,
    ignore: false
  }

  return dataStream.reduce( streamHandler, initialState ).score
}

module.exports = streamProcessor