/*
* app.js入口模块
* --启动服务
* --做一些服务相关的配置
* --模板引擎
* --body-parser -解析表单post请求体
* --提供静态资源服务
* --挂在路由--app.use(router)
* --监听端口号启动服务
* */
let express= require('express')
let router=require('./router')
let bodyParser = require('body-parser')
let session=require('express-session')
let app=express()

//公开资源
app.use(express.static('public'))
app.use(express.static('node_modules'))

//模板引擎
app.engine('html',require('express-art-template'))

app.use(session({
    secret: 'itcast',//配置加密字符串
    resave: false,
    saveUninitialized: true
}))



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//把路由容器挂载到app服务中
app.use(router)

app.use(function (req,res,next) {
    res.send('404')
})

//配置错误处理中间件
app.use(function (err,req,res,next) {
    res.status(500).json({
        err_code:500,
        message:err.message
    })
})


app.listen(3000,function () {
    console.log('app is running!')
})
