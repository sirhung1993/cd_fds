'use strict'
const config = require('../config/config')
const scanner = config.FDS.SuspicionTypes.ScannedTypes.map(name => {
    return require(`../control/${name}`)
})
async function repeat() {
    const scanning = await Promise.all(scanner.map(scanner => {
        return scanner.getLatestSuspicionOrders()
    }))
    // console.log(`${new Date()} : ${scanning}`)
        scanning.forEach((arr, index) => {
            // console.log(arr[0])
            scanner[index].writeSuspicionOrders(arr,arrname[index])
        })
        // console.log(scanning)
}
const scanIntervalInMinute = 15*60
const arrname = [config.FactTransactions.columnInsert]
function main() {
    setInterval(async () => {
        repeat()
    }, scanIntervalInMinute * 1000)
}

repeat()
main()