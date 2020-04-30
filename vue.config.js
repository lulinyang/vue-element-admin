const config = require('./src/config/index');
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
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