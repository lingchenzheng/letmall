const user = require('./user/user')
const post = require('./post/post')

module.exports = function(app) {
    app.use(user)
    app.use(post)
}
