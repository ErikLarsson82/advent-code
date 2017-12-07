const treeify = require("treeify")
const fs = require('fs')

const contentStr = fs.readFileSync('day7_input.txt', 'utf-8')

const stringArray = contentStr.split(/[\n\r]/).filter(x => x)

const model = formatModel(stringArray)

function formatModel(input) {
  return input.map( str => {
    const arrowDivider = str.split(" -> ")
    const id = arrowDivider[0].split(" ")[0]
    const weight = Number(arrowDivider[0].split(" ")[1].replace(/[()]/g, ""))
    const children = arrowDivider[1] && arrowDivider[1].split(", ") || null
    return { id, weight, children}
  })
}

function findRootNode(model) {
  //Find a node that is not present in any other children array
  return model.find( node => {
    
    //Go through all other nodes
    const result = model.find( searchNode => {
      if (!searchNode.children)
        return false
      //Is the node we are looking for present here?
      return searchNode.children.find( searchee => searchee === node.id )
    })

    if (typeof result === "undefined")
      return node

    //It wasn't the droid we where looking for
    return false
  })
}

function createTower(model) {
  const findById = id => model.find(leaf => leaf.id === id)

  function createBranch({ id, weight, children }) {
    if (typeof id === "undefined")
      return { children: null }
    if (children === null)
      return findById(id)

    const branchBelow = children.map( childId => createBranch(findById(childId)) )

    const sum = branchBelow.reduce( (acc, curr) => acc + curr.weight, 0 )
    const average = sum / branchBelow.length

    const everyoneHasAverage = branchBelow.find( node => node.weight === average )

    const newNode = { id, ownWeight: weight, weight: sum + weight, children: branchBelow }

    if (!everyoneHasAverage) {
      console.log('Weight redistribution mismatch detected: \n')
      console.log('id: ' + id + ', ownWeight: ' + weight)
      branchBelow.map( node => console.log(node.id + ": " + node.weight + " - own: " + node.ownWeight))
      return { children: null }
    }

    return newNode
  }

  return createBranch(findRootNode(model))
}

console.log(treeify.asTree(createTower(model), true)) // Remove 8 -> apjxafk 1513 -> 1505

//console.log(findRootNode(model)) // -> id "hlhomy"
