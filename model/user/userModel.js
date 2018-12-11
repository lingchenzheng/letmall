const query = require('../../mysql/query')
const uuid = require('uuid')

module.exports = {
    async login(data) {
        let { phone, pwd } = data
        let sql = `SELECT * FROM lm_user WHERE phone="${phone}" AND pwd="${pwd}";`
        return query(sql)
    },
    async addUser(data) {
        let { phone, pwd } = data
        let id = uuid.v1().replace(/-/g, '')
        let sql = `INSERT INTO lm_user (id,phone,pwd) VALUES ("${id}","${phone}","${pwd}");`
        let result = await query(sql)
        if (result) {
            return id
        } else {
            return false
        }
    },
    async getUserById(id) {
        let sql = `SELECT * FROM lm_user WHERE id="${id}";`
        return query(sql)
    },
    async editUser(data) {
        let { sex = 0, userName = null, id = '', age = 0 } = data
        let sql = `UPDATE lm_user 
                   SET userName="${userName}",sex="${sex}",age="${age}" 
                   WHERE id="${id}";`
        return query(sql)
    },
    async setVip(id) {
        let sql = `UPDATE lm_user SET isVip=1 WHERE id="${id}";`
        return query(sql)
    },
    async deleteUser(id) {
        let sql = `DELETE FROM lm_user WHERE id="${id}";`
        return query(sql)
    },
    async editPwd(data) {
        let { newPwd, id } = data
        let sql = `UPDATE lm_user SET pwd="${newPwd}" WHERE id="${id}";`
        return query(sql)
    },
    async phoneIsExit(phone) {
        let sql = `SELECT * FROM lm_user WHERE phone="${phone}";`
        return query(sql)
    }
}
