const data = {} //

const engine = {
  index: 0,
  state: "a",
  run: function() {
    const states = {
      "a": this.runA.bind(this),
      "b": this.runB.bind(this),
      "c": this.runC.bind(this),
      "d": this.runD.bind(this),
      "e": this.runE.bind(this),
      "f": this.runF.bind(this)
    }
    states[this.state]()
  },
  runA() {
    /*
    In state A:
      If the current value is 0:
        - Write the value 1.
        - Move one slot to the right.
        - Continue with state B.
      If the current value is 1:
        - Write the value 0.
        - Move one slot to the left.
        - Continue with state B.
    */
    if (data[this.index] === undefined || data[this.index] === 0) {
      data[this.index] = 1
      this.index = this.index + 1
    } else {
      data[this.index] = 0
      this.index = this.index - 1
    }
    this.state = "b"
  },
  runB() {
    /*
      In state B:
      If the current value is 0:
        - Write the value 1.
        - Move one slot to the left.
        - Continue with state C.
      If the current value is 1:
        - Write the value 0.
        - Move one slot to the right.
        - Continue with state E.
    */
    if (data[this.index] === undefined || data[this.index] === 0) {
      data[this.index] = 1
      this.index = this.index - 1
      this.state = "c"
    } else {
      data[this.index] = 0
      this.index = this.index + 1
      this.state = "e"
    }
  },
  runC() {
    /*
      In state C:
      If the current value is 0:
        - Write the value 1.
        - Move one slot to the right.
        - Continue with state E.
      If the current value is 1:
        - Write the value 0.
        - Move one slot to the left.
        - Continue with state D.
    */
    if (data[this.index] === undefined || data[this.index] === 0) {
      data[this.index] = 1
      this.index = this.index + 1
      this.state = "e"
    } else {
      data[this.index] = 0
      this.index = this.index - 1
      this.state = "d"
    }
  },
  runD() {
    /*
      In state D:
      If the current value is 0:
        - Write the value 1.
        - Move one slot to the left.
        - Continue with state A.
      If the current value is 1:
        - Write the value 1.
        - Move one slot to the left.
        - Continue with state A.
    */
    if (data[this.index] === undefined || data[this.index] === 0) {
      data[this.index] = 1
      this.index = this.index - 1
      this.state = "a"
    } else {
      data[this.index] = 1
      this.index = this.index - 1
      this.state = "a"
    }
  },
  runE() {
    /*
      In state E:
      If the current value is 0:
        - Write the value 0.
        - Move one slot to the right.
        - Continue with state A.
      If the current value is 1:
        - Write the value 0.
        - Move one slot to the right.
        - Continue with state F.
    */
    if (data[this.index] === undefined || data[this.index] === 0) {
      data[this.index] = 0
      this.index = this.index + 1
      this.state = "a"
    } else {
      data[this.index] = 0
      this.index = this.index + 1
      this.state = "f"
    }
  },
  runF() {
    /*
      In state F:
      If the current value is 0:
        - Write the value 1.
        - Move one slot to the right.
        - Continue with state E.
      If the current value is 1:
        - Write the value 1.
        - Move one slot to the right.
        - Continue with state A.
    */
    if (data[this.index] === undefined || data[this.index] === 0) {
      data[this.index] = 1
      this.index = this.index + 1
      this.state = "e"
    } else {
      data[this.index] = 1
      this.index = this.index + 1
      this.state = "a"
    }
  }
}

const runDiagnostics = amount => {
  let counter = 0
  while (counter < amount) {
    if (counter % 1000000 === 0) {
      console.log('before iteration', counter, engine.state)
      print()
    }
    engine.run()
    counter++
  }
  console.log('final')
  print()
}

const sum = () => {
  let counter = 0
  for (let i in data) {
    if (data[i] === 1)
      counter = counter + 1
  }
  return counter
}

const print = () => {
  let str = ""
  for (var i = -20; i < 20; i++) {
    str = str + (data[i] || "0") + " "
  }
  console.log(str + "\n\n")
}

runDiagnostics(12861455) //12861455 
console.log(sum())