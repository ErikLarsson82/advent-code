let droplets

function traverse(x, y, z, visits, sides) {
  const isAlreadyVisited = visits.find(same(x,y,z))

  if (isAlreadyVisited) {
    return 'already-visited'
  }
  
  const isDroplet = droplets.find(same(x,y,z))
  if (isDroplet) {
    visits = visits.concat({ x, y, z })    
  } else {
    return 'empty-space'
  }
  
  // visit all six directions
  const directions = [
    { x:  1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y:  1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z:  1 },
    { x: 0, y: 0, z: -1 }
  ]
  directions.forEach(({ x: xP, y: yP, z: zP}) => {
    const result = traverse(x + xP, y + yP, z + zP, visits, 0)
    if (result === 'empty-space') {
      sides++
      return
    }
    if (result === 'already-visited') {
      // dont count me, i've already been counted
      return
    }
    visits = result.visits
    sides = sides + result.sides
  })
  return {
    visits,
    sides
  }
}

function same(x,y,z) {
  return ({ x: xP, y: yP, z: zP}) => x === xP && y === yP && z === zP
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  droplets = data.trim()
    .split('\n')
    .map(row => {
      const [x, y, z] = row.split(',').map(o => parseInt(o))
      return { x, y, z }
    })

  let sum = 0
  let _visits = []
  droplets.forEach(droplet => {
    const result = traverse(droplet.x, droplet.y, droplet.z, _visits, 0)
    if (result !== 'already-visited') {
      sum = sum + result.sides
      _visits = result.visits
    }
  })

  console.log('Total sides', sum)
})
