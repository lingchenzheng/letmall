const userModel = require('../../model/user/userModel')
const jwt = require('../../util/token')
const { fail, success } = require('../../util')
const { SUCCESS_CODE, ERROR_CODE } = require('../../config/base.conf')

module.exports = {
    //登录
    async login(req, res) {
        let data = req.body
        let list = await userModel.login(data)
        if (list && list.length > 0) {
            let tokenData = {
                id: list[0].id,
                userName: list[0].userName
            }
            let token = jwt.sign(tokenData)
            success(res, '登录成功', { ...list[0], token })
        } else {
            fail(res, '登录失败')
        }
    },
    //添加用户
    async addUser(req, res) {
        let data = req.body
        let isExit = await userModel.phoneIsExit(data.phone)
        if (isExit && isExit.length > 0) {
            fail(res, '此号码已被注册')
        }
        let list = await userModel.addUser(data)
        if (list) {
            success(res, '注册成功', { id: list })
        } else {
            fail(res, '注册失败')
        }
    },
    //删除用户
    async deleteUser(req, res) {
        let { id } = req.body
        let list = await userModel.deleteUser(id)
        if (list) {
            success(res, '删除成功')
        } else {
            fail(res, '删除失败')
        }
    },
    //编辑修改用户信息
    async editUser(req, res) {
        let data = req.body
        let list = await userModel.editUser(data)
        if (list) {
            res.json({
                status: SUCCESS_CODE,
                message: '修改成功'
            })
        } else {
            res.json({
                status: ERROR_CODE,
                message: '修改失败'
            })
        }
    },

    async getUserById(req, res) {
        let { id } = req.body
        let list = await userModel.getUserById(id)
        if (list && list.length > 0) {
            res.json({
                status: SUCCESS_CODE,
                data: { ...list[0] }
            })
        } else {
            res.json({
                status: ERROR_CODE,
                message: '请求失败'
            })
        }
    }
}
