'use strict'
const chai = require('chai')
const expect = chai.expect

const config = require('../config/config')
const scenario = require('../control/ScenarioReader')

const Requestor = require('../control/AzkabanRequestor') 
const requestor = new Requestor()

const absoluteScenarioPath = '/home/hungbv2/Desktop/etl_ssrs/schedulers/scenarios'
describe('Check AzkabanRequestor', function() {
    it('Check contructor', function() {
        expect(requestor.scenariosPath).to.equal('../scenarios')
    })
    it('Check getProjectNameList relative path', function() {
        const projectName = requestor.getProjectNameList()
        expect(projectName).to.be.an('array')
        projectName.forEach(val => {
            expect(val).to.be.an('string')
        })
    })
    it('Check getProjectNameList absolute path', function() {
        const testRequestor = new Requestor(absoluteScenarioPath)
        const projectName = testRequestor.getProjectNameList()
        expect(projectName).to.be.an('array')
        projectName.forEach(val => {
            expect(val).to.be.an('string')
        })
    })
    it('Check getLoginSession', async function() {
        const loginData = await requestor.getLoginSession()
        expect(loginData).to.be.an('string')
    })
    it('Check executeAJob', async function() {
        const executeStatus = await requestor.executeAJob('SSRS_FactOrders_Dev' , 'incremental_tl_edumall_viet_nam')
        expect(executeStatus).to.be.an('object')
        expect(executeStatus['execid']).to.be.a('number')
    })
    it('Check executeAllJob', async function() {
        const executed = await requestor.executeAllExecutableJob()
        expect(executed).to.be.an('array')
    })
    it('Check getExecutors', function() {
        const executors = requestor.getExecutors()
        // console.log(executors)
        expect(executors).to.be.an('array')
    })
}) 