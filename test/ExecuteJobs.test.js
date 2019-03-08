'use strict'
const chai = require('chai')
const expect = chai.expect

const config = require('../config/config')
const Executors = require('../control/ExecuteJobs')

const pathToScenario='/home/hungbv2/Desktop/etl_ssrs/schedulers/scenarios/EVN_Transactions_Incremental.json'
const executor = new Executors(pathToScenario)

const jobNameTest = 'tl_incremental_fact_transaction_from_payment_getway_evn'
    
describe('Check ExecuteJobs class', function() {
    it('Check constructor', function() {
        expect(executor.scenario).to.be.an('object')
    })
    it('Check getAllJobs', async function() {
        const allJobs = await executor.getAllJobs()
        expect(allJobs).to.be.an('array', 'Check allJobs return an array')
        allJobs.forEach((e) => {
            expect(e).to.be.an('string', 'Check each element is a string')
        })
    })
    it('Check getSetDateJobName', async function() {
        const setDateJobName = await executor.getSetDateJobName()
        expect(setDateJobName).to.be.an('string')
    })
    it('Check getCurrentInterval', async function() {
        const currentInterval = await executor.getCurrentInterval()
        expect(currentInterval).to.be.an('array')
        currentInterval[0].forEach((e) => {
            expect(e).to.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/)
        })
    })
    it('Check getRunningJobs', async function() {
        const runningJobs = await executor.getRunningJobs()
        expect(runningJobs).to.be.an('array')
        runningJobs.forEach((e) => {
            expect(e).to.be.a('string')
        })
    })
    it('Check getDoneJobs', async function() {
        const doneJobs = await executor.getDoneJobs()
        expect(doneJobs).to.be.an('array')
        doneJobs.forEach((e) => {
            expect(e).to.be.a('string')
        })
    })
    it('Check getTheJobsStatus', async function() {
        const statusArr = await executor.getTheJobsStatus(
                [ 'e_dum_incremental_transaction_edumall_viet_nam',
                'job_get_date_edumall_viet_nam',
                'tl_incremental_fact_tramsaction_payment_getway_EVN',
                'tl_incremental_fact_transaction_from_cash_EVN',
                'tl_incremental_fact_transaction_from_cod_EVN',
                'tl_incremental_fact_transaction_from_extracted_sms_EVN' ],
                '2018-11-14 12:01:27', '2018-11-14 12:16:27'
        )
        expect(statusArr).to.be.an('array')
        statusArr.filter(e => {
            return e[0]
        })
        .forEach((e) => {
            expect(e[0][0]).to.be.a('string')
            expect(e[0][1]).to.be.a('string')
        })
    })
    // it('Check getJobDependencies', async function() {
    //     const jobHasDependencies = 'tl_incremental_fact_tramsaction_payment_getway_evn'
    //     const jobDontHaveDependencies = 'tl_incremental_fact_transaction_from_cash_evn'
    //     const getJobDependencies = await executor.getJobDependencies(jobHasDependencies)
    //     const getJobNoDenpendencies = await executor.getJobDependencies(jobDontHaveDependencies)
    //     const getJobNoDenpendencies_2 = await executor.
    //         getJobDependencies('e_dum_incremental_transaction_edumall_viet_nam')
    //     expect(getJobDependencies).to.be.an('array')
    //     getJobDependencies.forEach((val) => {
    //         expect(val).to.be.a('string')
    //     })
    //     expect(getJobNoDenpendencies).to.be.an('array')
    //     expect(getJobNoDenpendencies.length).to.equal(0)
    //     expect(getJobNoDenpendencies_2.length).to.equal(0)
    // })
    it('Check getJobLowestLevelOfAType', function() {
        const lowestLevelAll = executor.getJobLowestLevelOfAType()
        const lowestLevelAllIncre = executor.getJobLowestLevelOfAType(config.JOB_SCENARIO.types.incremental)
        const lowestLevelNotExist = executor.getJobLowestLevelOfAType('not_exist')
        expect(lowestLevelAll).to.be.a('number')
        expect(lowestLevelAll).equal(lowestLevelNotExist)
        expect(lowestLevelAllIncre).to.be.a('number')
    })
    it('Check getJobType', async function() {
        const getJobDependencies = await executor.getJobType(jobNameTest)
        expect(getJobDependencies).to.be.an('string')
    })
    it('CHeck getJobLevel', function() {
        const jobLevel = executor.getJobLevel(jobNameTest)
        expect(jobLevel).to.be.a('number')
    })
    it('Check isPreviousBatchDone', async function() {
        const isDone = await executor.isPreviousBatchDone()
        expect(isDone).to.be.a('boolean')
    })
    it('Check getIncrementalExecutalbeJob', async function() {
        const executableJobs = await executor.getIncrementalExecutableJobs()
        console.log(executableJobs)
        expect(executableJobs).to.be.an('array')
    })
}) 