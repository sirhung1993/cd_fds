'use strict'

const config = require('../config/config')

const SuspicionOrders = require('../model/Suspicion')

const initTime = '000000000000'

class OverPayCheck extends SuspicionOrders {
    constructor() {
        super()
        this.SuspicionType = config.FDS.SuspicionTypes['SuspicionTransactions']
        // this.latestTime = this.getLatestSuspicionTimeId()
    }

    getAllSuspicionOrders() {
        const query = `
        SELECT ${this.factTransactionsColumnSelect} 
        FROM ${config.FactTransactions.tableName} 
        WHERE ((${this.PaymentTypeId} = 5 AND ${this.SoHoaDon} is NULL)
        OR (${this.PaymentTypeId} = 3 AND ${this.PgTransactionStatusId} NOT IN ('ACCEPT','Settled','Approved')))
        AND ${this.TransactionStatusId} in ('S3','S4','S8')
        `
        console.log(query)
        return this.dw.query(query)
        .then(rows => {
            console.log(rows)
            return rows.map(arr => {
                arr.push(this.SuspicionType)
                return arr
            })
        }).catch(err => {
            return config.failureResponse(err)
        })
    }

/**
 * lay thoi gian cuoi cung` tu` bang SuspicopnOrders
 * de query ra nhung order kha nghi som nhat
 */    
    getLatestSuspicionTimeId() {
        const query = `
    SELECT 
        CASE 
            WHEN MAX(${this.orderCreateDateCol}) > MAX(${this.orderUpdateCol}) 
                THEN MAX(${this.orderCreateDateCol})
    		ELSE MAX(${this.orderUpdateCol})
	    END
    FROM ${config.SuspicionOrders.tableName}
    WHERE ${this.susTypeCol} = ${this.SuspicionType};
    `
        return this.fds.query(query)
            .then(result => {
                if(result[0]) {
                    this.latestTime = result[0][0]
                    return this.latestTime
                } else {
                    return initTime
                }
            }).catch(error => {
                console.error(error)
                return error
            })
    }

    async getLatestSuspicionOrders() {
        await this.getLatestSuspicionTimeId()
        const tempName = 'Latest'
        const query = `
        SELECT ${this.factTransactionsColumnSelect} 
        FROM ${config.FactTransactions.tableName} 
        WHERE ((${this.PaymentTypeId} = 5 AND ${this.SoHoaDon} is NULL)
        OR (${this.PaymentTypeId} = 3 AND ${this.PgTransactionStatusId} NOT IN ('ACCEPT','Settled','Approved')))
        AND ${this.TransactionStatusId} in ('S3','S4','S8')
        `
        console.log(query)
        return this.dw.query(query)
                .then(result => {
                    return result.map(arr => {
                        arr.push(this.SuspicionType)
                        return arr
                    })
                }).catch(error => {
                    return config.failureResponse(error)
                })
    }

    getFdsSuspicionOrders(limit, page) {
        const query = `
            SELECT ${this.susOrderColumns}
            FROM ${config.SuspicionOrders.tableName}
            WHERE ${this.susTypeCol} = ${this.SuspicionType}
            LIMIT ?
            OFFSET ?
        `
        return this.fds.query(query,[limit, limit * page])
            .then(rows => {
                return rows
            }).catch(error => {
                return config.failureResponse(error)
            })
    }

    getFdsSuspicionDetail(id) {
        // console.log("ahiahiahia" + id)
        const query = `
            SELECT ${this.susOrderColumns}
            FROM ${config.SuspicionOrders.tableName}
            WHERE ${this.susOrderColumns[0]} = ?
        `
        return this.fds.query(query,[id])
            .then(rows => {
                return rows
            }).catch(error => {
                return config.failureResponse(error)
            })
    }
    

    getDwSuspicionOrders(orderCode) {
        const query = `
        SELECT ${this.factTransactionsColumn}
        FROM FactTransactions
        WHERE OrderCode = ? 
        `
        return this.dw.query(query, [orderCode])
        .then(rows => {
            console.log(rows)
            return rows.map(arr => {
                // arr.push(this.SuspicionType)
                return arr
            })
        }).catch(err => {
            console.error(err)
            return config.failureResponse(err)
        })
    }

    async getA() {
        const susOr = await this.getDwSuspicionOrders('')
    }
}
module.exports = new OverPayCheck()