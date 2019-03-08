'use strict'

const config = require('../config/config')
const db = require('mariadb')

class DbConnection {
    constructor(config) {
        this.pool = this.getPool(config)
        try {
            this.conn = this.pool.getConnection()
        } catch (err) {
            console.error(err)
        }
    }

    getPool(config) {
        try {
            this.pool = db.createPool(config)
        } catch (err) {
            console.log(err)
        }
        return this.pool
    }

    getConnection(config) {
        try {
            this.conn = db.createConnection(config)
        } catch(err) {
            console.log(err)
        }
        return this.conn
    }

    getPoolConnection() {
        return this.pool.getConnection() 
    }

    endPool() {
        return this.pool.end()
            .then(() => {
                return 1
            }).catch((err) => {
                return err
            })
    }
}

module.exports = {
    DW: new DbConnection(config.DW),
    FDS: new DbConnection(config.FDS)
}