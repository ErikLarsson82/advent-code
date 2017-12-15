
function step({ pos, range, down, ...rest }) {
  if (typeof pos === "undefined" || typeof range === "undefined")
    return {}

  if (range === 1)
    return { pos, range, down: !down, ...rest }

  if (down) {
    pos++
    if (pos >= range)
      return { pos: pos - 2, range, down: false, ...rest }
  } else {
    pos--
    if (pos < 0)
      return { pos: pos + 2, range, down: true, ...rest }
  }
  return { pos, range, down, ...rest }
}



function createPacketScanners(str) {
  const rangeStrings = str.trim().split("\n")

  const pairs = rangeStrings.map( x => x.split(":") )

  const filteredPairs = pairs.map( x => x.map( y => y.trim() ) )

  const largest = parseInt(filteredPairs[filteredPairs.length-1][0])
  const firewall = new Array(largest).fill({})
  
  filteredPairs.forEach( x => firewall[parseInt(x[0])] = { pos: 0, range: x[1] } )

  return firewall
}



function executePicoSecond({ firewall, depth, severitySum }) {
  
  depth++
  
  const { pos, range } = firewall[depth]

  if (typeof pos === "undefined" || typeof range === "undefined") {
    firewall = firewall.map( step )
    return { firewall, depth, severitySum }
  }

  //check packet pos against firewall state
  //if caught, accumulate severitySum
  if (pos === 0) 
    severitySum += depth * range
  
  //step firewall one picosecond
  firewall = firewall.map( step )

  return { firewall, depth, severitySum }
}



function packetScanner(str) {
  const firewall = createPacketScanners(str)

  //repeat for as long as the firewall is
  //return severitySum
  return firewall.reduce( executePicoSecond, { firewall, depth: -1, severitySum: 0 } ).severitySum
}



module.exports = { step, packetScanner }
