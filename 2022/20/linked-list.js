const f = {
  value: 6,
  link: null
}

const e = {
  value: 5,
  link: f
}

const d = {
  value: '1a',
  link: e
}

const c = {
  value: 3,
  link: d
}

const b = {
  value: 2,
  link: c
}

const a = {
  value: '1b',
  link: b
}

const zero = {
  value: 0,
  link: a
}

//final link
f.link = zero

function printObject(obj) {
  console.log('Value=', obj.value,'links to', obj.link.value)
}

function printLinkedChain(status) {
  console.log(status)
  let str = ''
  let currentObject = zero
  do {
    str += currentObject.value
    currentObject = currentObject.link
    if (currentObject.value !== 0) {
      str += ','
    }
  } while (currentObject.value !== 0)
  console.log(str)
}

function findWhoHasMeAsLink(me) {
  let current = me
  do {
    current = current.link
  } while (current.link !== me)
  return current
}

function moveTwo() {
  let currentObject = zero

  do {
    if (currentObject.value === '1a' || currentObject.value === '1b') {
      const from = findWhoHasMeAsLink(currentObject)      
      const next = currentObject.link
      const afterNext = currentObject.link.link
      
      from.link = next
      currentObject.link = afterNext
      next.link = currentObject
    }
    currentObject = currentObject.link
  } while (currentObject.value !== 0)
}

printLinkedChain('Initial')
moveTwo()
printLinkedChain('After move 1')
moveTwo()
printLinkedChain('After move 2')
moveTwo()
printLinkedChain('After move 3')
moveTwo()
printLinkedChain('After move 4')
moveTwo()
printLinkedChain('After move 5')