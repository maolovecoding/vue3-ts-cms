const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const AutoImport = require('unplugin-auto-import/webpack');
module.exports = {
  // 打包后的文件夹
  outputDir: "./build",
  configureWebpack: {
    resolve: {
      alias: {
        // 默认已经配置过 @ = src的路径了
        components: "@/components",
        utils: "@/utils",
        store: "@/store",
        views: "@/views",
        service: "@/service"
      },
    },
    module: {
      // 解决命令行警告
      unknownContextCritical: false,
    },
    plugins: [
      // 自动导入 ep插件配置
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // 跨域访问
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:4000",
        // 路径替换
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  }
};
