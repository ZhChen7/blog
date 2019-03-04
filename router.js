/*

- 路由模块

- */
let express=require('express')
let router=express.Router()
let fs=require('fs')

router.get('/',function (req,res) {
   res.render('index.html')
})

router.get('/category',function (req,res) {
   res.render('category.html')
})

//导出router
module.exports=router
