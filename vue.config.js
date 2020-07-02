const config = require('./src/config/index');
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/admin':{
                target: config.baseUrl,
                changeOrigin: true,
                pathRewrite:{
                    '^/': '/'
                }
            }
        },
        port: 3000
    }
}