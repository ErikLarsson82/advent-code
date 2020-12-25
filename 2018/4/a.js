const { compose, uniqBy } = require('ramda')

const trim = x => x.trim()
const nonBlank = x => x !== ""
const date = x => x.date
const time = x => x.getTime()
const regx = x => x.split(/\[(.*?)\]/)
            .map(trim)
            .filter(nonBlank)
const milis = compose(time, date)

const acc = {}
let guard = null

const dataPoints = require('fs')
    .readFileSync('input.txt', 'utf-8')
    .split("\n")
    .map(trim)
    .filter(nonBlank)
    .map(regx)
    .map(x => ({
        date: x[0],
        instruction: x[1]
    }))
    .map(x => {
        const date_time = x.date.split(" ")
        const date = date_time[0].split("-").map(x => parseInt(x))
        const time = date_time[1].split(":").map(x => parseInt(x))
        return {
            ...x,
            date: new Date(Date.UTC(date[0], date[1], date[2], time[0], time[1]))
        }
    })
    .map(x => {
        if (x.date.getUTCHours() === 23) {
            return {
                ...x,
                date: new Date(Date.UTC(x.date.getUTCFullYear(), x.date.getUTCMonth(), (x.date.getUTCDate() + 1), 0, 0))
            }
        }
        return x
    })
    //.filter((_, idx) => idx < 9)

const day = date => date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDate()
const sameDay = (a, b) => day(a) === day(b)

const days = uniqBy(({date}) => day(date), dataPoints)
    .map(({date}, idx, list) => {
        if (idx === 0) {
            console.log(
                [...list].filter(x => sameDay(x.date, date))
                    //.sort((a, b) => milis(a) > milis(b) ? 1 : -1)
            )
        }

    })

    /*.map((day, idx, keys) => {
        console.log(day, keys)
    })*/
    //.sort((a, b) => milis(a) > milis(b) ? 1 : -1)
    /*
    .forEach(x => {
        if (x.instruction.indexOf("#") !== -1) {
            guard = 1337
            x.date.getUTCDate()
            
        }
    })
    */
console.log(dataPoints.length, days.length)

//"[1518-09-16 23:57] Guard #1889 begins shift"

//console.log(data.sortBy().sortBy())