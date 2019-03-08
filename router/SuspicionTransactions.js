'use strict'
const express = require('express')
const router = express.Router()
const config = require('../config/config')
const SuspicionTransactionCheck = require('../control/SuspicionTransactionCheck')

const suscessResponse = config.suscessResponse 
router.get('/all', async (req, res, next) => {
    const allSusOrder = await SuspicionTransactionCheck.getAllSuspicionOrders()
    if(!allSusOrder.error) {
        res.status(200).json(suscessResponse(allSusOrder))
    } else {
        res.status(400).json(allSusOrder)
    }
})

router.get('/detail/:orderCode', async (req, res, next) => {
    const orderCode = req.params.orderCode
    console.log(orderCode)
    //const page = parseInt(req.params.page) || 0
    const DwId = await SuspicionTransactionCheck.getFdsSuspicionDetail(orderCode)
    if(!DwId.error) {
        res.status(200).json(suscessResponse(DwId))
    } else {
        res.status(400).json(DwId.error)
    }
})

router.get('/:orderCode', async (req, res, next) => {
    const orderCode = req.params.orderCode
    //const page = parseInt(req.params.page) || 0
    const DwOrderCode = await SuspicionTransactionCheck.getDwSuspicionOrders(orderCode)
    const DwId = await SuspicionTransactionCheck.getFdsSuspicionOrders(orderCode)
    if(!DwOrderCode.error) {
        res.status(200).json(suscessResponse(DwOrderCode))
    } else {
        res.status(400).json(DwOrderCode.error)
    }
})

router.get('/:limit/:page', async (req, res, next) => {
    const limit = parseInt(req.params.limit) || 10
    const page = parseInt(req.params.page) || 0
    const fdsOrder = await SuspicionTransactionCheck.getFdsSuspicionOrders(limit, page)
    if(!fdsOrder.error) {
        res.status(200).json(suscessResponse(fdsOrder))
    } else {
        res.status(400).json(fdsOrder)
    }
})




module.exports = router