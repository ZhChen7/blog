/*

- 路由模块

- */
let express = require('express')
let user = require('./models/user')
let publish = require('./models/publish')
let message = require('./models/message')
let md5 = require('blueimp-md5')
let router = express.Router()
const fs = require('fs');
const marked = require('marked');

router.get('/', function (req, res) {
    publish.find(function (err, publish) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        publish.forEach(function (e) {
            e.UTCtodata = new Date(e.publishDate).toLocaleString()
        })
        res.render('index.html', {
            publish: publish,
            user: req.session.user
        })
    })
})

router.get('/category', function (req, res, next) {
    publish.find(function (err, publish) {
        if (err) {
            return next(err)
        }
        let arr = []
        publish.forEach(function (e) {
            arr.push(e.publishIdentifying)
        })

        function unique(arr) {
            const seen = new Map()
            return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
        }

        let newarr = unique(arr)

        publish.forEach(function (e) {
            e.newarr = newarr
        })

        res.render('category.html', {
            publish: publish
        })
    })

})

router.get('/search', function (req, res) {
    publish.find(function (err, publish) {
        if (err) {
            return res.status(500).send('Serve Error')
        }
        res.render('search.html', {
            publish: publish
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
    let user = req.session.user
    if (user) {
        if (user.nickname == "周琛") {
            res.render('publish.html')
        } else {
            res.render('放过小弟吧！')
        }
    } else {
        res.render('放过小弟吧！')
    }
})

router.post('/publish', function (req, res, next) {
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


router.get("/:docName", function (req, res, next) {
    let docId = req.params.docName.replace(/"/g, '')
    let p = /[0-9]/;
    let b = p.test(docId);//true,说明有数字
    if (b) {
        publish.findById(docId, function (err, publish) {
            if (err) {
                return next(err)
            }
            if (publish.wholepublishIdentifying == "代码") {
                fs.readFile(__dirname + '/public/doc/' + publish.publishMainBodyUrl + '.md', 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        htmlStr = marked(data.toString());
                        res.type('html')
                        message.find({
                            message_type: publish.publishMainBodyUrl
                        }, function (err, message) {
                            if (err) {
                                return next(err)
                            }
                            message.forEach(function (e) {
                                e.UTCtodata = new Date(e.message_time).toLocaleString()
                            })
                            res.render('MainBody.html', {
                                doc: htmlStr,
                                publish: publish,
                                message: message
                            });
                        })
                    }
                });
            }
            if (publish.wholepublishIdentifying == "心得体会") {
                fs.readFile(__dirname + '/public/feelings/' + publish.publishMainBodyUrl + '.md', 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        htmlStr = marked(data.toString());
                        res.type('html')
                        message.find({
                            message_type: publish.publishMainBodyUrl
                        }, function (err, message) {
                            if (err) {
                                return next(err)
                            }
                            message.forEach(function (e) {
                                e.UTCtodata = new Date(e.message_time).toLocaleString()
                            })
                            res.render('MainBody.html', {
                                doc: htmlStr,
                                publish: publish,
                                message: message
                            });
                        })
                    }
                });
            }
        })
    } else {
        publish.find({
            publishIdentifying: req.params.docName
        }, function (err, publish) {
            if (err) {
                return next(err)
            }
            res.render('sortlayout.html', {
                publish: publish
            })
        })
    }
})


router.post('/message', function (req, res, next) {
    let body = req.body
    let user = req.session.user
    if (!user) {
        return res.status(200).json({
            err_code: 1,
            message: '用户没有登陆.'
        })
    } else {
        body.message_nickname = user.nickname

        new message(body).save(function (err, data) {
            if (err) {
                return next(err)
            }
            return res.status(200).json({
                err_code: 0,
                message: data
            })
            // publish.findOne({
            //     publishMainBodyUrl:data.message_type
            // },function (err,publish) {
            //     if (err) {
            //         return next(err)
            //     }
            //     console.log(publish)
            //     message.find(function (err, message) {
            //         if (err) {
            //             return next(err)
            //         }
            //         console.log(message)
            //         return res.status(200).json({
            //             err_code: 0,
            //             message: message,
            //             publish:publish
            //         })
            //     })
            // })
        })
    }

})


//导出router
module.exports = router
