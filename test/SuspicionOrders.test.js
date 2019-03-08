'use strict'
const chai = require('chai')
const expect = chai.expect

const config = require('../config/config')
const SuspicionOrders = require('../model/SuspicionOrders')
const suspicionOrders = new SuspicionOrders()

const susOrder = [
    [ 0, 'TEST', 'TEST', 5,'201808220101','000000000000', 'mveb2v    ', 
    100000, 0, 8500000, null ]
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
    it('Check method get suspicionOrder', function() {
            expect(suspicionOrders.getAllSuspicionOrders).to.throw(Error)
    })
    it('Check method writeSuspicionOrders', async function() {
        const writeQuery = await suspicionOrders.writeSuspicionOrders(susOrder)
        expect(writeQuery).to.be.a('array')
        suspicionOrders.fds.query(sqlDelete(config.FDS_TABLE.tableName, 
            suspicionOrders.susOrderColumns.slice(0,3)), susOrder[0].slice(0,3))
    })
    it('Check method get getLatestTime', function() {
        expect(suspicionOrders.getLatestSuspicionTimeId).to.throw(Error)
    })
    it('Check method get getLatestSuspicionOrder', function() {
        expect(suspicionOrders.getLatestSuspicionOrders).to.throw(Error)
    })
}) 