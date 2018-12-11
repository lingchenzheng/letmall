const { SUCCESS_CODE, ERROR_CODE } = require('../config/base.conf')

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
    }
}
