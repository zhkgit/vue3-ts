const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
    transpileDependencies: true,
    // publicPath: './',
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            })
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://123.207.32.32:5000/',
                pathRewrite: {
                    '^/api': ''
                },
                ws: true,
                changeOrigin: true
            }
        }
    }
})
