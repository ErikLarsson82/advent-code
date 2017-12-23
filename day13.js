const r = require('ramda')
const fs = require('fs')
const contentStrInput = fs.readFileSync('day13_input.txt', 'utf-8')

function step({ pos, range, down }) {
  if (typeof pos === "undefined" || typeof range === "undefined")
    return {}

  if (range === 1)
    return { pos, range, down: !down }

  if (down) {
    pos++
    if (pos >= range)
      return { pos: pos - 2, range, down: false }
  } else {
    pos--
    if (pos < 0)
      return { pos: pos + 2, range, down: true }
  }
  return { pos, range, down }
}



function createPacketScanners(str) {
  const rangeStrings = str.trim().split("\n")

  const pairs = rangeStrings.map( x => x.split(":") )

  const filteredPairs = pairs.map( x => x.map( y => y.trim() ) )

  const largest = parseInt(filteredPairs[filteredPairs.length-1][0])
  const firewall = new Array(largest).fill({})
  
  filteredPairs.forEach( x => firewall[parseInt(x[0])] = { pos: 0, range: parseInt(x[1]), down: true } )

  return firewall
}



function executePicoSecond({ firewall, depth, severitySum, caught }) {
  
  depth++
  
  //firewallPrinter(firewall, depth, firewall.length)

  const { pos, range } = firewall[depth]

  if (typeof pos === "undefined" || typeof range === "undefined") {
    firewall = firewall.map( step )
    

    return { firewall, depth, severitySum, caught }
  }

  //check packet pos against firewall state
  //if caught, accumulate severitySum
  if (pos === 0) {
    severitySum += depth * range
    caught = true
  }
  
  //step firewall one picosecond
  firewall = firewall.map( step )
  
  return { firewall, depth, severitySum, caught }
}



function packetScanner(str, delay = 0) {
  let firewall = createPacketScanners(str)
  
  r.times( () => {
    firewall = firewall.map( step )
  }, delay )
  
  //repeat for as long as the firewall is
  //return severitySum
  return firewall.reduce( executePicoSecond, { firewall, depth: -1, severitySum: 0, caught: false } )
}


function printDepth(depth) {
  
  return ({ pos, range }, i) => {
    if (typeof pos === "undefined") {
      //console.log((depth === i) ? '(-)' : ' - ')
      return
    }

    let output = ""
    r.times( j => {
      //console.log('calling times with ' + j + ' depth ' + depth + ' wat: ' + (depth === j))
      if (depth === i && j === 0) {
        //console.log('true')
        output += (pos === j) ? ' (S) ' : ' ( ) ';
      } else {
        //console.log('false')
        output += (pos === j) ? ' [S] ' : ' [ ] ';
      }
    }, range) 
    console.log(output)
  }
}



function firewallPrinter(firewall, depth, amount) {
  if (depth > amount)
    return
  console.log('\nPrinting firewall')
  firewall.slice(0, amount).forEach( printDepth(depth) )
}


// 0 - 65,000 has been tested
function firewallDelaySolver(str) {
  let delay = 0
  let result = { caught: true }
  while(result.caught === true) {
    result = packetScanner(str, delay)
    //if (delay % 500 === 0)
    //  console.log('Testing with delay: ' + delay + ' and caught was ' + result.caught + ' and severity was ' + result.severitySum)
    delay++
  }
  return delay - 1
}

//console.log(firewallDelaySolver(contentStrInput))
//console.log(packetScanner(contentStrInput, 6).severitySum)

module.exports = { step, packetScanner, firewallDelaySolver }
