const con = require('./db')

module.exports = async function(sql) {
    try {
        return con(sql)
    } catch (error) {
        return false
    }
}
