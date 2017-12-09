
function streamHandler(acc, curr) {

  let { score, depth, garbage, garbageCollected, ignore } = acc

  if (ignore) {
    ignore = false
    return { score, depth, garbage, garbageCollected, ignore }
  }

  if (curr === "!") {
    ignore = true
    return { score, depth, garbage, garbageCollected, ignore }
  }

  if (garbage) {
    if (curr === ">") {
      garbage = false
    } else {
      garbageCollected += 1
    }
    return { score, depth, garbage, garbageCollected, ignore }
  }

  if (curr === "{")
    depth += 1

  if (curr === "<")
    garbage = true

  if (curr === "}") {
    score += depth
    depth -= 1
  }
    
  return { score, depth, garbage, garbageCollected, ignore }
}

function streamProcessor(inputStr) {
  const dataStream = inputStr.split("")

  const initialState = {
    score: 0,
    depth: 0,
    garbage: false,
    garbageCollected: 0,
    ignore: false
  }

  return dataStream.reduce( streamHandler, initialState )
}

module.exports = streamProcessor