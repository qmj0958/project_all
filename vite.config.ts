import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite"; //elementplus按需导入配置
import Components from "unplugin-vue-components/vite"; //elementplus按需导入配置
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; //elementplus按需导入配置

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      //elementplus按需导入配置
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //elementplus按需导入配置
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    //跨域设置，中转服务器
    proxy: {
      //通过代理实现跨域
      "/path": {
        target: "http://101.132.172.139:8080", //替换的服务端地址
        changeOrigin: true, //开启代理，允许跨域
        rewrite: (path) => path.replace(/^\/path/, ""), //设置重写的路径，把页面里的'/path'替换为空
      },
    },
  },
});
