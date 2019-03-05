/*

- 路由模块

- */
let express=require('express')
let router=express.Router()

router.get('/',function (req,res) {
   res.render('index.html')
})

router.get('/category',function (req,res) {
   res.render('category.html')
})

router.get('/search',function (req,res) {
   res.render('search.html')
})

router.get('/timeline',function (req,res) {
   res.render('timeline.html')
})

//导出router
module.exports=router
