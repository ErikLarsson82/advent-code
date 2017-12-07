const treeify = require("treeify")

const model = [
  { id: "padx", weight: 45, children: ["pbga", "test"] },
  { id: "test", weight: 45, children: null },
  { id: "test2", weight: 45, children: null },
  { id: "pbga", weight: 66, children: null },
  { id: "tknk", weight: 41, children: ["padx", "test2"] }
]

function findParent(node) {
  return model.find( leaf => {
    if (!leaf.children)
      return false
    const result = leaf.children.find( searchee => searchee === node )
    console.log('finding in leaf ' + leaf.id + ", " + result)
    return result
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
    if (children === null)
      return findById(id)

    const branchBelow = children.map( childId => createBranch(findById(childId)) )

    return { id, weight, children: branchBelow }
  }

  return createBranch(findById(model[0].id))
}

//console.log(treeify.asTree(createTower(model), true))

console.log(findRootNode(model))
