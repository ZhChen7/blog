const path = require('path')

module.exports = {
    mode: 'production',
    devServer: {
        open: true,
        port: 3000,
        contentBase: path.join(__dirname, 'views')
    },
    module: { // 这个节点，用于配置 所有 第三方模块 加载器
        rules: [ // 所有第三方模块的 匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']}, //配置处理 .css 文件的第三方 loader 规则
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},//这是 处理 字体文件的 loader
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
                ]
            }
        ]
    }
}


