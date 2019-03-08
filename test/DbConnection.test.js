'use strict'
const chai = require('chai')
const expect = chai.expect

const config = require('../config/config')
const db = require('../model/DbConnection')

describe('Check Fds configurations', function() {
    let Fds, Dw
    before(function() {
        Fds = db.FDS
        Dw = db.DW
    })
    
    it('Fds init OK!', function() {
        expect(Fds).to.exist
        expect(Dw).to.exist
    })

    it('Test database connection', function(){
        expect(Fds.pool).to.be.an('object')
        expect(Dw.pool).to.be.an('object')
    })
    it('Pool connect check', async function() {
        const couldConnect = await Fds.pool.query('SELECT 1')
        .then((rows) => {
            return rows
        }).catch(err => {
            console.error(err)
            return err
        })
        const couldConnectDw = await Dw.pool.query('SELECT 1')
        .then((rows) => {
            return rows
        }).catch(err => {
            console.error(err)
            return err
        })
        expect(couldConnect[0][0]).to.deep.equal(1)
        expect(couldConnectDw[0][0]).to.deep.equal(1)
    })
}) 