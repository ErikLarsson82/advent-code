const MAX = 22

let droplets = []
let seawater = []
let cavities = []

const sum = (acc, curr) => acc + curr

function isOutside(droplet) {
  const { x, y, z } = droplet
  return x < 0 || y < 0 || z < 0 || x >= MAX || y >= MAX || z >= MAX
}

function same(x,y,z) {
  return ({ x: xP, y: yP, z: zP}) => x === xP && y === yP && z === zP
}

const directions = [
  { x:  1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y:  1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z:  1 },
  { x: 0, y: 0, z: -1 }
]

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  droplets = data.trim()
    .split('\n')
    .map(row => {
      const [x, y, z] = row.split(',').map(o => parseInt(o))
      return { x, y, z }
    })

  // Find all seawater
  let foundOne = true
  while(foundOne) {
    foundOne = false
    
    for (let x = 0; x < MAX; x++) {
      for (let y = 0; y < MAX; y++) {
        for (let z = 0; z < MAX; z++) {

          if (droplets.find(same(x,y,z))) continue;
          if (seawater.find(same(x,y,z))) continue;
          
          directions.forEach((comparee) => {
            const { x: xP, y: yP, z: zP} = comparee
            const target = { x: x + xP, y: y + yP, z: z + zP }
            const targetIsSeawater = seawater.find(same(target.x, target.y, target.z))
            
            if ((isOutside(target) || targetIsSeawater) && !seawater.find(same(x,y,z)))  {
              foundOne = true
              seawater.push({ x, y, z })
            }
          })

        }
      }
    }
  }

  // All not seawater and droplets is cavities
  for (let x = 0; x < MAX; x++) {
    for (let y = 0; y < MAX; y++) {
      for (let z = 0; z < MAX; z++) {

        if (droplets.find(same(x,y,z))) continue;
        if (seawater.find(same(x,y,z))) continue;
        
        cavities.push({ x, y, z })
      }
    }
  }

  let sides = 0
  droplets.forEach(droplet => {
    const { x, y, z } = droplet
    const currentSides = directions.map((comparee) => {
      const { x: xP, y: yP, z: zP} = comparee
      const target = { x: x + xP, y: y + yP, z: z + zP }

      if (seawater.find(same(target.x, target.y, target.z))) return 1
      if (cavities.find(same(target.x, target.y, target.z))) return 0
      if (droplets.find(same(target.x, target.y, target.z))) return 0
      if (isOutside(target)) return 1
      throw new Error('panic')
    })
    sides += currentSides.reduce(sum, 0)
  })

  console.log('all done', droplets.length, seawater.length, cavities, 'total sides exposed to seawater', sides)
})
