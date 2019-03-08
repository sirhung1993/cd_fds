'use strict'
const chai = require('chai')
const expect = chai.expect

const config = require('../config/config')
const EmailDb = require('../model/EmailDbConnection')

describe('Check Email_DB configurations', function() {
    // let EmailDb
    // before(function() {
    //     EmailDb = new db()
    // })
    
    it('Fds init OK!', function() {
        expect(EmailDb).to.exist
    })

    it('Test database connection', async function(){
        await EmailDb.pool
        expect(EmailDb.pool).to.be.an('object')
    })
    it('Pool connect check', async function() {
        const request = await EmailDb.request
        const ret = await request.query(`SELECT 1 AS Number`)
        .then(res => {
            return res
        }).catch(err => {
            console.error(err)
            return err
        })

        expect(ret).to.haveOwnProperty('recordsets')
        expect(ret).to.haveOwnProperty('recordset')
        expect(ret).to.haveOwnProperty('output')
        expect(ret).to.haveOwnProperty('rowsAffected')
        // console.log(ret)
    })
    it('Check sendOverPayEmail', async function() {
        const sendEmail = await EmailDb.sendOverPayEmail()
        expect(sendEmail).to.haveOwnProperty('recordsets')
        expect(sendEmail).to.haveOwnProperty('recordset')
        expect(sendEmail).to.haveOwnProperty('output')
        expect(sendEmail).to.haveOwnProperty('rowsAffected')
    })
}) 