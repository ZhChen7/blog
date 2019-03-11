/*

- 路由模块

- */
let express = require('express')
let user = require('./models/user')
let publish = require('./models/publish')
let md5 = require('blueimp-md5')
let router = express.Router()
const fs = require('fs');
const marked = require('marked');

router.get('/', function (req, res) {
    publish.find(function (err, publish) {
        if (err) {
            return res.status(500).send('Serve Error')
        }

        res.render('index.html',{
            publish:publish,
            user: req.session.user
        })
    })
})

router.get('/category', function (req, res) {
    publish.find(function (err, publish) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.render('category.html',{
            publish:publish
        })
    })

})

router.get('/search', function (req, res) {
    publish.find(function (err, publish) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.render('search.html',{
            publish:publish
        })
    })


})

router.get('/timeline', function (req, res) {
    res.render('timeline.html')
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res, next) {
    let body = req.body

    user.findOne({
        email: body.email,
        password: md5(md5(body.password) + 'text')
    }, function (err, user) {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'email or password is invalid'
            })
        }
        //用户存在，登录成功，通过session记录登录状态
        req.session.user = user
        return res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res, next) {
    let body = req.body
    user.findOne({
            $or: [
                {
                    email: body.email
                },
                {
                    nickname: body.nickname
                }
            ]
        }, function (err, data) {
            if (err) {
                return next(err)
                console.log(err)
            }
            if (data) {
                return res.status(200).json({
                    err_code: 1,
                    message: 'email or nickname aleary exist.'
                })
            }
            //加密
            body.password = md5(md5(body.password) + 'text')
            new user(body).save(function (err, user) {
                if (err) {
                    return next(err)
                }
                //注册成功，使用session记录用户的登录状态
                req.session.user = user

                res.status(200).json({
                    err_code: 0,
                    message: 'OK'
                })
            })
        }
    )
})

router.get('/publish', function (req, res) {
    res.render('publish.html')
})

router.post('/publish', function (req, res,next) {
    let body = req.body
    new publish(body).save(function (err, publish) {
        if (err) {
            return next(err)
        }

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

router.get('/mainbody',function (req,res) {
    res.render('MainBody.html')
})


router.get("/:docName", function(req, res){
    console.log(req.params.docName);
    // fs.readFile(__dirname+'/../public/doc/'+ req.params.docName +'.md', function(err, data){
    //     if(err){
    //         console.log("文件不存在！");
    //         res.send("文件不存在！");
    //     }else{
    //         console.log(data);
    //         htmlStr = marked(data.toString());
    //         res.render('doc', {doc: htmlStr});
    //     }
    // });
});




//导出router
module.exports = router
