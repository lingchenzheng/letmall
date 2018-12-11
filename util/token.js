const jwt = require('jsonwebtoken')
const { tokenExpiresIn } = require('../config/base.conf')

module.exports = {
    sign(data) {
        return jwt.sign(data, process.env.SECRET_PUBLIC_KEY, {
            expiresIn: tokenExpiresIn
        })
    },
    verify(token) {
        return new Promise((res, rej) => {
            jwt.verify(token, process.env.SECRET_PRIVATE_KEY, (err, decode) => {
                if (err) {
                    rej(err)
                } else {
                    res(decode)
                }
            })
        })
    }
}
