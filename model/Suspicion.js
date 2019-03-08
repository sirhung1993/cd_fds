'use strict'

const config = require('../config/config')
const db = require('./DbConnection')

const FdsConn = db.FDS
const DwConn = db.DW
const splitPattern = config.splitPattern

const initTime = '000000000000'
const WARNING = new Error('YOU HAVE TO OVERIDE THIS METHOD in order to USE!')

module.exports = class SuspicionOrders {
    constructor() {
        this.fds = FdsConn.pool
        this.dw = DwConn.pool
        this.susOrderColumns = config.SuspicionOrders.columns.split(splitPattern)
        this.susTypeCol = this.susOrderColumns[13]
        this.factOrdersColumn = config.FactOrders.columns.split(splitPattern)
        this.orderStatusCol = this.susOrderColumns[3]
        this.orderCreateDateCol = this.susOrderColumns[4]
        this.orderUpdateCol = this.susOrderColumns[5]
        this.orderDaThanhToanCol = this.susOrderColumns[8]
        this.orderPhaiThuCol = this.susOrderColumns[9]
        this.orderChuaThanhToanCol = this.susOrderColumns[7]
        this.latestTime = initTime
        this.factTransactionsColumnSelect = config.FactTransactions.columnselect.split(splitPattern)
        this.factTransactionsColumn = config.FactTransactions.columns.split(splitPattern)
        this.PaymentTypeId = this.factTransactionsColumn[14]
        this.SoHoaDon = this.factTransactionsColumn[15]
        this.PgTransactionStatusId = this.factTransactionsColumn[17]
        this.TransactionStatusId = this.factTransactionsColumn[16]
        this.factOrdersDetailsColumnSelect = config.FactOrderDetails.columnselect.split(splitPattern)
        this.factOrdersDetailsColumn = config.FactOrderDetails.columns.split(splitPattern)
        this.factPackageIdCol = this.factOrdersDetailsColumn[5]
        this.factLoaiHinhThuc = this.factOrdersDetailsColumn[7]
        this.giaBanSauKhuyenMaiCol = this.factOrdersDetailsColumn[10]
        this.dimPackagePriceColumn = config.DimPackagePrices.columns.split(splitPattern)
        this.dimPackageIdCol = this.dimPackagePriceColumn[0]
        this.dimLoaiHinhThuc = this.dimPackagePriceColumn[1]
        this.giaBanChuaTruKhuyenMai = this.dimPackagePriceColumn[2]
    }

    getAllSuspicionOrders() {
        console.error(WARNING)
        throw WARNING
    }

    writeSuspicionOrders(rows, columnNames) {
        if(!rows.length) return
        
        const query = `
        INSERT INTO ${config.FDS_TABLE.tableName}
        (${columnNames}) 
        VALUES (${rows[0].map(() => {
            return '?'
        })}); 
        `
        console.log(query)
        return rows.map(row => {
            return this.fds.query(query, row)
                .then(result => {
                    return result
                }).catch(error => {``
                    console.error(error)
                    return error
                })

        })
    }
/**
 * lay thoi gian cuoi cung` tu` bang SuspicopnOrders
 * de query ra nhung order kha nghi som nhat
 */    
    getLatestSuspicionTimeId() {
        console.error(WARNING)
        throw WARNING
    }
/**
 * thoi gian 
 */
    getLatestSuspicionOrders() {
        console.error(WARNING)
        throw WARNING
    }
/**
 * lay suspicion order
 */
    getFdsSuspicionOrders(limit, offset) {
        console.error(WARNING)
        throw WARNING
    }
}