const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const app = express()

const author = require('./middleware/author')
const router = require('./routes/index')

const PORT = process.env.PORT || 3000
//配置跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})
//静态资源路径
app.use('/public', express.static('./public'))
app.use(cookieParser())
//配置参数解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(author)
//载入路由
router(app)

//异常请求处理
app.use(function(req, res) {
    console.log(req.headers)
    let err = `The '${req.protocol + '://' + req.hostname + req.originalUrl}' is not found`
    res.json({
        status: 404,
        message: err
    })
})

app.listen(PORT, function() {
    console.log(chalk.green('the server is running at 3000...'))
})
