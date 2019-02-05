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
//第三方插件----解析路径
let bodyParser = require('body-parser')
let app=express()

//公开资源
app.use(express.static('public'))
app.use(express.static('node_modules'))

app.engine('html',require('express-art-template'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//把路由容器挂载到app服务中
app.use(router)


app.listen(3000,function () {
    console.log('app is running!')
})
