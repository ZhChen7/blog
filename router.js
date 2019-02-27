/*

- 路由模块

- */
let express=require('express')
let router=express.Router()
let fs=require('fs')

router.get('/',function (req,res) {
   res.render('index.html')
})

router.get('/blog',function (req,res) {
   res.render('blog.html')
})

//导出router
module.exports=router
