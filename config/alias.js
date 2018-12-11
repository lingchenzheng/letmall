const path = require('path')

function resolve() {
    return path.join.call(null, __dirname, ...arguments)
}

module.exports = {
    m: resolve('../', 'controller'),
    c: resolve('../', 'model')
}
