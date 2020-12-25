const data = require('fs').readFileSync('puzzle_input.txt', 'utf-8').split("\n")

function howMany(idArr, amount) {

    // idArr = ['mphcuiszrnjzxwkbgdzqeoyxfa', 'mihcuisgrnjzxwkbgdtqeoylia', ..]

    const searchRest = (char, idx, charsList) => 
        //char ie 'm'
        charsList.filter(comparee => comparee === char).length === amount // compare to the amount we are looking for

    const hasAmount = str => 
        str.split("")        // str is ie 'mphcuiszrnjzxwkbgdzqeoyxfa' -> ['m','p','h'..]
            .map(searchRest) // at this point [true, false, true..]
            .includes(true)  // it only takes one instance to satisfy demand -> either return true or false
                
    return idArr.filter(hasAmount).length // count all instances found
}

const twos = howMany(data, 2)
const threes = howMany(data, 3)
console.log('twos', twos)
console.log('threes', threes)
console.log('total', twos * threes)