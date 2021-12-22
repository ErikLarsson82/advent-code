require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

	// Large
	const SIZE = 101
	const OFFSET = 50
	const MIN = -50
	const MAX = 50

	/*
	// Small
	const SIZE = 3
	const OFFSET = 1
	const MIN = -1
	const MAX = 1
	*/

	const matrix = new Array(SIZE).fill().map(x => {
		return new Array(SIZE).fill().map(y => {
			return new Array(SIZE).fill().map(z => {
				return null
			})
		})
	})

	function flip({ xMin, xMax, yMin, yMax, zMin, zMax, operation }) {
		for (let x = xMin; x <= xMax; x++) {
			if (x < MIN || x > MAX) continue

			for (let y = yMin; y <= yMax; y++) {
				if (y < MIN || y > MAX) continue

				for (let z = zMin; z <= zMax; z++) {
					if (z < MIN || z > MAX) continue

					matrix[x+OFFSET][y+OFFSET][z+OFFSET] = operation				
				}
			}
		}	
	}

	function prepare(str) {
		const operation = str.split(' ')[0]

		const xRangeStr = str.split(' ')[1].split(',')[0].split('=')[1]
		const xMin = parseInt(xRangeStr.split('..')[0])
		const xMax = parseInt(xRangeStr.split('..')[1])
		
		const yRangeStr = str.split(' ')[1].split(',')[1].split('=')[1]
		const yMin = parseInt(yRangeStr.split('..')[0])
		const yMax = parseInt(yRangeStr.split('..')[1])

		const zRangeStr = str.split(' ')[1].split(',')[2].split('=')[1]
		const zMin = parseInt(zRangeStr.split('..')[0])
		const zMax = parseInt(zRangeStr.split('..')[1])
		return { operation, xMin, xMax, yMin, yMax, zMin, zMax }
	}

	function printAndCount() {
		let str = ''
		let count = 0
		for (let x = MIN; x <= MAX; x++) {
			for (let y = MIN; y <= MAX; y++) {
				for (let z = MIN; z <= MAX; z++) {
					if (matrix[x+OFFSET][y+OFFSET][z+OFFSET] === 'on') {
						count += 1
					}
					//if (matrix[x+OFFSET][y+OFFSET][z+OFFSET] !== null)
						//console.log('x', x, 'y', y, 'z', z, 'state', matrix[x+OFFSET][y+OFFSET][z+OFFSET])
				}
			}
		}
		return count
	}

	const steps = [
		'on x=-2..2,y=-2..2,z=-2..2',
		'off x=0..0,y=0..0,z=0..0',
		'off x=1..1,y=0..0,z=1..1',
	]

	const first = [
		'on x=10..12,y=10..12,z=10..12',
		'on x=11..13,y=11..13,z=11..13',
		'off x=9..11,y=9..11,z=9..11',
		'on x=10..10,y=10..10,z=10..10',
	]

	const second = [
		'on x=-20..26,y=-36..17,z=-47..7',
		'on x=-20..33,y=-21..23,z=-26..28',
		'on x=-22..28,y=-29..23,z=-38..16',
		'on x=-46..7,y=-6..46,z=-50..-1',
		'on x=-49..1,y=-3..46,z=-24..28',
		'on x=2..47,y=-22..22,z=-23..27',
		'on x=-27..23,y=-28..26,z=-21..29',
		'on x=-39..5,y=-6..47,z=-3..44',
		'on x=-30..21,y=-8..43,z=-13..34',
		'on x=-22..26,y=-27..20,z=-29..19',
		'off x=-48..-32,y=26..41,z=-47..-37',
		'on x=-12..35,y=6..50,z=-50..-2',
		'off x=-48..-32,y=-32..-16,z=-15..-5',
		'on x=-18..26,y=-33..15,z=-7..46',
		'off x=-40..-22,y=-38..-28,z=23..41',
		'on x=-16..35,y=-41..10,z=-47..6',
		'off x=-32..-23,y=11..30,z=-14..3',
		'on x=-49..-5,y=-3..45,z=-29..18',
		'off x=18..30,y=-20..-8,z=-3..13',
		'on x=-41..9,y=-7..43,z=-33..15',
		'on x=-54112..-39298,y=-85059..-49293,z=-27449..7877',
		'on x=967..23432,y=45373..81175,z=27513..53682',
	]

	data.trim().split('\n').forEach(step => {
		flip(prepare(step))		
	})
	console.log(printAndCount())
	// flip(prepare('on x=-3..1,y=1..5,z=1..2'))
	// flip(prepare('off x=-1..-1,y=-1..-1,z=-1..-1'))

})