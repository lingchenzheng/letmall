const config = require('../config/mysql.conf')
const mysql = require('mysql')

const pool = mysql.createPool(config)

function getConnection(sql, success, fial) {
    pool.getConnection(function(err, con) {
        if (err) throw err
        con.query(sql, function(error, results, fields) {
            if (error) {
                fial(error)
            } else {
                success(results, fields)
            }
        })
        con.release()
    })
}

module.exports = async function(sql) {
    return new Promise((resolve, reject) => {
        getConnection(
            sql,
            (results, fileds) => {
                resolve(results)
            },
            error => {
                reject(error)
            }
        )
    })
}
