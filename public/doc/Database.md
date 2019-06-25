# 大二数据库实验

#### 介绍

> 数据库课程实验综合小实验（做一个项目实现增删改查功能）
>
> 大二下学期期末大作业！



### 技术运用：

​	<u>运用到的技术</u>：**bootstrap**+ **art-template** + **node.js** + **mysql** 



| 课题         | 数据库               |
| ------------ | -------------------- |
| 班级         | 1701                 |
| 作者姓名     | 周琛                 |
| 学号         | 2017115010124        |
| 所在院系     | 计算机信息与工程学院 |
| 学科专业名称 | 计算机科学与技术     |
| 导师及职称   | 童强                 |

​ 

## 一、实验目的与要求

1. 用 node 设计一个应用程序，实现对平时实验数据库的增、删、改、查。
2. 说明文档中有node 连接数据库的关键代码说明。
3. 给了一个实例代码，实现了对一张表的增删改查功能（说明文档中可以看到数据库及表的名称，和有关连接数据库和实现增删改查的关键代码）。
4. 可以运行，实现对学生课程数据库的操作；



## 二.步骤操作

#### 1. 用node 设计一个应用程序，实现对平时实验数据库的增、删、改、查。

**效果图:**

 	用图说话：

![mark](http://static.zxinc520.com/blog/20190525/JWCuqSFLOqbB.png?imageslim)

### ![mark](http://static.zxinc520.com/blog/20190525/KHUkC8mo5c0L.png?imageslim)视频:

<video id="video" controls="" preload="none" poster="http://static.zxinc520.com/blog/20190613/yhdLmF30B7EP.png?imageslim">
      <source id="mp4" src="http://static.zxinc520.com/bandicam%202019-05-28%2012-50-22-208.mp4" type="video/mp4">
      </video>

### 2. 说明文档中有node 连接数据库的关键代码

> 文件 : mysql.js
>
> **作用: 连接数据库,执行数据操作、 封装、暴露方法.**

**mysql.js**:

```js
const mysql = require('mysql');

//执行数据操作、 封装、暴露方法
module.exports = {
    query: function (sql, params, callback) {
        //1.创建链接
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'zc'
        });
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            //开始数据操作
            //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }
                //将查询出来的数据返回给回调函数
                callback && callback(results, fields);
                //results作为数据操作后的结果，fields作为数据库连接的一些字段
                //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }
};
```





## 3.实现了对一张表的增删改查功能

> 给了一个实例代码，实现了对一张表的增删改查功能（说明文档中可以看到数据库及表的名称，和有关连接数据库和实现增删改查的关键代码）。

 

#### 添加功能实现:

```js
router.post('/add', function (req, res, next) {
    let body = req.body
    console.log(body)
    let addSql = 'INSERT INTO user(id,username,tel) VALUES(?,?,?)';
    let addSqlParams = [body.id, body.username, body.tel];
    db.query(addSql, addSqlParams, function (result, fields) {
        console.log('添加成功')
        return res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})
```

**效果图:**

![mark](http://static.zxinc520.com/blog/20190525/Q4p9PqfySpYr.png?imageslim)



#### 删除功能实现 :

```js
router.get('/delete', function (req, res, next) {
    let deleteSql = 'DELETE FROM user  WHERE id = ?';
    let deleteSqlParams = req.query.id;
    db.query(deleteSql, deleteSqlParams, (err, results) => {
        if (err) {
            console.log(err);
        }
        res.redirect(302, '/');
    })
})
```

**效果图:**

![mark](http://static.zxinc520.com/blog/20190611/Gu16nhNmt2FM.png?imageslim)

 

#### 修改功能实现

```js
router.get('/fix', function (req, res, next) {
    fixsql = 'SELECT * FROM user WHERE id = ?'
    fixSqlParams = req.query.id
    db.query(fixsql, fixSqlParams, (result) => {
        res.render('fix.html', {
            result: result[0]
        })
    })


})

router.post('/fix', function (req, res, next) {
    console.log(req.body)
    updatasql = 'UPDATE user SET username = ?,tel=? WHERE id = ?';
    updataSqlParams = [req.body.username, req.body.tel, req.body.id];
    db.query(updatasql, updataSqlParams, (err, results) => {
        if (err) {
            console.log(err);
        }
        return res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})
```



**效果图:**

![mark](http://static.zxinc520.com/blog/20190525/RdNGNjvSnJNF.png?imageslim)



#### 查找功能实现

```js
router.post('/search', function (req, res, next) {
    console.log(req.body)
    arr = []
    db.query('select * from user', [], function (result, fields) {
        console.log(result)
        result.forEach(function (e) {
            if (e.id.indexOf(req.body.value) >= 0 || e.username.indexOf(req.body.value) >= 0 || e.tel.indexOf(req.body.value) >= 0) {
                arr.push(e)
            }
        })
        return res.status(200).json({
            err_code: 0,
            message: arr
        })
    });
})
```

**效果图:**

![mark](http://static.zxinc520.com/blog/20190611/Ed1NKxGH1I4I.png?imageslim)



## 4. 运行程序

相关代码源代码以上传至码云,地址为: 

[源码地址](https://gitee.com/zxinc/sophomore_database_experiment)



<video id="video" controls="" preload="none" poster="http://static.zxinc520.com/blog/20190613/yhdLmF30B7EP.png?imageslim">
 <source id="mp4" src="http://static.zxinc520.com/bandicam%202019-05-28%2012-50-22-208.mp4" type="video/mp4">
  </video>









