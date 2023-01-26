const MAX = 22

let droplets

function isOutside(droplet) {
  const { x, y, z } = droplet
  return x < 0 || y < 0 || z < 0 || x > MAX || y > MAX || z > MAX
}

function traverse(x, y, z, cubes, cavities, openWater, sides, scanType) {
  
  const isAlreadyVisited = visits.find(same(x,y,z))

  if (isAlreadyVisited) {
    return 'already-visited'
  }
  
  const isDroplet = droplets.find(same(x,y,z))
  if (scanType === 'cube-scan') {
    if (isDroplet) {
      cubes = cubes.concat({ x, y, z })    
    } else {
      return 'empty-space'
    }
  } else {
    // cavity-scan
    if (!isDroplet) {
      visits = visits.concat({ x, y, z })
    } else {
      return 'cube'
    }
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

  let foundEdge = visits.filter(isOutside).length > 0
  if (foundEdge) {
    return 'found-edge'
  }

  let proxy = null

  directions.forEach(({ x: xP, y: yP, z: zP}) => {
    console.log('trying', x, y, z, xP, yP, zP)
    if (visits === null) return
    const result = traverse(x + xP, y + yP, z + zP, visits, 0, scanType)

    /*if (result === 'confirmed-not-cavity') {
      foundEdge = true
      return
    }*/

    if (result === 'empty-space') {
      sides++
      return
    }
    if (result === 'already-visited') {
      // dont count me, i've already been counted
      return
    }
    if (result === 'cube') {
      return
    }
    /*if (result.visits === undefined) {
      console.log('when is this', result)
    }*/
    if (result === 'found-edge') {
      visits = null
      proxy = 'found-edge'
      return
    }
    /*if (result === 'confirmed-cavity') {
      proxy = 'confirmed-cavity'
      visits = null
      return
    }*/
    visits = result.visits
    sides = sides + result.sides
  })

  if (scanType === 'cube-scan') {
    return {
      visits,
      sides
    }
  }
  if (scanType === 'cavity-scan') {
    if (proxy === null) {
      console.log('no traversals found edge, assume cavity')
      return {
        status: 'confirmed-cavity',
        visits: visits
    }
    return proxy
    //console.log('sides', sides)
    //return proxy //foundEdge ? 'found-edge' : 'confirmed-cavity'
  }
}

function same(x,y,z) {
  return ({ x: xP, y: yP, z: zP}) => x === xP && y === yP && z === zP
}

/*
`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`
*/

let max = 0
  
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  droplets = data.trim()
    .split('\n')
    .map(row => {
      const [x, y, z] = row.split(',').map(o => parseInt(o))
      if (x > max) max = x
      if (y > max) max = y
      if (z > max) max = z
      return { x, y, z }
    })

  console.log('Max is', max)

  let sum = 0
  let _visits = []
  droplets.forEach(droplet => {
    
    const result = traverse(droplet.x, droplet.y, droplet.z, _visits, 0, 'cube-scan')
    console.log('result', result)
    if (result !== 'already-visited') {
      sum = sum + result.sides
      _visits = result.visits
    }
  })

  let searches = 0
  droplets.forEach(droplet => {
    //console.log('testing droplet', droplet)
    const { x, y, z } = droplet

    //if (x === 2 && y === 2 && z === 4) {
      // const result = traverse(droplet.x, droplet.y, droplet.z, _visits, 0)

      // visit all six directions for cavities
      const directions = [
        { x:  1, y: 0, z: 0 },
        { x: -1, y: 0, z: 0 },
        { x: 0, y:  1, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 0, y: 0, z:  1 },
        { x: 0, y: 0, z: -1 }
      ]
      directions.forEach(({ x: xP, y: yP, z: zP}) => {
        //console.log('direction', xP, yP, zP)

        const v2 = []
        searches++
        //console.log('starting search', x, y, z, xP, yP, zP, 'search', searches)
        const result = traverse(x + xP, y + yP, z + zP, v2, 0, 'cavity-scan')
        //console.log('result', result)

        if (result === 'confirmed-cavity') {
          sum -= 1

          //console.log('i found cavity at', xP, yP, zP)
        }
        if (result === 'found-edge') {
          //console.log('i found edge at', xP, yP, zP)
        }
      })
    //}
  })

  console.log('Total sides', sum)
})
