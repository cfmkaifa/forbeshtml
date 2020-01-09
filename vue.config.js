const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    },

pwa:{
        iconPath: {
                favicon32:'./public/ico.ico',
                favicon16:'./public/ico.ico',
                appleTouchIcon: './public/ico.ico',
                maskIcon:'./public/ico.ico',
                msTileImage:'./public/ico.ico'
                }
        },
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('layout',resolve('src/layout'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'))
    },
    // configureWebpack:{
    //     resolve: {
    //         extensions: ['.js', '.vue', '.json'],
    //         alias: {
    //           'vue$': 'vue/dist/vue.esm.js',
    //           '@': resolve('src'),
    //         }
    //       },
    //       sourceMap: config.build.productionSourceMap,

    // }
   

}