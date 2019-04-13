const { SUCCESS_CODE, ERROR_CODE } = require('../config/base.conf')
const uuid = require('uuid')

module.exports = {
    //操作失败
    fail(res, message, data) {
        res.json({
            status: ERROR_CODE,
            message: message || '操作失败',
            data: data
        })
    },
    //操作成功
    success(res, message, data) {
        res.json({
            status: SUCCESS_CODE,
            data: data || {},
            message: message || '操作成功'
        })
    },
    //获取uuid
    getUUID() {
        return uuid.v1().replace(/-/g, '')
    }
}
