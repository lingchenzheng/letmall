const config = require('../config/mysql.conf')
const mysql = require('mysql')

//创建数据库连接池
const pool = mysql.createPool(config)

//获取连接
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
        con.release() //释放连接
    })
}

//插叙方法
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
