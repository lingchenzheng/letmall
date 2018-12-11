const jwt = require('../util/token')

module.exports = function(req, res, next) {
    if (req.path != '/user/login') {
        let token = req.headers['authorization']
        jwt.verify(token)
            .then(data => {
                console.log(data)
                next()
            })
            .catch(err => {
                res.json({
                    status: 1001,
                    message: err
                })
            })
    } else {
        next()
    }
}
