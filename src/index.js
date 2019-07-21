// main.js 是我们项目的JS的入口文件

//1.导入 Jquery
// import *** from *** 是 ES6 中导入模块的方式
//由于 ES6 语法太高级了，浏览器解析不了，所以，执行会报错
import './js/clicklove.js'
import './js/main_Navigation.js'
import './js/banner.js'
import './js/sideBar.js'
import './lib/scrollReveal.js'
import './js/newpartBtn.js'

// 使用 import 语法，导入 CSS样式表
import './css/preloader/load.css'
import './css/IndexCanvas/IndexCanvas.css'
// 注意： webpack 处理第三方文件类型的过程：
// 1. 发现这个 要处理的文件不是JS文件，然后就去 配置文件中，查找有没有对应的第三方 loader 规则
// 2. 如果能找到对应的规则， 就会调用 对应的 loader 处理 这种文件类型；
// 3. 在调用loader 的时候，是从后往前调用的；
// 4. 当最后的一个 loader 调用完毕，会把 处理的结果，直接交给 webpack 进行 打包合并，最终输出到  bundle.js 中去




