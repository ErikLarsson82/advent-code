
// const entryString = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'

/*
const examples = [
	'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
	'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
	'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
	'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
	'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
	'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
	'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
	'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
	'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
	'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
]
*/
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	const rows = data.split('\n').filter(x => x !== '')
	
	const outputValues = rows.map(row => {
		return row.split('|')[1].split(' ').map(x=>x.trim()).filter(x => x !== '')
	})

	const digits = outputValues.flatMap(row => row.map(convertKnown)).filter(x => x !== '-')

	function convertKnown(string) {
		if (string.length === 2) {
			return '1'
		}
		if (string.length === 4) {
			return '4'
		}
		if (string.length === 3) {
			return '7'
		}
		if (string.length === 7) {
			return '8'
		}
		return '-'
	}

	console.log(outputValues, digits, digits.length)
})