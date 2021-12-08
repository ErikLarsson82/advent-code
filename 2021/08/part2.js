
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

const numberReference = {
	'012456': 0,
	'25': 1,
	'02346': 2,
	'02356': 3,
	'1235': 4,
	'01356': 5,
	'013456': 6,
	'025': 7,
	'0123456': 8,
	'012356': 9
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	const noJunk = x=>x!==null && x!==''
	const results = data.split('\n').filter(noJunk).map(str => {
		const signals = str.split('|')[0].split(' ').filter(noJunk)
		const digits = str.split('|')[1].split(' ').filter(noJunk)
		const segments = deduceSegment(signals)
		return parseInt(digits.map(x => unscramble(x, segments)).join(''))
	})	
	
	const sum = results.reduce((acc, curr) => acc + curr, 0)

	console.log('The sum of all fears', sum)
})

function deduceSegment(signals) {
	const digit = new Array(10).fill(null)
	const segment = new Array(7).fill(null)

	digit[1] = signals.find(x=>x.length===2)
	digit[4] = signals.find(x=>x.length===4)
	digit[7] = signals.find(x=>x.length===3)
	digit[8] = signals.find(x=>x.length===7)
	segment[0] = digit[7].split('').filter(x=>x !== digit[1][0] && x !== digit[1][1]).join()

	segment[2] = deduce(signals, digit[1], 8)
	segment[5] = deduce(signals, digit[1], 9)

	segment[1] = deduce(signals, digit[4], 6)
	segment[3] = deduce(signals, digit[4], 7)

	const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

	letters.filter(x=>!segment.includes(x)).forEach(segmentP => {
		if (signals.filter(x=>x.includes(segmentP)).length === 4) {
			segment[4] = segmentP
		}
		if (signals.filter(x=>x.includes(segmentP)).length === 7) {
			segment[6] = segmentP
		}
	})

	return segment
}

function unscramble(signal, translationTable) {
	const numberString = signal.split('').map(x => {
		return translationTable.indexOf(x)
	}).sort((a, b) => a > b ? 1 : -1).join('')

	return numberReference[numberString]
}

function transformOutput(segments) {
	return digitStr => {
		return digitStr.split('').map(d => {
			return segments.indexOf(d)
		})
	}
}

function deduce(signals, digit, sum) {
	for (let i = 0; i <= digit.length; i++) {
		const letter = digit[i]
		if (signals.filter(x=>x.includes(letter)).length === sum) return letter
	}
}