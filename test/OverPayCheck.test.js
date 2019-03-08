'use strict'
const chai = require('chai')
const expect = chai.expect

const config = require('../config/config')
const suspicionOrders = require('../control/OverPayCheck')

const susOrder = [
    [ 0, 'TEST', 'TEST', 5,'201808220101','000000000000', 'mveb2v    ', 
    100000, 0, 8500000, null, 1 ]
    ]
function sqlDelete(tableName , priKeyArr) {
    const condition = priKeyArr.map((val) => {
        return ` ${val} = ? `
    }).toString().replace(/ *, */g, ' AND ')
    return `
    DELETE FROM ${tableName}
    WHERE ${condition}
    `
}
describe('Check Job class', async function() {
    it('Check constructor', function() {
        const cols = suspicionOrders.susOrderColumns
        expect(cols).to.be.an('array')
    })
    it('Check method get suspicionOrder', async function() {
        const susOrder = await suspicionOrders.getAllSuspicionOrders()
        console.log(susOrder[0])
        expect(susOrder).to.be.an('array')
    })
    it('Check method writeSuspicionOrders', async function() {
        await suspicionOrders.fds.query(sqlDelete(config.FDS_TABLE.tableName, 
            suspicionOrders.susOrderColumns.slice(0,3)), susOrder[0].slice(0,3))
        const writeQuery = await Promise.all(suspicionOrders.writeSuspicionOrders(susOrder))
        expect(writeQuery[0]).to.haveOwnProperty('affectedRows')
        expect(writeQuery[0]).to.haveOwnProperty('insertId')
        expect(writeQuery[0]).to.haveOwnProperty('warningStatus')
        await suspicionOrders.fds.query(sqlDelete(config.FDS_TABLE.tableName, 
            suspicionOrders.susOrderColumns.slice(0,3)), susOrder[0].slice(0,3))
    })
    it('Check method get getLatestTime', async function() {
        const latestTime = await suspicionOrders.getLatestSuspicionTimeId()
        expect(latestTime).to.match(/[0-9]{12}/)
    })
    it('Check method get getLatestSuspicionOrder', async function() {
        const latestSusOrder = await suspicionOrders.getLatestSuspicionOrders()
        expect(latestSusOrder).to.be.a('array')
    })
    it('Check method getFdsSuspicionOrders', async function() {
        const limit = 10
        const page = 0
        const orders = await suspicionOrders.getFdsSuspicionOrders(limit, page)
        expect(orders).to.be.a('array')
        expect(orders.length).to.equal(limit)
    })
}) 