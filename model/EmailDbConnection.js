'use strict'

const config = require('../config/config')
const mssql = require('mssql')
const emailTable = config.EMAIL_DB.SSRSEmails
class EmailDbConnection {
    constructor() {
        mssql.close()
        this.pool = new mssql.ConnectionPool(config.EMAIL_DB)
        try {
            this.connect = this.pool.connect()
        } catch (err) {
            console.error(err)
        }
        this.request = this.getRequest()
        this.emailTableName = emailTable.tableName
        this.emailTableColumns = emailTable.columns.split(config.splitPattern)
        this.emailTieuDe = this.emailTableColumns[1]
        this.emailNoiDung = this.emailTableColumns[2]
        this.emailNguoiNhan = this.emailTableColumns[4]
        this.emailTrangThai = this.emailTableColumns[6]
        this.emailCreatedBy = this.emailTableColumns[8]
        this.emailCreatedAt = this.emailTableColumns[7]
    }

    async test() {
        try {
            mssql.close()
            await mssql.connect(`mssql://${config.EMAIL_DB.user}:${config.EMAIL_DB.password}@${config.EMAIL_DB.server}/${config.EMAIL_DB.database}`)
            const res = await mssql.query`SELECT 1 As Number`
            console.log(res)
            console.log(res['recordsets'][0])
        } catch(err) {
            console.error(err)
            return err
        }
    }

    async test2() {
        await this.request
        return new Promise((resolve, reject) => {
            // this.pool.connect(err => {
            //     console.error(`In connect then: ${err}`)
            //     reject(err)
            // })
            resolve()
        }).then(async () => {
            try{
                await this.pool.connect()
                this.request = this.pool.request()
                const temp = await this.request.query(`SELECT 1 AS Number`)
                .then(val => {
                    console.log(`Inside then val : ${val}`)
                    console.log(val)
                }).catch(err => {
                    console.error(err)
                    return err
                })
                console.log(`Console log : ${temp}`)
                console.log(temp)
            } catch(err) {
                console.error(err)
            }
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    // async _waitTheConnection() {
    //     this.connect = await this.pool.connect()
    //     console.log(`TeST` + this.connect)
    //     return this.connect
    // }

    async getRequest() {
        await this.connect
        this.request = this.pool.request()
        return this.request
    }

    async sendOverPayEmail() {
        const query = `
        INSERT INTO ${this.emailTableName}
        (${this.emailTieuDe},${this.emailNoiDung},${this.emailNguoiNhan},${this.emailTrangThai},
            ${this.emailCreatedBy}, ${this.emailCreatedAt})
        VALUES
        (@emailTieuDe,@emailNoiDung,@emailNguoiNhan,@emailTrangThai,@emailCreatedBy,@emailCreatedAt)
        `
        return await this.request
        .input('emailTieuDe', mssql.NVarChar, 'TEST TEST TIEU DE')
        .input('emailNoiDung', mssql.NVarChar, 'TEST NOI DUNG')
        .input('emailNguoiNhan', mssql.NVarChar, 'hungbv2@topica.edu.vn')
        .input('emailTrangThai', mssql.NVarChar, 'N')
        .input('emailCreatedBy', mssql.NVarChar, 'ssrs@topica.edu.vn')
        .input('emailCreatedAt', mssql.DateTime, new Date())
        .query(query)
        .then(val => {
            return val
        }).catch(err => {
            console.error(err)
        })
    }
}
const emailDbConnection = new EmailDbConnection()
module.exports = emailDbConnection