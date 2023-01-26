// this was not feasible, it got stuck on the second value forever
let instructions
let first
let zero
let previous

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, _data) => {

  const data = `1
2
-3
3
-2
0
4`

  instructions = data.trim().split('\n').map((x, id) => ({ instructionValue: parseInt(x) * 811589153, id }));

  data.trim().split('\n').map(x=>x.trim()).forEach((value, id) => {
    const created = {
      value: parseInt(value) * 811589153,
      id,
      link: null
    }
    if (!first) {
      first = created
    }
    if (previous !== undefined) {
      previous.link = created
    }
    previous = created

    if (parseInt(value) === 0) {
      zero = created
    }
  })

  previous.link = first

  relinkPrevious()

  const DEBUG = false
  
  DEBUG && printLinkedChain('Initial')
  DEBUG && printInvertedLinkedChain('Initial (inverted)')

  for (let i = 0; i < 10; i++) {
    instructions.forEach(({ instructionValue, id }) => {
      console.log('Instruction value', instructionValue, 'id', id)
      if (instructionValue === 0) return
      const func = instructionValue > 0 ? moveForward : moveBackward

      new Array(Math.abs(instructionValue)).fill().forEach(() => func(id))
      
      DEBUG && printLinkedChain('After instruction ' + instruction)  
      DEBUG && printInvertedLinkedChain('After instruction (inverted)' + instruction)
    })
  }

  count()

})

function printObject(obj) {
  console.log('Value=', obj.value,'links to', obj.link.value)
}

function printLinkedChain(status) {
  console.log(status)
  let str = ''
  let currentObject = zero
  do {
    str += currentObject.value
    if (currentObject.link === null) {
      console.log(str)
      throw new Error('missing link, panic')
    }
    currentObject = currentObject.link
    if (currentObject.value !== 0) {
      str += ','
    }
  } while (currentObject.value !== 0)
  console.log(str)
}

function printInvertedLinkedChain(status) {
  console.log(status)
  let str = ''
  let currentObject = zero
  do {
    str += currentObject.value
    if (currentObject.previousLink === null) {
      console.log(str)
      throw new Error('missing link, panic')
    }
    currentObject = currentObject.previousLink
    if (currentObject.value !== 0) {
      str += ','
    }
  } while (currentObject.value !== 0)
  console.log(str)
}

function relinkPrevious() {
  let current = zero
  let previous
  do {
    previous = current
    current = current.link
    current.previousLink = previous
  } while (current.value !== 0)
}

function moveForward(id) {
  let currentObject = zero

  do {
    
    if (currentObject.id === id) {
      const a = currentObject.previousLink
      const b = currentObject.link
      const c = currentObject.link.link
      
      a.link = b
      currentObject.link = c
      b.link = currentObject

      relinkPrevious()

      if (b.value === 0) {
        break;
      }
    }
    currentObject = currentObject.link
  } while (currentObject.value !== 0)
}

function moveBackward(id) {
  let currentObject = zero

  do {
    if (currentObject.id === id) {
      const a = currentObject.link
      const b = currentObject.previousLink
      const c = currentObject.previousLink.previousLink
      
      c.link = currentObject
      currentObject.link = b
      b.link = a

      relinkPrevious()

      if (b.value === 0) {
        break;
      }
    }
    currentObject = currentObject.previousLink
  } while (currentObject.value !== 0)
}

function count() {
  let oneThousand
  let twoThousand
  let threeThousand
  let c = 0

  let currentObject = zero

  do {
    currentObject = currentObject.link
    c++
    if (c === 1000) {
      oneThousand = currentObject.value
    }
    if (c === 2000) {
      twoThousand = currentObject.value
    }
    if (c === 3000) {
      threeThousand = currentObject.value
    }
    
  } while (c <= 3000)

  console.log('Numbers are', oneThousand, twoThousand, threeThousand, 'Final sum is', oneThousand + twoThousand + threeThousand)
}
