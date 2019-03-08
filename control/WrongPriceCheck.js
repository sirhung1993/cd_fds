'use strict'

const config = require('../config/config')

const SuspicionOrders = require('../model/Suspicion')

const initTime = '000000000000'

class WrongPriceCheck extends SuspicionOrders {
    constructor() {
        super()
        this.SuspicionType = config.FDS.SuspicionTypes['WrongPrice']
        // this.latestTime = this.getLatestSuspicionTimeId()
    }

    getAllSuspicionOrders() {
        const query = `
        SELECT ${this.factOrdersDetailsColumnSelect} , ${this.giaBanChuaTruKhuyenMai}, ${config.FactOrderDetails.tableName}.${this.giaBanSauKhuyenMaiCol} / ${this.giaBanChuaTruKhuyenMai} as phantram
        FROM ${config.FactOrderDetails.tableName} JOIN ${config.DimPackagePrices.tableName}
        ON  ${config.FactOrderDetails.tableName}.${this.factPackageIdCol} = ${config.DimPackagePrices.tableName}.${this.dimPackageIdCol}
        AND ${config.FactOrderDetails.tableName}.${this.factLoaiHinhThuc} = ${config.DimPackagePrices.tableName}.${this.dimLoaiHinhThuc}
        WHERE ${config.FactOrderDetails.tableName}.${this.giaBanSauKhuyenMaiCol} / ${this.giaBanChuaTruKhuyenMai} < 0.75
        `
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
        SELECT ${this.factOrdersDetailsColumnSelect} , ${this.giaBanChuaTruKhuyenMai}, ${config.FactOrderDetails.tableName}.${this.giaBanSauKhuyenMaiCol} / ${this.giaBanChuaTruKhuyenMai} as phantram
        FROM ${config.FactOrderDetails.tableName} JOIN ${config.DimPackagePrices.tableName}
        ON  ${config.FactOrderDetails.tableName}.${this.factPackageIdCol} = ${config.DimPackagePrices.tableName}.${this.dimPackageIdCol}
        AND ${config.FactOrderDetails.tableName}.${this.factLoaiHinhThuc} = ${config.DimPackagePrices.tableName}.${this.dimLoaiHinhThuc}
        WHERE ${config.FactOrderDetails.tableName}.${this.giaBanSauKhuyenMaiCol} / ${this.giaBanChuaTruKhuyenMai} < 0.75
        `
        return this.dw.query(query, [this.latestTime, this.latestTime])
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
        // console.log(query)
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

    getDwSuspicionOrders(id,ordercode) {
        const query = `
        SELECT ${this.factOrdersDetailsColumn}  
        FROM ${config.FactOrderDetails.tableName}
        WHERE orderId=?
        AND ordercode=?;
        `
        // console.log(query)
        return this.dw.query(query, [id,ordercode])
        .then(rows => {
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
module.exports = new WrongPriceCheck()